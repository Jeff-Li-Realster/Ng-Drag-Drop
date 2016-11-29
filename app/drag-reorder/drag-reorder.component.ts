import { Component } from '@angular/core';

@Component({
  selector: 'drag-reorder',
  templateUrl: '../app/drag-reorder/drag-reorder.component.html'
})
export class DragReorderComponent {
    listOne:Array<string> = ['Coffee','Orange Juice','Red Wine','Unhealty drink!','Water'];
}