import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MissionService } from '../../../core/services/mission.service';
import { Mission } from '../../../core/models/mission.interface';

interface OrbitalMission {
  id: number;
  name: string;
  statusActive: boolean;
  visibleOnMap: boolean;
  color: string;
  speed: number;
  orbitSize: number;
}

@Component({
  selector: 'app-orbit-canvas',
  standalone: false,
  templateUrl: './orbit-canvas.html',
  styleUrl: './orbit-canvas.scss',
})
export class OrbitCanvas implements OnInit, OnDestroy {
  missions: OrbitalMission[] = [];
  private sub?: Subscription;
  private orbitParams = new Map<number, { speed: number; orbitSize: number }>();

  constructor(private missionService: MissionService) {}

  ngOnInit() {
    this.sub = this.missionService.getMissions().subscribe((missions: Mission[]) => {
      this.syncMissions(missions);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private syncMissions(source: Mission[]) {
    const incomingIds = new Set(source.map(m => m.id));

    source.forEach((m, idx) => {
      if (!this.orbitParams.has(m.id)) {
        this.orbitParams.set(m.id, {
          speed: 8 + (idx % 5) * 2,
          orbitSize: 70 + (idx * 20),
        });
      }

      const params = this.orbitParams.get(m.id)!;
      const statusActive = (m.status || '').toString().trim().toLowerCase() === 'activa';
      const visibleOnMap = m.visibleOnMap;

      const existing = this.missions.find(om => om.id === m.id);
      if (existing) {
        existing.name = m.name;
        existing.color = m.color || '#777';
        existing.statusActive = statusActive;
        existing.visibleOnMap = visibleOnMap;
      } else {
        this.missions.push({
          id: m.id,
          name: m.name,
          statusActive,
          visibleOnMap,
          color: m.color || '#777',
          speed: params.speed,
          orbitSize: params.orbitSize,
        });
      }
    });

    this.missions = this.missions.filter(om => incomingIds.has(om.id));
  }

  get activeMissions(): OrbitalMission[] {
    return this.missions.filter(m => m.statusActive && m.visibleOnMap);
  }

  isVisibleOnMap(mission: OrbitalMission): boolean {
    return mission.statusActive && mission.visibleOnMap;
  }

  toggleMission(mission: OrbitalMission) {
    if (!mission.statusActive) {
      return;
    }
    this.missionService.updateMission(mission.id, { visibleOnMap: !mission.visibleOnMap });
  }

  trackByMissionId(_: number, mission: OrbitalMission): number {
    return mission.id;
  }
}
