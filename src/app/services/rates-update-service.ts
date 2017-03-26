import {Observable} from "rxjs";

export interface RatesUpdateService<T> {
  getUpdatedCurrencyRates(quoteCurrencyCodes: string[]): Observable<T[]>;
}
