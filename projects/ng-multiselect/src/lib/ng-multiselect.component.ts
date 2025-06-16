import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MultiSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  groupLabel?: string;
}

export interface MultiSelectOptgroup {
  label: string;
  options: MultiSelectOption[];
  disabled?: boolean;
}

@Component({
  selector: 'lib-ng-multiselect',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ms-container">
      <div class="ms-selectable">
        <div class="ms-header">
          <input type="text" class="ms-search" [placeholder]="placeholder" [(ngModel)]="searchText" (ngModelChange)="filterOptions()">
        </div>
        <ul class="ms-list">
          <ng-container *ngIf="!useOptgroups">
            <li *ngFor="let option of filteredOptions"
                [class.ms-selected]="isSelected(option)"
                [class.ms-disabled]="option.disabled"
                (click)="toggleSelection(option)">
              <ng-container *ngIf="displayWith; else defaultOption">
                {{ displayWith(option) }}
              </ng-container>
              <ng-template #defaultOption>{{ option.label }}</ng-template>
            </li>
          </ng-container>
          <ng-container *ngIf="useOptgroups">
            <li *ngFor="let group of filteredOptgroups" class="ms-optgroup">
              <div class="ms-optgroup-label"
                   [class.ms-disabled]="group.disabled"
                   (click)="toggleOptgroup(group)">
                {{ group.label }}
              </div>
              <ul class="ms-optgroup-options">
                <li *ngFor="let option of group.options"
                    [class.ms-selected]="isSelected(option)"
                    [class.ms-disabled]="option.disabled"
                    (click)="toggleSelection(option, group.label)">
                  <ng-container *ngIf="displayWith; else defaultOptionGroup">
                    {{ displayWith(option) }}
                  </ng-container>
                  <ng-template #defaultOptionGroup>{{ option.label }}</ng-template>
                </li>
              </ul>
            </li>
          </ng-container>
        </ul>
      </div>
      <div class="ms-selection">
        <div class="ms-header">
          <span>Ausgewählte Elemente</span>
        </div>
        <ng-container *ngIf="useOptgroups; else flatSelected">
          <ng-container *ngFor="let group of selectedGrouped">
            <div class="ms-optgroup-label" (click)="removeOptgroup(group.group)"><b>{{ group.group }}</b></div>
            <ul class="ms-list">
              <li *ngFor="let option of group.items" (click)="removeSelection(option)">
                <ng-container *ngIf="displayWith; else defaultSelected">
                  {{ displayWith(option) }}
                </ng-container>
                <ng-template #defaultSelected>{{ option.label }}</ng-template>
              </li>
            </ul>
          </ng-container>
        </ng-container>
        <ng-template #flatSelected>
          <ul class="ms-list">
            <li *ngFor="let option of selectedOptions" (click)="removeSelection(option)">
              <ng-container *ngIf="displayWith; else defaultFlatSelected">
                {{ displayWith(option) }}
              </ng-container>
              <ng-template #defaultFlatSelected>{{ option.label }}</ng-template>
            </li>
          </ul>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./ng-multiselect.component.scss']
})
export class NgMultiselectComponent implements OnInit, OnChanges {
  @Input() options: MultiSelectOption[] = [];
  @Input() optgroups: MultiSelectOptgroup[] = [];
  @Input() useOptgroups = false;
  @Input() placeholder = 'Suchen...';
  @Input() displayWith?: (option: MultiSelectOption) => string;
  @Output() selectionChange = new EventEmitter<MultiSelectOption[]>();

  searchText = '';
  filteredOptions: MultiSelectOption[] = [];
  filteredOptgroups: MultiSelectOptgroup[] = [];
  selectedOptions: MultiSelectOption[] = [];

  ngOnInit() {
    this.filterOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filterOptions();
  }

  filterOptions() {
    if (this.useOptgroups) {
      this.filteredOptgroups = this.optgroups.map(group => ({
        ...group,
        options: group.options
          .filter(option => !this.isSelected(option))
          .filter(option =>
            !this.searchText || option.label.toLowerCase().includes(this.searchText.toLowerCase())
          )
      })).filter(group => group.options.length > 0);
    } else {
      this.filteredOptions = this.options
        .filter(option => !this.isSelected(option))
        .filter(option =>
          !this.searchText || option.label.toLowerCase().includes(this.searchText.toLowerCase())
        );
    }
  }

  isSelected(option: MultiSelectOption): boolean {
    return this.selectedOptions.some(selected => selected.value === option.value);
  }

  toggleSelection(option: MultiSelectOption, groupLabel?: string) {
    if (option.disabled) return;
    const index = this.selectedOptions.findIndex(selected => selected.value === option.value);
    if (index === -1) {
      const itemWithGroup = groupLabel ? { ...option, groupLabel } : option;
      this.selectedOptions.push(itemWithGroup);
    } else {
      this.selectedOptions.splice(index, 1);
    }
    this.selectionChange.emit(this.selectedOptions);
    this.filterOptions();
  }

  toggleOptgroup(group: MultiSelectOptgroup) {
    if (group.disabled) return;
    const allSelected = group.options.every(option => this.isSelected(option));
    if (allSelected) {
      group.options.forEach(option => {
        const index = this.selectedOptions.findIndex(selected => selected.value === option.value);
        if (index !== -1) {
          this.selectedOptions.splice(index, 1);
        }
      });
    } else {
      group.options.forEach(option => {
        if (!option.disabled && !this.isSelected(option)) {
          this.selectedOptions.push({ ...option, groupLabel: group.label });
        }
      });
    }
    this.selectionChange.emit(this.selectedOptions);
    this.filterOptions();
  }

  removeSelection(option: MultiSelectOption) {
    const index = this.selectedOptions.findIndex(selected => selected.value === option.value);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
      this.selectionChange.emit(this.selectedOptions);
      this.filterOptions();
    }
  }

  get selectedGrouped(): { group: string, items: MultiSelectOption[] }[] {
    if (!this.useOptgroups) return [];
    return this.optgroups
      .map(g => ({
        group: g.label,
        items: this.selectedOptions.filter(i => i.groupLabel === g.label)
      }))
      .filter(g => g.items.length > 0);
  }

  removeOptgroup(groupLabel: string) {
    this.selectedOptions = this.selectedOptions.filter(opt => opt.groupLabel !== groupLabel);
    this.selectionChange.emit(this.selectedOptions);
    this.filterOptions();
  }
} 