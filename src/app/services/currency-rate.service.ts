import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {Currency} from "../model/currency";
import {RatesUpdateService} from "./rates-update-service";
import {CurrencyPairRates} from "../model/currency-pair-rates";

@Injectable()
export class CurrencyRateService implements RatesUpdateService<CurrencyPairRates> {

  private _apiRoot: string = "http://apilayer.net/api/live";
  private _accessKey: string = "b18abf4e7081ba3dcaeaf584406a6931";
  private _baseCurrency: Currency = new Currency("USD", "US$", "US Dollar", "$", 0, 0, 0);
  private _search: URLSearchParams;
  private _requestOptions: RequestOptions;

  constructor(private http: Http, private requestOptions: RequestOptions) {
    this.search = new URLSearchParams();
    this._requestOptions = requestOptions;
  }

  getUpdatedCurrencyRates(quoteCurrencyCodes: string[]): Observable<CurrencyPairRates[]> {
    this.search.set("access_key", this.accessKey);
    this.search.set("source", this.baseCurrency.code);
    this.search.set("currencies", quoteCurrencyCodes.join());
    this._requestOptions.search = this.search;

    return this.http.get('assets/data/currency.json')
      .switchMap(res => {
        let currenciesJson = res.json();
        return this.http.get(this.apiRoot, this.requestOptions)
          .map(res => {
            let currencyQuotes = res.json();
            let currencyPairRatesList = [];
            for (let ccy of quoteCurrencyCodes) {
              let quoteCurrencyJson = currenciesJson[ccy];
              let timestamp = currencyQuotes.timestamp;
              let spotRate = currencyQuotes.quotes[this.baseCurrency.code + quoteCurrencyJson.code];
              let supplierBuyRate = spotRate + (quoteCurrencyJson.supp_perc / 100 * spotRate);
              let supplierSellRate = spotRate - (quoteCurrencyJson.supp_perc / 100 * spotRate);
              let buyRate = spotRate + (quoteCurrencyJson.buy_profit_perc / 100 * spotRate);
              let sellRate = spotRate - (quoteCurrencyJson.sell_profit_perc / 100 * spotRate);
              let quoteCurrency = new Currency(
                quoteCurrencyJson.code,
                quoteCurrencyJson.symbol,
                quoteCurrencyJson.name,
                quoteCurrencyJson.symbol_native,
                quoteCurrencyJson.supp_perc,
                quoteCurrencyJson.buy_profit_perc,
                quoteCurrencyJson.sell_profit_perc,
                quoteCurrencyJson.decimal_digits,
                quoteCurrencyJson.rounding,
                quoteCurrencyJson.name_plural
              );
              let temp = new CurrencyPairRates(
                this.baseCurrency,
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
            return currencyPairRatesList;
          })
      });
  }

  get apiRoot(): string {
    return this._apiRoot;
  }

  get accessKey(): string {
    return this._accessKey;
  }


  get baseCurrency(): Currency {
    return this._baseCurrency;
  }

  set baseCurrency(value: Currency) {
    this._baseCurrency = value;
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