import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, ProductData } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private productsURL = new URL('https://dummyjson.com/products');
  private headerOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  all(): Observable<ProductData> {
    return this.httpClient.get<ProductData>(this.productsURL.href, this.headerOptions);
  }

  byId(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.productsURL.href + `/${id}`, this.headerOptions);
  }
}
