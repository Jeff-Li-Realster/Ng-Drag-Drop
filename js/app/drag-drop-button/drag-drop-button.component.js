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
var DragDropButtonComponent = (function () {
    function DragDropButtonComponent() {
        this.Docs = [
            { page: 1 },
            { page: 2 },
            { page: 3 },
        ];
    }
    DragDropButtonComponent.prototype.ngOnInit = function () {
        interact('.draggable')
            .draggable({ manualStart: true })
            .on('move', function (event) {
            var interaction = event.interaction;
            if (interaction.pointerIsDown && !interaction.interacting()) {
                var clone = document.querySelector('#drag-1').cloneNode(true);
                clone.attributes.removeNamedItem('class');
                var typ = document.createAttribute('class');
                typ.value = 'draggable-copy';
                clone.attributes.setNamedItem(typ);
                var hiddenScroll = document.querySelector('.scroll-bar').scrollTop;
                var frame = document.querySelector('.frame');
                var style = window.getComputedStyle(frame);
                var pageHeight = style.getPropertyValue('height');
                var pageIndex = hiddenScroll / parseInt(pageHeight, 0);
                pageIndex = Math.floor(pageIndex);
                document.querySelector('#page' + Math.floor(pageIndex)).appendChild(clone);
                interaction.start({ name: 'drag' }, event.interactable, clone);
            }
        });
        interact('.draggable').draggable({
            inertia: true,
            restrict: {
                // restriction: document.querySelector('.frame'),
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            autoScroll: true,
            onmove: dragMoveListener,
            onend: function (event) {
                var documentEl = document.querySelector('#position');
                var target = event.target;
                var x = parseInt(target.getAttribute('data-x'), 0);
                var y = parseInt(target.getAttribute('data-y'), 0);
                documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                // let frameRect = document.querySelector('.frame').getBoundingClientRect();
                // if (x < frameRect.left || x > frameRect.right && y < frameRect.top || y > frameRect.bottom) {
                //     target.remove();
                // }
            }
        });
        interact('.draggable-copy').draggable({
            inertia: true,
            restrict: {
                // restriction: document.querySelector('.frame'),
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            autoScroll: true,
            onmove: dragMoveListener,
            onend: function (event) {
                var documentEl = document.querySelector('#position');
                var target = event.target;
                var x = parseInt(target.getAttribute('data-x'), 0);
                var y = parseInt(target.getAttribute('data-y'), 0);
                documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                var result = document.querySelector('.frame').getAttributeNode.length;
                // let frameRect = document.querySelector('.frame').getBoundingClientRect();
                // if (x < frameRect.left || x > frameRect.right && y < frameRect.top || y > frameRect.bottom) {
                //     target.remove();
                // }
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