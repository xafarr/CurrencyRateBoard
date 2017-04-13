import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {WindowRef} from "./utils/window-ref";
import {ClockService} from "./services/clock.service";
import {RateTableComponent} from "./rate-table/rate-table.component";
import {CurrencyService} from "./services/currency.service";

@NgModule({
  declarations: [
    AppComponent,
    RateTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [WindowRef, ClockService, CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
