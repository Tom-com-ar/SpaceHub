import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Astronauts } from './astronauts';

const routes: Routes = [
  { path: '', component: Astronauts }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AstronautsRoutingModule {}
