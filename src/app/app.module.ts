import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './welcome/login/login.component';
import { ResetPasswordComponent } from './welcome/reset-password/reset-password.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsComponent } from './events/events/events.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { TopbarComponent } from './shared/navbar/topbar/topbar.component';
import { LeftbarComponent } from './shared/navbar/leftbar/leftbar.component';
import { EventsService } from './events/services/events.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    CalendarComponent,
    EventsComponent,
    CreateEventComponent,
    SignupComponent,
    TopbarComponent,
    LeftbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
