import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ServerResponse {
  success: boolean;
  data: any;
  error: string;
}

export interface Credentials {
  phone: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  tryLogin(creds: Credentials) {
    return this.http.post<ServerResponse>('http://localhost:8000/login', creds);
  }

  getPaymentDetails() {
    return this.http.get<ServerResponse>('http://localhost:8000/balance');
  }
}
