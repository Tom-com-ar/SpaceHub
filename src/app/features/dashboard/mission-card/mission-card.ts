import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Mission } from '../../../core/models/mission.interface';
import { MissionService } from '../../../core/services/mission.service';
import { MissionForm } from '../mission-form/mission-form';

@Component({
  selector: 'app-mission-card',
  standalone: false,
  templateUrl: './mission-card.html',
  styleUrl: './mission-card.scss',
})
export class MissionCard {
  @Input() mission!: Mission;
  statuses = ['Activa', 'Completada', 'Fallida'];

  constructor(private missionService: MissionService, private dialog: MatDialog) {}

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

  openEditDialog(): void {
    const ref = this.dialog.open(MissionForm, {
      data: { mission: this.mission },
      width: '560px',
    });

    ref.afterClosed().subscribe((result: Partial<Mission> | undefined) => {
      if (result) {
        this.missionService.updateMission(this.mission.id, result);
      }
    });
  }

  deleteMission(): void {
    const confirmed = confirm(`¿Eliminar la misión "${this.mission.name}"? Esta acción no se puede deshacer.`);
    if (confirmed) {
      this.missionService.deleteMission(this.mission.id);
    }
  }
}
