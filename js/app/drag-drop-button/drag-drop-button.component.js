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
var core_1 = require('@angular/core');
var interact = require('interact.js');
//import * as $ from 'jquery';
var DragDropButtonComponent = (function () {
    function DragDropButtonComponent() {
    }
    DragDropButtonComponent.prototype.ngOnInit = function () {
        // target elements with the "draggable" class
        interact('.draggable')
            .draggable({ manualStart: true })
            .on('move', function (event) {
            var interaction = event.interaction;
            // if the pointer was moved while being held down
            // and an interaction hasn't started yet
            if (interaction.pointerIsDown && !interaction.interacting()) {
                // create a clone of the currentTarget element
                var clone = document.querySelector('#drag-1').cloneNode(true);
                clone.attributes.removeNamedItem('class');
                var typ = document.createAttribute('class');
                typ.value = 'draggable-copy';
                clone.attributes.setNamedItem(typ);
                // insert the clone to the page
                // TODO: position the clone appropriately
                document.querySelector('#drag-0').appendChild(clone);
                document.querySelector('#position').textContent = "Moving";
                var node = document.querySelector('#text');
                // start a drag interaction targeting the clone
                interaction.start({ name: 'drag' }, event.interactable, node);
            }
        });
        interact('.draggable-copy').draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                // restriction: document.querySelector('.frame'),
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            // enable autoScroll
            autoScroll: true,
            // OnInit: function (event: any) {
            //     let target = event.target;
            //     target.setAttribute('data-x', 0);
            //     target.setAttribute('data-y', 0);
            // },
            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function (event) {
                var documentEl = document.querySelector('#position');
                var textEl = event.target.querySelector('p');
                var target = event.target;
                var x = parseInt(target.getAttribute('data-x'), 0);
                var y = parseInt(target.getAttribute('data-y'), 0);
                documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                //Need to get the position of frame and replace 200 here
                if (x <= 200) {
                    target.remove();
                }
                // event.target.setAttribute('data-x', -250);
                // event.target.setAttribute('data-y', 100);
                // textEl && (textEl.textContent =
                //     'x: ' + (event.dx|0) + "px; y: " + (event.dy|0) + "px;");
            }
        });
        function dragMoveListener(event) {
            var target = event.target;
            // keep the dragged position in the data- x / data - y attributes
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';
            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    };
    DragDropButtonComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: '../app/drag-drop-button/drag-drop-button.component.html',
            styleUrls: ['../app/drag-drop-button/drag-drop-button.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], DragDropButtonComponent);
    return DragDropButtonComponent;
}());
exports.DragDropButtonComponent = DragDropButtonComponent;
//# sourceMappingURL=drag-drop-button.component.js.map