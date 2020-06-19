import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MaterialModule } from '../../material/material.module';
import { AuthRoutingModule } from '../auth/auth-routing.module'
@NgModule({
    declarations:[
        LoginComponent,
        SignUpComponent
    ],
    imports:[
        CommonModule,
        MaterialModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule{}