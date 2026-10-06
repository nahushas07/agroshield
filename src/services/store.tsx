import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  LanguageCode,
  FieldRecord,
  SoilTestRequest,
  SoilReportRecord,
  WeatherCondition,
  SmartAlert,
  HistoricalSeason,
  RunoffRiskAssessment,
  SoilTestStatus
} from '../types';
import {
  DEMO_FIELDS,
  DEMO_WEATHER,
  DEMO_SOIL_TESTS,
  DEMO_SOIL_REPORTS,
  DEMO_SMART_ALERTS,
  DEMO_HISTORICAL_SEASONS
} from '../data/demoData';
import { generateFieldRiskAssessment } from './riskEngine';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  selectedFieldId: string;
  setSelectedFieldId: (id: string) => void;
  selectedField: FieldRecord;
  currentRiskAssessment: RunoffRiskAssessment;
  fields: FieldRecord[];
  weather: WeatherCondition;
  soilTests: SoilTestRequest[];
  soilReports: Record<string, SoilReportRecord>;
  alerts: SmartAlert[];
  historicalSeasons: HistoricalSeason[];
  isEasyMode: boolean;
  toggleEasyMode: () => void;
  isDemoMode: boolean;
  
  // Modals & UI States
  explainModal: {
    isOpen: boolean;
    title: string;
    points: string[];
    technicalContext?: string;
  };
  openExplainModal: (title: string, points: string[], technicalContext?: string) => void;
  closeExplainModal: () => void;

  guidedTourOpen: boolean;
  setGuidedTourOpen: (open: boolean) => void;

  legalModalOpen: boolean;
  setLegalModalOpen: (open: boolean) => void;

  // Actions
  requestSoilTest: (
    fieldId: string,
    testPackage: 'Standard Soil Test' | 'Comprehensive Micronutrient' | 'Salinity & Texture',
    paymentMethod: 'Online' | 'Cash on Collection'
  ) => SoilTestRequest;
  updateSoilTestStatus: (
    requestId: string,
    status: SoilTestStatus,
    patch?: Partial<SoilTestRequest>
  ) => void;
  publishLabReport: (report: SoilReportRecord) => void;
  markAlertAsRead: (alertId: string) => void;
  clearUnreadAlerts: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('FARMER');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [selectedFieldId, setSelectedFieldId] = useState<string>('field-001');
  const [fields] = useState<FieldRecord[]>(DEMO_FIELDS);
  const [weather] = useState<WeatherCondition>(DEMO_WEATHER);
  const [soilTests, setSoilTests] = useState<SoilTestRequest[]>(() => {
    const saved = localStorage.getItem('agroshield_soil_tests');
    return saved ? JSON.parse(saved) : DEMO_SOIL_TESTS;
  });
  const [soilReports, setSoilReports] = useState<Record<string, SoilReportRecord>>(() => {
    const saved = localStorage.getItem('agroshield_soil_reports');
    return saved ? JSON.parse(saved) : DEMO_SOIL_REPORTS;
  });
  const [alerts, setAlerts] = useState<SmartAlert[]>(() => {
    const saved = localStorage.getItem('agroshield_alerts');
    return saved ? JSON.parse(saved) : DEMO_SMART_ALERTS;
  });
  const [historicalSeasons] = useState<HistoricalSeason[]>(DEMO_HISTORICAL_SEASONS);
  const [isEasyMode, setIsEasyMode] = useState<boolean>(false);
  const isDemoMode = true;

  const [explainModal, setExplainModal] = useState<{
    isOpen: boolean;
    title: string;
    points: string[];
    technicalContext?: string;
  }>({
    isOpen: false,
    title: '',
    points: [],
  });

  const [guidedTourOpen, setGuidedTourOpen] = useState<boolean>(false);
  const [legalModalOpen, setLegalModalOpen] = useState<boolean>(false);

  // Sync to local storage for test demo persistence
  useEffect(() => {
    localStorage.setItem('agroshield_soil_tests', JSON.stringify(soilTests));
  }, [soilTests]);

  useEffect(() => {
    localStorage.setItem('agroshield_soil_reports', JSON.stringify(soilReports));
  }, [soilReports]);

  useEffect(() => {
    localStorage.setItem('agroshield_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const selectedField = fields.find(f => f.id === selectedFieldId) || fields[0];
  const currentRiskAssessment = generateFieldRiskAssessment(selectedField);

  const openExplainModal = (title: string, points: string[], technicalContext?: string) => {
    setExplainModal({
      isOpen: true,
      title,
      points,
      technicalContext,
    });
  };

  const closeExplainModal = () => {
    setExplainModal(prev => ({ ...prev, isOpen: false }));
  };

  const toggleEasyMode = () => {
    setIsEasyMode(prev => !prev);
  };

  const requestSoilTest = (
    fieldId: string,
    testPackage: 'Standard Soil Test' | 'Comprehensive Micronutrient' | 'Salinity & Texture',
    paymentMethod: 'Online' | 'Cash on Collection'
  ): SoilTestRequest => {
    const field = fields.find(f => f.id === fieldId) || selectedField;
    const sampleCode = `ST-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRequest: SoilTestRequest = {
      id: `test-req-${Date.now()}`,
      sampleCode,
      fieldId: field.id,
      fieldName: `${field.fieldCode} (${field.location.village})`,
      farmerId: 'farmer-001',
      farmerName: field.farmerName,
      farmerPhone: field.farmerPhone,
      village: field.location.village,
      taluk: field.location.taluk,
      testPackage,
      costRupees: testPackage === 'Comprehensive Micronutrient' ? 499 : 299,
      paymentMethod,
      paymentStatus: paymentMethod === 'Online' ? 'PAID' : 'PENDING',
      status: 'REQUESTED',
      requestedAt: new Date().toISOString(),
      notes: `Requested via AgroShield Farmer Portal for ${field.currentCrop}.`,
    };

    setSoilTests(prev => [newRequest, ...prev]);

    // Generate a matching alert
    const newAlert: SmartAlert = {
      id: `alert-req-${Date.now()}`,
      title: 'SOIL TEST REQUEST REGISTERED',
      message: `Soil sample test request ${sampleCode} registered for ₹${newRequest.costRupees}. Field visitor will be scheduled soon.`,
      type: 'SOIL_REPORT',
      priority: 'NORMAL',
      timestamp: 'Just now',
      read: false,
      actionRoute: 'soil-tests',
      actionLabel: 'View Status Tracker',
    };
    setAlerts(prev => [newAlert, ...prev]);

    return newRequest;
  };

  const updateSoilTestStatus = (
    requestId: string,
    status: SoilTestStatus,
    patch?: Partial<SoilTestRequest>
  ) => {
    setSoilTests(prev =>
      prev.map(item => {
        if (item.id === requestId) {
          const updated = { ...item, status, ...patch };
          return updated;
        }
        return item;
      })
    );

    // If verified or sample collected, push notification
    if (status === 'SAMPLE_COLLECTED') {
      setAlerts(prev => [
        {
          id: `alert-col-${Date.now()}`,
          title: 'SAMPLE COLLECTED BY FIELD VISITOR',
          message: `Composite soil sample for ${requestId} collected and tagged with GPS coordinates. In transit to lab.`,
          type: 'FIELD_VISIT',
          priority: 'NORMAL',
          timestamp: 'Just now',
          read: false,
          actionRoute: 'soil-tests',
          actionLabel: 'Track Sample',
        },
        ...prev,
      ]);
    }
  };

  const publishLabReport = (report: SoilReportRecord) => {
    setSoilReports(prev => ({ ...prev, [report.id]: report }));
    // Update matching test request to REPORT_READY
    updateSoilTestStatus(report.testRequestId, 'REPORT_READY', {
      reportId: report.id,
      verifiedAt: new Date().toISOString(),
    });

    setAlerts(prev => [
      {
        id: `alert-rep-${Date.now()}`,
        title: 'VERIFIED SOIL REPORT PUBLISHED',
        message: `Soil Health Certificate ${report.sampleCode} verified by ${report.verifiedByScientist}. Report is ready for review.`,
        type: 'SOIL_REPORT',
        priority: 'HIGH',
        timestamp: 'Just now',
        read: false,
        actionRoute: 'soil-report',
        actionLabel: 'Open Report',
      },
      ...prev,
    ]);
  };

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(a => (a.id === alertId ? { ...a, read: true } : a)));
  };

  const clearUnreadAlerts = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        selectedFieldId,
        setSelectedFieldId,
        selectedField,
        currentRiskAssessment,
        fields,
        weather,
        soilTests,
        soilReports,
        alerts,
        historicalSeasons,
        isEasyMode,
        toggleEasyMode,
        isDemoMode,
        explainModal,
        openExplainModal,
        closeExplainModal,
        guidedTourOpen,
        setGuidedTourOpen,
        legalModalOpen,
        setLegalModalOpen,
        requestSoilTest,
        updateSoilTestStatus,
        publishLabReport,
        markAlertAsRead,
        clearUnreadAlerts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
