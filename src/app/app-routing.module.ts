import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostPageComponent } from './components/post-page/post-page.component';

const routes: Routes = [
  {path:'',component:PostPageComponent}, 
  {path:'posts',component:PostPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
