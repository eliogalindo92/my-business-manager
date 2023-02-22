import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

saveSession(name: string, role:string, token: string){
    sessionStorage.setItem('user', name);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
}
forgetSession(){
    sessionStorage.clear();
}
getUser(): any{
    return sessionStorage.getItem('user');
}

getRole(): any{
    return sessionStorage.getItem('role');
}
getToken(): any{
    return sessionStorage.getItem('token');
}
}
