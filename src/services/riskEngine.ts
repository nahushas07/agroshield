import {
  RiskLevel,
  RunoffRiskAssessment,
  HourlyRiskPoint,
  BeforeYouApplyResult,
  FieldRecord,
  RiskFactorBreakdown
} from '../types';

/**
 * AgroShield Prototype Risk Model
 * 
 * DISCLAIMER:
 * Prototype Decision-Support Algorithm. Estimates runoff risk potential based on
 * available weather forecasts, terrain slope, soil texture, and drainage proximity.
 * Does not directly measure chemical concentration, groundwater contamination, or pesticide transport.
 */

export interface RiskInputParams {
  rainForecastNext6hMm: number;
  rainLast24hMm: number;
  soilMoisturePercent: number; // 0 - 100
  slopePercent: number; // e.g. 4.2%
  soilTexture: string; // 'Clayey', 'Loamy', 'Sandy'
  distanceToDrainageMeters: number;
}

export function calculateRunoffScore(params: RiskInputParams): {
  overallScore: number;
  level: RiskLevel;
  factorContributions: {
    rainfallIntensity: RiskFactorBreakdown;
    soilSaturation: RiskFactorBreakdown;
    topographicSlope: RiskFactorBreakdown;
    catchmentConnectivity: RiskFactorBreakdown;
    soilErodibility: RiskFactorBreakdown;
  };
} {
  // 1. Rainfall intensity & duration (35% weight)
  // 0 - 5 mm: Low (15 pts), 5 - 15 mm: Moderate (50 pts), 15 - 35 mm: High (80 pts), > 35 mm: Extreme (98 pts)
  let rainScore = Math.min(100, (params.rainForecastNext6hMm / 30) * 85 + (params.rainLast24hMm / 50) * 15);
  rainScore = Math.max(8, Math.min(100, Math.round(rainScore)));

  // 2. Antecedent Soil moisture & Saturation Deficit (25% weight)
  // Low moisture (< 35%): Low runoff absorption risk. Saturated (> 75%): High runoff risk.
  let moistureScore = params.soilMoisturePercent;
  if (params.soilMoisturePercent > 70) {
    moistureScore = 70 + (params.soilMoisturePercent - 70) * 1.5;
  }
  moistureScore = Math.max(10, Math.min(100, Math.round(moistureScore)));

  // 3. Topographic slope factor (20% weight)
  // 0-2% flat (20 pts), 2-5% moderate (60 pts), >5% steep (85+ pts)
  let slopeScore = Math.min(100, Math.round(params.slopePercent * 16));
  slopeScore = Math.max(12, slopeScore);

  // 4. Catchment & Drainage connectivity (12% weight)
  // Closer to stream/canal = higher connectivity score
  let connectivityScore = 30;
  if (params.distanceToDrainageMeters < 80) connectivityScore = 90;
  else if (params.distanceToDrainageMeters < 250) connectivityScore = 70;
  else if (params.distanceToDrainageMeters < 600) connectivityScore = 45;
  else connectivityScore = 20;

  // 5. Soil erodibility & texture permeability (8% weight)
  let erodibilityScore = 45;
  const tex = params.soilTexture.toLowerCase();
  if (tex.includes('clay')) erodibilityScore = 75; // Low infiltration, high surface wash
  else if (tex.includes('loam')) erodibilityScore = 45;
  else if (tex.includes('sand')) erodibilityScore = 25; // High infiltration

  // Weighted sum
  const weightedTotal = Math.round(
    rainScore * 0.35 +
    moistureScore * 0.25 +
    slopeScore * 0.20 +
    connectivityScore * 0.12 +
    erodibilityScore * 0.08
  );

  const overallScore = Math.min(100, Math.max(5, weightedTotal));

  let level: RiskLevel = 'LOW';
  if (overallScore >= 76) level = 'VERY_HIGH';
  else if (overallScore >= 51) level = 'HIGH';
  else if (overallScore >= 26) level = 'MODERATE';
  else level = 'LOW';

  const getSeverity = (s: number): 'low' | 'moderate' | 'high' => {
    if (s >= 65) return 'high';
    if (s >= 35) return 'moderate';
    return 'low';
  };

  return {
    overallScore,
    level,
    factorContributions: {
      rainfallIntensity: {
        name: 'Rainfall Intensity & Duration',
        score: rainScore,
        weight: 35,
        description: `Forecast: ${params.rainForecastNext6hMm.toFixed(1)} mm next 6h, ${params.rainLast24hMm.toFixed(1)} mm received recently.`,
        severity: getSeverity(rainScore),
      },
      soilSaturation: {
        name: 'Topsoil Moisture Saturation',
        score: moistureScore,
        weight: 25,
        description: `Estimated topsoil saturation is ${params.soilMoisturePercent.toFixed(0)}%, limiting further water infiltration.`,
        severity: getSeverity(moistureScore),
      },
      topographicSlope: {
        name: 'Field Topographic Slope',
        score: slopeScore,
        weight: 20,
        description: `Field gradient of ${params.slopePercent.toFixed(1)}% promotes gravity-assisted surface flow.`,
        severity: getSeverity(slopeScore),
      },
      catchmentConnectivity: {
        name: 'Drainage & Catchment Proximity',
        score: connectivityScore,
        weight: 12,
        description: `Field boundary is within ${params.distanceToDrainageMeters}m of local drainage pathway.`,
        severity: getSeverity(connectivityScore),
      },
      soilErodibility: {
        name: 'Soil Texture & Erodibility',
        score: erodibilityScore,
        weight: 8,
        description: `${params.soilTexture} texture influences infiltration rate and surface sheet formation.`,
        severity: getSeverity(erodibilityScore),
      },
    },
  };
}

