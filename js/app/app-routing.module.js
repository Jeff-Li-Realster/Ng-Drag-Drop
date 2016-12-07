"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var drag_reorder_component_1 = require("./drag-reorder/drag-reorder.component");
var drag_drop_component_1 = require("./drag-drop/drag-drop.component");
var drag_drop_button_component_1 = require("./drag-drop-button/drag-drop-button.component");
var drag_drop_ghost_component_1 = require('./drag-drop-ghost/drag-drop-ghost.component');
var routes = [
    { component: drag_reorder_component_1.DragReorderComponent, path: 'drag-reorder' },
    { component: drag_drop_component_1.DragDropComponent, path: 'drag-drop-sorted' },
    { component: drag_drop_button_component_1.DragDropButtonComponent, path: 'drag-drop-button' },
    { component: drag_drop_ghost_component_1.DragDropGhostComponent, path: 'drag-drop-ghost' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            exports: [router_1.RouterModule],
            imports: [router_1.RouterModule.forRoot(routes)],
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map