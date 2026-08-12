export interface Mission {
  id: number;
  name: string;
  status: 'Activa' | 'Completada' | 'Fallida';
  progress: number;
  launchDate: Date;
  destination: string;
  crew: number;
  description: string;
  icon: string;
  color: string;
  visibleOnMap: boolean;
}
