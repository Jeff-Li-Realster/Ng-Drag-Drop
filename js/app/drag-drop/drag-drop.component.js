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
// import { bootstrap } from '@angular/platform-browser-dynamic';
var core_1 = require('@angular/core');
require('jquery');
var DragDropComponent = (function () {
    function DragDropComponent() {
        this.transferData = { id: 1, msg: 'Drag me!' };
        this.receivedData = [];
    }
    DragDropComponent.prototype.transferDataSuccess = function ($event) {
        this.receivedData.push($event.dragData.msg);
    };
    DragDropComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: "../app/drag-drop/drag-drop.component.html"
        }), 
        __metadata('design:paramtypes', [])
    ], DragDropComponent);
    return DragDropComponent;
}());
exports.DragDropComponent = DragDropComponent;
//# sourceMappingURL=drag-drop.component.js.map