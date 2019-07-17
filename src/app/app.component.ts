import { Component, PLATFORM_ID, OnInit, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const RESULT_KEY = makeStateKey<string>('result');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'angular-server';
  public result: any;
  public isServer: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private tsState: TransferState
  ) {}

  ngOnInit(): void {
    this.isServer = isPlatformServer(this.platformId);

    if (this.isServer) {
      // on the server
      this.tsState.set(RESULT_KEY, 'I am created on the server');
    } else {
      if (this.tsState.hasKey(RESULT_KEY)) {
        this.result = this.tsState.get(RESULT_KEY, '');
        console.log(this.result);
      } else {
        this.result = 'I am created on the browser';
        console.log(this.result);
      }
    }
  }
}
