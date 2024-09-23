import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
      this.userService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log(response.message);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
 

  
}