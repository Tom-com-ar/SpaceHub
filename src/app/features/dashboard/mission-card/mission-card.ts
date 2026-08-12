import { Component, Input } from '@angular/core';
import { Mission } from '../../../core/models/mission.interface';

@Component({
  selector: 'app-mission-card',
  standalone: false,
  templateUrl: './mission-card.html',
  styleUrl: './mission-card.scss',
})
export class MissionCard {
  @Input() mission!: Mission;

  getStatusColor(): string {
    switch (this.mission.status) {
      case 'Activa':
        return 'primary';
      case 'Completada':
        return 'accent';
      case 'Fallida':
        return 'warn';
      default:
        return 'primary';
    }
  }

  getProgressColor(): string {
    if (this.mission.progress >= 80) return '#4caf50';
    if (this.mission.progress >= 50) return '#ff9800';
    if (this.mission.progress >= 30) return '#ffc107';
    return '#f44336';
  }
}
