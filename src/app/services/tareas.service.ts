import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private tareasUrl = 'assets/tareas.json';

  // Almacena la lista actual de tareas y permite actualizar
  private tareasSubject = new BehaviorSubject<Tarea[]>([]);
  tareas$ = this.tareasSubject.asObservable();

  constructor(private http: HttpClient) { }

  // metodo para cargar tarea
  cargarTareas(): void {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      const tareas: Tarea[] = JSON.parse(tareasGuardadas);
      this.tareasSubject.next(tareas);
    } else {
      this.http.get<Tarea[]>('/assets/tareas.json').subscribe(data => {
        this.tareasSubject.next(data);
        localStorage.setItem('tareas', JSON.stringify(data));
      });
    }
  }
  // metodo para agregar tarea
  agregarTarea(titulo: string, descripcion: string): void {
    const tareasActuales = this.tareasSubject.getValue();

    const ultimoId = tareasActuales.length > 0
      ? Math.max(...tareasActuales.map(t => t.id))
      : 0;
    const nuevaTarea: Tarea = {
      id: ultimoId + 1,
      titulo,
      descripcion,
      completada: false
    }
    this.tareasSubject.next([...tareasActuales, nuevaTarea]);
    this.guardarEnLocalStorage([...tareasActuales, nuevaTarea]);
  }


  // metodo para marcar tarea completa o pendiente
  marcarCompletada(id: number): void {
    const tareasActuales = this.tareasSubject.getValue();
    const nuevasTareas = tareasActuales.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
    this.tareasSubject.next(nuevasTareas);
    this.guardarEnLocalStorage(nuevasTareas);
  }


  private guardarEnLocalStorage(tareas: Tarea[]): void {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }


  // BORRAR ALMACENAMIENTO
  eliminarTodasLasTareas(): void {
    this.tareasSubject.next([]);
    localStorage.removeItem('tareas');
  }
}
