export interface Alert {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'danger';
  timestamp: Date;
}
