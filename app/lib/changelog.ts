export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export const changelog: ChangelogEntry[] = [
  {
    version: '1.0.5',
    date: '2025-11-25',
    changes: [
      'v105_email',
      'v105_help',
      'v105_footer',
      'v105_about',
      'v105_fixes'
    ]
  },
  {
    version: '1.0.4',
    date: '2025-11-25',
    changes: [
      'changelogAdded',
      'changelogMegaphoneIcon',
      'changelogVersionHistory'
    ]
  },
  {
    version: '1.0.3',
    date: '2025-11-21',
    changes: [
      'helpModalAdded',
      'helpPartFCLCompliance',
      'helpFieldExplanations',
      'helpPilotFunctions',
      'helpCSVImportGuide'
    ]
  },
  {
    version: '1.0.2',
    date: '2025-11-20',
    changes: [
      'uiLightModeTextFixed',
      'uiModalPositioning',
      'uiModalSizing',
      'uiConsistencyImprovements'
    ]
  },
  {
    version: '1.0.1',
    date: '2025-11-20',
    changes: [
      'darkModeFixed',
      'designOverhaul',
      'glassmorphismAdded',
      'responsiveDesign',
      'mobileCardView',
      'foucHandlingImproved'
    ]
  },
  {
    version: '1.0.0',
    date: '2025-11-20',
    changes: [
      'initialRelease',
      'partFCLCompliance',
      'manualFlightEntry',
      'csvImportExport',
      'automaticCalculations',
      'paginationSupport',
      'yearFiltering',
      'autoSaveDatabase'
    ]
  }
]
