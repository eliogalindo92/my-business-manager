import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

saveUser(user: string, role: string){
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('val', role);

}
forgetUser(){
    sessionStorage.clear();
}
getUser(): any{
    return sessionStorage.getItem('user');
}
  getRole(): any{

  }
}
