import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './welcome/login/login.component';
import { ResetPasswordComponent } from './welcome/reset-password/reset-password.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventsComponent } from './events/events/events.component';
import { CreateEventComponent } from './events/create-event/create-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    CalendarComponent,
    EventsComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
