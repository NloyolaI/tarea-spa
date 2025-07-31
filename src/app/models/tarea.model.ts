// Modelo que representa una tarea con su estado.

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean; // si el estado es true seria completo y false seria incompleta
}