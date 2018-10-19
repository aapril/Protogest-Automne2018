import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events/events.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './welcome/login/login.component';
import { ResetPasswordComponent } from './welcome/reset-password/reset-password.component'; 
 

const routes = [
  { path: '/events', component: EventsComponent },
  { path: '/signup', component: SignupComponent },
  { path: '/login', component: LoginComponent },
  { path: '/reset', component: ResetPasswordComponent }
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
