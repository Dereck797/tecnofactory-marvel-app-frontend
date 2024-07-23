import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ComicsListComponent } from './components/comics-list/comics-list.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { FavoritesListComponent } from './components/favorites-list/favorites-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'comics', component: ComicsListComponent, canActivate: [AuthGuard] },
  { path: 'comics/:id', component: ComicDetailComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoritesListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
