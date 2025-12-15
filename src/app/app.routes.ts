import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { ManageProductsComponent } from './components/manage-products-component/manage-products-component';
import { AddProductComponent } from './components/add-product-component/add-product-component';
import { EditProductComponent } from './components/edit-product-component/edit-product-component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },

  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'product', component: ManageProductsComponent, pathMatch: 'full' },
  { path: 'addproduct', component: AddProductComponent, pathMatch: 'full' },
  { path: 'editproduct/:id', component: EditProductComponent, pathMatch: 'full' },

 
  { path: '**', redirectTo: 'home' }
];
