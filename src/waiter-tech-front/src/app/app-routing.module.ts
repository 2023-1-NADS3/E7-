import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginRestaurantComponent } from './components/login-restaurant/login-restaurant.component';
import { SignupRestaurantComponent } from './components/signup-restaurant/signup-restaurant.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginClientComponent } from './components/login-client/login-client.component';
import { ProcurarComponent } from './components/procurar/procurar.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRestauranteComponent } from './components/home-restaurante/home-restaurante.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DetailsComponent } from './components/details/details.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { LocalizacaoComponent } from './components/localizacao/localizacao.component';
import { OptionComponent } from './components/option/option.component';
import { OptionEditComponent } from './components/option-edit/option-edit.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderControlComponent } from './components/order-control/order-control.component';
import { CartComponent } from './components/cart/cart.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'dishes', component: DishesComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home-restaurant', component: HomeRestauranteComponent },
  { path: 'localizacao', component: LocalizacaoComponent },
  { path: 'login-client', component: LoginClientComponent },
  { path: 'login-restaurant', component: LoginRestaurantComponent },
  { path: 'option', component: OptionComponent },
  { path: 'option-edit', component: OptionEditComponent },
  { path: 'procurar', component: ProcurarComponent },
  { path: 'qrcode', component: QrcodeComponent },
  { path: 'signup-restaurant', component: SignupRestaurantComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'order-control', component: OrderControlComponent },
  { path: 'cart', component: CartComponent },
  { path: 'edit-item', component: EditItemComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
