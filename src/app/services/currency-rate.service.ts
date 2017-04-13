import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Currency} from "../model/currency";
import {RatesUpdateService} from "./rates-update-service";
import {CurrencyPairRates} from "../model/currency-pair-rates";

@Injectable()
export class CurrencyRateService implements RatesUpdateService<CurrencyPairRates> {
  private _apiRoot: string = "https://apilayer.net/api/live";
  private _accessKey: string = "4dd9d8970787d53bd1a1193244fe65e1";
  private _search: URLSearchParams;

  constructor(private http: Http, private requestOptions: RequestOptions) {
    this.search = new URLSearchParams();
  }

  getUpdatedCurrencyRates(baseCurrency: Currency, quoteCurrencies: Currency[]): Observable<CurrencyPairRates[]> {
    this.search.set("access_key", this.accessKey);
    this.search.set("source", baseCurrency.code);
    this.search.set("currencies", quoteCurrencies.map(ccy => ccy.code).join(","));
    this.requestOptions.search = this.search;

    return this.http.get(this.apiRoot, this.requestOptions)
      .map(res => {
        let currencyQuotes = res.json();
        let currencyPairRatesList = [];

        if (currencyQuotes.success) {
          for (let quoteCurrency of quoteCurrencies) {
            let timestamp = currencyQuotes.timestamp;
            let spotRate = currencyQuotes.quotes[baseCurrency.code + quoteCurrency.code];
            let supplierBuyRate = spotRate + (quoteCurrency.supplierPercentage / 100 * spotRate);
            let supplierSellRate = spotRate - (quoteCurrency.supplierPercentage / 100 * spotRate);
            let buyRate = spotRate + (quoteCurrency.buyPercentage / 100 * spotRate);
            let sellRate = spotRate - (quoteCurrency.sellPercentage / 100 * spotRate);

            let temp = new CurrencyPairRates(
              baseCurrency,
              quoteCurrency,
              timestamp,
              spotRate,
              supplierBuyRate,
              supplierSellRate,
              buyRate,
              sellRate
            );
            currencyPairRatesList.push(temp);
          }
        } else {
          console.error(`Error-${currencyQuotes.error.code}: ${currencyQuotes.error.info}`);
        }
        return currencyPairRatesList;
      });
  }

  get apiRoot(): string {
    return this._apiRoot;
  }

  get accessKey(): string {
    return this._accessKey;
  }

  get search(): URLSearchParams {
    return this._search;
  }

  set search(value: URLSearchParams) {
    this._search = value;
  }

  /* get quoteCurrencies(): Array<string> {
   return this._quoteCurrencies;
   }*/
}
