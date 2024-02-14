import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username:'',
    password:'',
  };

  constructor(private snack:MatSnackBar, private loginService: LoginService){  }

  ngOnInit(): void {

  }

  login(){

    if(this.loginData.username.trim() == '' || this.loginData.username == null )
       {
        this.snack.open("username is required!!",'',{
          duration:3000,
        });
        return;
       }
    if(this.loginData.password.trim() == '' || this.loginData.password == null )
    {
      this.snack.open("Password is required!!",'',{
        duration:3000,
      });
      return;
    }

    console.log(this.loginData);
    this.loginService.storeToken("")
    // this.loginService.login(this.loginData)

    this.loginService.login(this.loginData).subscribe(
      (data:any) => {
        console.log("Successful")
        console.log(data);

        this.loginService.storeToken(data.token);
        this.loginService.getCurrentUser().subscribe(
          user =>{
            console.log(user);
            this.loginService.setUser(user);
            console.log(user);
            // redirect to role -> admin, student, trainer

          }
        );

      },
      (error) => {
        console.log('Error'+error.toString());
      }
    );
  }
}
