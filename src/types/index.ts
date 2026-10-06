export type UserRole = 'FARMER' | 'FIELD_VISITOR' | 'LAB_TECHNICIAN' | 'AGRICULTURAL_OFFICER' | 'ADMIN';

export type LanguageCode = 'en' | 'kn' | 'hi';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';

export interface FieldLocation {
  village: string;
  taluk: string;
  district: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  elevationMeters: number;
  averageSlopePercent: number;
  slopeAspect: string; // e.g., 'South-East'
  drainageBasin: string; // e.g., 'Shimsha Sub-Basin'
  distanceToWaterBodyMeters: number;
  nearbyWaterBodyName: string;
}

export interface SoilProfile {
  soilType: string; // e.g. 'Red Sandy Loam', 'Clayey Loam'
  texture: string;
  ph: number;
  electricalConductivity: number; // dS/m
  organicCarbonPercent: number;
  nitrogenStatus: 'Low' | 'Medium' | 'High';
  nitrogenKgPerHa: number;
  phosphorusStatus: 'Low' | 'Medium' | 'High';
  phosphorusKgPerHa: number;
  potassiumStatus: 'Low' | 'Medium' | 'High';
  potassiumKgPerHa: number;
  zincPpm: number;
  boronPpm: number;
  ironPpm: number;
  infiltrationRateMmPerHour: number;
  lastTestDate: string;
  testReportId: string;
  testingLabName: string;
}

export interface FieldPolygonPoint {
  x: number; // percentage in coordinate bounding box
  y: number;
  lat: number;
  lng: number;
}

export interface FieldRecord {
  id: string;
  fieldCode: string; // e.g., 'KA-MDY-001'
  farmerName: string;
  farmerPhone: string;
  areaAcres: number;
  surveyNumber: string;
  currentCrop: string;
  sowingDate: string;
  cropStage: string; // 'Vegetative' | 'Tillering' | 'Flowering' | 'Harvesting'
  location: FieldLocation;
  soil: SoilProfile;
  boundary: FieldPolygonPoint[];
  drainagePathPoints: { x: number; y: number }[];
  watershedId: string;
}

export interface HourlyRiskPoint {
  timeLabel: string;
  timestamp: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  rainForecastMm: number;
  soilMoistureEstPercent: number;
  primaryDrivers: string[];
  recommendation: string;
  isFavorableForApplication: boolean;
}

export interface RiskFactorBreakdown {
  name: string;
  score: number; // 0 - 100 contribution
  weight: number; // percentage weight in calculation
  description: string;
  severity: 'low' | 'moderate' | 'high';
}

export interface RunoffRiskAssessment {
  id: string;
  fieldId: string;
  assessedAt: string;
  overallScore: number; // 0 - 100
  level: RiskLevel;
  statusHeadline: string;
  shortDescription: string;
  factors: {
    rainfallIntensity: RiskFactorBreakdown;
    soilSaturation: RiskFactorBreakdown;
    topographicSlope: RiskFactorBreakdown;
    catchmentConnectivity: RiskFactorBreakdown;
    soilErodibility: RiskFactorBreakdown;
  };
  whyExplanation: string[];
  preventiveAdvice: string[];
  hourlyTimeline: HourlyRiskPoint[];
}

export type SoilTestStatus =
  | 'REQUESTED'
  | 'ASSIGNED'
  | 'SAMPLE_COLLECTED'
  | 'IN_LAB'
  | 'TESTING'
  | 'VERIFIED'
  | 'REPORT_READY';

