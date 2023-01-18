import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  storeProduct(data: any){
    return this.http.post<any>("http://localhost:3000/products/", data);
  }

  updateProduct(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/products/" + id, data);
  }

  deleteProduct(id: number){
    return this.http.delete<any>("http://localhost:3000/products/" + id);
  }

  getProducts(){
    return this.http.get<any>("http://localhost:3000/products/");
  }
}
