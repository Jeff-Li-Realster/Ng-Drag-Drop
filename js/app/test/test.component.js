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
var TestComponent = (function () {
    function TestComponent(cdr) {
        this.cdr = cdr;
        this.Buttons = [];
        this.Inputs = [];
        this.isButton = false;
        this.isInput = false;
    }
    TestComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.querySelector('#new-button').addEventListener('click', function () {
            _this.Buttons.push(1);
            _this.cdr.detectChanges();
        });
        document.querySelector('#new-input').addEventListener('click', function () {
            _this.Inputs.push(1);
            _this.cdr.detectChanges();
        });
        interact('.draggable-copy')
            .draggable({
            inertia: true,
            restrict: {
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
                var this_ = _this;
                addDeleteButton(target, this_);
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
            var this_ = _this;
            addDeleteButton(target, this_);
        })
            .on('click', function (event) {
            var target = event.target;
            var this_ = _this;
            addDeleteButton(target, this_);
        });
        function addDeleteButton(target, this_) {
            var i = target.getAttribute('id');
            var targetClass = target.getAttribute('class').split(' ')[0];
            switch (targetClass) {
                case 'button-default':
                    if (!document.querySelector('.button-delete')) {
                        this_.isButton = true;
                        this_.isInput = false;
                        this_.cdr.detectChanges();
                        addClickListener('button', this_);
                    }
                    updateId('button', i);
                    break;
                case 'input-default':
                    if (!document.querySelector('.input-delete')) {
                        this_.isInput = true;
                        this_.isButton = false;
                        this_.cdr.detectChanges();
                        addClickListener('input', this_);
                    }
                    updateId('input', i);
                    break;
                default: break;
            }
        }
        function addClickListener(itemName, this_) {
            var button;
            var object;
            switch (itemName) {
                case 'button':
                    button = document.querySelector('.button-delete');
                    object = this_.Buttons;
                    break;
                case 'input':
                    button = document.querySelector('.input-delete');
                    object = this_.Inputs;
                    break;
                default: break;
            }
            button.addEventListener('click', function (event) {
                var id = event.srcElement.attributes.getNamedItem('id').value;
                var index = id.substring(id.length - 1, id.length);
                object.splice(parseInt(index, 0), 1);
                this_.cdr.detectChanges();
            });
        }
        function updateId(itemName, i) {
            var button;
            switch (itemName) {
                case 'button':
                    button = document.querySelector('.button-delete');
                    break;
                case 'input':
                    button = document.querySelector('.input-delete');
                    break;
                default: break;
            }
            button.setAttribute('id', 'delete' + i);
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
    TestComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: '../app/test/test.component.html',
            styleUrls: ['../app/test/test.component.css'],
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;
//# sourceMappingURL=test.component.js.map