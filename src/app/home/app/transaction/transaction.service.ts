import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ApiResultTransactions, ApiResultTransaction, Transaction } from './transaction';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getAll(page: number): Observable<ApiResultTransactions>{
    return this.http.get<ApiResultTransactions>(`${API}/entries?page=${page}`);
  }

  getAllByType(page: number, type: number): Observable<ApiResultTransactions>{
    return this.http.get<ApiResultTransactions>(`${API}/entries?page=${page}&typeEntry=${type}`);
  }

  getById(id: number): Observable<ApiResultTransaction>{
    return this.http.get<ApiResultTransaction>(`${API}/entry/${id}`);
  }
}