import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
    imports: [
        CommonModule, 
        LoginRoutingModule, 
        FormsModule,
        ReactiveFormsModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
