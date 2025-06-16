import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: false })
  isDisabled: boolean;
}

// Beispiel für die Verwendung in einer Komponente:
/*
import { Component, OnInit } from '@angular/core';
import { NgMultiselectComponent, DataSourceConfig } from 'ng-multiselect';

@Component({
  selector: 'app-user-selector',
  template: `
    <lib-ng-multiselect
      [dataSource]="dataSource"
      [placeholder]="'Benutzer suchen...'"
      (selectionChange)="onSelectionChange($event)">
    </lib-ng-multiselect>
  `,
  imports: [NgMultiselectComponent]
})
export class UserSelectorComponent implements OnInit {
  dataSource: DataSourceConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'myapp',
    table: 'user',
    valueField: 'id',
    labelField: 'name',
    disabledField: 'isDisabled',
    orderBy: 'name ASC',
    limit: 100
  };

  onSelectionChange(selected: any[]) {
    console.log('Ausgewählte Benutzer:', selected);
  }
}
*/ 