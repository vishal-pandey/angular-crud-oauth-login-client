import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { CookieService } from 'ngx-cookie-service';
import {MainService} from '../../services/main.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mobile:boolean;
  theFlase:boolean=false;

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

  ngOnInit() {
  }

}
