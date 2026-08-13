import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AstronautService } from '../../core/services/astronaut.service';
import { Astronaut } from '../../core/models/astronaut.interface';

@Component({
  selector: 'app-astronauts',
  standalone: false,
  templateUrl: './astronauts.html',
  styleUrl: './astronauts.scss',
})
export class Astronauts implements OnInit, OnDestroy {
  astronauts$: Observable<Astronaut[]>;
  inMissionCount$: Observable<number>;
  trainingCount$: Observable<number>;
  restCount$: Observable<number>;
  avgHealth$: Observable<number>;

  constructor(private astronautService: AstronautService) {
    this.astronauts$ = this.astronautService.getAstronauts();

    this.inMissionCount$ = this.astronauts$.pipe(
      map(a => a.filter(x => x.status === 'En Mision').length)
    );

    this.trainingCount$ = this.astronauts$.pipe(
      map(a => a.filter(x => x.status === 'Entrenamiento').length)
    );

    this.restCount$ = this.astronauts$.pipe(
      map(a => a.filter(x => x.status === 'Descanso').length)
    );

    this.avgHealth$ = this.astronauts$.pipe(
      map(a => {
        const inMission = a.filter(x => x.status === 'En Mision');
        if (inMission.length === 0) {
          return 0;
        }
        const total = inMission.reduce((sum, x) => sum + x.health, 0);
        return Math.round(total / inMission.length);
      })
    );
  }

  ngOnInit() {
    this.astronautService.startHealthSimulation();
  }

  ngOnDestroy() {
    this.astronautService.stopHealthSimulation();
  }

  trackByAstronautId(_: number, astronaut: Astronaut): number {
    return astronaut.id;
  }
}
