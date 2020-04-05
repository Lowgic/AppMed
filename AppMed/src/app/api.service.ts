import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from  './order';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1";

  constructor(private httpClient: HttpClient) {}
   public createOrder(order: Order): Observable<Order>{
    return this.httpClient.post<Order>(`${this.PHP_API_SERVER}/api/create.php`, order);
  }
}
