import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from 'src/services/auth.service';
import { LocalStorageService } from 'src/services/local-storage.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './popup/popup.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NoanswerpopupComponent } from './noanswerpopup/noanswerpopup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    UnauthorizedComponent,
    PopupComponent,
    NoanswerpopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot({
			timeOut: 5000,
			positionClass: 'toast-top-center',
			closeButton: true,
			maxOpened: 3,
			autoDismiss: true
		}),
    BrowserAnimationsModule,
    NgbModalModule
  ],
  entryComponents:[PopupComponent],
  providers: [AuthService,LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
