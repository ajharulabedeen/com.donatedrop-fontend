import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AgentComponent} from './agent/agent.component';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {ReviewComponent} from './agent/review/review.component';

@NgModule({
  declarations: [AgentComponent, ReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
}
