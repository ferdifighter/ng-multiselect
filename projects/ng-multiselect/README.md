# NgMultiselect

**ng-multiselect** ist eine flexible Angular-Komponente für die Mehrfachauswahl mit Gruppierung, Suche und asynchronen Datenquellen. Ideal für Projekte, die eine komfortable Auswahl von Elementen benötigen.

---

## Installation

```bash
npm install ng-multiselect
```

---

## Einbindung in dein Angular-Projekt

1. **Import in deiner Komponente:**

```typescript
import { NgMultiselectComponent, MultiSelectOption, MultiSelectOptgroup } from 'ng-multiselect';
```

2. **Verwendung im Template:**

**Mit Gruppen:**
```html
<lib-ng-multiselect
  [optgroups]="gruppen"
  [useOptgroups]="true"
  [placeholder]="'Bitte wählen...'"
  [displayWith]="anzeigeFunktion"
  (selectionChange)="onSelection($event)">
</lib-ng-multiselect>
```

**Ohne Gruppen:**
```html
<lib-ng-multiselect
  [options]="optionen"
  [placeholder]="'Bitte wählen...'"
  (selectionChange)="onSelection($event)">
</lib-ng-multiselect>
```

---

## Inputs & Outputs

| Input           | Typ                       | Beschreibung                                  |
|-----------------|--------------------------|------------------------------------------------|
| options         | MultiSelectOption[]       | Flache Liste von Optionen                      |
| optgroups       | MultiSelectOptgroup[]     | Gruppierte Optionen                            |
| useOptgroups    | boolean                  | true = Gruppenmodus, false = flache Liste      |
| placeholder     | string                   | Platzhaltertext für die Suche                  |
| displayWith     | Funktion                 | Optionale Anzeige-Funktion für Labels          |

| Output          | Typ                       | Beschreibung                                  |
|-----------------|--------------------------|------------------------------------------------|
| selectionChange | MultiSelectOption[]       | Wird bei jeder Auswahländerung ausgelöst       |

---

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

---

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

---

## Weitere Hinweise
- Die Komponente ist für die Nutzung in eigenen Projekten und als npm-Paket vorbereitet.
- Für Backend-Anbindung (z.B. TypeORM/NestJS) siehe Beispiel im `example`-Ordner.
- Für Styling kann die SCSS-Datei angepasst werden.

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build ng-multiselect
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/ng-multiselect
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
