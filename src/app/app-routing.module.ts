import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostListComponent } from './components/post-list/post-list.component';

import { AuthGuard } from './components/auth/auth-guard';
import { AuthService } from './services/auth.service';


const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostCreateComponent,canActivate:[AuthGuard]  },
  { path: 'edit/:id', component: PostCreateComponent,canActivate:[AuthGuard] },
  { path: 'auth', loadChildren:"./components/auth/auth.module#AuthModule"}
  //loadChildren:()=>import{'./components/auth/auth.module'}.then(m=>{m.AuthModule})

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
