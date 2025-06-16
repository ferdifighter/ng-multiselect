import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgMultiselectComponent, MultiSelectOption, MultiSelectOptgroup } from '../../../ng-multiselect/src/lib/ng-multiselect.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgMultiselectComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Multiselect Beispiel-Auswahl';

  // Allgemeine Beispiel-Optgroups
  feuerwehrGruppen: MultiSelectOptgroup[] = [
    {
      label: 'Obst',
      options: [
        { value: 'apfel', label: 'Apfel' },
        { value: 'banane', label: 'Banane' },
        { value: 'orange', label: 'Orange' }
      ]
    },
    {
      label: 'Gemüse',
      options: [
        { value: 'karotte', label: 'Karotte' },
        { value: 'tomate', label: 'Tomate' },
        { value: 'brokkoli', label: 'Brokkoli' }
      ]
    },
    {
      label: 'Getränke',
      options: [
        { value: 'wasser', label: 'Wasser' },
        { value: 'saft', label: 'Saft' },
        { value: 'kaffee', label: 'Kaffee' }
      ]
    }
  ];

  // Beispiel für eigene Anzeige-Funktion (optional)
  fahrzeugAnzeige = (option: MultiSelectOption) => option.label;

  selectedFlat: MultiSelectOption[] = [];

  onSelection(auswahl: MultiSelectOption[]) {
    this.selectedFlat = auswahl;
    console.log('Auswahl:', auswahl);
  }

  get selectedGrouped() {
    return this.feuerwehrGruppen
      .map(group => ({
        group: group.label,
        items: this.selectedFlat.filter(i => i.groupLabel === group.label)
      }))
      .filter(g => g.items.length > 0);
  }
}
