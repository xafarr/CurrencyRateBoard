import {Injectable} from "@angular/core";

@Injectable()
export class ClockService {

  private _dateTimeFormatter: Intl.DateTimeFormat;
  private _options = {
    year: 'numeric', month: 'long', weekday: 'long',
    hour: 'numeric', minute: 'numeric', day: 'numeric',
    hour12: true
  };
  private _defaultLocale = "en-AU";

  constructor() {
    this._dateTimeFormatter = new Intl.DateTimeFormat(this._defaultLocale, this._options);
  }

  get dateTimeFormatter(): Intl.DateTimeFormat {
    return this._dateTimeFormatter;
  }

  set dateTimeFormatter(dateTimeFormat: Intl.DateTimeFormat) {
    this._dateTimeFormatter = dateTimeFormat;
  }

  get options(): {year: string; month: string; weekday: string; hour: string; minute: string; day: string; hour12: boolean} {
    return this._options;
  }

  set options(value: {year: string; month: string; weekday: string; hour: string; minute: string; day: string; hour12: boolean}) {
    this._options = value;
  }

  get defaultLocale(): string {
    return this._defaultLocale;
  }

  set defaultLocale(value: string) {
    this._defaultLocale = value;
  }

  getFormattedCurrentDateTime() {
    return this.dateTimeFormatter.format(new Date());
  }
}
