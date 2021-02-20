import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      fname: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lname: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      uname: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      pnum: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      pass: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onRegister(){
    console.log(this.form.value);
    this.accountService.createUser(this.form);
    this.accountService.login(this.form);
  }

}
