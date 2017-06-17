import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  // sevice needs to be injected in constructor like this
  constructor( private validateService: ValidateService,
        private flashMessage: FlashMessagesService,
        private authService:AuthService,
        private router: Router ) {}

  ngOnInit() { }

  onRegisterSubmit(){
    console.info(' register submit function executed ');

    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required field
    if( !this.validateService.validateRegister(user) ){
      this.flashMessage.show('Fill in all field', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if( !this.validateService.validateEmail( user.email ) ){
      this.flashMessage.show('Email invalid', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Auth Service
    this.authService.registerUser( user ).subscribe(data => {
      if( data.success ){
        this.flashMessage.show('Registered successfully', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate( ['/login'] );
      }
      else{
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate( ['/register'] );
      }
    });

  }

}
