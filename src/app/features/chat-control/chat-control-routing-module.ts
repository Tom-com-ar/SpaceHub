import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatControl } from './chat-control';

const routes: Routes = [
  { path: '', component: ChatControl }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatControlRoutingModule {}
