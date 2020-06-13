import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AuthGuard } from './components/auth/auth-guard';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent,canActivate:[AuthGuard]  },
  { path: 'edit/:id', component: PostCreateComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
