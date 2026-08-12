import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing-module';
import { Dashboard } from './dashboard';
import { MissionCard } from './mission-card/mission-card';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [Dashboard, MissionCard],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule
  ],
})
export class DashboardModule {}