export interface SoilTestRequest {
  id: string;
  sampleCode: string; // 'ST-2026-00421'
  fieldId: string;
  fieldName: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  village: string;
  taluk: string;
  testPackage: 'Standard Soil Test' | 'Comprehensive Micronutrient' | 'Salinity & Texture';
  costRupees: number;
  paymentMethod: 'Online' | 'Cash on Collection';
  paymentStatus: 'PAID' | 'PENDING';
  status: SoilTestStatus;
  requestedAt: string;
  assignedVisitorId?: string;
  assignedVisitorName?: string;
  collectedAt?: string;
  samplePhotoUrl?: string;
  gpsCoordinates?: { lat: number; lng: number };
  sampleDepthCm?: number;
  receivedAtLabAt?: string;
  verifiedAt?: string;
  reportId?: string;
  notes?: string;
}

export interface SoilReportRecord {
  id: string;
  testRequestId: string;
  sampleCode: string;
  fieldId: string;
  farmerName: string;
  labName: string;
  labRegistrationNumber: string;
  testedByTechnician: string;
  verifiedByScientist: string;
  issueDate: string;
  ph: number;
  ec: number; // dS/m
  organicCarbon: number; // %
  availableN: number; // kg/ha
  availableP: number; // kg/ha
  availableK: number; // kg/ha
  zinc: number; // ppm
  boron: number; // ppm
  soilHealthGrade: 'A (Optimal)' | 'B (Moderate)' | 'C (Deficient)';
  summaryAdvice: string;
  recommendedAdjustments: string[];
}

export interface WeatherCondition {
  currentTempC: number;
  condition: string;
  iconType: 'rain' | 'sun' | 'cloud' | 'thunder';
  humidityPercent: number;
  windSpeedKmh: number;
  windDirection: string;
  rainfallRateMmPerHr: number;
  rainLast24HoursMm: number;
  rainNext24HoursMm: number;
  soilMoistureTopsoilPercent: number;
  soilMoistureSubsoilPercent: number;
  evapotranspirationMm: number;
}

export interface BeforeYouApplyQuery {
  fieldId: string;
  crop: string;
  activity: string;
  plannedTime: string;
}

export interface BeforeYouApplyResult {
  decision: 'CAUTION_HIGH' | 'CAUTION_MODERATE' | 'FAVORABLE';
  decisionTitle: string;
  summaryMessage: string;
  whyPoints: string[];
  safeAlternativeWindow: string;
  advisoryNote: string;
  riskScore: number;
  evaluatedConditions: {
    forecastRainNext6h: string;
    soilSaturationEstimate: string;
    fieldSlopeRisk: string;
    runoffPotential: string;
  };
}

export interface CropRecommendation {
  cropName: string;
  kannadaName?: string;
  hindiName?: string;
  suitability: 'HIGH' | 'MEDIUM' | 'LOW';
  season: string;
  waterRequirement: 'High' | 'Medium' | 'Low';
  durationDays: string;
  soilFitReason: string;
  companionOption?: {
    companionCrop: string;
    compatibility: string;
    ecologicalBenefit: string;
  };
}

export interface SmartAlert {
  id: string;
  title: string;
  message: string;
  type: 'RUNOFF_WARNING' | 'SOIL_REPORT' | 'FIELD_VISIT' | 'WEATHER_ALERT' | 'ADVISORY';
  priority: 'CRITICAL' | 'HIGH' | 'NORMAL' | 'INFO';
  timestamp: string;
  read: boolean;
  actionRoute?: string;
  actionLabel?: string;
}

export interface HistoricalSeason {
  seasonCode: string; // '2026 Kharif'
  crop: string;
  yieldQuintalPerAcre: number;
  soilTestCompleted: boolean;
  highRiskEventsCount: number;
  preventedRunoffApplications: number;
  rainfallTotalMm: number;
  notes: string;
}

export interface WatershedSummary {
  id: string;
  code: string;
  name: string;
  subBasin: string;
  totalMonitoredFields: number;
  lowRiskCount: number;
  moderateRiskCount: number;
  highRiskCount: number;
  veryHighRiskCount: number;
  averageSlopePercent: number;
  receivingWaterBody: string;
  vulnerabilityIndex: number; // 0 - 100
  recentRainfallMm: number;
}
