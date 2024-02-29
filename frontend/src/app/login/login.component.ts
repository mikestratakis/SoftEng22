import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	loginForm = this.fb.group({
		username: [''],
		password: ['']
	});

	errMsgUsername: string = 'Παρακαλώ ελέγξτε το όνομα χρήστη και τον κωδικό σας';
	errMsgUsernameShow:boolean=false;
	questionnaire:string;

	constructor(
		private router: Router, 
		private authService: AuthService, 
		private fb: FormBuilder,
		private route:ActivatedRoute
		) { }


		ngOnInit()
		{

			this.route.queryParamMap.subscribe(params => {
				if (params.get("qid"))
				{
				
	            this.questionnaire=params.get("qid")
				}
			  });
		}

	onSubmit() {
		const user: Partial<{ username: string, password: string }> = this.loginForm.value
		this.authService.login(user.username, user.password)
				.subscribe({
            next:
              (response:any) => {
							 this.authService.Token = response.token; 
							 const newJwthelper = new JwtHelperService;
				             const decoded = newJwthelper.decodeToken(response.token);
							 if(decoded.role=='administrator' && this.questionnaire!=undefined)
							// this.router.navigate(["/user/home",{ questionnaire:  this.questionnaire}])
							this.router.navigate(["/user/home/"+this.questionnaire])
							 else if(decoded.role=='administrator' && this.questionnaire==undefined)
							  this.router.navigate(["/admin/home"])
							 else if(decoded.role=='user' && this.questionnaire==undefined)
							 this.router.navigate(["/user/home/"+this.questionnaire])
							 else
							   this.router.navigate(["/user/empty"])

            },
            error:
            (err:any) => 
			{
		     if(err.error.message=="username")
			 this.errMsgUsernameShow=true;
			}
          });
	}

	onInputChange()
	{
		this.errMsgUsernameShow=false;
	}

}
function next(next: any, arg1: (response: any) => void, error: any, arg3: () => import("ngx-toastr").ActiveToast<any>) {
  throw new Error('Function not implemented.');
}

