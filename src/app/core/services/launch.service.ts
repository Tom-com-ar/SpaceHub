import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LaunchRecord } from '../models/launch-record.interface';

const MISSION_NAMES = [
  'Artemis I', 'Artemis II', 'Artemis III', 'Starlink Batch 12', 'Starlink Batch 18',
  'Mars Explorer', 'Europa Clipper', 'Venus Atmosphere', 'ISS Resupply 24',
  'ISS Resupply 25', 'Satellite Deploy-1', 'Satellite Deploy-2', 'Lunar Gateway 1',
  'Crew Dragon 9', 'Crew Dragon 10', 'New Glenn Test', 'Rocket Lab Electron 45',
  'GPS III SV07', 'Sentinel-6B', 'JUICE Follow-up', 'X-37B OTV-8',
  'Vulcan Centaur Cert-2', 'OSIRIS-APEX', 'Psyche Metal World', 'Falcon Heavy Demo-3'
];

const ROCKETS = [
  'Falcon 9', 'Falcon Heavy', 'SLS Block 1', 'New Glenn', 'Electron',
  'Vulcan Centaur', 'Starship'
];

const SITES = [
  'Cabo Cañaveral, FL', 'Base Vandenberg, CA', 'Kennedy Space Center, FL',
  'Mahia, Nueva Zelanda', 'Boca Chica, TX'
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateLaunchHistory(): LaunchRecord[] {
  const statuses: LaunchRecord['status'][] = ['Exitoso', 'Exitoso', 'Exitoso', 'Fallido', 'Programado'];
  const years = [2021, 2022, 2023, 2024, 2025, 2026];

  return MISSION_NAMES.map((name, index) => {
    const year = randomFrom(years);
    const month = Math.floor(Math.random() * 12);
    const day = 1 + Math.floor(Math.random() * 28);
    const date = new Date(year, month, day);

    // Los lanzamientos de 2026 en adelante todavía no ocurrieron: se marcan como Programado.
    const isFuture = date.getTime() > Date.now();

    return {
      id: index + 1,
      missionName: name,
      date,
      year,
      status: isFuture ? 'Programado' : randomFrom(statuses),
      rocket: randomFrom(ROCKETS),
      site: randomFrom(SITES),
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime());
}

@Injectable({
  providedIn: 'root',
})
export class LaunchService {
  private launches: LaunchRecord[] = generateLaunchHistory();
  private launchesSubject = new BehaviorSubject<LaunchRecord[]>(this.launches);

  launches$: Observable<LaunchRecord[]> = this.launchesSubject.asObservable();

  getYears(): number[] {
    const years = new Set(this.launches.map(l => l.year));
    return Array.from(years).sort((a, b) => b - a);
  }
}
