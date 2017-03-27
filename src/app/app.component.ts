import {Component} from "@angular/core";
import {WindowRef} from "./utils/window-ref";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";
import {ClockService} from "./services/clock.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  clock: Observable<string>;

  constructor(private windowObject: WindowRef, private clockService: ClockService) {
    // console.log(windowObject.nativeWindow.innerWidth);
    // console.log(windowObject.nativeWindow.innerHeight);

    this.clock = Observable
      .interval(1000)
      .map(() => clockService.getFormattedCurrentDateTime());
  }

}
