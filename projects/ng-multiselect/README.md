# NgMultiselect

Eine Angular Multiselect-Komponente mit Gruppierungsfunktion. Die Komponente unterstützt:
- Mehrfachauswahl von Elementen
- Gruppierung von Optionen
- Suchfunktion
- Anpassbare Anzeige der Elemente
- Responsive Design
- Vorauswahl von Elementen

## Installation

```bash
npm install @ferdifighter/ng-multiselect
```

## Verwendung

```typescript
import { NgMultiselectComponent, MultiSelectOption, MultiSelectOptgroup } from '@ferdifighter/ng-multiselect';

@Component({
  // ...
  imports: [NgMultiselectComponent]
})
export class AppComponent {
  // Beispiel für gruppierte Optionen
  gruppen: MultiSelectOptgroup[] = [
    {
      label: 'Gruppe 1',
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' }
      ]
    },
    {
      label: 'Gruppe 2',
      options: [
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4' }
      ]
    }
  ];

  // Vorauswahl von Elementen
  vorauswahl: MultiSelectOption[] = [
    { value: '1', label: 'Option 1' }
  ];

  // Optionale Anzeige-Funktion
  anzeigeFunktion = (option: MultiSelectOption) => option.label;

  // Event-Handler für Auswahländerungen
  onSelection(auswahl: MultiSelectOption[]) {
    console.log('Ausgewählte Elemente:', auswahl);
  }
}
```

```html
<lib-ng-multiselect
  [optgroups]="gruppen"
  [useOptgroups]="true"
  [placeholder]="'Bitte wählen...'"
  [selectedTitle]="'Meine Auswahl'"
  [selected]="vorauswahl"
  [displayWith]="anzeigeFunktion"
  (selectionChange)="onSelection($event)">
</lib-ng-multiselect>
```

## Optionen

### Inputs

| Option          | Typ                       | Standardwert           | Beschreibung                                  |
|-----------------|--------------------------|------------------------|------------------------------------------------|
| options         | MultiSelectOption[]       | []                     | Flache Liste von Optionen                      |
| optgroups       | MultiSelectOptgroup[]     | []                     | Gruppierte Optionen                            |
| useOptgroups    | boolean                  | false                  | true = Gruppenmodus, false = flache Liste      |
| placeholder     | string                   | 'Suchen...'            | Platzhaltertext für die Suche                  |
| selectedTitle   | string                   | 'Ausgewählte Elemente' | Titel für den Bereich der ausgewählten Elemente |
| selected        | MultiSelectOption[]       | []                     | Vorauswahl von Elementen                       |
| displayWith     | Funktion                 | undefined              | Optionale Anzeige-Funktion für Labels          |

### Outputs

| Event           | Typ                       | Beschreibung                                  |
|-----------------|--------------------------|------------------------------------------------|
| selectionChange | MultiSelectOption[]       | Wird bei jeder Auswahländerung ausgelöst       |

### Interfaces

```typescript
interface MultiSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  groupLabel?: string;
}

interface MultiSelectOptgroup {
  label: string;
  options: MultiSelectOption[];
  disabled?: boolean;
}
```

## Beispiel: Statische Daten

```typescript
// Komponente
import { MultiSelectOptgroup, MultiSelectOption } from 'ng-multiselect';

export class ExampleComponent {
  gruppen: MultiSelectOptgroup[] = [
    {
      label: 'Gruppe A',
      options: [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' }
      ]
    },
    {
      label: 'Gruppe B',
      options: [
        { value: 3, label: 'Option 3' }
      ]
    }
  ];
  anzeigeFunktion = (option: MultiSelectOption) => option.label;
  onSelection(auswahl: MultiSelectOption[]) {
    console.log(auswahl);
  }
}
```

## Beispiel: Asynchrone Daten (z.B. REST, TypeORM)

```typescript
import { NgMultiselectService, MultiSelectOption } from 'ng-multiselect';

export class ExampleComponent {
  optionen: MultiSelectOption[] = [];
  constructor(private msService: NgMultiselectService) {}

  ngOnInit() {
    this.msService.loadFromDatabase({
      type: 'mysql',
      host: 'localhost',
      database: 'test',
      table: 'users',
      valueField: 'id',
      labelField: 'name'
    }).subscribe(data => this.optionen = data);
  }
}
```

## Weitere Hinweise
- Die Komponente ist für die Nutzung in eigenen Projekten und als npm-Paket vorbereitet.
- Für Backend-Anbindung (z.B. TypeORM/NestJS) siehe Beispiel im `example`-Ordner.
- Für Styling kann die SCSS-Datei angepasst werden.