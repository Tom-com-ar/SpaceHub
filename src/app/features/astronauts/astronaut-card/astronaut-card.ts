import { Component, Input } from '@angular/core';
import { Astronaut } from '../../../core/models/astronaut.interface';

@Component({
  selector: 'app-astronaut-card',
  standalone: false,
  templateUrl: './astronaut-card.html',
  styleUrl: './astronaut-card.scss',
})
export class AstronautCard {
  @Input() astronaut!: Astronaut;

  getStatusClass(): string {
    switch (this.astronaut.status) {
      case 'En Mision': return 'status-mission';
      case 'Entrenamiento': return 'status-training';
      case 'Descanso': return 'status-rest';
      default: return '';
    }
  }

  getHealthClass(): string {
    if (this.astronaut.health >= 95) return 'health-excellent';
    if (this.astronaut.health >= 90) return 'health-good';
    return 'health-warning';
  }

  getInitials(): string {
    return this.astronaut.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
}
