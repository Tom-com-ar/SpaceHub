import { Component, Input } from '@angular/core';
import { Mission } from '../../../core/models/mission.interface';
import { MissionService } from '../../../core/services/mission.service';

@Component({
  selector: 'app-mission-card',
  standalone: false,
  templateUrl: './mission-card.html',
  styleUrl: './mission-card.scss',
})
export class MissionCard {
  @Input() mission!: Mission;
  statuses = ['Activa', 'Completada', 'Fallida'];

  constructor(private missionService: MissionService) {}

  getStatusClass(): string {
    switch (this.mission.status) {
      case 'Activa': return 'status-active';
      case 'Completada': return 'status-completed';
      case 'Fallida': return 'status-failed';
      default: return '';
    }
  }

  onStatusChange(newStatus: Mission['status']) {
    if (!this.mission || newStatus === this.mission.status) {
      return;
    }
    this.missionService.updateMission(this.mission.id, { status: newStatus });
  }
}
