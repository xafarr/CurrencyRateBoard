import {Component, OnDestroy, OnInit} from "@angular/core";
import {CurrencyRateService} from "../services/currency-rate.service";
import {Observable} from "rxjs";
import {Currency} from "../model/currency";
import {CurrencyPairRates} from "../model/currency-pair-rates";

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
  private _mappingFunction = (jsonResponseData) => {
    let data = jsonResponseData.json();
    console.log(data);
    return data;
  };

  private _quoteCurrencies: Array<string>;

  private _currencyMappingFunction = (res) => {
    let data = res.json();
    let currency = new Currency(data.code, data.symbol, data.name, data.symbol_native, data.decimal_digits, data.rounding, data.name_plural)
    console.log(currency);
    return currency;
  };

  constructor(private currencyRateService: CurrencyRateService) {
    this._quoteCurrencies = [];
    this.quoteCurrencies.unshift(
      "USD", "EUR", "GBP", "CAD", "CNY", "HKD",
      "SGD", "JPY", "NZD", "THB", "CHF", "FJD"
    );
  }

  ngOnInit() {
    let updateCurrencyRates = () => {
      this._results = this.currencyRateService.getUpdatedCurrencyRates("AUD", this.quoteCurrencies);
    };
    updateCurrencyRates();
    this.intervalId = setInterval(updateCurrencyRates, 3600000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  get maxCurrencyRows(): number {
    return this._maxCurrencyRows;
  }

  private updateCurrencyTable(res: Object) {

  }

  get quoteCurrencies(): Array<string> {
    return this._quoteCurrencies;
  }

  get results(): Observable<CurrencyPairRates[]> {
    return this._results;
  }
}
