import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

import { Router } from '@angular/router';
declare let $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  hide = true;

constructor(private fb: FormBuilder,private router: Router,public ts:ToastrService){
  if(localStorage.getItem('token')) {
    this.router.navigate(['home']);
  }
}

ngOnInit(){
  this.initLoginForm()
  $('#particleground').particleground({
      dotColor: '#ff7b71',
      lineColor: '#fae3df'
  });
}


initLoginForm(){
  this.loginForm= this.fb.group ({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })
}

login(){
  console.log(this.loginForm);
  localStorage.setItem('token', JSON.stringify(this.loginForm.value));
  this.showSuccess();
  this.router.navigate(['/home']);
}

showSuccess(){
  this.ts.success('Login Successful', 'Major Login', {
  timeOut: 3000,
  });
}

}
