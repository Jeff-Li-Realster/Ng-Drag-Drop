import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DragReorderComponent } from "./drag-reorder/drag-reorder.component";
import { DragDropComponent } from "./drag-drop/drag-drop.component";
import { DragDropButtonComponent } from "./drag-drop-button/drag-drop-button.component";
import { DragDropGhostComponent } from './drag-drop-ghost/drag-drop-ghost.component';

const routes: Routes = [
    { component: DragReorderComponent, path: 'drag-reorder' },
    { component: DragDropComponent, path: 'drag-drop-sorted' },
    { component: DragDropButtonComponent, path: 'drag-drop-button' },
    { component: DragDropGhostComponent, path: 'drag-drop-ghost'},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
