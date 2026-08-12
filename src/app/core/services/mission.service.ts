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
      visibleOnMap: true,
      progress: 65,
      launchDate: new Date('2026-03-15'),
      destination: 'Luna',
      crew: 4,
      description: 'Mision tripulada para regresar a la Luna con el programa Artemis',
      icon: 'moon',
      color: '#5c6bc0'
    },
    {
      id: 2,
      name: 'Mars Explorer',
      status: 'Activa',
      visibleOnMap: true,
      progress: 30,
      launchDate: new Date('2026-06-20'),
      destination: 'Marte',
      crew: 6,
      description: 'Primera mision tripulada hacia Marte',
      icon: 'public',
      color: '#e53935'
    },
    {
      id: 3,
      name: 'Satellite Deploy-1',
      status: 'Activa',
      visibleOnMap: true,
      progress: 100,
      launchDate: new Date('2025-11-10'),
      destination: 'Orbita Terrestre',
      crew: 0,
      description: 'Despliegue de constelacion de satelites de comunicacion',
      icon: 'satellite_alt',
      color: '#43a047'
    },
    {
      id: 4,
      name: 'Europa Clipper',
      status: 'Activa',
      visibleOnMap: true,
      progress: 45,
      launchDate: new Date('2026-01-05'),
      destination: 'Europa (Jupiter)',
      crew: 0,
      description: 'Sonda no tripulada para explorar la luna de Jupiter',
      icon: 'science',
      color: '#fb8c00'
    },
    {
      id: 5,
      name: 'Venus Atmosphere',
      status: 'Activa',
      visibleOnMap: true,
      progress: 20,
      launchDate: new Date('2026-09-01'),
      destination: 'Venus',
      crew: 2,
      description: 'Exploracion de la atmosfera de Venus',
      icon: 'thermostat',
      color: '#8e24aa'
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
      const merged = { ...this.missions[index], ...updates };

      if (updates.status) {
        merged.visibleOnMap = updates.status === 'Activa';
      }

      this.missions[index] = merged;
      this.missionsSubject.next([...this.missions]);
    }
  }

  deleteMission(id: number): void {
    this.missions = this.missions.filter(m => m.id !== id);
    this.missionsSubject.next([...this.missions]);
  }
}
