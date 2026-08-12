import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mission } from '../models/mission.interface';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private missions: Mission[] = [
    {
      id: 1,
      name: 'Artemis III',
      status: 'Activa',
      progress: 65,
      launchDate: new Date('2026-03-15'),
      destination: 'Luna',
      crew: 4,
      description: 'Mision tripulada para regresar a la Luna con el programa Artemis'
    },
    {
      id: 2,
      name: 'Mars Explorer',
      status: 'Activa',
      progress: 30,
      launchDate: new Date('2026-06-20'),
      destination: 'Marte',
      crew: 6,
      description: 'Primera mision tripulada hacia Marte'
    },
    {
      id: 3,
      name: 'Satellite Deploy-1',
      status: 'Completada',
      progress: 100,
      launchDate: new Date('2025-11-10'),
      destination: 'Orbita Terrestre',
      crew: 0,
      description: 'Despliegue de constelacion de satelites de comunicacion'
    },
    {
      id: 4,
      name: 'Europa Clipper',
      status: 'Fallida',
      progress: 45,
      launchDate: new Date('2026-01-05'),
      destination: 'Europa (Jupiter)',
      crew: 0,
      description: 'Sonda no tripulada para explorar la luna de Jupiter'
    },
    {
      id: 5,
      name: 'Venus Atmosphere',
      status: 'Activa',
      progress: 20,
      launchDate: new Date('2026-09-01'),
      destination: 'Venus',
      crew: 2,
      description: 'Exploracion de la atmosfera de Venus'
    }
  ];

  private missionsSubject = new BehaviorSubject<Mission[]>(this.missions);
  missions$ = this.missionsSubject.asObservable();

  getMissions(): Observable<Mission[]> {
    return this.missions$;
  }

  getMissionById(id: number): Mission | undefined {
    return this.missions.find(m => m.id === id);
  }

  addMission(mission: Omit<Mission, 'id'>): void {
    const newMission: Mission = {
      ...mission,
      id: Math.max(...this.missions.map(m => m.id)) + 1
    };
    this.missions.push(newMission);
    this.missionsSubject.next([...this.missions]);
  }

  updateMission(id: number, updates: Partial<Mission>): void {
    const index = this.missions.findIndex(m => m.id === id);
    if (index !== -1) {
      this.missions[index] = { ...this.missions[index], ...updates };
      this.missionsSubject.next([...this.missions]);
    }
  }

  deleteMission(id: number): void {
    this.missions = this.missions.filter(m => m.id !== id);
    this.missionsSubject.next([...this.missions]);
  }
}
