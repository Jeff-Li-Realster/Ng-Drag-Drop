import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DragReorderComponent } from "./drag-reorder/drag-reorder.component";
import { DragDropComponent } from "./drag-drop/drag-drop.component";
import { DragDropGhostComponent } from './drag-drop-ghost/drag-drop-ghost.component';
import { ClickDragButtonComponent } from "./click-drag-button/click-drag-button.component";

const routes: Routes = [
    { component: DragReorderComponent, path: 'drag-reorder' },
    { component: DragDropComponent, path: 'drag-drop-sorted' },
    { component: DragDropGhostComponent, path: 'drag-drop-ghost'},
    { component: ClickDragButtonComponent, path: 'click-drag-button' },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
