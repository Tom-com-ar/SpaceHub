import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AstronautsRoutingModule } from './astronauts-routing-module';
import { Astronauts } from './astronauts';
import { AstronautCard } from './astronaut-card/astronaut-card';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [Astronauts, AstronautCard],
  imports: [
    CommonModule,
    AstronautsRoutingModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class AstronautsModule {}
