import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  currencies$: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  getCurrency():Observable<any> {
    return this.http.get('https://api.currencyapi.com/v3/latest?apikey=cur_live_qp0MdHwKya72UT3WeZUk27K6dbnZWF4ZVR9HPOCw&currencies=EUR%2CUSD&base_currency=UAH');
  }

}
