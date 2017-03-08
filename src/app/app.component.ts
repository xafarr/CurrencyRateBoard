import { Component } from '@angular/core';
import {WindowRef} from "./window-ref";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  maxCurrencyRows: number = 14;
  arr = Array(this.maxCurrencyRows).fill(1);

  constructor(private windowObject: WindowRef) {
    console.log(windowObject.nativeWindow.innerWidth);
    console.log(windowObject.nativeWindow.innerHeight);
  }
}
