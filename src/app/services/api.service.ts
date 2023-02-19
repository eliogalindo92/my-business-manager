import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  //   Methods for creating  authentication and registration.
   getCSRFCookie(){
    return this.http.get<any>('http://localhost:8000/sanctum/csrf-cookie');
  }
  login(data: any){
    return this.http.post<any>('http://localhost:8000/api/login/', data);
  }
  logout(){
    return this.http.get<any>('http://localhost:8000/api/logout/');
  }
  register(data: any){
    return this.http.post<any>('http://localhost:8000/api/register/', data);
  }

  getUsers(){
    return this.http.get<any>('http://localhost:8000/api/users/');
  }
  deleteUser(id: number){
    return this.http.delete('http://localhost:8000/api/delete-user/' + id);
  }

  // Methods for creating a Product CRUD.
  getProducts(){
    return this.http.get<any>('http://localhost:8000/api/products/');
  }

  storeProduct(data: any){
    return this.http.post<any>('http://localhost:8000/api/store-product/', data);
  }

  updateProduct(data: any, id: number){
    return this.http.put<any>('http://localhost:8000/api/update-product/' + id, data);
  }

  deleteProduct(id: number){
    return this.http.delete<any>('http://localhost:8000/api/delete-product/' + id);
  }


  // Methods for creating a Supplier CRUD.

  getSuppliers(){
    return this.http.get<any>('http://localhost:8000/api/suppliers/');
  }

  storeSupplier(data: any){
    return this.http.post<any>('http://localhost:8000/api/store-supplier/', data);
  }

  updateSupplier(data: any, id: number){
    return this.http.put<any>('http://localhost:8000/api/update-supplier/' + id, data);
  }

  deleteSupplier(id: number){
    return this.http.delete<any>('http://localhost:8000/api/delete-supplier/' + id);
  }
}
