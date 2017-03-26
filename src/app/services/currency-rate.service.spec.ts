/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrencyRateService } from './currency-rate.service';

describe('CurrencyRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyRateService]
    });
  });

  it('should ...', inject([CurrencyRateService], (service: CurrencyRateService) => {
    expect(service).toBeTruthy();
  }));
});
