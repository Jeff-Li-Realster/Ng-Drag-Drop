import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as interact from 'interact.js';

@Component({
    selector: 'app',
    templateUrl: '../app/test/test.component.html',
    styleUrls: ['../app/test/test.component.css'],
})

export class TestComponent implements OnInit {

    public draggableElement: Interact.Interactable;
    public Buttons: number[] = [];
    public Inputs: number[] = [];
    public isButton: boolean = false;
    public isInput: boolean = false;
    constructor(public cdr: ChangeDetectorRef) {
    }

    public ngOnInit() {
        document.querySelector('#new-button').addEventListener('click', () => {
            this.Buttons.push(1);
            this.cdr.detectChanges();
        });

        document.querySelector('#new-input').addEventListener('click', () => {
            this.Inputs.push(1);
            this.cdr.detectChanges();
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
                onend: (event: Interact.InteractEvent) => {
                    let documentEl = document.querySelector('#position');
                    let target = event.target;
                    let x = parseInt(target.getAttribute('data-x'), 0);
                    let y = parseInt(target.getAttribute('data-y'), 0);
                    documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                    let this_ = this;
                    addDeleteButton(target, this_);
                }
            })
            .resizable({
                preserveAspectRatio: true,
                edges: { left: true, right: true, bottom: true, top: true }
            })
            .on('resizemove', (event: any) => {
                let target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);

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
                let this_ = this;
                addDeleteButton(target, this_);
            })
            .on('click', (event: any) => {
                let target = event.target;
                let this_ = this;
                addDeleteButton(target, this_);
            });

        function addDeleteButton(target: any, this_: any) {
            let i = target.getAttribute('id');
            let targetClass = target.getAttribute('class').split(' ')[0];
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

        function addClickListener(itemName: string, this_: any) {
            let button: Element;
            let object: number[];
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
            button.addEventListener('click', (event) => {
                let id = event.srcElement.attributes.getNamedItem('id').value;
                let index = id.substring(id.length - 1, id.length);
                object.splice(parseInt(index, 0), 1);
                this_.cdr.detectChanges();
            });
        }

        function updateId(itemName: string, i: string) {
            let button: Element;
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

        function dragMoveListener(event: Interact.InteractEvent) {
            let target = event.target;
            // keep the dragged position in the data- x / data - y attributes
            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    }
}
