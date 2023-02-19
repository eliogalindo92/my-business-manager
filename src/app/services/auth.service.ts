import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

saveSession(name: string, token: string){
    sessionStorage.setItem('user', name);
    sessionStorage.setItem('token', token);
}
forgetSession(){
    sessionStorage.clear();
}
getUser(): any{
    return sessionStorage.getItem('user');
}
getToken(){
    return sessionStorage.getItem('token');
}
}