export function generateFieldRiskAssessment(field: FieldRecord): RunoffRiskAssessment {
  // Baseline evaluation for Field KA-MDY-001 in current afternoon weather
  const currentRainForecast = 16.4; // mm
  const rainLast24h = 24.0; // mm
  const soilMoisture = 76; // %
  const slope = field.location.averageSlopePercent || 3.8;
  const distance = field.location.distanceToWaterBodyMeters || 180;
  const texture = field.soil.texture || 'Loamy';

  const calc = calculateRunoffScore({
    rainForecastNext6hMm: currentRainForecast,
    rainLast24hMm: rainLast24h,
    soilMoisturePercent: soilMoisture,
    slopePercent: slope,
    soilTexture: texture,
    distanceToDrainageMeters: distance,
  });

  // Timeline: 10 AM, 12 PM, 2 PM, 4 PM, 6 PM, 8 PM
  const hourlyTimeline: HourlyRiskPoint[] = [
    {
      timeLabel: '10:00 AM',
      timestamp: '2026-10-06T10:00:00',
      riskScore: 24,
      riskLevel: 'LOW',
      rainForecastMm: 0.5,
      soilMoistureEstPercent: 48,
      primaryDrivers: ['Minimal rainfall', 'Soil profile has open absorption buffer'],
      recommendation: 'Field conditions stable for routine field operations.',
      isFavorableForApplication: true,
    },
    {
      timeLabel: '12:00 PM',
      timestamp: '2026-10-06T12:00:00',
      riskScore: 46,
      riskLevel: 'MODERATE',
      rainForecastMm: 3.2,
      soilMoistureEstPercent: 58,
      primaryDrivers: ['Light convective clouds approaching', 'Soil moisture rising'],
      recommendation: 'Monitor weather radar. Marginal window for non-soluble work.',
      isFavorableForApplication: true,
    },
    {
      timeLabel: '2:00 PM',
      timestamp: '2026-10-06T14:00:00',
      riskScore: 78,
      riskLevel: 'HIGH',
      rainForecastMm: 16.5,
      soilMoistureEstPercent: 76,
      primaryDrivers: [
        'Rainfall intensity increasing rapidly',
        'Recent rainfall has saturated topsoil moisture buffer',
        'Field slope accelerates surface water velocity'
      ],
      recommendation: 'High caution. Significant risk of fertilizer or spray wash-off into drainage lines.',
      isFavorableForApplication: false,
    },
    {
      timeLabel: '4:00 PM',
      timestamp: '2026-10-06T16:00:00',
      riskScore: 84,
      riskLevel: 'VERY_HIGH',
      rainForecastMm: 22.0,
      soilMoistureEstPercent: 88,
      primaryDrivers: [
        'Peak thunderstorm rainfall intensity',
        'Saturated soil causing surface ponding and sheet flow',
        'Downstream drainage line at peak conveyance'
      ],
      recommendation: 'Avoid any chemical or fertilizer application. Protect drainage bunds.',
      isFavorableForApplication: false,
    },
    {
      timeLabel: '6:00 PM',
      timestamp: '2026-10-06T18:00:00',
      riskScore: 52,
      riskLevel: 'MODERATE',
      rainForecastMm: 4.8,
      soilMoistureEstPercent: 82,
      primaryDrivers: [
        'Rainfall tapering off',
        'Soil profile draining slowly towards Visvesvaraya canal tributary'
      ],
      recommendation: 'Ground remains heavily saturated. Postpone foliar treatments until soil drains.',
      isFavorableForApplication: false,
    },
    {
      timeLabel: '8:00 PM',
      timestamp: '2026-10-06T20:00:00',
      riskScore: 32,
      riskLevel: 'MODERATE',
      rainForecastMm: 0.8,
      soilMoistureEstPercent: 68,
      primaryDrivers: ['Overnight clearing expected', 'Moisture beginning to percolate'],
      recommendation: 'Conditions stabilizing. Review tomorrow morning application windows.',
      isFavorableForApplication: true,
    },
  ];

  return {
    id: `RISK-${field.id}-${Date.now()}`,
    fieldId: field.id,
    assessedAt: new Date().toISOString(),
    overallScore: calc.overallScore,
    level: calc.level,
    statusHeadline: 'Conditions may increase runoff potential.',
    shortDescription: 'Elevated combination of incoming rainfall intensity, elevated soil moisture, and natural field gradient.',
    factors: calc.factorContributions,
    whyExplanation: [
      'Rainfall intensity is increasing over Mandya taluk according to Doppler weather radar.',
      'Recent rainfall of 24.0 mm has filled 76% of topsoil water holding capacity, leaving low infiltration headroom.',
      `Field gradient of ${field.location.averageSlopePercent}% creates surface velocity vectors directed towards the south-eastern boundary.`,
      `The field is connected via an unlined agricultural drainage furrow leading ${field.location.distanceToWaterBodyMeters}m to the ${field.location.nearbyWaterBodyName}.`
    ],
    preventiveAdvice: [
      'Consider pausing planned fertilizer and spray operations until heavy rain clears.',
      'Maintain field bunds to slow down surface runoff velocity.',
      'Check irrigation sluices to prevent overflow into regional drainage lines.',
      'Inspect low-lying field corners where surface pooling typically initiates.'
    ],
    hourlyTimeline,
  };
}

