import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissionService } from '../../core/services/mission.service';
import { Mission } from '../../core/models/mission.interface';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnDestroy {
  missions$: Observable<Mission[]>;
  activeCount$: Observable<number>;
  completedCount$: Observable<number>;
  failedCount$: Observable<number>;
  private subscription = new Subscription();

  constructor(private missionService: MissionService) {
    this.missions$ = this.missionService.getMissions();

    this.activeCount$ = this.missions$.pipe(
      map(m => m.filter(x => (x.status || '').toString().trim().toLowerCase() === 'activa').length)
    );

    this.completedCount$ = this.missions$.pipe(
      map(m => m.filter(x => (x.status || '').toString().trim().toLowerCase() === 'completada').length)
    );

    this.failedCount$ = this.missions$.pipe(
      map(m => m.filter(x => (x.status || '').toString().trim().toLowerCase() === 'fallida').length)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackByMissionId(_: number, mission: Mission): number {
    return mission.id;
  }
}
