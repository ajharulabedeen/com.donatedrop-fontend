import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChildoneComponent} from './childone/childone.component';
import {ChildtwoComponent} from './childtwo/childtwo.component';
import {ParentComponent} from './parent/parent.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [ChildoneComponent, ChildtwoComponent, ParentComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ]
  // ,
  // bootstrap: [ParentComponent]
})
export class TestModule {
}
