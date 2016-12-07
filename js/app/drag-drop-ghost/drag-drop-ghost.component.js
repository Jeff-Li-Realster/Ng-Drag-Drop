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
var DragDropGhostComponent = (function () {
    function DragDropGhostComponent() {
        this.Docs = [
            { page: 1 },
            { page: 2 },
            { page: 3 },
        ];
    }
    DragDropGhostComponent.prototype.ngOnInit = function () {
        // interact('.draggable')
        //     .draggable({ manualStart: true })
        //     .on('move', function (event: any) {
        //         let interaction = event.interaction;
        //         if (interaction.pointerIsDown && !interaction.interacting()) {
        //             let clone = document.querySelector('#drag-1').cloneNode(true);
        //             clone.attributes.removeNamedItem('class');
        //             let typ = document.createAttribute('class');
        //             typ.value = 'draggable-copy';
        //             clone.attributes.setNamedItem(typ);
        //             let hiddenScroll = document.querySelector('.scroll-bar').scrollTop;
        //             let frame = document.querySelector('.frame');
        //             let style = window.getComputedStyle(frame);
        //             let pageHeight = style.getPropertyValue('height');
        //             let pageIndex: number = hiddenScroll / parseInt(pageHeight, 0);
        //             pageIndex = Math.floor(pageIndex);
        //             document.querySelector('#page' + Math.floor(pageIndex)).appendChild(clone);
        //             interaction.start({ name: 'drag' }, event.interactable, clone);
        //         }
        //     });
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
                var hiddenScroll = document.querySelector('.scroll-bar').scrollTop;
                var y = parseInt(target.getAttribute('data-y'), 0);
                y += hiddenScroll;
                documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                // make a copy of drag-ghost
                var interaction = event.interaction;
                var clone = document.querySelector('#drag-ghost').cloneNode(true);
                // replace attribute class
                var typ = document.createAttribute('class');
                typ.value = 'draggable-copy';
                clone.attributes.setNamedItem(typ);
                // calculate & set the x, y coordinates
                var left = document.querySelector('.scroll-bar').getBoundingClientRect().left;
                var frame = document.querySelector('.frame');
                var style = window.getComputedStyle(frame);
                var pageHeight = style.getPropertyValue('height');
                console.log(y);
                var pageIndex = y / parseInt(pageHeight + 50, 0);
                pageIndex = Math.floor(pageIndex);
                document.querySelector('#page' + Math.floor(pageIndex)).appendChild(clone);
                console.log(pageIndex);
                // replace data-x
                var dx = document.createAttribute('data-x');
                var new_x = x - left;
                dx.value = new_x + "";
                clone.attributes.setNamedItem(dx);
                // replace data-y
                var dy = document.createAttribute('data-y');
                // let new_y: number = y + parseInt(pageHeight + 50, 0) * pageIndex; // margin_top = 50
                dy.value = y + "";
                clone.attributes.setNamedItem(dy);
                // replace style - translate
                var st = document.createAttribute('style');
                st.value = 'transform: translate(' + new_x + 'px, ' + y + 'px)';
                clone.attributes.setNamedItem(st);
                // make a copy and put in original place of ghost
                interaction.start({ name: 'drag' }, event.interactable, clone);
                var self_clone = document.querySelector('#drag-self').cloneNode(true);
                var cl = document.createAttribute('class');
                cl.value = 'draggable';
                self_clone.attributes.setNamedItem(cl);
                var id = document.createAttribute('id');
                id.value = 'drag-ghost';
                self_clone.attributes.setNamedItem(id);
                document.querySelector("#drag-0").appendChild(self_clone);
                target.remove();
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
                // get page index and remove it to new page
                var frame = document.querySelector('.frame');
                var style = window.getComputedStyle(frame);
                var pageHeight = style.getPropertyValue('height');
                var pageIndex = y / parseInt(pageHeight + 50, 0);
                pageIndex = Math.floor(pageIndex);
                var clone = event.target.cloneNode(true);
                document.querySelector('#page' + Math.floor(pageIndex)).appendChild(clone);
                event.target.remove();
                // let result = document.querySelector('.frame').getAttributeNode.length;
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
    DragDropGhostComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: '../app/drag-drop-ghost/drag-drop-ghost.component.html',
            styleUrls: ['../app/drag-drop-ghost/drag-drop-ghost.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], DragDropGhostComponent);
    return DragDropGhostComponent;
}());
exports.DragDropGhostComponent = DragDropGhostComponent;
//# sourceMappingURL=drag-drop-ghost.component.js.map