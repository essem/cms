import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ITable, ICol } from 'cms-lib';

@Injectable()
export class CommonService {
  constructor(
    private http: HttpClient,
  ) {}

  getRoots(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/roots');
  }

  getList(tableName: string): Observable<ITable> {
    return this.http.get<ITable>(`http://localhost:3000/common/${tableName}`);
  }

  getDetail(tableName: string, id: number): Observable<any> {
    return this.http.get<ITable>(`http://localhost:3000/common/${tableName}/${id}`);
  }
}
