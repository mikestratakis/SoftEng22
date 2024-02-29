import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { AboutComponent } from './about/about.component';
 import { LoginComponent } from './login/login.component';
 import { RegisterComponent } from './register/register.component';
 import { NotfoundComponent } from './notfound/notfound.component';
 import { CrouwdsourcerOnlyGuard } from 'src/guards/crouwdsourcer-only.guard';
 import { AdminOnlyGuard } from 'src/guards/admin-only.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'about', component: AboutComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m:any)=> m.AdminModule),
    canActivate: [AdminOnlyGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m:any)=> m.UserModule),
    canActivate: [CrouwdsourcerOnlyGuard]
  },

  { path: 'login/:qid', component: LoginComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
