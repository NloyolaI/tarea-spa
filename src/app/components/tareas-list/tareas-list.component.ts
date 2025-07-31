import { Component } from '@angular/core';
import { TareasService } from 'src/app/services/tareas.service';
import { Tarea } from 'src/app/models/tarea.model';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css']
})
export class TareasListComponent {
  tareas: Tarea[] = [];

  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {
    // cargar la tarea desde el archivo JSON 
    this.tareasService.cargarTareas();

    this.tareasService.tareas$.subscribe(tareas => {
      this.tareas = tareas;
    });
  }

  marcarComoCompletada(id: number): void {
    this.tareasService.marcarCompletada(id);
  }

  eliminarTodas(): void {
    this.tareasService.eliminarTodasLasTareas();
  }

  tareas$ = this.tareasService.tareas$;
}
