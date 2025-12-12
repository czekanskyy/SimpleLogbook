export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export const changelog: ChangelogEntry[] = [
  {
    version: '1.0.8',
    date: '2025-12-12',
    changes: [
      'v108_gliderDistance',
      'v108_launchMethods',
      'v108_helpPage',
      'v108_uiImprovements',
      'v108_translations'
    ]
  },
  {
    version: '1.0.7',
    date: '2025-12-11',
    changes: [
      'v107_logbookSplit',
      'v107_globalDelete',
      'v107_hubPage',
      'v107_uiRefinements'
    ]
  },
  {
    version: '1.0.6',
    date: '2025-11-25',
    changes: [
      'v106_mobileMenu',
      'v106_flightCard',
      'v106_pagination',
      'v106_importButton',
      'v106_fixes'
    ]
  },
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
