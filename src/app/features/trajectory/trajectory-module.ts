import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrajectoryRoutingModule } from './trajectory-routing-module';
import { Trajectory } from './trajectory';
import { OrbitCanvas } from './orbit-canvas/orbit-canvas';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [Trajectory, OrbitCanvas],
  imports: [
    CommonModule,
    TrajectoryRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class TrajectoryModule {}
