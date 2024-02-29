import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbTypeaheadModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { GUARD_PROVIDERS } from 'src/guards/guards.export';
import { HomeComponent } from './home/home.component';
import { EmptyComponent } from './empty/empty.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'home/:qid', component: HomeComponent },
  // ]{ path: 'edit-product/:id', component: EditProductComponent },
];
@NgModule({
	declarations: [
    HomeComponent,
    EmptyComponent
  ],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		NgbTypeaheadModule,
		NgbModalModule,
		FormsModule,
		ReactiveFormsModule,
		MatTabsModule,
		MatInputModule,
		MatRadioModule,
		MatSelectModule,
		MatToolbarModule
	],
	entryComponents: [
		// TestComponent,       // This is required for modal
		// EntityNotFoundComponent
	]
})
export class UserModule { }
