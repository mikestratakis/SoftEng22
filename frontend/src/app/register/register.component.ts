import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder,FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserRegister } from 'src/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errMsgPasswordMatch: string = 'Οι κωδικοί δεν ταιριάζουν';
  isPasswordConfirmed: boolean = true;

  public registerForm = this.fb.group({
    username: ['',Validators.required],
    password1: ['',Validators.required],
    password2: ['',Validators.required],
    role: [false]
  });

  get password2(){
    return this.registerForm.get("password2")
  }
  get password1(){
    return this.registerForm.get("password1")
  }

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private fb: FormBuilder) { }


  validationButton()
  {
    return (this.registerForm.valid && this.isPasswordConfirmed);
  }

  checkPasswordMatchConfirm() {

    this.errMsgPasswordMatch = '';
    this.isPasswordConfirmed = false;
    if (this.password1.value == this.password2.value) {
      this.isPasswordConfirmed = true;
    } else {
      this.errMsgPasswordMatch = 'Οι κωδικοί δεν ταιριάζουν'
    }
  }

  onSubmit() {
  
    if (this.registerForm.value.password1 != this.registerForm.value.password2) {
			this.password2.setErrors({ 'name': true });
	//		return false;
		}
    let role = this.registerForm.value.role?"administrator":"user";
    this.authService.register(this.registerForm.value.username,this.registerForm.value.password1,role).subscribe({
      next:
      (x:any) => {
      this.authService.login(this.registerForm.value.username,this.registerForm.value.password1).subscribe(x => { this.authService.Token = x.token; this.router.navigate(["/"]) });
    },
    error: (err:string) => console.log(err)
  })


  }

}
