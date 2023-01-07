import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContryServiceService   {

  constructor(public http:HttpClient ) { }
  
  public getALLContryApi(){
    let myData = this.http.get<any>("https://restcountries.com/v2/all");
    return myData

  }
}

