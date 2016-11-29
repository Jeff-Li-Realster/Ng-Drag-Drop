import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DndModule } from 'ng2-dnd';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    DndModule.forRoot()
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
