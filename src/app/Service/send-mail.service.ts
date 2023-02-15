import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private http: HttpClient) { }

  public sendMail(data:any):Observable<any>{
    return this.http.post("https://localhost:44389/api/SecretSanta/SendMail",data); 
  }
}
