export interface LaunchRecord {
  id: number;
  missionName: string;
  date: Date;
  year: number;
  status: 'Exitoso' | 'Fallido' | 'Programado';
  rocket: string;
  site: string;
}
