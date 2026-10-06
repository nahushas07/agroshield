import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  appTagline: string;
  demoDataBadge: string;
  greetingFarmer: string;
  selectedFieldLabel: string;
  locationLabel: string;
  areaLabel: string;
  currentRunoffRisk: string;
  riskStatusHeadline: string;
  dynamicRiskClockTitle: string;
  dynamicRiskClockSubtitle: string;
  beforeYouApplyTitle: string;
  beforeYouApplySubtitle: string;
  watershedImpactViewTitle: string;
  fieldDigitalTwinTitle: string;
  explainWhyBtn: string;
  easyModeToggle: string;
  standardMode: string;
  voiceAskAgroShield: string;
  soilTestingWorkflowTitle: string;
  cropAdvisorTitle: string;
  nutrientIntelligenceTitle: string;
  weatherCenterTitle: string;
  seasonMemoryTitle: string;
  disclaimerText: string;
  lowRisk: string;
  moderateRisk: string;
  highRisk: string;
  veryHighRisk: string;
  checkActivityBtn: string;
  requestSoilTestBtn: string;
  switchRole: string;
  farmerRole: string;
  visitorRole: string;
  labRole: string;
  officerRole: string;
  adminRole: string;
  navHome: string;
  navField: string;
  navWeather: string;
  navAdvisory: string;
  navSoil: string;
  navAlerts: string;
  navWatershed: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appName: 'AGROSHIELD',
    appTagline: 'Watershed-Aware Agricultural Decision Intelligence',
    demoDataBadge: 'DEMO DATA',
    greetingFarmer: 'Good morning, Farmer',
    selectedFieldLabel: 'Selected Field',
    locationLabel: 'Location',
    areaLabel: 'Area',
    currentRunoffRisk: 'CURRENT RUNOFF RISK',
    riskStatusHeadline: 'Conditions may increase runoff potential.',
    dynamicRiskClockTitle: 'DYNAMIC RUNOFF RISK CLOCK',
    dynamicRiskClockSubtitle: 'Continuous timeline of surface water movement potential based on upcoming weather and field terrain.',
    beforeYouApplyTitle: 'BEFORE-YOU-APPLY CHECK',
    beforeYouApplySubtitle: 'Assess planned fertilizer, spray or irrigation actions against upcoming weather and soil saturation.',
    watershedImpactViewTitle: 'WATERSHED IMPACT VIEW',
    fieldDigitalTwinTitle: 'MY FIELD DIGITAL TWIN',
    explainWhyBtn: 'Explain Why',
    easyModeToggle: 'FARMER EASY MODE',
    standardMode: 'Full Intelligence View',
    voiceAskAgroShield: 'Ask AgroShield',
    soilTestingWorkflowTitle: 'SOIL HEALTH & TESTING WORKFLOW',
    cropAdvisorTitle: 'CROP & INTERCROPPING ADVISOR',
    nutrientIntelligenceTitle: 'SOIL & NUTRIENT INTELLIGENCE',
    weatherCenterTitle: 'WEATHER & PRECIPITATION CENTER',
    seasonMemoryTitle: 'FIELD SEASON MEMORY',
    disclaimerText: 'Decision support information only. Does not replace professional agricultural, environmental or regulatory advice. Follow product labels and local guidelines.',
    lowRisk: 'LOW',
    moderateRisk: 'MODERATE',
    highRisk: 'HIGH',
    veryHighRisk: 'VERY HIGH',
    checkActivityBtn: 'Run Risk Evaluation',
    requestSoilTestBtn: 'Request Soil Test',
    switchRole: 'Role View:',
    farmerRole: 'Farmer',
    visitorRole: 'Field Visitor',
    labRole: 'Soil Testing Lab',
    officerRole: 'Agri Officer',
    adminRole: 'Admin',
    navHome: 'Home',
    navField: 'My Field',
    navWeather: 'Weather',
    navAdvisory: 'Advisory',
    navSoil: 'Soil Lab',
    navAlerts: 'Alerts',
    navWatershed: 'Watershed',
  },
  kn: {
    appName: 'ಅಗ್ರೋಶೀಲ್ಡ್ (AGROSHIELD)',
    appTagline: 'ಜಲಾನಯನ-ಆಧಾರಿತ ಕೃಷಿ ನಿರ್ಧಾರ ಬುದ್ಧಿಮತ್ತೆ',
    demoDataBadge: 'ಡೆಮೊ ಮಾಹಿತಿ (DEMO)',
    greetingFarmer: 'ಶುಭೋದಯ, ರೈತ ಬಾಂಧವರೇ',
    selectedFieldLabel: 'ಆಯ್ಕೆಮಾಡಿದ ಹೊಲ',
    locationLabel: 'ಸ್ಥಳ',
    areaLabel: 'ವಿಸ್ತೀರ್ಣ',
    currentRunoffRisk: 'ಪ್ರಸ್ತುತ ಹರಿವಿನ ಅಪಾಯದ ಅಂದಾಜು',
    riskStatusHeadline: 'ಪ್ರಸ್ತುತ ವಾತಾವರಣವು ಕೃಷಿ ಹರಿವಿನ ಅಪಾಯವನ್ನು ಹೆಚ್ಚಿಸಬಹುದು.',
    dynamicRiskClockTitle: 'ಡೈನಾಮಿಕ್ ರನ್-ಆಫ್ ರಿಸ್ಕ್ ಗಡಿಯಾರ',
    dynamicRiskClockSubtitle: 'ಮುಂದಿನ ಮಳೆ ಹಾಗೂ ಭೂಮಿಯ ಇಳಿಜಾರಿನ ಆಧಾರದ ಮೇಲೆ ಮೇಲ್ಮೈ ನೀರಿನ ಹರಿವಿನ ನಿರಂತರ ಸಮಯ-ಸೂಚಿ.',
    beforeYouApplyTitle: 'ಗೊಬ್ಬರ/ಔಷಧಿ ಹಾಕುವ ಮುನ್ನ ಪರಿಶೀಲನೆ (Before-You-Apply)',
    beforeYouApplySubtitle: 'ಗೊಬ್ಬರ ಅಥವಾ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸುವ ಮೊದಲು ಮಳೆ ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಪರೀಕ್ಷಿಸಿ.',
    watershedImpactViewTitle: 'ಜಲಾನಯನ ಪರಿಣಾಮದ ನೋಟ',
    fieldDigitalTwinTitle: 'ನನ್ನ ಹೊಲದ ಡಿಜಿಟಲ್ ಮಾಹಿತಿ',
    explainWhyBtn: 'ಕಾರಣ ತಿಳಿಯಿರಿ (Why?)',
    easyModeToggle: 'ಸರಳ ರೈತ ವಿಧಾನ (EASY MODE)',
    standardMode: 'ಸಂಪೂರ್ಣ ಮಾಹಿತಿ ನೋಟ',
    voiceAskAgroShield: 'ಅಗ್ರೋಶೀಲ್ಡ್‌ಗೆ ಕೇಳಿ (ಧ್ವನಿ)',
    soilTestingWorkflowTitle: 'ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ಪ್ರಗತಿ',
    cropAdvisorTitle: 'ಬೆಳೆ ಮತ್ತು ಮಿಶ್ರ ಬೆಳೆ ಸಲಹೆಗಾರ',
    nutrientIntelligenceTitle: 'ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳ ಮಾಹಿತಿ',
    weatherCenterTitle: 'ಹವಾಮಾನ ಮತ್ತು ಮಳೆ ಕೇಂದ್ರ',
    seasonMemoryTitle: 'ಹಿಂದಿನ ಬೆಳೆಗಳ ಇತಿಹಾಸ (Season Memory)',
    disclaimerText: 'ಇದು ಕೇವಲ ಕೃಷಿ ನಿರ್ಧಾರ ಬೆಂಬಲ ಮಾಹಿತಿ ಮಾತ್ರ. ಔಷಧಿ ಲೇಬಲ್ ಮತ್ತು ಕೃಷಿ ಅಧಿಕಾರಿಗಳ ಮಾರ್ಗದರ್ಶನ ಅನುಸರಿಸಿ.',
    lowRisk: 'ಕಡಿಮೆ',
    moderateRisk: 'ಮಧ್ಯಮ',
    highRisk: 'ಹೆಚ್ಚು (HIGH)',
    veryHighRisk: 'ಅತ್ಯಂತ ಹೆಚ್ಚು (VERY HIGH)',
    checkActivityBtn: 'ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ',
    requestSoilTestBtn: 'ಮಣ್ಣು ಪರೀಕ್ಷೆಗೆ ವಿನಂತಿಸಿ',
    switchRole: 'ಪಾತ್ರ:',
    farmerRole: 'ರೈತ',
    visitorRole: 'ಕ್ಷೇತ್ರ ವೀಕ್ಷಕ',
    labRole: 'ಮಣ್ಣು ಪರೀಕ್ಷಾ ಪ್ರಯೋಗಾಲಯ',
    officerRole: 'ಕೃಷಿ ಅಧಿಕಾರಿ',
    adminRole: 'ನಿರ್ವಾಹಕ',
    navHome: 'ಮುಖಪುಟ',
    navField: 'ನನ್ನ ಹೊಲ',
    navWeather: 'ಹವಾಮಾನ',
    navAdvisory: 'ಸಲಹೆಗಳು',
    navSoil: 'ಮಣ್ಣು ಪರೀಕ್ಷೆ',
    navAlerts: 'ಎಚ್ಚರಿಕೆಗಳು',
    navWatershed: 'ಜಲಾನಯನ',
  },
  hi: {
    appName: 'एग्रोशील्ड (AGROSHIELD)',
    appTagline: 'जलग्रहण-जागरूक कृषि निर्णय बुद्धिमत्ता',
    demoDataBadge: 'डेमो डेटा (DEMO)',
    greetingFarmer: 'सुप्रभात, किसान भाई',
    selectedFieldLabel: 'चयनित खेत',
    locationLabel: 'स्थान',
    areaLabel: 'क्षेत्रफल',
    currentRunoffRisk: 'वर्तमान अपवाह जोखिम अनुमान',
    riskStatusHeadline: 'परिस्थितियां अपवाह क्षमता को बढ़ा सकती हैं।',
    dynamicRiskClockTitle: 'डायनामिक अपवाह जोखिम घड़ी',
    dynamicRiskClockSubtitle: 'आगामी मौसम और ढलान के आधार पर जल अपवाह की समय-सारणी।',
    beforeYouApplyTitle: 'उर्वरक/छिड़काव से पहले जांचें (Before-You-Apply)',
    beforeYouApplySubtitle: 'उर्वरक या कीटनाशक प्रयोग से पहले आगामी वर्षा और मिट्टी की नमी का आकलन करें।',
    watershedImpactViewTitle: 'जलग्रहण प्रभाव दृश्य',
    fieldDigitalTwinTitle: 'मेरे खेत का डिजिटल प्रोफाइल',
    explainWhyBtn: 'कारण समझें (Why?)',
    easyModeToggle: 'सरल किसान मोड (EASY MODE)',
    standardMode: 'विस्तृत दृश्य',
    voiceAskAgroShield: 'एग्रोशील्ड से पूछें (Voice)',
    soilTestingWorkflowTitle: 'मृदा परीक्षण प्रक्रिया',
    cropAdvisorTitle: 'फसल एवं सह-फसल सलाहकार',
    nutrientIntelligenceTitle: 'मृदा एवं पोषक तत्व बुद्धिमत्ता',
    weatherCenterTitle: 'मौसम एवं वर्षा केंद्र',
    seasonMemoryTitle: 'खेत का मौसमी इतिहास (Memory)',
    disclaimerText: 'यह केवल निर्णय-समर्थन जानकारी है। उत्पाद लेबल और स्थानीय कृषि मार्गदर्शन का पालन करें।',
    lowRisk: 'कम',
    moderateRisk: 'मध्यम',
    highRisk: 'उच्च (HIGH)',
    veryHighRisk: 'अत्यधिक (VERY HIGH)',
    checkActivityBtn: 'जोखिम का मूल्यांकन करें',
    requestSoilTestBtn: 'मृदा परीक्षण का अनुरोध करें',
    switchRole: 'भूमिका:',
    farmerRole: 'किसान',
    visitorRole: 'फील्ड विज़िटर',
    labRole: 'मृदा प्रयोगशाला',
    officerRole: 'कृषि अधिकारी',
    adminRole: 'प्रशासक',
    navHome: 'होम',
    navField: 'मेरा खेत',
    navWeather: 'मौसम',
    navAdvisory: 'सलाह',
    navSoil: 'मृदा परीक्षण',
    navAlerts: 'सूचनाएं',
    navWatershed: 'जलग्रहण',
  },
};
