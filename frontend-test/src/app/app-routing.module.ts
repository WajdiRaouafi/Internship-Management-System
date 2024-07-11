import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { OffresListComponent } from './offres/offres-list/offres-list.component';
import { OffreDetailComponent } from './offres/offres-detail/offres-detail.component'; // Ensure correct import
import { OffreCreateComponent } from './offres/offre-create/offre-create.component';
import { OffreUpdateComponent } from './offres/offre-update/offre-update.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'offres', component: OffresListComponent},
  { path: 'offre/:id', component: OffreDetailComponent },
  { path: 'create-offre', component: OffreCreateComponent},
  { path: 'update-offre/:id', component: OffreUpdateComponent},
  { path: '', redirectTo: '/offres', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
