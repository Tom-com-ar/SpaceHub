import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MissionService } from '../../core/services/mission.service';
import { Mission } from '../../core/models/mission.interface';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  missions: Mission[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private missionService: MissionService) {}

  ngOnInit() {
    this.subscription = this.missionService.getMissions().subscribe(missions => {
      this.missions = missions;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get activeMissions(): number {
    return this.missions.filter(m => m.status === 'Activa').length;
  }

  get completedMissions(): number {
    return this.missions.filter(m => m.status === 'Completada').length;
  }

  get failedMissions(): number {
    return this.missions.filter(m => m.status === 'Fallida').length;
  }
}
