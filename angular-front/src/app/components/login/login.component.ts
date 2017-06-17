import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  username: String;
  password: String;
  constructor( 
    private authService: AuthService,
    private http: Http,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {}
  ngOnInit() {}

  onLoginSubmit( ){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if( data.success ){
        this.authService.storeUserData( data.token, data.user );
        this.flashMessagesService.show( 'Logged in', { cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['dashboard']);
        
      }
      else{
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    })

  } // 


}