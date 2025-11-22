export type Language = 'pl' | 'en'

export const translations = {
  pl: {
    // Headers
    date: 'Data',
    departure: 'Odlot',
    arrival: 'Przylot',
    aircraft: 'Statek Powietrzny',
    singlePilotTime: 'Czas Lotu',
    totalTime: 'Czas Lotu Ogółem',
    picName: 'Nazwisko PIC',
    landings: 'Lądowania',
    operationalCondition: 'Warunki Operacyjne',
    pilotFunctionTime: 'Czas Funkcji Pilota',
    remarks: 'Uwagi',
    
    // Subheaders
    place: 'Miejsce',
    time: 'Czas',
    type: 'Typ',
    reg: 'Znaki',
    singlePilot: 'Załoga Jednoosobowa',
    multiPilot: 'Załoga Wieloosobowa',
    se: 'SE',
    me: 'ME',
    mp: 'MP',
    day: 'Dzień',
    night: 'Noc',
    ifr: 'IFR',
    pic: 'PIC',
    cop: 'COP',
    dual: 'DUAL',
    instr: 'INSTR',
    
    // Add Entry Modal
    departurePlace: 'Miejsce startu',
    departureTime: 'Godzina startu (UTC)',
    arrivalPlace: 'Miejsce lądowania',
    arrivalTime: 'Godzina lądowania (UTC)',
    aircraftModel: 'Typ, model, wariant',
    self: 'SELF',
    
    // Totals
    totalThisPage: 'SUMA TEJ STRONY',
    totalPreviousPages: 'SUMA POPRZEDNICH STRON',
    totalLifetime: 'SUMA OGÓŁEM',
    
    // UI
    previous: 'Poprzednia',
    next: 'Następna',
    page: 'Strona',
    of: 'z',
    addFlight: 'Dodaj Lot',
    editFlight: 'Edytuj Lot',
    importCsv: 'Importuj CSV',
    settings: 'Ustawienia',
    year: 'Rok',
    filter: 'Filtruj',
    saveEntry: 'Zapisz Wpis',
    cancel: 'Anuluj',
    actions: 'Akcje',
    go: 'Idź',
    exportCsv: 'Eksportuj CSV',
    fill: 'Wypełnij',
    details: 'Szczegóły',
    times: 'Czasy',
    saveSettings: 'Zapisz Ustawienia',
    rowsPerPage: 'Wierszy na stronę',
    rowsHint: 'Standardowy logbook EASA ma zazwyczaj 14 wierszy.',
    
    // Modal
    picNameLabel: 'Nazwisko PIC',
    model: 'Model',
    registration: 'Rejestracja',
    
    // Theme
    darkMode: 'Ciemny Motyw',
    lightMode: 'Jasny Motyw',
    language: 'Język',
    appearance: 'Wygląd',
    toggle: 'Przełącz',
    change: 'Zmień',
    
    // Help
    help: 'Pomoc',
    helpTitle: 'Pomoc i Instrukcje',
    closeHelp: 'Zamknij',
    
    helpOverview: 'Przegląd',
    helpOverviewContent: 'SimpleLogbook to aplikacja do prowadzenia dziennika lotów zgodnie z wymaganiami PART FCL.050. Pozwala na łatwe rejestrowanie lotów, automatyczne obliczenia czasu oraz import danych z plików CSV.',
    
    helpPartFCL: 'PART FCL.050 - Wymagania',
    helpPartFCLContent: 'Zgodnie z PART FCL.050, pilot musi prowadzić dokumentację w formie dziennika lotów (logbook), zawierającą szczegółowe informacje o każdym wykonanym locie. Poniższe pola są wymagane przez przepisy EASA.',
    
    helpFields: 'Objaśnienia Pól',
    helpFieldsDate: 'Data - Data wykonania lotu',
    helpFieldsDeparture: 'Lotnisko Odlotu - Kod ICAO lotniska startu (np. EPWA)',
    helpFieldsArrival: 'Lotnisko Przylotu - Kod ICAO lotniska lądowania (np. EPKK)',
    helpFieldsAircraft: 'Typ, model, wariant - Oznaczenie statku powietrznego (np. C152, C172)',
    helpFieldsRegistration: 'Rejestracja - Znaki rozpoznawcze statku powietrznego (np. SP-ABC)',
    helpFieldsTotalTime: 'Czas Lotu Ogółem - Całkowity czas blok-blok',
    helpFieldsPICName: 'Nazwisko PIC - Nazwisko dowódcy statku powietrznego',
    helpFieldsLandings: 'Lądowania - Liczba lądowań w dzień i w nocy',
    
    helpPilotFunctions: 'Funkcje Pilota',
    helpPIC: 'PIC (Pilot-in-Command) - Czas jako dowódca statku powietrznego. Pilot odpowiedzialny za bezpieczne wykonanie lotu.',
    helpSPIC: 'SPIC (Student Pilot-in-Command) - Pilot w trakcie szkolenia wykonujący obowiązki dowódcy pod nadzorem instruktora.',
    helpPICUS: 'PICUS (Pilot-in-Command Under Supervision) - Pilot wykonujący obowiązki dowódcy pod nadzorem doświadczonego pilota.',
    helpCOP: 'COP (Co-Pilot) - Czas jako drugi pilot (kopia).',
    helpDUAL: 'DUAL (Dual Instruction) - Czas szkolenia z instruktorem.',
    helpINSTR: 'INSTR (Instructor) - Czas jako instruktor lotniczy.',
    
    helpOperationalConditions: 'Warunki Operacyjne',
    helpIFR: 'IFR (Instrument Flight Rules) - Czas lotu według przepisów lotów przyrządowych.',
    helpNight: 'Night - Czas lotu w nocy (zgodnie z definicją w przepisach).',
    
    helpAircraftTime: 'Czas Lotu wg Typu Statku',
    helpSE: 'SE (Single Engine) - Silnik jednotłokowy, załoga jednoosobowa.',
    helpME: 'ME (Multi Engine) - Silnik wielotłokowy, załoga jednoosobowa.',
    helpMP: 'MP (Multi Pilot) - Loty wymagające załogi wieloosobowej.',
    
    helpCSVImport: 'Import CSV',
    helpCSVImportContent: 'Możesz zaimportować loty z pliku CSV. Plik musi zawierać następujące kolumny (w tej kolejności):',
    helpCSVColumns: '1. date (YYYY-MM-DD)\n2. departurePlace (kod ICAO)\n3. departureTime (HH:MM)\n4. arrivalPlace (kod ICAO)\n5. arrivalTime (HH:MM)\n6. aircraftModel\n7. aircraftReg\n8. singlePilotSE (HH:MM)\n9. singlePilotME (HH:MM)\n10. multiPilot (HH:MM)\n11. totalTime (HH:MM)\n12. picName\n13. landingsDay (liczba)\n14. landingsNight (liczba)\n15. nightTime (HH:MM)\n16. ifrTime (HH:MM)\n17. picTime (HH:MM)\n18. copilotTime (HH:MM)\n19. dualTime (HH:MM)\n20. instructorTime (HH:MM)\n21. remarks (opcjonalne)',
    helpCSVExample: 'Przykład:\n2024-01-15,EPWA,10:00,EPKK,12:30,C172,SP-ABC,02:30,00:00,00:00,02:30,KOWALSKI,1,0,00:00,00:00,00:00,00:00,02:30,00:00,',
    
    helpTips: 'Wskazówki',
    helpTipsContent: '• Używaj autocomplete - wpisuj częściowe dane, a system podpowie istniejące wpisy\n• Rejestracja wypełnia Model automatycznie\n• Czas lotu oblicza się automatycznie na podstawie czasu startu i lądowania\n• Używaj kodów ICAO dla lotnisk (4 znaki)\n• Czasy podawaj w formacie HH:MM lub H:MM',
    
    // Validation Errors
    valRequired: 'Wymagane pola: Data, Odlot, Przylot, Rejestracja, Model, Nazwisko PIC',
    valLandings: 'Suma lądowań musi być większa lub równa 1',
    valDateLimit: 'Data musi być pomiędzy 17.12.1903 a dzisiaj',
    valTimeSum: 'Suma czasów SE, ME, MP musi równać się Czasowi Całkowitemu',
    valSingleCat: 'Tylko jedna kategoria (SE, ME, MP) może być wypełniona',
    valPilotFunc: 'Suma czasów PIC, COP, DUAL, INSTR musi równać się Czasowi Całkowitemu',
    valNight: 'Czas w nocy nie może być większy niż Czas Całkowity',
    valIfr: 'Czas IFR nie może być większy niż Czas Całkowity'
  },
  en: {
    // Headers
    date: 'Date',
    departure: 'Departure',
    arrival: 'Arrival',
    aircraft: 'Aircraft',
    singlePilotTime: 'Flight Time',
    totalTime: 'Total Flight Time',
    picName: 'PIC Surname',
    landings: 'Landings',
    operationalCondition: 'Operational Condition',
    pilotFunctionTime: 'Pilot Function Time',
    remarks: 'Remarks',
    
    // Subheaders
    place: 'Place',
    time: 'Time',
    type: 'Type',
    reg: 'Reg',
    singlePilot: 'Single Pilot',
    multiPilot: 'Multi Pilot',
    se: 'SE',
    me: 'ME',
    mp: 'MP',
    day: 'Day',
    night: 'Night',
    ifr: 'IFR',
    pic: 'PIC',
    cop: 'COP',
    dual: 'DUAL',
    instr: 'INSTR',

    // Add Entry Modal
    departurePlace: 'Departure Place',
    departureTime: 'Departure Time (UTC)',
    arrivalPlace: 'Arrival Place',
    arrivalTime: 'Arrival Time (UTC)',
    aircraftModel: 'Type, model, variant',
    self: 'SELF',
    
    // Totals
    totalThisPage: 'TOTAL THIS PAGE',
    totalPreviousPages: 'TOTAL FROM PREVIOUS PAGES',
    totalLifetime: 'TOTAL TIME',
    
    // UI
    previous: 'Previous',
    next: 'Next',
    page: 'Page',
    of: 'of',
    addFlight: 'Add Flight',
    editFlight: 'Edit Flight',
    importCsv: 'Import CSV',
    settings: 'Settings',
    year: 'Year',
    filter: 'Filter',
    saveEntry: 'Save Entry',
    cancel: 'Cancel',
    actions: 'Actions',
    go: 'Go',
    exportCsv: 'Export CSV',
    fill: 'Fill',
    details: 'Details',
    times: 'Times',
    saveSettings: 'Save Settings',
    rowsPerPage: 'Rows per Page',
    rowsHint: 'Standard EASA logbooks usually have 14 rows.',
    
    // Modal
    picNameLabel: 'PIC Surname',
    model: 'Model',
    registration: 'Registration',
    
    // Theme
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    appearance: 'Appearance',
    toggle: 'Toggle',
    change: 'Change',
    
    // Help
    help: 'Help',
    helpTitle: 'Help & Instructions',
    closeHelp: 'Close',
    
    helpOverview: 'Overview',
    helpOverviewContent: 'SimpleLogbook is an application for maintaining flight logs in accordance with PART FCL.050 requirements. It allows easy flight recording, automatic time calculations, and CSV data import.',
    
    helpPartFCL: 'PART FCL.050 - Requirements',
    helpPartFCLContent: 'According to PART FCL.050, pilots must maintain documentation in the form of a logbook, containing detailed information about each flight performed. The following fields are required by EASA regulations.',
    
    helpFields: 'Field Explanations',
    helpFieldsDate: 'Date - Date of flight',
    helpFieldsDeparture: 'Departure Airport - ICAO code of departure aerodrome (e.g., EPWA)',
    helpFieldsArrival: 'Arrival Airport - ICAO code of arrival aerodrome (e.g., EPKK)',
    helpFieldsAircraft: 'Type, model, variant - Aircraft designation (e.g., C152, C172)',
    helpFieldsRegistration: 'Registration - Aircraft registration marks (e.g., SP-ABC)',
    helpFieldsTotalTime: 'Total Flight Time - Total block-to-block time',
    helpFieldsPICName: 'PIC Name - Surname of pilot-in-command',
    helpFieldsLandings: 'Landings - Number of day and night landings',
    
    helpPilotFunctions: 'Pilot Functions',
    helpPIC: 'PIC (Pilot-in-Command) - Time as pilot-in-command. Pilot responsible for safe flight execution.',
    helpSPIC: 'SPIC (Student Pilot-in-Command) - Student pilot performing PIC duties under instructor supervision.',
    helpPICUS: 'PICUS (Pilot-in-Command Under Supervision) - Pilot performing PIC duties under supervision of experienced pilot.',
    helpCOP: 'COP (Co-Pilot) - Time as co-pilot.',
    helpDUAL: 'DUAL (Dual Instruction) - Training time with instructor.',
    helpINSTR: 'INSTR (Instructor) - Time as flight instructor.',
    
    helpOperationalConditions: 'Operational Conditions',
    helpIFR: 'IFR (Instrument Flight Rules) - Flight time under instrument flight rules.',
    helpNight: 'Night - Night flight time (according to regulatory definition).',
    
    helpAircraftTime: 'Aircraft Time Types',
    helpSE: 'SE (Single Engine) - Single-engine, single-pilot.',
    helpME: 'ME (Multi Engine) - Multi-engine, single-pilot.',
    helpMP: 'MP (Multi Pilot) - Flights requiring multi-pilot crew.',
    
    helpCSVImport: 'CSV Import',
    helpCSVImportContent: 'You can import flights from a CSV file. The file must contain the following columns (in this order):',
    helpCSVColumns: '1. date (YYYY-MM-DD)\n2. departurePlace (ICAO code)\n3. departureTime (HH:MM)\n4. arrivalPlace (ICAO code)\n5. arrivalTime (HH:MM)\n6. aircraftModel\n7. aircraftReg\n8. singlePilotSE (HH:MM)\n9. singlePilotME (HH:MM)\n10. multiPilot (HH:MM)\n11. totalTime (HH:MM)\n12. picName\n13. landingsDay (number)\n14. landingsNight (number)\n15. nightTime (HH:MM)\n16. ifrTime (HH:MM)\n17. picTime (HH:MM)\n18. copilotTime (HH:MM)\n19. dualTime (HH:MM)\n20. instructorTime (HH:MM)\n21. remarks (optional)',
    helpCSVExample: 'Example:\n2024-01-15,EPWA,10:00,EPKK,12:30,C172,SP-ABC,02:30,00:00,00:00,02:30,SMITH,1,0,00:00,00:00,00:00,00:00,02:30,00:00,',
    
    helpTips: 'Tips',
    helpTipsContent: '• Use autocomplete - type partial data and the system will suggest existing entries\n• Registration auto-fills Model automatically\n• Flight time is calculated automatically based on departure and arrival times\n• Use ICAO codes for airports (4 characters)\n• Enter times in HH:MM or H:MM format',

    // Validation Errors
    valRequired: 'Required fields: Date, Departure, Arrival, Registration, Model, PIC Name',
    valLandings: 'Sum of landings must be at least 1',
    valDateLimit: 'Date must be between 17.12.1903 and today',
    valTimeSum: 'Sum of SE, ME, MP times must equal Total Time',
    valSingleCat: 'Only one category (SE, ME, MP) can be filled',
    valPilotFunc: 'Sum of PIC, COP, DUAL, INSTR times must equal Total Time',
    valNight: 'Night time cannot be greater than Total Time',
    valIfr: 'IFR time cannot be greater than Total Time'
  }
}
