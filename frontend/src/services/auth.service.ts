import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment as env } from '../environments/environment';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService{

    private url = `${env.baseUrl}`;

    constructor(
        private http: HttpClient,
    ){}

    set Token(token: string){
        localStorage.setItem("token",token);
    }

    get Token(): string {
        return localStorage.getItem("token");
    }
    
    get User(): User{
        const tempToken = this.Token;
        if(tempToken == null) return null;
        const newJwthelper = new JwtHelperService;
        const decoded = newJwthelper.decodeToken(tempToken);
        return decoded;
    }

    login(username: string, password: string): Observable<{token: string}>{
        return this.http.post<{token: string}>(`${this.url}/login`, {username: username, password: password});
    }

    logout(): void{
        const token = localStorage.getItem("token")
        localStorage.removeItem("token");
        //const temp = this.http.post<{messege: string}>(`${this.url}/logout`, {token: token});
        this.http.post<{messege: string}>(`${this.url}/logout`, {token: token}).subscribe({
            next:
              (response:any) => {
            },
            error:
            (err:any) => 
			{
			 console.log(err)
			}
        });
    }

    register(username:string , password:string, role: string): Observable<{messege: string}>{
        const temp = this.http.post<{messege: string}>(`${this.url}/users`,{username: username, password: password, role: role});
        return temp;
    }

    isLoggedIn(): boolean{
        return this.Token != null;
    }

    isAdmin(): boolean {
        if(this.Token == null || this.User.role.toLowerCase() != "administrator")
            return false;

        return true;
    }
}