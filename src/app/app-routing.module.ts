import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasFormComponent } from './components/tareas-form/tareas-form.component';
import { TareasListComponent } from './components/tareas-list/tareas-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/tareas', pathMatch: 'full' },
  { path: 'tareas', component: TareasListComponent },
  { path: 'agregar', component: TareasFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
