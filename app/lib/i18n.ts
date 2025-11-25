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
    closeHelp: 'Zamknij',
    confirmDelete: 'Potwierdź usunięcie',
    
    printLogbook: 'Drukuj Logbook',

    // Help Page
    help: {
      title: 'Instrukcja i Pomoc',
      nav: {
        intro: 'Wstęp',
        guide: 'Obsługa Programu',
        fields: 'Opis Pól',
        terms: 'Terminologia',
        easa: 'Przepisy EASA',
        interface: 'Interfejs',
        about: 'O Programie'
      },
      intro: {
        title: 'Witaj w SimpleLogbook',
        desc: 'SimpleLogbook to nowoczesny, cyfrowy logbook pilota zaprojektowany z myślą o prostocie i zgodności z przepisami EASA PART FCL.050. Aplikacja umożliwia łatwe rejestrowanie lotów, śledzenie nalotu oraz generowanie raportów.',
        features: [
          'Zgodność z formatem EASA',
          'Automatyczne obliczanie czasów',
          'Obsługa trybu ciemnego',
          'Responsywny interfejs (Desktop/Mobile)',
          'Bezpieczne przechowywanie danych'
        ]
      },
      guide: {
        title: 'Obsługa Programu',
        addFlight: {
          title: 'Dodawanie Lotu',
          steps: [
            'Kliknij przycisk "Dodaj Lot" (+) w prawym dolnym rogu (mobile) lub na pasku narzędzi.',
            'Wypełnij formularz. Pola wymagane są oznaczone.',
            'Czas startu i lądowania podawaj w UTC.',
            'Aplikacja automatycznie obliczy czas całkowity.',
            'Możesz użyć przycisków "Wypełnij", aby skopiować czas całkowity do poszczególnych kategorii.'
          ]
        },
        editDelete: {
          title: 'Edycja i Usuwanie',
          desc: 'Aby edytować lot, kliknij na dowolny wiersz w tabeli. Aby usunąć, użyj ikony kosza po prawej stronie wiersza. W ustawieniach dostępna jest opcja usunięcia wszystkich lotów (Strefa Niebezpieczna).'
        },
        csv: {
          title: 'Import/Eksport CSV',
          desc: 'Aby zaimportować loty, przygotuj plik CSV (rozdzielany przecinkami) zakodowany w UTF-8. Pierwszy wiersz musi zawierać nagłówki kolumn. Poniżej znajduje się lista obsługiwanych pól wraz z akceptowanymi nagłówkami.',
          fields: [
            { name: 'Data (Wymagane)', headers: 'Date, date, Data', desc: 'Format YYYY-MM-DD (np. 2023-05-20)' },
            { name: 'Miejsce Odlotu (Wymagane)', headers: 'Departure Place, Dep, departurePlace, From', desc: 'Kod ICAO (4 znaki)' },
            { name: 'Czas Odlotu', headers: 'Departure Time, Dep Time, departureTime, Off Block', desc: 'UTC, format HH:MM' },
            { name: 'Miejsce Przylotu (Wymagane)', headers: 'Arrival Place, Arr, arrivalPlace, To', desc: 'Kod ICAO (4 znaki)' },
            { name: 'Czas Przylotu', headers: 'Arrival Time, Arr Time, arrivalTime, On Block', desc: 'UTC, format HH:MM' },
            { name: 'Model Samolotu (Wymagane)', headers: 'Aircraft Model, Model, aircraftModel, Type', desc: 'np. C152, PA28' },
            { name: 'Rejestracja (Wymagane)', headers: 'Aircraft Reg, Reg, aircraftReg, Registration', desc: 'np. SP-ABC' },
            { name: 'Czas Całkowity', headers: 'Total Time, Total, totalTime', desc: 'Format HH:MM lub minuty' },
            { name: 'Nazwisko PIC', headers: 'PIC Name, picName, Name of PIC', desc: 'Dla lotów samodzielnych wpisz SELF' },
            { name: 'Single Pilot SE', headers: 'Single Pilot SE, SE, singlePilotSE', desc: 'Czas na jednosilnikowych' },
            { name: 'Single Pilot ME', headers: 'Single Pilot ME, ME, singlePilotME', desc: 'Czas na wielosilnikowych' },
            { name: 'Multi Pilot', headers: 'Multi Pilot, MP, multiPilot', desc: 'Czas w załodze wieloosobowej' },
            { name: 'Noc', headers: 'Night Time, Night, nightTime', desc: 'Czas w nocy' },
            { name: 'IFR', headers: 'IFR Time, IFR, ifrTime', desc: 'Czas IFR' },
            { name: 'PIC Czas', headers: 'PIC Time, PIC, picTime', desc: 'Czas jako dowódca' },
            { name: 'COP Czas', headers: 'Copilot Time, COP, copilotTime', desc: 'Czas jako drugi pilot' },
            { name: 'Dual Czas', headers: 'Dual Time, Dual, dualTime', desc: 'Czas z instruktorem' },
            { name: 'Instruktor Czas', headers: 'Instructor Time, Instr, instructorTime', desc: 'Czas jako instruktor' },
            { name: 'Lądowania Dzień', headers: 'Landings Day, Ldg Day, landingsDay', desc: 'Liczba lądowań' },
            { name: 'Lądowania Noc', headers: 'Landings Night, Ldg Night, landingsNight', desc: 'Liczba lądowań' },
            { name: 'Uwagi', headers: 'Remarks, remarks, Notes', desc: 'Tekst dowolny' }
          ],
          example: 'Date,Dep,Arr,Model,Reg,Total,PIC Name\n2023-05-20,EPWA,EPKK,C152,SP-ABC,01:30,SELF'
        }
      },
      fields: {
        title: 'Opis Pól Logbooka',
        date: 'Data lotu (DD/MM/RRRR).',
        departure: 'Kod lotniska startu (ICAO/IATA) i czas odblokowania (UTC).',
        arrival: 'Kod lotniska lądowania (ICAO/IATA) i czas zablokowania (UTC).',
        aircraft: 'Typ, model i znaki rejestracyjne statku powietrznego.',
        se: 'Single Engine (Jednosilnikowy) - czas lotu na samolocie jednosilnikowym.',
        me: 'Multi Engine (Wielosilnikowy) - czas lotu na samolocie wielosilnikowym.',
        mp: 'Multi Pilot (Wieloosobowa) - czas lotu w załodze wieloosobowej.',
        total: 'Całkowity czas lotu (od odblokowania do zablokowania).',
        picName: 'Nazwisko dowódcy (PIC). Dla lotów samodzielnych wpisz SELF.',
        landings: 'Liczba lądowań w dzień i w nocy.',
        night: 'Czas lotu w nocy.',
        ifr: 'Czas lotu według wskazań przyrządów.',
        pic: 'Pilot-in-Command - czas jako dowódca.',
        cop: 'Co-Pilot - czas jako drugi pilot.',
        dual: 'Dual - czas szkolenia z instruktorem.',
        instr: 'Instructor - czas jako instruktor.'
      },
      terms: {
        title: 'Terminologia Lotnicza',
        items: [
          { term: 'PIC', def: 'Pilot-in-Command (Dowódca) - pilot wyznaczony do dowodzenia i ponoszący odpowiedzialność za bezpieczne wykonanie lotu.' },
          { term: 'SPIC', def: 'Student Pilot-in-Command - uczeń-pilot pełniący funkcje dowódcy pod nadzorem instruktora.' },
          { term: 'PICUS', def: 'Pilot-in-Command Under Supervision - drugi pilot pełniący obowiązki i funkcje dowódcy pod nadzorem.' },
          { term: 'Dual', def: 'Szkolenie w locie z instruktorem.' },
          { term: 'IFR', def: 'Instrument Flight Rules - przepisy wykonywania lotów według wskazań przyrządów.' },
          { term: 'VFR', def: 'Visual Flight Rules - przepisy wykonywania lotów z widocznością.' },
          { term: 'Night', def: 'Lot wykonywany w nocy (zgodnie z definicją w przepisach krajowych).' }
        ]
      },
      easa: {
        title: 'Przepisy EASA PART FCL.050',
        intro: 'Poniżej znajdują się kluczowe fragmenty przepisów regulujących prowadzenie książki lotów.',
        regulations: [
          {
            title: 'FCL.050 Rejestrowanie czasu lotu',
            text: 'Pilot prowadzi niezawodną ewidencję szczegółów wszystkich wykonanych lotów w formie i w sposób ustalony przez właściwy organ.',
            comment: 'Oznacza to obowiązek posiadania logbooka i wpisywania każdego lotu. SimpleLogbook spełnia wymogi formy elektronicznej.'
          },
          {
            title: 'AMC1 FCL.050 (a) Format',
            text: 'Rejestr powinien zawierać następujące informacje: dane osobowe, nazwisko, adres, datę każdego lotu, miejsce i czas odlotu/przylotu, typ i znaki rejestracyjne statku powietrznego, czas lotu (SE/ME/MP), całkowity czas lotu, liczbę lądowań, warunki operacyjne (Noc/IFR), czas funkcji pilota (PIC/COP/DUAL/INSTR).',
            comment: 'Wszystkie te pola są dostępne w formularzu dodawania lotu w SimpleLogbook.'
          },
          {
            title: 'Definicja czasu lotu (Block Time)',
            text: 'Całkowity czas od momentu, gdy statek powietrzny ruszy z miejsca w celu startu, do momentu zatrzymania po zakończeniu lotu.',
            comment: 'W SimpleLogbook wpisujesz czas odblokowania (Off-Block) i zablokowania (On-Block).'
          }
        ]
      },
      interface: {
        title: 'Opis Interfejsu',
        buttons: [
          { icon: 'Printer', name: 'Drukuj', desc: 'Otwiera widok drukowania zoptymalizowany pod format papierowy.' },
          { icon: 'Megaphone', name: 'Dziennik Zmian', desc: 'Pokazuje historię aktualizacji i nowości w aplikacji.' },
          { icon: 'HelpCircle', name: 'Pomoc', desc: 'Otwiera tę stronę pomocy.' },
          { icon: 'Settings', name: 'Ustawienia', desc: 'Konfiguracja aplikacji, import/eksport danych, strefa niebezpieczna.' },
          { icon: 'Plus', name: 'Dodaj Lot', desc: 'Otwiera formularz dodawania nowego wpisu.' },
          { icon: 'Download', name: 'Eksport CSV', desc: 'Pobiera wszystkie loty w formacie CSV.' },
          { icon: 'Upload', name: 'Import CSV', desc: 'Wgrywa loty z pliku CSV.' }
        ]
      },
      about: {
        title: 'O Programie',
        author: 'Autor: Dominik Czekański',
        email: 'Kontakt: contact@czekanski.dev',
        github: 'GitHub: https://github.com/czekanskyy/SimpleLogbook',
        disclaimer: 'Wyłączenie odpowiedzialności: Ten program jest narzędziem pomocniczym. Oficjalna dokumentacja lotnicza powinna być prowadzona zgodnie z wymogami prawnymi właściwego nadzoru lotniczego. Autor nie ponosi odpowiedzialności za błędy w danych lub utratę danych.',
        version: 'Wersja 1.0.4'
      }
    },
    footer: {
      copyright: 'SimpleLogbook',
      madeBy: 'Stworzone przez',
      github: 'Zobacz na GitHub'
    },
    
    // Changelog
    changelog: 'Dziennik Zmian',
    changelogTitle: 'Dziennik Zmian',
    changelogVersion: 'Wersja',
    changelogReleased: 'Wydano',
    
    // Version 1.0.5
    v105_email: 'Dodano powiadomienia email o rejestracji nowych użytkowników',
    v105_help: 'Rozbudowano sekcję pomocy o szczegółowy przewodnik importu CSV',
    v105_footer: 'Zaktualizowano stopkę (dynamiczny rok, poprawione dane autora)',
    v105_about: 'Dodano logo (favicon) i link kontaktowy w sekcji O Programie',
    v105_fixes: 'Poprawki błędów i usprawnienia stabilności',

    // Version 1.0.4
    changelogAdded: 'Dodano dziennik zmian',
    changelogMegaphoneIcon: 'Dodano przycisk z ikoną megafonu do szybkiego dostępu',
    changelogVersionHistory: 'Historia wersji w formacie akordeonu',
    
    // Version 1.0.3
    helpModalAdded: 'Dodano modal pomocy i instrukcji',
    helpPartFCLCompliance: 'Szczegółowe wyjaśnienia zgodności z PART FCL.050',
    helpFieldExplanations: 'Objaśnienia wszystkich pól logbooka',
    helpPilotFunctionsTitle: 'Wyjaśnienia funkcji pilota (PIC, SPIC, PICUS, COP, DUAL, INSTR)',
    helpCSVImportGuide: 'Szczegółowa instrukcja importu CSV',
    
    // Version 1.0.2
    uiLightModeTextFixed: 'Poprawiono widoczność tekstu w trybie jasnym',
    uiModalPositioning: 'Poprawiono pozycjonowanie modalów',
    uiModalSizing: 'Zoptymalizowano rozmiary elementów w modalach',
    uiConsistencyImprovements: 'Usprawnienia spójności interfejsu użytkownika',
    
    // Version 1.0.1
    darkModeFixed: 'Naprawiono przełącznik trybu ciemnego',
    designOverhaul: 'Przeprojektowanie interfejsu - modernistyczna estetyka',
    glassmorphismAdded: 'Dodano efekty glassmorphism i gradienty',
    responsiveDesign: 'Pełna responsywność interfejsu',
    mobileCardView: 'Widok kart dla urządzeń mobilnych',
    foucHandlingImproved: 'Ulepszona obsługa FOUC (Flash of Unstyled Content)',
    
    // Version 1.0.0
    initialRelease: 'Pierwsze wydanie SimpleLogbook',
    partFCLCompliance: 'Zgodność z PART FCL.050',
    manualFlightEntry: 'Ręczne wprowadzanie lotów',
    csvImportExport: 'Import i eksport CSV',
    automaticCalculations: 'Automatyczne obliczenia czasów i sum',
    paginationSupport: 'Wsparcie paginacji (14 wierszy na stronę)',
    yearFiltering: 'Filtrowanie po roku',
    autoSaveDatabase: 'Automatyczny zapis do bazy danych',
    
    // Delete All Entries
    dangerZone: 'Strefa Niebezpieczna',
    deleteAllEntries: 'Usuń Wszystkie Wpisy',
    deleteAllEntriesWarning: 'To działanie jest nieodwracalne!',
    deleteAllConfirmTitle: 'Potwierdź Usunięcie Wszystkich Wpisów',
    deleteAllConfirmDesc: 'Czy na pewno chcesz usunąć wszystkie loty? Tej operacji nie można cofnąć. Wprowadź swoje hasło aby potwierdzić.',
    enterPasswordToConfirm: 'Wprowadź hasło',

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
    closeHelp: 'Close',
    
    printLogbook: 'Print Logbook',
    
    // Theme
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    appearance: 'Appearance',
    toggle: 'Toggle',
    change: 'Change',
    
    // Help Page
    help: {
      title: 'Help & Manual',
      nav: {
        intro: 'Introduction',
        guide: 'User Guide',
        fields: 'Field Descriptions',
        terms: 'Terminology',
        easa: 'EASA Regulations',
        interface: 'Interface',
        about: 'About'
      },
      intro: {
        title: 'Welcome to SimpleLogbook',
        desc: 'SimpleLogbook is a modern, digital pilot logbook designed for simplicity and compliance with EASA PART FCL.050 regulations. The app allows for easy flight logging, time tracking, and report generation.',
        features: [
          'EASA format compliance',
          'Automatic time calculations',
          'Dark mode support',
          'Responsive interface (Desktop/Mobile)',
          'Secure data storage'
        ]
      },
      guide: {
        title: 'User Guide',
        addFlight: {
          title: 'Adding a Flight',
          steps: [
            'Click the "Add Flight" (+) button in the bottom right (mobile) or on the toolbar.',
            'Fill in the form. Required fields are marked.',
            'Enter departure and arrival times in UTC.',
            'The app automatically calculates total time.',
            'You can use "Fill" buttons to copy total time to specific categories.'
          ]
        },
        editDelete: {
          title: 'Editing & Deleting',
          desc: 'To edit a flight, click on any row in the table. To delete, use the trash icon on the right side of the row. A "Delete All" option is available in Settings (Danger Zone).'
        },
        csv: {
          title: 'CSV Import/Export',
          desc: 'To import flights, prepare a CSV file (comma separated) encoded in UTF-8. The first row must contain column headers. Below is a list of supported fields with accepted headers.',
          fields: [
            { name: 'Date (Required)', headers: 'Date, date, Data', desc: 'Format YYYY-MM-DD (e.g., 2023-05-20)' },
            { name: 'Departure Place (Required)', headers: 'Departure Place, Dep, departurePlace, From', desc: 'ICAO Code (4 chars)' },
            { name: 'Departure Time', headers: 'Departure Time, Dep Time, departureTime, Off Block', desc: 'UTC, HH:MM format' },
            { name: 'Arrival Place (Required)', headers: 'Arrival Place, Arr, arrivalPlace, To', desc: 'ICAO Code (4 chars)' },
            { name: 'Arrival Time', headers: 'Arrival Time, Arr Time, arrivalTime, On Block', desc: 'UTC, HH:MM format' },
            { name: 'Aircraft Model (Required)', headers: 'Aircraft Model, Model, aircraftModel, Type', desc: 'e.g., C152, PA28' },
            { name: 'Registration (Required)', headers: 'Aircraft Reg, Reg, aircraftReg, Registration', desc: 'e.g., SP-ABC' },
            { name: 'Total Time', headers: 'Total Time, Total, totalTime', desc: 'HH:MM format or minutes' },
            { name: 'PIC Name', headers: 'PIC Name, picName, Name of PIC', desc: 'For self-flights enter SELF' },
            { name: 'Single Pilot SE', headers: 'Single Pilot SE, SE, singlePilotSE', desc: 'Single Engine Time' },
            { name: 'Single Pilot ME', headers: 'Single Pilot ME, ME, singlePilotME', desc: 'Multi Engine Time' },
            { name: 'Multi Pilot', headers: 'Multi Pilot, MP, multiPilot', desc: 'Multi Pilot Time' },
            { name: 'Night', headers: 'Night Time, Night, nightTime', desc: 'Night Time' },
            { name: 'IFR', headers: 'IFR Time, IFR, ifrTime', desc: 'IFR Time' },
            { name: 'PIC Time', headers: 'PIC Time, PIC, picTime', desc: 'Pilot-in-Command Time' },
            { name: 'Copilot Time', headers: 'Copilot Time, COP, copilotTime', desc: 'Co-Pilot Time' },
            { name: 'Dual Time', headers: 'Dual Time, Dual, dualTime', desc: 'Dual Received Time' },
            { name: 'Instructor Time', headers: 'Instructor Time, Instr, instructorTime', desc: 'Instructor Time' },
            { name: 'Landings Day', headers: 'Landings Day, Ldg Day, landingsDay', desc: 'Number of landings' },
            { name: 'Landings Night', headers: 'Landings Night, Ldg Night, landingsNight', desc: 'Number of landings' },
            { name: 'Remarks', headers: 'Remarks, remarks, Notes', desc: 'Any text' }
          ],
          example: 'Date,Dep,Arr,Model,Reg,Total,PIC Name\n2023-05-20,EPWA,EPKK,C152,SP-ABC,01:30,SELF'
        }
      },
      fields: {
        title: 'Logbook Field Descriptions',
        date: 'Date of flight (DD/MM/YYYY).',
        departure: 'Departure airport code (ICAO/IATA) and off-block time (UTC).',
        arrival: 'Arrival airport code (ICAO/IATA) and on-block time (UTC).',
        aircraft: 'Type, model, and registration marks of the aircraft.',
        se: 'Single Engine - flight time on single-engine aircraft.',
        me: 'Multi Engine - flight time on multi-engine aircraft.',
        mp: 'Multi Pilot - flight time in multi-pilot operations.',
        total: 'Total flight time (from off-block to on-block).',
        picName: 'Name of Pilot-in-Command. For self-flights enter SELF.',
        landings: 'Number of landings day and night.',
        night: 'Flight time at night.',
        ifr: 'Instrument flight time.',
        pic: 'Pilot-in-Command - time as commander.',
        cop: 'Co-Pilot - time as co-pilot.',
        dual: 'Dual - training time with instructor.',
        instr: 'Instructor - time as instructor.'
      },
      terms: {
        title: 'Aviation Terminology',
        items: [
          { term: 'PIC', def: 'Pilot-in-Command - pilot designated as being in command and charged with the safe conduct of the flight.' },
          { term: 'SPIC', def: 'Student Pilot-in-Command - student pilot acting as commander under instructor supervision.' },
          { term: 'PICUS', def: 'Pilot-in-Command Under Supervision - co-pilot performing the duties and functions of a PIC under supervision.' },
          { term: 'Dual', def: 'Flight training with an instructor.' },
          { term: 'IFR', def: 'Instrument Flight Rules.' },
          { term: 'VFR', def: 'Visual Flight Rules.' },
          { term: 'Night', def: 'Flight performed at night (as defined by national regulations).' }
        ]
      },
      easa: {
        title: 'EASA PART FCL.050 Regulations',
        intro: 'Below are key excerpts from regulations governing flight logging.',
        regulations: [
          {
            title: 'FCL.050 Recording of flight time',
            text: 'The pilot shall keep a reliable record of the details of all flights flown in a form and manner established by the competent authority.',
            comment: 'This implies the obligation to maintain a logbook and log every flight. SimpleLogbook meets electronic format requirements.'
          },
          {
            title: 'AMC1 FCL.050 (a) Format',
            text: 'The record should contain the following information: personal details, name, address, date of each flight, place and time of departure/arrival, aircraft type and registration, flight time (SE/ME/MP), total time, landings, operational conditions (Night/IFR), pilot function time (PIC/COP/DUAL/INSTR).',
            comment: 'All these fields are available in the flight entry form in SimpleLogbook.'
          },
          {
            title: 'Flight time definition (Block Time)',
            text: 'The total time from the moment an aircraft first moves for the purpose of taking off until the moment it finally comes to rest at the end of the flight.',
            comment: 'In SimpleLogbook you enter Off-Block and On-Block times.'
          }
        ]
      },
      interface: {
        title: 'Interface Guide',
        buttons: [
          { icon: 'Printer', name: 'Print', desc: 'Opens print view optimized for paper format.' },
          { icon: 'Megaphone', name: 'Changelog', desc: 'Shows update history and new features.' },
          { icon: 'HelpCircle', name: 'Help', desc: 'Opens this help page.' },
          { icon: 'Settings', name: 'Settings', desc: 'App configuration, data import/export, danger zone.' },
          { icon: 'Plus', name: 'Add Flight', desc: 'Opens form to add a new entry.' },
          { icon: 'Download', name: 'Export CSV', desc: 'Downloads all flights in CSV format.' },
          { icon: 'Upload', name: 'Import CSV', desc: 'Uploads flights from a CSV file.' }
        ]
      },
      about: {
        title: 'About',
        author: 'Author: Dominik Czekański',
        email: 'Contact: contact@czekanski.dev',
        github: 'GitHub: https://github.com/czekanskyy/SimpleLogbook',
        disclaimer: 'Disclaimer: This software is a helper tool. Official aviation documentation should be maintained according to legal requirements of the competent authority. The author is not responsible for data errors or data loss.',
        version: 'Version 1.0.4'
      }
    },
    footer: {
      copyright: 'SimpleLogbook',
      madeBy: 'Created by',
      github: 'View on GitHub'
    },
    
    // Changelog
    changelog: 'Changelog',
    changelogTitle: 'Changelog',
    changelogVersion: 'Version',
    changelogReleased: 'Released',
    
    // Version 0.2.0
    v020_email: 'Added email notifications for new user registrations',
    v020_help: 'Expanded help section with detailed CSV import guide',
    v020_footer: 'Updated footer (dynamic year, corrected author info)',
    v020_about: 'Added logo (favicon) and contact link in About section',
    v020_fixes: 'Bug fixes and stability improvements',

    // Version 1.0.4
    changelogAdded: 'Added changelog feature',
    changelogMegaphoneIcon: 'Added megaphone icon button for quick access',
    changelogVersionHistory: 'Version history in accordion format',
    
    // Version 1.0.3
    helpModalAdded: 'Added help and instructions modal',
    helpPartFCLCompliance: 'Detailed PART FCL.050 compliance explanations',
    helpFieldExplanations: 'Explanations of all logbook fields',
    helpPilotFunctionsTitle: 'Pilot function explanations (PIC, SPIC, PICUS, COP, DUAL, INSTR)',
    helpCSVImportGuide: 'Detailed CSV import instructions',
    
    // Version 1.0.2
    uiLightModeTextFixed: 'Fixed text visibility in light mode',
    uiModalPositioning: 'Fixed modal positioning',
    uiModalSizing: 'Optimized element sizing in modals',
    uiConsistencyImprovements: 'UI consistency improvements',
    
    // Version 1.0.1
    darkModeFixed: 'Fixed dark mode toggle',
    designOverhaul: 'Interface redesign - modernist aesthetics',
    glassmorphismAdded: 'Added glassmorphism effects and gradients',
    responsiveDesign: 'Fully responsive interface',
    mobileCardView: 'Card view for mobile devices',
    foucHandlingImproved: 'Improved FOUC (Flash of Unstyled Content)',
    
    // Version 1.0.0
    initialRelease: 'Initial release of SimpleLogbook',
    partFCLCompliance: 'PART FCL.050 compliance',
    manualFlightEntry: 'Manual flight entry',
    csvImportExport: 'CSV import and export',
    automaticCalculations: 'Automatic time and total calculations',
    paginationSupport: 'Pagination support (14 rows per page)',
    yearFiltering: 'Year filtering',
    autoSaveDatabase: 'Automatic database save',
    
    // Delete All Entries
    dangerZone: 'Danger Zone',
    deleteAllEntries: 'Delete All Entries',
    deleteAllEntriesWarning: 'This action is irreversible!',
    deleteAllConfirmTitle: 'Confirm Delete All Entries',
    deleteAllConfirmDesc: 'Are you sure you want to delete all flights? This action cannot be undone. Enter your password to confirm.',
    enterPasswordToConfirm: 'Enter password',
    confirmDelete: 'Confirm Delete',

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
