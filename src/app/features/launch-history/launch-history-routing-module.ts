import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchHistory } from './launch-history';

const routes: Routes = [
  { path: '', component: LaunchHistory }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaunchHistoryRoutingModule {}
