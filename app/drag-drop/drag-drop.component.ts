// import { bootstrap } from '@angular/platform-browser-dynamic';
import { Component, ViewChild, ElementRef, OnInit, Injectable } from '@angular/core';
import 'jquery';

@Component({
    selector: 'app',
    templateUrl: "../app/drag-drop/drag-drop.component.html",
})

export class DragDropComponent {

    transferData: Object = {id: 1, msg: 'Drag me!'};
    receivedData: Array<any> = [];

    transferDataSuccess($event: any) {
        this.receivedData.push($event.dragData.msg);
    }
 }