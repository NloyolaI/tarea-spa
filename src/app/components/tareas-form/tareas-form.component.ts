import { Component } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-tareas-form',
  templateUrl: './tareas-form.component.html',
  styleUrls: ['./tareas-form.component.css']
})

export class TareasFormComponent {
  
  titulo: string = '';
  descripcion: string = '';
  mostrarError: boolean = false;
  
  constructor(private tareasService: TareasService) {}

  agregarTarea(): void {
    if (!this.titulo.trim() || !this.descripcion.trim()) {
      this.mostrarError = true;
      return;
    }

    this.tareasService.agregarTarea(this.titulo, this.descripcion);

    this.titulo = '';
    this.descripcion = '';
  }

}

