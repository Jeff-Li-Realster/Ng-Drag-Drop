import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DragReorderComponent } from "./drag-reorder/drag-reorder.component";
import { DragDropComponent } from "./drag-drop/drag-drop.component";

const routes: Routes = [
    { component: DragReorderComponent, path: "drag-reorder" },
    { component: DragDropComponent, path: "drag-drop" },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
