import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogEditComponent } from './components/blog-edit/blog-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-blog', component: BlogComponent},
  {path: 'blog-detail/:id', component: BlogDetailComponent},
  {path:  'profile', component: ProfileComponent},
  {path:  'home', component: HomeComponent},
{ path: 'edit/:id', component: BlogEditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
