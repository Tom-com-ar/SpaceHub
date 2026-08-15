import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MissionService } from '../../core/services/mission.service';
import { AstronautService } from '../../core/services/astronaut.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  activeMissionCount$: Observable<number>;
  crewInFlight$: Observable<number>;
  alertCount$: Observable<number>;

  private alertsSoFar = 0;
  private subscription = new Subscription();

  constructor(
    private missionService: MissionService,
    private astronautService: AstronautService,
    private alertService: AlertService
  ) {
    this.activeMissionCount$ = this.missionService.missions$.pipe(
      map(missions => missions.filter(m => m.status === 'Activa').length)
    );

    this.crewInFlight$ = this.astronautService.getAstronauts().pipe(
      map(astronauts =>
        astronauts.filter(a => a.status === 'En Mision').reduce((sum) => sum + 1, 0)
      )
    );

    // Contador simple de alertas recibidas desde que se abrió la app.
    this.alertCount$ = this.alertService.alerts$.pipe(
      map(() => ++this.alertsSoFar),
      startWith(0)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
