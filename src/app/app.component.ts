import { Component } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import {MainService} from './services/main.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  mobile:boolean;

  constructor(breakpointObserver: BreakpointObserver,
    public cokkie:CookieService,
    public mS:MainService) {
  	breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.mobile = true;
      }else{
        this.mobile = false;
      }
    });
  }
}
