import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { LaunchService } from '../../core/services/launch.service';
import { LaunchRecord } from '../../core/models/launch-record.interface';

@Component({
  selector: 'app-launch-history',
  standalone: false,
  templateUrl: './launch-history.html',
  styleUrl: './launch-history.scss',
})
export class LaunchHistory implements OnInit, OnDestroy {
  searchControl = new FormControl('', { nonNullable: true });
  yearControl = new FormControl<number | 'todos'>('todos', { nonNullable: true });
  statusControl = new FormControl<LaunchRecord['status'] | 'todos'>('todos', { nonNullable: true });

  years: number[] = [];
  statuses: LaunchRecord['status'][] = ['Exitoso', 'Fallido', 'Programado'];
  columns = ['missionName', 'date', 'rocket', 'site', 'status'];

  filteredLaunches$!: Observable<LaunchRecord[]>;
  resultCount$!: Observable<number>;
  private subscription = new Subscription();

  constructor(private launchService: LaunchService) {}

  ngOnInit(): void {
    this.years = this.launchService.getYears();

    // Cada control emite sus cambios como observable propio; el de búsqueda
    // usa debounceTime para no filtrar en cada tecla (como una búsqueda real contra API).
    const search$ = this.searchControl.valueChanges.pipe(
      startWith(this.searchControl.value),
      debounceTime(250),
      distinctUntilChanged(),
      map(term => term.trim().toLowerCase())
    );
    const year$ = this.yearControl.valueChanges.pipe(startWith(this.yearControl.value));
    const status$ = this.statusControl.valueChanges.pipe(startWith(this.statusControl.value));

    this.filteredLaunches$ = combineLatest([this.launchService.launches$, search$, year$, status$]).pipe(
      map(([launches, term, year, status]) =>
        launches
          .filter(l => (term ? l.missionName.toLowerCase().includes(term) : true))
          .filter(l => (year === 'todos' ? true : l.year === year))
          .filter(l => (status === 'todos' ? true : l.status === status))
      )
    );

    this.resultCount$ = this.filteredLaunches$.pipe(map(list => list.length));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearFilters(): void {
    this.searchControl.setValue('');
    this.yearControl.setValue('todos');
    this.statusControl.setValue('todos');
  }

  trackByLaunchId(_: number, launch: LaunchRecord): number {
    return launch.id;
  }
}
