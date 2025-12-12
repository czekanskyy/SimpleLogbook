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
    instr: 'INSTR.',
    
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
    addFlight: 'Nowy lot',
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
    model: 'Typ / Model',
    registration: 'Rejestracja',
    closeHelp: 'Zamknij',
    confirmDelete: 'Potwierdź usunięcie',
    
    printLogbook: 'Drukuj Logbook',

    // Home Page
    hubTitle: 'eLogbook',
    hubSubtitle: 'Wybierz typ logbooka aby kontynuować',
    hubAircraftTitle: 'Samolot',
    hubAircraftDesc: 'Dziennik lotów pilota samolotu FCL.050',
    hubGliderTitle: 'Szybowiec',
    hubGliderDesc: 'Dziennik lotów pilota szybowca SFCL.050',
    hubSimulatorTitle: 'Symulator',
    hubSimulatorDesc: 'Rejestr sesji FSTD',
    
    // ANCHOR - Help Page Polish
    // SECTION - Help Navigation & Intro
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
        title: 'Witaj w eLogbook',
        desc: 'eLogbook to nowoczesny, cyfrowy logbook pilota zaprojektowany z myślą o prostocie i zgodności z przepisami EASA PART FCL.050 oraz PART SFCL.050. Aplikacja umożliwia łatwe rejestrowanie lotów samolotowych, szybowcowych oraz sesji na symulatorze, śledzenie nalotu oraz generowanie raportów.',
        features: [
          'Zgodność z formatem EASA FCL.050 i SFCL.050',
          'Trzy typy logbooka: Samolot, Szybowiec, Symulator',
          'Automatyczne obliczanie czasów',
          'Obsługa trybu ciemnego',
					'Dwujęzyczność (PL & EN)',
          'Responsywny interfejs (Desktop/Mobile)',
          'Import i eksport CSV dla każdej zakładki',
          'Bezpieczne przechowywanie danych'
        ]
      },
      // SECTION - Help Guide
      guide: {
        title: 'Obsługa Programu',
        addFlight: {
          title: 'Dodawanie Wpisu',
          steps: [
            'Wybierz zakładkę: Samolot, Szybowiec lub Symulator.',
            'Kliknij przycisk "Nowy lot" (lub "Nowa sesja FSTD" dla symulatora).',
            'Wypełnij formularz. Pola wymagane są oznaczone gwiazdką (*).',
            'Czas startu i lądowania podawaj w UTC.',
            'Aplikacja automatycznie obliczy czas całkowity na podstawie czasów startu i lądowania.'
          ]
        },
        editDelete: {
          title: 'Edycja i Usuwanie',
          desc: 'Aby edytować wpis, kliknij ikonę ołówka po prawej stronie wiersza. Aby usunąć, użyj ikony kosza. Potwierdzenie usunięcia jest wymagane. W Ustawieniach (Strefa Niebezpieczna) dostępna jest opcja "Usuń Wszystkie Wpisy", która trwale usuwa dane ze wszystkich logbooków (Samolot, Szybowiec, Symulator) po podaniu hasła.'
        },
        // SECTION - CSV Import/Export by Logbook Type
        csv: {
          title: 'Import/Eksport CSV',
          desc: 'Aby zaimportować loty, przygotuj plik CSV (rozdzielany przecinkami) zakodowany w UTF-8. Pierwszy wiersz musi zawierać nagłówki kolumn. Wybierz odpowiednią zakładkę poniżej, aby zobaczyć pola dla danego typu logbooka.',
          headerName: 'Nazwa pola',
          headerHeaders: 'Akceptowane nagłówki',
          headerDesc: 'Opis',
          exampleLabel: 'Przykładowa zawartość CSV:',
          // ANCHOR - CSV Fields: Aircraft
          aircraft: {
            fields: [
              { name: 'Data (Wymagane)', headers: 'Date, date, Data', desc: 'Format YYYY-MM-DD (np. 2023-05-20)' },
              { name: 'Miejsce Odlotu (Wymagane)', headers: 'Departure Place, Dep, departurePlace, From', desc: 'Kod ICAO lotniska (4 znaki)' },
              { name: 'Czas Odlotu', headers: 'Departure Time, Dep Time, departureTime, Off Block', desc: 'UTC, format HH:MM' },
              { name: 'Miejsce Przylotu (Wymagane)', headers: 'Arrival Place, Arr, arrivalPlace, To', desc: 'Kod ICAO lotniska (4 znaki)' },
              { name: 'Czas Przylotu', headers: 'Arrival Time, Arr Time, arrivalTime, On Block', desc: 'UTC, format HH:MM' },
              { name: 'Typ/Model (Wymagane)', headers: 'Aircraft Model, Model, aircraftModel, Type', desc: 'np. C152, PA28, B737' },
              { name: 'Rejestracja (Wymagane)', headers: 'Aircraft Reg, Reg, aircraftReg, Registration', desc: 'np. SP-ABC' },
              { name: 'Czas Całkowity', headers: 'Total Time, Total, totalTime', desc: 'Format HH:MM lub minuty' },
              { name: 'Nazwisko PIC', headers: 'PIC Name, picName, Name of PIC', desc: 'Dla lotów samodzielnych: SELF' },
              { name: 'Single Pilot SE', headers: 'Single Pilot SE, SE, singlePilotSE', desc: 'Czas na jednosilnikowych (min)' },
              { name: 'Single Pilot ME', headers: 'Single Pilot ME, ME, singlePilotME', desc: 'Czas na wielosilnikowych (min)' },
              { name: 'Multi Pilot', headers: 'Multi Pilot, MP, multiPilot', desc: 'Czas w załodze wieloosobowej (min)' },
              { name: 'Noc', headers: 'Night Time, Night, nightTime', desc: 'Czas lotu w nocy (min)' },
              { name: 'IFR', headers: 'IFR Time, IFR, ifrTime', desc: 'Czas lotu IFR (min)' },
              { name: 'PIC Czas', headers: 'PIC Time, PIC, picTime', desc: 'Czas jako dowódca (min)' },
              { name: 'COP Czas', headers: 'Copilot Time, COP, copilotTime', desc: 'Czas jako drugi pilot (min)' },
              { name: 'Dual Czas', headers: 'Dual Time, Dual, dualTime', desc: 'Czas szkolenia z instruktorem (min)' },
              { name: 'Instruktor Czas', headers: 'Instructor Time, Instr, instructorTime', desc: 'Czas jako instruktor (min)' },
              { name: 'Lądowania Dzień', headers: 'Landings Day, Ldg Day, landingsDay', desc: 'Liczba lądowań w dzień' },
              { name: 'Lądowania Noc', headers: 'Landings Night, Ldg Night, landingsNight', desc: 'Liczba lądowań w nocy' },
              { name: 'Uwagi', headers: 'Remarks, remarks, Notes', desc: 'Tekst dowolny' }
            ],
            example: 'Date,Dep,Arr,Model,Reg,Total,PIC Name,SE,Ldg Day\n2023-05-20,EPWA,EPKK,C152,SP-ABC,01:30,SELF,90,1'
          },
          // ANCHOR - CSV Fields: Glider
          glider: {
            fields: [
              { name: 'Data (Wymagane)', headers: 'Date, date, Data', desc: 'Format YYYY-MM-DD' },
              { name: 'Miejsce Odlotu (Wymagane)', headers: 'Departure Place, Dep, departurePlace', desc: 'Kod ICAO lub nazwa lotniska' },
              { name: 'Czas Odlotu', headers: 'Departure Time, Dep Time, departureTime', desc: 'UTC, format HH:MM' },
              { name: 'Miejsce Przylotu (Wymagane)', headers: 'Arrival Place, Arr, arrivalPlace', desc: 'Kod ICAO lub nazwa lotniska' },
              { name: 'Czas Przylotu', headers: 'Arrival Time, Arr Time, arrivalTime', desc: 'UTC, format HH:MM' },
              { name: 'Typ/Model Szybowca (Wymagane)', headers: 'Glider Model, Model, gliderModel', desc: 'np. ASK-21, Jantar, Discus' },
              { name: 'Rejestracja (Wymagane)', headers: 'Glider Reg, Reg, gliderReg', desc: 'np. SP-1234' },
              { name: 'Metoda Startu (Wymagane)', headers: 'Launch Method, launchMethod', desc: 'WINCH, AEROTOW, SELF, BUNGEE' },
              { name: 'Czas Całkowity', headers: 'Total Time, Total, totalTime', desc: 'Format HH:MM lub minuty' },
              { name: 'Nazwisko PIC', headers: 'PIC Name, picName', desc: 'Nazwisko dowódcy' },
              { name: 'Liczba Startów', headers: 'Launches, launches', desc: 'Liczba startów' },
              { name: 'PIC Czas', headers: 'PIC Time, picTime', desc: 'Czas jako dowódca (min)' },
              { name: 'Dual Czas', headers: 'Dual Time, dualTime', desc: 'Czas dwuster/szkoleniowy (min)' },
              { name: 'Instruktor Czas', headers: 'Instructor Time, instructorTime', desc: 'Czas jako instruktor (min)' },
              { name: 'Dystans', headers: 'Distance, distance', desc: 'Dystans lotu w km' },
              { name: 'Uwagi', headers: 'Remarks, remarks', desc: 'Tekst dowolny' }
            ],
            example: 'Date,Dep,Arr,Model,Reg,Launch Method,Total,PIC Name,Launches\n2023-06-15,EPAE,EPAE,ASK-21,SP-3456,WINCH,02:15,KOWALSKI,1'
          },
          // ANCHOR - CSV Fields: Simulator
          simulator: {
            fields: [
              { name: 'Data (Wymagane)', headers: 'Date, date, Data', desc: 'Format YYYY-MM-DD' },
              { name: 'Typ FSTD (Wymagane)', headers: 'FSTD Type, fstdType', desc: 'FFS, FNPT_I, FNPT_II, FTD, BITD' },
              { name: 'Kwalifikacja FSTD', headers: 'FSTD Qualification, fstdQualification', desc: 'np. A320, B737, Generic' },
              { name: 'Typ Symulowanego Statku', headers: 'Aircraft Type, aircraftType', desc: 'Typ symulowanego samolotu' },
              { name: 'Czas Sesji', headers: 'Total Time, totalTime, Session Time', desc: 'Format HH:MM lub minuty' },
              { name: 'Rodzaj Ćwiczenia', headers: 'Exercise, exercise', desc: 'Opis wykonywanego ćwiczenia' },
              { name: 'Nazwisko Instruktora', headers: 'Instructor Name, instructorName', desc: 'Nazwisko instruktora' },
              { name: 'Uwagi', headers: 'Remarks, remarks', desc: 'Tekst dowolny' }
            ],
            example: 'Date,FSTD Type,Aircraft Type,Total Time,Exercise\n2023-07-10,FNPT_II,C172,02:00,IFR Training'
          }
        }
      },
      // SECTION - Field Descriptions by Logbook Type
      fields: {
        title: 'Opis Pól Logbooka',
        // ANCHOR - Fields: Aircraft
        aircraft: {
          date: 'Data lotu w formacie DD.MM.RRRR.',
          departure: 'Miejsce odlotu - kod ICAO lotniska (np. EPWA) i czas odblokowania w UTC.',
          arrival: 'Miejsce przylotu - kod ICAO lotniska i czas zablokowania w UTC.',
          aircraftType: 'Typ, model i wariant statku powietrznego (np. Cessna 152, PA-28-161).',
          registration: 'Znaki rejestracyjne statku powietrznego (np. SP-ABC).',
          singlePilotSE: 'Czas lotu jako jedyny pilot na samolocie jednosilnikowym (Single Engine).',
          singlePilotME: 'Czas lotu jako jedyny pilot na samolocie wielosilnikowym (Multi Engine).',
          multiPilot: 'Czas lotu w załodze wieloosobowej, wymagającej minimum dwóch pilotów.',
          totalTime: 'Całkowity czas lotu od odblokowania (off-block) do zablokowania (on-block).',
          picName: 'Nazwisko dowódcy statku powietrznego (PIC). Dla lotów samodzielnych wpisz SELF.',
          landingsDay: 'Liczba lądowań wykonanych w dzień.',
          landingsNight: 'Liczba lądowań wykonanych w nocy.',
          nightTime: 'Czas lotu wykonany w nocy (zgodnie z definicją krajową).',
          ifrTime: 'Czas lotu wykonany według przepisów IFR.',
          picTime: 'Czas jako dowódca statku powietrznego (Pilot-in-Command).',
          copilotTime: 'Czas jako drugi pilot (Co-Pilot) w załodze wieloosobowej.',
          dualTime: 'Czas szkolenia z instruktorem (Dual Instruction Received).',
          instructorTime: 'Czas jako instruktor szkolący innego pilota.',
          remarks: 'Uwagi dotyczące lotu, np. rodzaj zadania, trasa, warunki.'
        },
        // ANCHOR - Fields: Glider
        glider: {
          date: 'Data lotu szybowcowego.',
          departure: 'Miejsce startu - lotnisko lub lądowisko.',
          arrival: 'Miejsce lądowania.',
          gliderType: 'Typ i model szybowca (np. ASK-21, SZD-51 Junior).',
          registration: 'Znaki rejestracyjne szybowca.',
          launchMethod: 'Metoda startu: Wyciągarka (WINCH), Aeroholowanie (AEROTOW), Samodzielny start (SELF), Lina gumowa (BUNGEE).',
          totalTime: 'Całkowity czas lotu szybowcowego.',
          picName: 'Nazwisko dowódcy szybowca.',
          launches: 'Liczba startów w danym dniu.',
          picTime: 'Czas jako dowódca szybowca.',
          dualTime: 'Czas szkolenia (lot dwuster z instruktorem).',
          instructorTime: 'Czas jako instruktor szybowcowy FI(S).',
          distance: 'Dystans lotu w kilometrach (dla lotów przelotowych).',
          operationalConditions: 'Warunki operacyjne: lot w chmurach, akrobacja, noc.',
          remarks: 'Uwagi dotyczące lotu.'
        },
        // ANCHOR - Fields: Simulator
        simulator: {
          date: 'Data sesji na symulatorze.',
          fstdType: 'Typ urządzenia FSTD: FFS (Full Flight Simulator), FNPT I/II, FTD, BITD.',
          fstdQualification: 'Kwalifikacja FSTD - określa poziom odwzorowania (np. Level D).',
          aircraftType: 'Typ symulowanego statku powietrznego.',
          totalTime: 'Czas trwania sesji na symulatorze.',
          exercise: 'Rodzaj wykonywanego ćwiczenia lub scenariusza.',
          instructorName: 'Nazwisko instruktora nadzorującego sesję.',
          remarks: 'Uwagi i dodatkowe wpisy.'
        }
      },
      // SECTION - Aviation Terminology
      terms: {
        title: 'Terminologia Lotnicza',
        items: [
          { term: 'PIC', def: 'Pilot-in-Command (Dowódca) - pilot wyznaczony do dowodzenia i ponoszący odpowiedzialność za bezpieczne wykonanie lotu.' },
          { term: 'SPIC', def: 'Student Pilot-in-Command - uczeń-pilot pełniący funkcje dowódcy pod nadzorem instruktora w tym samym statku powietrznym.' },
          { term: 'PICUS', def: 'Pilot-in-Command Under Supervision - pilot pełniący obowiązki i funkcje dowódcy pod nadzorem dowódcy, ale nie będący instruktorem.' },
          { term: 'COP', def: 'Co-Pilot - pilot pełniący funkcje pilota inne niż dowódca, z wyłączeniem ucznia-pilota.' },
          { term: 'Dual', def: 'Czas szkolenia w locie z instruktorem (podwójne sterowanie). Instruktor wykonuje szkolenie, a uczeń zalicza czas jako Dual.' },
          { term: 'FI', def: 'Flight Instructor - instruktor lotniczy posiadający uprawnienia do szkolenia praktycznego.' },
          { term: 'FI(S)', def: 'Flight Instructor (Sailplane) - instruktor szybowcowy.' },
          { term: 'FE', def: 'Flight Examiner - egzaminator uprawniony do przeprowadzania egzaminów praktycznych.' },
          { term: 'IFR', def: 'Instrument Flight Rules - przepisy wykonywania lotów według wskazań przyrządów, bez odniesienia wizualnego do terenu.' },
          { term: 'VFR', def: 'Visual Flight Rules - przepisy wykonywania lotów z widocznością, z odniesieniem wizualnym do terenu.' },
          { term: 'Night', def: 'Lot w nocy - lot wykonany w okresie między końcem zmierzchu cywilnego a początkiem świtu cywilnego.' },
          { term: 'SE', def: 'Single Engine - statek powietrzny jednosilnikowy.' },
          { term: 'ME', def: 'Multi Engine - statek powietrzny wielosilnikowy.' },
          { term: 'SP', def: 'Single Pilot - operacje wykonywane przez jednego pilota.' },
          { term: 'MP', def: 'Multi Pilot - operacje wymagające załogi wieloosobowej (minimum dwóch pilotów).' },
          { term: 'Block Time', def: 'Czas blokowy - czas od momentu odblokowania (off-block) do zablokowania (on-block) statku powietrznego.' },
          { term: 'FSTD', def: 'Flight Simulation Training Device - urządzenie do szkolenia symulatorowego (FFS, FNPT, FTD, BITD).' },
          { term: 'FFS', def: 'Full Flight Simulator - pełny symulator lotu o najwyższym stopniu odwzorowania.' },
          { term: 'FNPT', def: 'Flight and Navigation Procedures Trainer - symulator procedur lotu i nawigacji (I lub II).' },
          { term: 'FTD', def: 'Flight Training Device - urządzenie treningowe do szkolenia lotniczego.' },
          { term: 'BITD', def: 'Basic Instrument Training Device - podstawowe urządzenie do szkolenia instrumentalnego.' },
          { term: 'Cross-country', def: 'Lot przelotowy - lot między dwoma różnymi punktami z lądowaniem w innym miejscu niż start.' },
          { term: 'ICAO', def: 'International Civil Aviation Organization - kod ICAO lotniska składa się z 4 liter (np. EPWA - Warszawa).' }
        ]
      },
      // SECTION - EASA Regulations by Logbook Type
      easa: {
        title: 'Przepisy EASA',
        intro: 'Poniżej znajdują się kluczowe fragmenty przepisów regulujących prowadzenie książki lotów. Wybierz zakładkę, aby zobaczyć przepisy dla danego typu logbooka.',
        // ANCHOR - EASA: Aircraft (FCL.050)
        aircraft: {
          regulations: [
            {
              title: 'FCL.050 - Rejestrowanie czasu lotu',
              text: 'Pilot prowadzi niezawodną ewidencję szczegółów wszystkich wykonanych lotów w formie i w sposób ustalony przez właściwy organ.',
              comment: 'Obowiązek prowadzenia logbooka dotyczy każdego pilota. eLogbook spełnia wymogi formy elektronicznej.'
            },
            {
              title: 'AMC1 FCL.050(a) - Wymagana zawartość rejestru',
              text: 'Wpis dotyczący każdego lotu, lub serii lotów wykonanych tego samego dnia i kończących się pełnym zatrzymaniem, powinien zawierać: (1) nazwisko i adres posiadacza, (2) datę, (3) miejsce i czas odlotu, (4) miejsce i czas przylotu, (5) typ i rejestrację statku powietrznego, (6) czas lotu dla samolotów jednosilnikowych i wielosilnikowych, (7) całkowity czas lotu, (8) nazwisko dowódcy, (9) liczbę lądowań, (10) warunki operacyjne (noc, IFR), (11) czas funkcji pilota (PIC, Co-pilot, Dual, Instruktor).',
              comment: 'Formularz dodawania lotu w eLogbook zawiera wszystkie te pola.'
            },
            {
              title: 'AMC1 FCL.050(a)(3) - Funkcje pilota',
              text: 'Czas lotu może być rejestrowany jako czas dowódcy (PIC), czas drugiego pilota (Co-pilot), czas szkolenia z instruktorem (Dual), czas jako instruktor (Instructor), lub ich kombinacja.',
              comment: 'Aplikacja automatycznie sumuje czasy w poszczególnych kategoriach.'
            },
            {
              title: 'Definicja czasu lotu (Block Time)',
              text: 'Czas lotu samolotu to całkowity czas od momentu, gdy samolot zaczyna się poruszać o własnej sile w celu startu, do momentu jego zatrzymania po zakończeniu lotu.',
              comment: 'W eLogbook wpis obejmuje czas od odblokowania (off-block) do zablokowania (on-block).'
            }
          ]
        },
        // ANCHOR - EASA: Glider (SFCL.050)
        glider: {
          regulations: [
            {
              title: 'SFCL.050 - Rejestrowanie czasu lotu szybowcowego',
              text: 'Pilot szybowca lub pilota balonowego prowadzi niezawodną i aktualną ewidencję szczegółów wszystkich wykonanych lotów.',
              comment: 'Zakładka Szybowiec umożliwia prowadzenie logbooka zgodnego z PART SFCL.'
            },
            {
              title: 'AMC1 SFCL.050 - Wymagana zawartość rejestru szybowcowego',
              text: 'Wpis powinien zawierać: (1) datę, (2) miejsce startu i lądowania, (3) typ i znaki rejestracyjne szybowca, (4) metodę startu (wyciągarka, holowanie, start własny), (5) czas lotu, (6) całkowity czas lotu na danej stronie, (7) nazwisko dowódcy lub instruktora, (8) funkcję pilota podczas danego lotu.',
              comment: 'Formularz dodawania lotu szybowcowego zawiera wszystkie wymagane pola.'
            },
            {
              title: 'SFCL.050(c) - Czas lotu szybowca',
              text: 'Czas lotu szybowca liczy się od momentu rozpoczęcia startu do momentu zakończenia lądowania.',
              comment: 'W przeciwieństwie do samolotów, dla szybowców liczy się od startu do lądowania.'
            },
            {
              title: 'AMC1 SFCL.050(a) - Dodatkowe informacje',
              text: 'Wpis może zawierać dodatkowe informacje, takie jak: dystans lotu przelotowego, warunki operacyjne (lot w chmurach, akrobacja, lot nocny).',
              comment: 'Pola dystansu i warunków operacyjnych są dostępne w formularzu.'
            }
          ]
        },
        // ANCHOR - EASA: Simulator (FSTD)
        simulator: {
          regulations: [
            {
              title: 'FCL.025(b) - Rejestrowanie czasu na FSTD',
              text: 'Czas szkolenia na symulatorach FSTD (Flight Simulation Training Devices) jest rejestrowany osobno od czasu lotu rzeczywistego.',
              comment: 'Zakładka Symulator pozwala na oddzielną ewidencję sesji treningowych.'
            },
            {
              title: 'AMC1 FCL.025(b) - Wymagana zawartość rejestru FSTD',
              text: 'Wpis dotyczący sesji na FSTD powinien zawierać: (1) datę, (2) typ urządzenia FSTD (FFS, FNPT I, FNPT II, FTD, BITD), (3) kwalifikację urządzenia, (4) typ symulowanego statku powietrznego, (5) czas trwania sesji, (6) rodzaj wykonywanego ćwiczenia, (7) nazwisko instruktora.',
              comment: 'Formularz sesji symulatorowej zawiera wszystkie wymagane pola.'
            },
            {
              title: 'Klasyfikacja urządzeń FSTD',
              text: 'FFS (Full Flight Simulator) - najwyższy poziom odwzorowania. FNPT I/II (Flight and Navigation Procedures Trainer). FTD (Flight Training Device). BITD (Basic Instrument Training Device).',
              comment: 'Wybór typu FSTD jest obowiązkowy przy dodawaniu sesji.'
            },
            {
              title: 'FCL.060 - Zaliczanie czasu na symulatorze',
              text: 'Czas szkolenia na FSTD może być zaliczony do wymagań dotyczących doświadczenia tylko wtedy, gdy urządzenie jest odpowiednio zakwalifikowane i szkolenie odbywa się pod nadzorem uprawnionego instruktora.',
              comment: 'Zalecane jest wpisywanie nazwiska instruktora dla każdej sesji.'
            }
          ]
        }
      },
      // SECTION - Interface Description
      interface: {
        title: 'Opis Interfejsu',
        buttons: [
          { icon: 'Plus', name: 'Nowy lot / Nowa sesja', desc: 'Otwiera formularz dodawania nowego wpisu.' },
          { icon: 'Printer', name: 'Drukuj', desc: 'Otwiera widok drukowania zoptymalizowany pod format papierowy.' },
          { icon: 'Upload', name: 'Import CSV', desc: 'Wgrywa wpisy z pliku CSV.' },
          { icon: 'Download', name: 'Eksport CSV', desc: 'Pobiera wszystkie wpisy w formacie CSV.' },
          { icon: 'Megaphone', name: 'Dziennik Zmian', desc: 'Pokazuje historię aktualizacji i nowości w aplikacji.' },
          { icon: 'HelpCircle', name: 'Pomoc', desc: 'Otwiera tę stronę pomocy.' },
          { icon: 'Settings', name: 'Ustawienia', desc: 'Konfiguracja aplikacji: zmiana języka, trybu ciemnego, usuwanie danych.' },
					{icon: 'User', name: 'Profil', desc: 'Informacje o profilu użytkownika.'}
        ]
      },
      // SECTION - About
      about: {
        title: 'O Programie',
        author: 'Autor: Dominik Czekański',
        email: 'Kontakt: contact@czekanski.dev',
        github: 'GitHub: https://github.com/czekanskyy/SimpleLogbook',
        disclaimer: 'Wyłączenie odpowiedzialności: Ten program jest narzędziem pomocniczym. Oficjalna dokumentacja lotnicza powinna być prowadzona zgodnie z wymogami prawnymi właściwego nadzoru lotniczego. Autor nie ponosi odpowiedzialności za błędy w danych lub utratę danych.',
        version: 'Wersja 1.0.8'
      }
    },
    footer: {
      copyright: 'eLogbook',
      madeBy: 'Stworzone przez',
      github: 'Zobacz na GitHub'
    },
    
    // Changelog
    changelog: 'Dziennik Zmian',
    changelogTitle: 'Dziennik Zmian',
    changelogVersion: 'Wersja',
    changelogReleased: 'Wydano',
    
    // Version 1.0.6
    v106_mobileMenu: 'Ulepszono menu mobilne (szersze, lepsze pozycjonowanie)',
    v106_flightCard: 'Ulepszono widok karty lotu na urządzeniach mobilnych',
    v106_pagination: 'Poprawiono układ paginacji na małych ekranach',
    v106_importButton: 'Ujednolicono wygląd przycisku importu',
    v106_fixes: 'Poprawki responsywności i drobne usprawnienia',

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
    initialRelease: 'Pierwsze wydanie eLogbook',
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
    valIfr: 'Czas IFR nie może być większy niż Czas Całkowity',

    // Logbook Tabs
    tabAircraft: 'Samolot',
    tabGlider: 'Szybowiec',
    tabSimulator: 'Symulator',

    // Glider Logbook (PART SFCL.050)
    glider: 'Szybowiec',
    gliderModel: 'Typ szybowca',
    gliderReg: 'Znaki rejestracyjne',
    launchMethod: 'Metoda startu',
    launchWinch: 'Wyciągarka',
    launchAerotow: 'Hol za samolotem',
    launchSelf: 'Własny napęd',
    launchGravity: 'Grawitacyjny',
    launchBungee: 'Liny gumowe',
    launchAutotow: 'Hol za samochodem',
    pilotFunction: 'Funkcja pilota',
    pilotFuncPIC: 'PIC',
    pilotFuncDUAL: 'DUAL',
    pilotFuncFI: 'FI(S)/BI(S)',
    pilotFuncFE: 'FE(S)',
    launches: 'Starty',
    distance: 'Dystans [km]',
    dualTimeGlider: 'DUAL',
    instructorTimeGlider: 'INSTR.',
    operationalConditions: 'Warunki operacyjne',
    condCloud: 'Lot w chmurach',
    condAerobatic: 'Lot akrobacyjny',
    condNight: 'Lot nocny',
    remarksTask: 'Zadanie, Ćwiczenie, Warunki lotu, Uwagi',
    addGliderFlight: 'Nowy lot',
    editGliderFlight: 'Edytuj Lot Szybowcowy',

    // Simulator Logbook (FSTD)
    simulator: 'Symulator',
    fstdType: 'Typ FSTD',
    fstdFFS: 'FFS (Full Flight Simulator)',
    fstdFNPT_I: 'FNPT I',
    fstdFNPT_II: 'FNPT II',
    fstdFTD: 'FTD (Flight Training Device)',
    fstdBITD: 'BITD (Basic Instrument Training Device)',
    fstdQualification: 'Numer kwalifikacji FSTD',
    simulatedAircraftType: 'Symulowany typ statku powietrznego',
    sessionTime: 'Czas sesji',
		additionalRemarks: 'Dodatkowe informacje',
    exercise: 'Rodzaj ćwiczenia',
    exerciseRemarks: 'Uwagi',
    instructorName: 'Nazwisko instruktora',
    excludeFromTotal: 'Wyłącz z całkowitego czasu',
    addSimulatorSession: 'Nowa sesja FSTD',
    editSimulatorSession: 'Edytuj Sesję FSTD',
    newFlight: 'Nowy lot',
    newSession: 'Nowa sesja FSTD',

    // Changelog v1.0.8
    v108_gliderDistance: 'Dodano pole "Dystans" w logbooku szybowcowym',
    v108_launchMethods: 'Zaktualizowano metody startu szybowcowego (pełne nazwy)',
    v108_helpPage: 'Ulepszono stronę pomocy i nawigację (przycisk wstecz)',
    v108_uiImprovements: 'Poprawki interfejsu formularza dodawania lotu',
    v108_translations: 'Poprawki tłumaczeń (PL/EN)',

    // Changelog v1.0.7
    v107_logbookSplit: 'Podział logbooka na 3 kategorie (Samolot, Szybowiec, Symulator)',
    v107_globalDelete: 'Opcja globalnego usuwania danych (Strefa Niebezpieczna)',
    v107_hubPage: 'Nowa strona startowa (Hub)',
    v107_uiRefinements: 'Drobne poprawki interfejsu'
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
    addFlight: 'New flight',
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
    model: 'Type / Model',
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

    // Home Page
    hubTitle: 'eLogbook',
    hubSubtitle: 'Select your logbook type to continue',
    hubAircraftTitle: 'Aircraft',
    hubAircraftDesc: 'Airplane pilot logbook FCL.050',
    hubGliderTitle: 'Glider',
    hubGliderDesc: 'Sailplane pilot logbook SFCL.050',
    hubSimulatorTitle: 'Simulator',
    hubSimulatorDesc: 'FSTD Session Log',
    
    // ANCHOR - Help Page English
    // SECTION - Help Navigation & Intro
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
        title: 'Welcome to eLogbook',
        desc: 'eLogbook is a modern, digital pilot logbook designed for simplicity and compliance with EASA PART FCL.050 and PART SFCL.050 regulations. The app allows for easy recording of airplane flights, glider flights, and simulator sessions.',
        features: [
          'EASA FCL.050 and SFCL.050 compliance',
          'Three logbook types: Aircraft, Glider, Simulator',
          'Automatic time calculations',
          'Dark mode support',
					'Dual language (PL & EN)',
          'Responsive interface (Desktop/Mobile)',
          'CSV import/export for each tab',
          'Secure data storage'
        ]
      },
      // SECTION - Help Guide
      guide: {
        title: 'User Guide',
        addFlight: {
          title: 'Adding an Entry',
          steps: [
            'Select a tab: Aircraft, Glider, or Simulator.',
            'Click "New flight" (or "New FSTD session" for simulator).',
            'Fill in the form. Required fields are marked with an asterisk (*).',
            'Enter departure and arrival times in UTC.',
            'The app automatically calculates total time based on departure and arrival times.'
          ]
        },
        editDelete: {
          title: 'Editing & Deleting',
          desc: 'To edit an entry, click the pencil icon on the right side of the row. To delete, use the trash icon. Confirmation is required before deletion. In Settings (Danger Zone), the "Delete All Entries" option allows you to permanently clear data from all logbooks (Aircraft, Glider, Simulator) after password confirmation.'
        },
        // SECTION - CSV Import/Export by Logbook Type
        csv: {
          title: 'CSV Import/Export',
          desc: 'To import flights, prepare a CSV file (comma separated) encoded in UTF-8. The first row must contain column headers. Select the appropriate tab below to see fields for each logbook type.',
          headerName: 'Field Name',
          headerHeaders: 'Accepted Headers',
          headerDesc: 'Description',
          exampleLabel: 'Example CSV Content:',
          // ANCHOR - CSV Fields: Aircraft
          aircraft: {
            fields: [
              { name: 'Date (Required)', headers: 'Date, date, Data', desc: 'Format YYYY-MM-DD (e.g., 2023-05-20)' },
              { name: 'Departure Place (Required)', headers: 'Departure Place, Dep, departurePlace, From', desc: 'ICAO airport code (4 chars)' },
              { name: 'Departure Time', headers: 'Departure Time, Dep Time, departureTime, Off Block', desc: 'UTC, HH:MM format' },
              { name: 'Arrival Place (Required)', headers: 'Arrival Place, Arr, arrivalPlace, To', desc: 'ICAO airport code (4 chars)' },
              { name: 'Arrival Time', headers: 'Arrival Time, Arr Time, arrivalTime, On Block', desc: 'UTC, HH:MM format' },
              { name: 'Type/Model (Required)', headers: 'Aircraft Model, Model, aircraftModel, Type', desc: 'e.g., C152, PA28, B737' },
              { name: 'Registration (Required)', headers: 'Aircraft Reg, Reg, aircraftReg, Registration', desc: 'e.g., SP-ABC' },
              { name: 'Total Time', headers: 'Total Time, Total, totalTime', desc: 'HH:MM format or minutes' },
              { name: 'PIC Name', headers: 'PIC Name, picName, Name of PIC', desc: 'For self-flights: SELF' },
              { name: 'Single Pilot SE', headers: 'Single Pilot SE, SE, singlePilotSE', desc: 'Single engine time (min)' },
              { name: 'Single Pilot ME', headers: 'Single Pilot ME, ME, singlePilotME', desc: 'Multi engine time (min)' },
              { name: 'Multi Pilot', headers: 'Multi Pilot, MP, multiPilot', desc: 'Multi-crew time (min)' },
              { name: 'Night', headers: 'Night Time, Night, nightTime', desc: 'Night flight time (min)' },
              { name: 'IFR', headers: 'IFR Time, IFR, ifrTime', desc: 'IFR flight time (min)' },
              { name: 'PIC Time', headers: 'PIC Time, PIC, picTime', desc: 'Pilot-in-command time (min)' },
              { name: 'Copilot Time', headers: 'Copilot Time, COP, copilotTime', desc: 'Co-pilot time (min)' },
              { name: 'Dual Time', headers: 'Dual Time, Dual, dualTime', desc: 'Training with instructor (min)' },
              { name: 'Instructor Time', headers: 'Instructor Time, Instr, instructorTime', desc: 'As instructor (min)' },
              { name: 'Landings Day', headers: 'Landings Day, Ldg Day, landingsDay', desc: 'Number of day landings' },
              { name: 'Landings Night', headers: 'Landings Night, Ldg Night, landingsNight', desc: 'Number of night landings' },
              { name: 'Remarks', headers: 'Remarks, remarks, Notes', desc: 'Any text' }
            ],
            example: 'Date,Dep,Arr,Model,Reg,Total,PIC Name,SE,Ldg Day\n2023-05-20,EPWA,EPKK,C152,SP-ABC,01:30,SELF,90,1'
          },
          // ANCHOR - CSV Fields: Glider
          glider: {
            fields: [
              { name: 'Date (Required)', headers: 'Date, date, Data', desc: 'Format YYYY-MM-DD' },
              { name: 'Departure Place (Required)', headers: 'Departure Place, Dep, departurePlace', desc: 'ICAO code or airfield name' },
              { name: 'Departure Time', headers: 'Departure Time, Dep Time, departureTime', desc: 'UTC, HH:MM format' },
              { name: 'Arrival Place (Required)', headers: 'Arrival Place, Arr, arrivalPlace', desc: 'ICAO code or airfield name' },
              { name: 'Arrival Time', headers: 'Arrival Time, Arr Time, arrivalTime', desc: 'UTC, HH:MM format' },
              { name: 'Glider Type/Model (Required)', headers: 'Glider Model, Model, gliderModel', desc: 'e.g., ASK-21, Discus, LS8' },
              { name: 'Registration (Required)', headers: 'Glider Reg, Reg, gliderReg', desc: 'e.g., SP-1234' },
              { name: 'Launch Method (Required)', headers: 'Launch Method, launchMethod', desc: 'WINCH, AEROTOW, SELF, BUNGEE' },
              { name: 'Total Time', headers: 'Total Time, Total, totalTime', desc: 'HH:MM format or minutes' },
              { name: 'PIC Name', headers: 'PIC Name, picName', desc: 'Pilot-in-command name' },
              { name: 'Launches', headers: 'Launches, launches', desc: 'Number of launches' },
              { name: 'PIC Time', headers: 'PIC Time, picTime', desc: 'As commander (min)' },
              { name: 'Dual Time', headers: 'Dual Time, dualTime', desc: 'Training time (min)' },
              { name: 'Instructor Time', headers: 'Instructor Time, instructorTime', desc: 'As instructor (min)' },
              { name: 'Distance', headers: 'Distance, distance', desc: 'Flight distance in km' },
              { name: 'Remarks', headers: 'Remarks, remarks', desc: 'Any text' }
            ],
            example: 'Date,Dep,Arr,Model,Reg,Launch Method,Total,PIC Name,Launches\n2023-06-15,EPAE,EPAE,ASK-21,SP-3456,WINCH,02:15,SMITH,1'
          },
          // ANCHOR - CSV Fields: Simulator
          simulator: {
            fields: [
              { name: 'Date (Required)', headers: 'Date, date, Data', desc: 'Format YYYY-MM-DD' },
              { name: 'FSTD Type (Required)', headers: 'FSTD Type, fstdType', desc: 'FFS, FNPT_I, FNPT_II, FTD, BITD' },
              { name: 'FSTD Qualification', headers: 'FSTD Qualification, fstdQualification', desc: 'e.g., A320, B737, Generic' },
              { name: 'Simulated Aircraft Type', headers: 'Aircraft Type, aircraftType', desc: 'Type of simulated aircraft' },
              { name: 'Session Time', headers: 'Total Time, totalTime, Session Time', desc: 'HH:MM format or minutes' },
              { name: 'Exercise Type', headers: 'Exercise, exercise', desc: 'Description of exercise performed' },
              { name: 'Instructor Name', headers: 'Instructor Name, instructorName', desc: 'Supervising instructor name' },
              { name: 'Remarks', headers: 'Remarks, remarks', desc: 'Any text' }
            ],
            example: 'Date,FSTD Type,Aircraft Type,Total Time,Exercise\n2023-07-10,FNPT_II,C172,02:00,IFR Training'
          }
        }
      },
      // SECTION - Field Descriptions by Logbook Type
      fields: {
        title: 'Logbook Field Descriptions',
        // ANCHOR - Fields: Aircraft
        aircraft: {
          date: 'Date of flight in DD.MM.YYYY format.',
          departure: 'Departure place - ICAO airport code (e.g., EGLL) and off-block time in UTC.',
          arrival: 'Arrival place - ICAO airport code and on-block time in UTC.',
          aircraftType: 'Type, model, and variant of aircraft (e.g., Cessna 152, PA-28-161).',
          registration: 'Aircraft registration marks (e.g., G-ABCD).',
          singlePilotSE: 'Flight time as sole pilot on single-engine aircraft.',
          singlePilotME: 'Flight time as sole pilot on multi-engine aircraft.',
          multiPilot: 'Flight time in multi-crew operations requiring minimum two pilots.',
          totalTime: 'Total flight time from off-block to on-block.',
          picName: 'Name of Pilot-in-Command. For self-flights enter SELF.',
          landingsDay: 'Number of landings performed during day.',
          landingsNight: 'Number of landings performed at night.',
          nightTime: 'Flight time at night (as defined by national regulations).',
          ifrTime: 'Flight time under IFR.',
          picTime: 'Time as Pilot-in-Command.',
          copilotTime: 'Time as Co-Pilot in multi-crew operations.',
          dualTime: 'Training time with instructor (Dual Instruction Received).',
          instructorTime: 'Time as instructor training another pilot.',
          remarks: 'Remarks about the flight, e.g., type of task, route, conditions.'
        },
        // ANCHOR - Fields: Glider
        glider: {
          date: 'Date of glider flight.',
          departure: 'Departure place - airfield or landing site.',
          arrival: 'Arrival/landing place.',
          gliderType: 'Glider type and model (e.g., ASK-21, Discus-2).',
          registration: 'Glider registration marks.',
          launchMethod: 'Launch method: Winch, Aerotow, Self-launch, or Bungee.',
          totalTime: 'Total glider flight time.',
          picName: 'Name of glider pilot-in-command.',
          launches: 'Number of launches on that day.',
          picTime: 'Time as glider commander.',
          dualTime: 'Training time (dual instruction with instructor).',
          instructorTime: 'Time as glider instructor FI(S).',
          distance: 'Flight distance in kilometers (for cross-country flights).',
          operationalConditions: 'Operational conditions: cloud flying, aerobatics, night.',
          remarks: 'Remarks about the flight.'
        },
        // ANCHOR - Fields: Simulator
        simulator: {
          date: 'Date of simulator session.',
          fstdType: 'FSTD device type: FFS (Full Flight Simulator), FNPT I/II, FTD, BITD.',
          fstdQualification: 'FSTD qualification - determines fidelity level (e.g., Level D).',
          aircraftType: 'Type of simulated aircraft.',
          totalTime: 'Duration of simulator session.',
          exercise: 'Type of exercise or scenario performed.',
          instructorName: 'Name of supervising instructor.',
          remarks: 'Remarks and additional entries.'
        }
      },
      // SECTION - Aviation Terminology
      terms: {
        title: 'Aviation Terminology',
        items: [
          { term: 'PIC', def: 'Pilot-in-Command - pilot designated as being in command and charged with the safe conduct of the flight.' },
          { term: 'SPIC', def: 'Student Pilot-in-Command - student pilot acting as commander under instructor supervision in the same aircraft.' },
          { term: 'PICUS', def: 'Pilot-in-Command Under Supervision - pilot performing the duties of a PIC under supervision, but not as instructor.' },
          { term: 'COP', def: 'Co-Pilot - pilot performing pilot functions other than commander, excluding student pilots.' },
          { term: 'Dual', def: 'Training time with instructor (dual controls). Instructor provides training, student logs time as Dual.' },
          { term: 'FI', def: 'Flight Instructor - instructor holding privileges to conduct practical training.' },
          { term: 'FI(S)', def: 'Flight Instructor (Sailplane) - glider flight instructor.' },
          { term: 'FE', def: 'Flight Examiner - examiner authorized to conduct practical tests.' },
          { term: 'IFR', def: 'Instrument Flight Rules - rules for flight by reference to instruments without visual reference to terrain.' },
          { term: 'VFR', def: 'Visual Flight Rules - rules for flight by visual reference to terrain.' },
          { term: 'Night', def: 'Night flight - flight between end of evening civil twilight and beginning of morning civil twilight.' },
          { term: 'SE', def: 'Single Engine - single-engine aircraft.' },
          { term: 'ME', def: 'Multi Engine - multi-engine aircraft.' },
          { term: 'SP', def: 'Single Pilot - operations conducted by one pilot.' },
          { term: 'MP', def: 'Multi Pilot - operations requiring multi-crew (minimum two pilots).' },
          { term: 'Block Time', def: 'Time from off-block to on-block of the aircraft.' },
          { term: 'FSTD', def: 'Flight Simulation Training Device - simulator training device (FFS, FNPT, FTD, BITD).' },
          { term: 'FFS', def: 'Full Flight Simulator - highest fidelity flight simulator.' },
          { term: 'FNPT', def: 'Flight and Navigation Procedures Trainer - flight procedures simulator (I or II).' },
          { term: 'FTD', def: 'Flight Training Device - training device for flight training.' },
          { term: 'BITD', def: 'Basic Instrument Training Device - basic device for instrument training.' },
          { term: 'Cross-country', def: 'Cross-country flight - flight between two different points with landing at a place other than departure.' },
          { term: 'ICAO', def: 'International Civil Aviation Organization - ICAO airport codes consist of 4 letters (e.g., EGLL - London Heathrow).' }
        ]
      },
      // SECTION - EASA Regulations by Logbook Type
      easa: {
        title: 'EASA Regulations',
        intro: 'Below are key excerpts from regulations governing flight logging. Select a tab to see regulations for each logbook type.',
        // ANCHOR - EASA: Aircraft (FCL.050)
        aircraft: {
          regulations: [
            {
              title: 'FCL.050 - Recording of flight time',
              text: 'The pilot shall keep a reliable record of the details of all flights flown in a form and manner established by the competent authority.',
              comment: 'Every pilot is required to maintain a logbook. SimpleLogbook meets electronic format requirements.'
            },
            {
              title: 'AMC1 FCL.050(a) - Required record contents',
              text: 'Each flight entry, or series of flights on the same day ending in a full stop, should contain: (1) holder name and address, (2) date, (3) departure place and time, (4) arrival place and time, (5) aircraft type and registration, (6) flight time for single-engine and multi-engine, (7) total flight time, (8) PIC name, (9) number of landings, (10) operational conditions (night, IFR), (11) pilot function time (PIC, Co-pilot, Dual, Instructor).',
              comment: 'The flight entry form in SimpleLogbook contains all these fields.'
            },
            {
              title: 'AMC1 FCL.050(a)(3) - Pilot functions',
              text: 'Flight time may be logged as PIC time, Co-pilot time, Dual instruction received, Instructor time, or a combination thereof.',
              comment: 'The app automatically totals time in each category.'
            },
            {
              title: 'Flight time definition (Block Time)',
              text: 'Aircraft flight time is the total time from the moment an aircraft first moves under its own power for the purpose of taking off until it comes to rest at the end of the flight.',
              comment: 'In SimpleLogbook, entries cover time from off-block to on-block.'
            }
          ]
        },
        // ANCHOR - EASA: Glider (SFCL.050)
        glider: {
          regulations: [
            {
              title: 'SFCL.050 - Recording of glider flight time',
              text: 'A sailplane pilot or balloon pilot shall keep a reliable and up-to-date record of the details of all flights conducted.',
              comment: 'The Glider tab enables maintaining a logbook compliant with PART SFCL.'
            },
            {
              title: 'AMC1 SFCL.050 - Required glider record contents',
              text: 'Each entry should contain: (1) date, (2) departure and landing place, (3) glider type and registration, (4) launch method (winch, aerotow, self-launch), (5) flight time, (6) cumulative time on page, (7) PIC or instructor name, (8) pilot function during that flight.',
              comment: 'The glider flight entry form contains all required fields.'
            },
            {
              title: 'SFCL.050(c) - Glider flight time',
              text: 'Glider flight time is counted from the moment the launch begins until the landing is completed.',
              comment: 'Unlike powered aircraft, glider time counts from launch to landing completion.'
            },
            {
              title: 'AMC1 SFCL.050(a) - Additional information',
              text: 'Entries may include additional information such as: cross-country distance, operational conditions (cloud flying, aerobatics, night flying).',
              comment: 'Distance and operational condition fields are available in the form.'
            }
          ]
        },
        // ANCHOR - EASA: Simulator (FSTD)
        simulator: {
          regulations: [
            {
              title: 'FCL.025(b) - Recording FSTD time',
              text: 'Training time on FSTD (Flight Simulation Training Devices) is recorded separately from actual flight time.',
              comment: 'The Simulator tab allows separate logging of training sessions.'
            },
            {
              title: 'AMC1 FCL.025(b) - Required FSTD record contents',
              text: 'Each FSTD session entry should contain: (1) date, (2) FSTD type (FFS, FNPT I, FNPT II, FTD, BITD), (3) device qualification, (4) simulated aircraft type, (5) session duration, (6) exercise type performed, (7) instructor name.',
              comment: 'The simulator session form contains all required fields.'
            },
            {
              title: 'FSTD device classification',
              text: 'FFS (Full Flight Simulator) - highest fidelity level. FNPT I/II (Flight and Navigation Procedures Trainer). FTD (Flight Training Device). BITD (Basic Instrument Training Device).',
              comment: 'Selecting FSTD type is mandatory when adding a session.'
            },
            {
              title: 'FCL.060 - Crediting simulator time',
              text: 'Training time on FSTD may be credited toward experience requirements only when the device is appropriately qualified and training is conducted under a qualified instructor.',
              comment: 'Recording the instructor name for each session is recommended.'
            }
          ]
        }
      },
      // SECTION - Interface Description
      interface: {
        title: 'Interface Guide',
        buttons: [
					{ icon: 'Printer', name: 'Print', desc: 'Opens print view optimized for paper format.' },
          { icon: 'Plus', name: 'New flight / New session', desc: 'Opens form to add a new entry.' },
					{ icon: 'Upload', name: 'Import CSV', desc: 'Uploads entries from CSV file.' },
					{ icon: 'Download', name: 'Export CSV', desc: 'Downloads all entries in CSV format.' },
          { icon: 'Megaphone', name: 'Changelog', desc: 'Shows update history and new features.' },
          { icon: 'HelpCircle', name: 'Help', desc: 'Opens this help page.' },
          { icon: 'Settings', name: 'Settings', desc: 'App configuration: theme, language, entries deletion.' },
					{icon: 'User', name: 'Profile', desc: 'User profile information.'}
        ]
      },
      // SECTION - About
      about: {
        title: 'About',
        author: 'Author: Dominik Czekański',
        email: 'Contact: contact@czekanski.dev',
        github: 'GitHub: https://github.com/czekanskyy/SimpleLogbook',
        disclaimer: 'Disclaimer: This software is a helper tool. Official aviation documentation should be maintained according to legal requirements of the competent authority. The author is not responsible for data errors or data loss.',
        version: 'Version 1.0.8'
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
    
    // Version 1.0.6
    v106_mobileMenu: 'Improved mobile menu (wider, better positioning)',
    v106_flightCard: 'Enhanced flight card view on mobile devices',
    v106_pagination: 'Fixed pagination layout on small screens',
    v106_importButton: 'Unified import button styling',
    v106_fixes: 'Responsiveness fixes and minor improvements',

    // Version 1.0.5
    v105_email: 'Added email notifications for new user registrations',
    v105_help: 'Expanded help section with detailed CSV import guide',
    v105_footer: 'Updated footer (dynamic year, corrected author info)',
    v105_about: 'Added logo (favicon) and contact link in About section',
    v105_fixes: 'Bug fixes and stability improvements',

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
    valIfr: 'IFR time cannot be greater than Total Time',

    // Logbook Tabs
    tabAircraft: 'Aircraft',
    tabGlider: 'Glider',
    tabSimulator: 'Simulator',

    // Glider Logbook (PART SFCL.050)
    glider: 'Glider',
    gliderModel: 'Glider type',
    gliderReg: 'Registration',
    launchMethod: 'Launch method',
    launchWinch: 'Winch',
    launchAerotow: 'Aerotow',
    launchSelf: 'Self-launch',
    launchGravity: 'Gravity',
    launchBungee: 'Bungee',
    launchAutotow: 'Autotow',
    pilotFunction: 'Pilot function',
    pilotFuncPIC: 'PIC',
    pilotFuncDUAL: 'DUAL',
    pilotFuncFI: 'FI(S)/BI(S)',
    pilotFuncFE: 'FE(S)',
    launches: 'Launches',
    distance: 'Distance [km]',
    dualTimeGlider: 'Dual',
    instructorTimeGlider: 'Instructor',
    operationalConditions: 'Operational conditions',
    condCloud: 'Cloud flying',
    condAerobatic: 'Aerobatic',
    condNight: 'Night',
    remarksTask: 'Task, Exercise, Flight conditions',
    addGliderFlight: 'New flight',
    editGliderFlight: 'Edit Glider Flight',

    // Simulator Logbook (FSTD)
    simulator: 'Simulator',
    fstdType: 'FSTD Type',
    fstdFFS: 'FFS (Full Flight Simulator)',
    fstdFNPT_I: 'FNPT I',
    fstdFNPT_II: 'FNPT II',
    fstdFTD: 'FTD (Flight Training Device)',
    fstdBITD: 'BITD (Basic Instrument Training Device)',
    fstdQualification: 'FSTD qualification number',
    simulatedAircraftType: 'Simulated aircraft type',
    sessionTime: 'Session time',
		additionalRemarks: 'Additional info',
    exercise: 'Exercise type',
    exerciseRemarks: 'Remarks and entries',
    instructorName: 'Instructor name',
    excludeFromTotal: 'Exclude from total time',
    addSimulatorSession: 'New FSTD session',
    editSimulatorSession: 'Edit FSTD Session',
    newFlight: 'New flight',
    newSession: 'New FSTD session',

    // Changelog v1.0.8
    v108_gliderDistance: 'Added "Distance" field to glider logbook',
    v108_launchMethods: 'Updated glider launch methods (full names)',
    v108_helpPage: 'Improved Help page and navigation (back button)',
    v108_uiImprovements: 'UI improvements for add flight form',
    v108_translations: 'Translation fixes (PL/EN)',

    // Changelog v1.0.7
    v107_logbookSplit: 'Split logbook into 3 categories (Aircraft, Glider, Simulator)',
    v107_globalDelete: 'Global data deletion option (Danger Zone)',
    v107_hubPage: 'New Hub home page',
    v107_uiRefinements: 'Minor UI refinements'
  }
}
