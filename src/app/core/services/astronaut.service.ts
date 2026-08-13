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
  private simulationInterval?: ReturnType<typeof setInterval>;

  getAstronauts(): Observable<Astronaut[]> {
    return this.astronauts$;
  }

  getAstronautById(id: number): Astronaut | undefined {
    return this.astronauts.find(a => a.id === id);
  }

  updateAstronaut(id: number, updates: Partial<Astronaut>): void {
    const index = this.astronauts.findIndex(a => a.id === id);
    if (index !== -1) {
      this.astronauts[index] = { ...this.astronauts[index], ...updates };
      this.astronautsSubject.next([...this.astronauts]);
    }
  }

  updateAstronautHealth(id: number, health: number): void {
    this.updateAstronaut(id, { health: Math.max(0, Math.min(100, health)) });
  }

  startHealthSimulation(): void {
    if (this.simulationInterval) {
      return;
    }

    this.simulationInterval = setInterval(() => {
      let changed = false;

      this.astronauts = this.astronauts.map(astronaut => {
        if (astronaut.status !== 'En Mision') {
          return astronaut;
        }

        const delta = Math.floor(Math.random() * 5) - 2;
        const health = Math.max(85, Math.min(100, astronaut.health + delta));

        if (health !== astronaut.health) {
          changed = true;
          return { ...astronaut, health };
        }

        return astronaut;
      });

      if (changed) {
        this.astronautsSubject.next([...this.astronauts]);
      }
    }, 3000);
  }

  stopHealthSimulation(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = undefined;
    }
  }
}
