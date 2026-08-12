import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Astronaut } from '../models/astronaut.interface';

@Injectable({
  providedIn: 'root'
})
export class AstronautService {
  private astronauts: Astronaut[] = [
    {
      id: 1,
      name: 'Elena Rodriguez',
      role: 'Comandante',
      mission: 'Artemis III',
      status: 'En Mision',
      health: 98,
      experience: 15
    },
    {
      id: 2,
      name: 'James Chen',
      role: 'Piloto',
      mission: 'Artemis III',
      status: 'En Mision',
      health: 95,
      experience: 12
    },
    {
      id: 3,
      name: 'Sarah Williams',
      role: 'Ingeniero de Vuelo',
      mission: 'Mars Explorer',
      status: 'Entrenamiento',
      health: 100,
      experience: 8
    },
    {
      id: 4,
      name: 'Mikhail Petrov',
      role: 'Especialista de Mision',
      mission: 'Mars Explorer',
      status: 'Entrenamiento',
      health: 97,
      experience: 10
    },
    {
      id: 5,
      name: 'Yuki Tanaka',
      role: 'Cientifico de Datos',
      mission: 'Venus Atmosphere',
      status: 'Descanso',
      health: 100,
      experience: 6
    }
  ];

  private astronautsSubject = new BehaviorSubject<Astronaut[]>(this.astronauts);
  astronauts$ = this.astronautsSubject.asObservable();

  getAstronauts(): Observable<Astronaut[]> {
    return this.astronauts$;
  }

  getAstronautById(id: number): Astronaut | undefined {
    return this.astronauts.find(a => a.id === id);
  }

  updateAstronautHealth(id: number, health: number): void {
    const astronaut = this.astronauts.find(a => a.id === id);
    if (astronaut) {
      astronaut.health = health;
      this.astronautsSubject.next([...this.astronauts]);
    }
  }
}
