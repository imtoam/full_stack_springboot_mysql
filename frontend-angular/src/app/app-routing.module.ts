import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { AddComponent } from './components/add/add.component';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: ListComponent },
  { path: 'todo/:id', component: DetailsComponent },
  { path: 'add', component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
