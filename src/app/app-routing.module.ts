import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './index/home/home.component';
import { CategoryComponent } from './index/category/category.component';
import { ProductsComponent } from './index/products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'index',
		pathMatch: 'full'
	},
	{
		path: 'index',
		component: IndexComponent,
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'category',
				component: CategoryComponent
			},
			{
				path: 'product',
				component: ProductsComponent
			},
			{
				path: 'not-found',
				component: NotfoundComponent
			},
			{
				path: '**',
				redirectTo: 'not-found'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
