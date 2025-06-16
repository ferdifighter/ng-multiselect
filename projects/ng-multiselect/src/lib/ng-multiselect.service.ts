import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MultiSelectOption } from './ng-multiselect.component';

export interface DataSourceConfig {
  type: 'mysql' | 'postgres' | 'mssql' | 'sqlite';
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  table: string;
  valueField: string;
  labelField: string;
  disabledField?: string;
  where?: string;
  orderBy?: string;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NgMultiselectService {
  constructor(private http: HttpClient) {}

  /**
   * Lädt Daten aus einer Datenbank über eine REST-API
   */
  loadFromDatabase(config: DataSourceConfig): Observable<MultiSelectOption[]> {
    return this.http.post<MultiSelectOption[]>('/api/multiselect/load', config);
  }

  /**
   * Lädt Daten aus einer lokalen JSON-Datei
   */
  loadFromJson(jsonData: any[], config: { valueField: string; labelField: string; disabledField?: string }): MultiSelectOption[] {
    return jsonData.map(item => ({
      value: item[config.valueField],
      label: item[config.labelField],
      disabled: config.disabledField ? item[config.disabledField] : false
    }));
  }

  /**
   * Lädt Daten aus einem Array von Objekten
   */
  loadFromArray<T>(data: T[], config: { valueField: keyof T; labelField: keyof T; disabledField?: keyof T }): MultiSelectOption[] {
    return data.map(item => ({
      value: item[config.valueField] as string | number,
      label: String(item[config.labelField]),
      disabled: config.disabledField ? Boolean(item[config.disabledField]) : false
    }));
  }
}
