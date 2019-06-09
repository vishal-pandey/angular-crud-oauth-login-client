import { Component, OnInit, Inject } from '@angular/core';

import { MainService } from '../../services/main.service';
import { CookieService } from 'ngx-cookie-service';
import { Router }      from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public mS:MainService,
    public cookie:CookieService,
    public dialog: MatDialog,) { }

  hide = true;

  loggingIn=false;

  ngOnInit() {}

  login(username, password){
    if (username == "" || password == "") {
      return
    }
    this.loggingIn = true;
  	this.mS.login(username, password).subscribe((r:any)=>{
  		console.log(r);
      if (r.access_token) {
        this.cookie.set("access_token",r.access_token,360000,"/");
        if(this.mS.getUserDetail(r.access_token)){
          console.log("loggedIn");
          this.loggingIn = false;
        }
      }
  	}, (error:any)=>{
      if (error.status == '401') {
        // alert("Invalid Username Of Password")
        this.openDialog();
        this.loggingIn = false;
      }
      console.log(error);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MessageDialog, {
      width: '250px',
      data: {name: 'vishal', animal: 'tiger'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}




@Component({
  selector: 'message-dialog',
  templateUrl: 'message-dialog.html',
})
export class MessageDialog {

  constructor(
    public dialogRef: MatDialogRef<MessageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {'message':'Wrong Username password'}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
