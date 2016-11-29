import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DndModule } from 'ng2-dnd';

import { DragReorderComponent } from "./drag-reorder/drag-reorder.component";
import { DragDropComponent } from "./drag-drop/drag-drop.component";
import { DragDropButtonComponent } from "./drag-drop-button/drag-drop-button.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DndModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    DragDropComponent,
    DragReorderComponent,
    DragDropButtonComponent,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
