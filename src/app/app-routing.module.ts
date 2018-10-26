import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events/events.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './welcome/login/login.component';
import { ResetPasswordComponent } from './welcome/reset-password/reset-password.component'; 
import { CalendarComponent } from './calendar/calendar.component';
 

const routes: Routes = [
  { path: 'events', component: EventsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: '**', redirectTo: 'events', pathMatch: 'full' }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
