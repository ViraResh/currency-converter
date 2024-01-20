import { Component } from '@angular/core';
import { CurrencyService } from "../../services/currency.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  rates: any = {};
  convertedRates: any = {};

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.currencyService.getCurrency().subscribe(data => {
      this.rates = data.data;
      this.calculateConvertedRates();
    });
  }
  calculateConvertedRates() {
    for (const currency in this.rates) {
      const conversionRate = 1 / this.rates[currency].value;
      this.convertedRates[currency] = parseFloat(conversionRate.toFixed(2));
    }
    this.currencyService.currencies$.next(this.convertedRates);
  }
}
