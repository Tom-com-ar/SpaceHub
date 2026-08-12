import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Trajectory } from './trajectory';

const routes: Routes = [
  { path: '', component: Trajectory }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrajectoryRoutingModule {}
