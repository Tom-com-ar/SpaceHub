export interface Astronaut {
  id: number;
  name: string;
  role: string;
  mission: string;
  status: 'En Mision' | 'Entrenamiento' | 'Descanso';
  health: number;
  experience: number;
}
