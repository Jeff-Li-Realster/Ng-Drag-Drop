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
var ClickDragButtonComponent = (function () {
    function ClickDragButtonComponent() {
        this.Docs = [
            { page: 1 },
            { page: 2 },
            { page: 3 },
        ];
    }
    ClickDragButtonComponent.prototype.ngOnInit = function () {
        var index = 1;
        document.querySelector('#drag-1').addEventListener('click', function () {
            var button = document.querySelector('#drag-1').cloneNode(true);
            // set class
            var cl = document.createAttribute('class');
            cl.value = 'draggable-copy';
            button.attributes.setNamedItem(cl);
            // set content
            button.textContent = 'Drag Me';
            // set id
            var id = document.createAttribute('id');
            id.value = 'button' + (index++).toString();
            button.attributes.setNamedItem(id);
            document.querySelector('.frame').appendChild(button);
        });
        interact('.draggable-copy')
            .draggable({
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
                var i = target.getAttribute('id');
                documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                if (!document.querySelector('.button-delete')) {
                    addButtonSetting(i);
                }
                else {
                    updateId(i);
                }
                // let result = document.querySelector('.frame').getAttributeNode.length;
                // let frameRect = document.querySelector('.frame').getBoundingClientRect();
                // if (x < frameRect.left || x > frameRect.right && y < frameRect.top || y > frameRect.bottom) {
                //     target.remove();
                // }
            }
        })
            .resizable({
            preserveAspectRatio: true,
            edges: { left: true, right: true, bottom: true, top: true }
        })
            .on('resizemove', function (event) {
            var target = event.target, x = (parseFloat(target.getAttribute('data-x')) || 0), y = (parseFloat(target.getAttribute('data-y')) || 0);
            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';
            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;
            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        });
        function addButtonSetting(i) {
            var div = document.createElement('div');
            div.setAttribute('id', 'setting-button');
            div.innerHTML = "<button class='button-delete' id=delete" + i + ">delete</button>";
            document.querySelector('#catalog').appendChild(div);
            addButtonListener();
        }
        function updateId(i) {
            document.querySelector('.button-delete').setAttribute('id', 'delete' + i);
        }
        function addButtonListener() {
            document.querySelector('.button-delete').addEventListener('click', function (event) {
                console.log(event.srcElement.attributes.getNamedItem('id').value);
                var id = event.srcElement.attributes.getNamedItem('id').value;
                var element = document.getElementById(id.split('delete')[1]);
                element.remove();
            });
        }
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
    ClickDragButtonComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: '../app/click-drag-button/click-drag-button.component.html',
            styleUrls: ['../app/click-drag-button/click-drag-button.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], ClickDragButtonComponent);
    return ClickDragButtonComponent;
}());
exports.ClickDragButtonComponent = ClickDragButtonComponent;
//# sourceMappingURL=click-drag-button.component.js.map