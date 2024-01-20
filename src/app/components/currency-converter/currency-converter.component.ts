import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  amount1: number = 0;
  currency1: string = 'USD';

  amount2: number = 0;
  currency2: string = 'EUR';

  currencies: string[] = ['USD', 'EUR', 'UAH'];
  currencyRate:{} = {};

  constructor(private currencyService: CurrencyService) {
  }

  convertCurrency(amountFrom: number, currencyFrom: string, amountTo: number, currencyTo: string) {
    if (currencyFrom === currencyTo) {
      if (currencyFrom === this.currency1) {
        this.amount2 = amountFrom;
      } else {
        this.amount1 = amountFrom;
      }
      return;
    }

    const rateFromTo = this.getConversionRate(currencyFrom, currencyTo);
    const rateToFrom = this.getConversionRate(currencyTo, currencyFrom);

    if (isNaN(rateFromTo) || isNaN(rateToFrom)) {
      return;
    }
    amountTo = amountFrom * rateFromTo;

    if (currencyFrom === this.currency1) {
      this.amount2 = amountTo;
    } else {
      this.amount1 = amountTo;
    }
    if (currencyTo === this.currency1) {
      this.amount1 = amountTo;
    } else if (currencyTo === this.currency2) {
      this.amount2 = amountTo;
    }
  }


  getConversionRate(currencyFrom: string, currencyTo: string): number {
    const euro = Number(Object.values(this.currencyRate)[0]);
    const dollar = Number(Object.values(this.currencyRate)[1]);
    if (currencyFrom === 'USD' && currencyTo === 'EUR') {
      console.log(+(dollar/euro).toFixed(2));
      return +(dollar/euro).toFixed(2);
    } else if (currencyFrom === 'USD' && currencyTo === 'UAH') {
      return +(dollar).toFixed(2);
    } else if (currencyFrom === 'EUR' && currencyTo === 'USD') {
      return +(euro/dollar).toFixed(2);
    } else if (currencyFrom === 'EUR' && currencyTo === 'UAH') {
      return +(euro).toFixed(2);
    } else if (currencyFrom === 'UAH' && currencyTo === 'USD') {
      return +(1/dollar).toFixed(2);
    } else if (currencyFrom === 'UAH' && currencyTo === 'EUR') {
      return +(1/euro).toFixed(2);
    }
    return NaN;
  }

  ngOnInit(): void {
    this.currencyService.currencies$.subscribe(data => {
      this.currencyRate = data;
    });
  }
}
