import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DndModule } from 'ng2-dnd';

import { DragReorderComponent } from "./drag-reorder/drag-reorder.component";
import { DragDropComponent } from "./drag-drop/drag-drop.component";
import { ClickDragButtonComponent } from "./click-drag-button/click-drag-button.component";
import { DragDropGhostComponent } from './drag-drop-ghost/drag-drop-ghost.component';
import { TestComponent } from './test/test.component';

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
    ClickDragButtonComponent,
    DragDropGhostComponent,
    TestComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
