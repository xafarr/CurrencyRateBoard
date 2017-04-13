import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Currency} from "../model/currency";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class CurrencyService implements OnInit {

  private _url = "assets/data/currency.json";

  constructor(private http: Http) {
  }

  ngOnInit(): void {
  }

  get currenciesMapObservable(): Observable<Map<string, Currency>> {
    return this.http.get(this._url)
      .map(res => {
        let jsonData = res.json();
        let currenciesMap = new Map<string, Currency>();
        Object.keys(jsonData).forEach((key) => {
          currenciesMap.set(key, new Currency(
            jsonData[key].code,
            jsonData[key].symbol,
            jsonData[key].name,
            jsonData[key].symbol_native,
            jsonData[key].supp_perc,
            jsonData[key].buy_profit_perc,
            jsonData[key].sell_profit_perc,
            jsonData[key].decimal_digits,
            jsonData[key].rounding,
            jsonData[key].name_plural
          ));
        });
        return currenciesMap;
      });
  }
}
