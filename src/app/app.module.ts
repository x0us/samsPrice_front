import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './index/home/home.component';
import { CategoryComponent } from './index/category/category.component';
import { ProductsComponent } from './index/products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { IndexComponent } from './index/index.component';

import { DebounceClickDirective } from './shared/click';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { httpInterceptorProviders } from './shared/http-interceptors';

@NgModule({
	declarations: [
		AppComponent,
		CategoryComponent,
		ProductsComponent,
		NotfoundComponent,
		IndexComponent,
		DebounceClickDirective,
		HomeComponent
	],
	imports: [BrowserModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule, MatSnackBarModule],
	providers: [httpInterceptorProviders],
	bootstrap: [AppComponent]
})
export class AppModule {}
