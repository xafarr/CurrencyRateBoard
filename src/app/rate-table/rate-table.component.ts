import {Component, OnDestroy, OnInit} from "@angular/core";
import {CurrencyRateService} from "../services/currency-rate.service";
import {Observable} from "rxjs";
import {Currency} from "../model/currency";
import {CurrencyPairRates} from "../model/currency-pair-rates";
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'rate-table',
  templateUrl: './rate-table.component.html',
  styleUrls: ['./rate-table.component.css'],
  providers: [CurrencyRateService]
})
export class RateTableComponent implements OnInit, OnDestroy {
  private intervalId: any;
  private _results: Observable<CurrencyPairRates[]>;
  private _maxCurrencyRows: number = 12;
  private _baseCurrency;
  private _quoteCurrencies: Currency[];
  private _supportedCurrenciesMap: Map<string, Currency>;
  private _selectedCurrencies: string[] =
    ["USD", "EUR", "GBP", "CAD", "CNY", "HKD",
      "SGD", "JPY", "NZD", "THB", "CHF", "FJD"];

  constructor(private currencyService: CurrencyService, private currencyRateService: CurrencyRateService) {
  }

  ngOnInit() {
    this.currencyService.currenciesMapObservable.subscribe(result => {
        this._supportedCurrenciesMap = result;
      },
      error => {

      },
      () => {
        this._baseCurrency = this.supportedCurrenciesMap.get("AUD");
        this._quoteCurrencies = this._selectedCurrencies.map(val => this.supportedCurrenciesMap.get(val));
        this._results = this.updateCurrencyRates(this.baseCurrency, this.quoteCurrencies);
        this.intervalId = setInterval(() => this._results = this.updateCurrencyRates(this.baseCurrency, this.quoteCurrencies), 3600000);
      });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateCurrencyRates(baseCurrency: Currency, quoteCurrencies: Currency[]): Observable<CurrencyPairRates[]> {
    return this.currencyRateService.getUpdatedCurrencyRates(baseCurrency, quoteCurrencies);
  }

  get maxCurrencyRows(): number {
    return this._maxCurrencyRows;
  }

  private updateCurrencyTable(res: Object) {

  }

  get quoteCurrencies(): Currency[] {
    return this._quoteCurrencies;
  }

  get results(): Observable<CurrencyPairRates[]> {
    return this._results;
  }

  get baseCurrency() {
    return this._baseCurrency;
  }

  get supportedCurrenciesMap(): Map<string, Currency> {
    return this._supportedCurrenciesMap;
  }
}