export function evaluateBeforeYouApply(
  field: FieldRecord,
  crop: string,
  activity: string,
  plannedTime: string
): BeforeYouApplyResult {
  const isHighRiskTime = plannedTime.toLowerCase().includes('2:00 pm') || 
                         plannedTime.toLowerCase().includes('today afternoon') ||
                         plannedTime.toLowerCase().includes('today, 2:00 pm') ||
                         plannedTime.toLowerCase().includes('4:00 pm');

  if (isHighRiskTime) {
    return {
      decision: 'CAUTION_HIGH',
      decisionTitle: 'HIGH CAUTION',
      summaryMessage: 'Conditions are currently unfavorable for this planned activity.',
      whyPoints: [
        'Heavy rainfall is expected between 1:30 PM and 5:00 PM (16 to 22 mm).',
        'Runoff risk is estimated at 78/100 (HIGH category).',
        'Field moisture is already high (76% topsoil saturation) preventing chemical absorption.',
        'Applied nutrients are at elevated risk of surface sheet wash into downstream drainage.'
      ],
      safeAlternativeWindow: 'Consider reviewing a later application window: Tomorrow morning (8:00 AM – 11:30 AM), when rainfall probability drops to 12%.',
      advisoryNote: 'This is decision support only. Follow product labels and local agricultural guidance. Never apply inputs when surface wash is imminent.',
      riskScore: 78,
      evaluatedConditions: {
        forecastRainNext6h: '16.5 mm (Heavy showers expected)',
        soilSaturationEstimate: '76% (High antecedent moisture)',
        fieldSlopeRisk: `${field.location.averageSlopePercent}% slope to ${field.location.slopeAspect}`,
        runoffPotential: 'HIGH - Direct connectivity to Shimsha sub-basin'
      }
    };
  }

  // Favorable or moderate scenario
  return {
    decision: 'FAVORABLE',
    decisionTitle: 'FAVORABLE WINDOW',
    summaryMessage: 'Current estimated conditions indicate an acceptable operational window.',
    whyPoints: [
      'Low precipitation forecast (< 2 mm) for the subsequent 8 hours.',
      'Topsoil infiltration headroom is adequate for nutrient incorporation.',
      'Surface runoff velocity remains within low threshold.',
      'Wind speed is below 12 km/h, minimizing foliar spray drift.'
    ],
    safeAlternativeWindow: 'Optimal window extends from 8:00 AM until 1:00 PM today.',
    advisoryNote: 'Follow standard product label dilution ratios and local agricultural department advisories.',
    riskScore: 28,
    evaluatedConditions: {
      forecastRainNext6h: '1.2 mm (Scattered clouds)',
      soilSaturationEstimate: '52% (Moderate absorption buffer)',
      fieldSlopeRisk: `${field.location.averageSlopePercent}% manageable gradient`,
      runoffPotential: 'LOW - Negligible surface transport risk'
    }
  };
}
