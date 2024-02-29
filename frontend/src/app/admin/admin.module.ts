import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { StatisticsComponent } from './statistics/statistics.component';

import * as CanvasJSAngularChart from '../../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

//MdGridListModule

//import { ShopsComponent } from './shops/shops.component';
// import { EditShopComponent } from '../shared-private/edit-shop/edit-shop.component';
// import { SharedModule } from '../shared/shared.module';
// import { EditProductComponent } from '../shared-private/edit-product/edit-product.component'
// import { SharedPrivateModule } from '../shared-private/shared-private.module';
// import { EditPriceComponent } from './edit-price/edit-price.component';
// import { NgbDatepickerModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// import { EditShopComponent as AdminEditShop } from './edit-shop/edit-shop.component';
// import { NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
      { path: 'home', component: HomeComponent },
	 { path: 'statistics', component: StatisticsComponent },
	 { path: 'createsurvey', component: CreateSurveyComponent },
	// { path: 'shops', component: ShopsComponent },
	// { path: 'edit-shop/:id', component: AdminEditShop },
	// { path: 'create-shop', component: AdminEditShop },
	// { path: 'edit-price', component: EditPriceComponent}
];

@NgModule({
	declarations: [
    HomeComponent,
    CreateSurveyComponent,
    StatisticsComponent,
	CanvasJSChart
  ],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),	
		MatCardModule,
		MatGridListModule,
		MatTabsModule,
		MatFormFieldModule,
		MatInputModule,
		MatRadioModule,
		MatSelectModule,
		MatToolbarModule,
		MatProgressSpinnerModule,
		//DataTablesModule,
		FormsModule,
		ReactiveFormsModule,
		// SharedModule,
		// SharedPrivateModule,
		// NgbDatepickerModule,
		// NgbPaginationModule,
		// NgbTypeaheadModule
	]
})
export class AdminModule { }
