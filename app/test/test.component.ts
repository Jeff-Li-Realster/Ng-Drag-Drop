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

        document.querySelector('#drag-0').childNodes[1].addEventListener('click', () => {
            this.Buttons.push(1);
            this.cdr.detectChanges();
        });

        document.querySelector('#drag-0').childNodes[3].addEventListener('click', () => {
            this.Inputs.push(1);
            this.cdr.detectChanges();
        });

        // console.log(document.querySelector('#drag-0').childNodes);

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
                    let i = target.getAttribute('id');
                    documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                    if (target.getAttribute('class').indexOf('button-default') > -1) {
                        if (!document.querySelector('.button-delete')) {
                            this.isButton = true;
                            this.isInput = false;
                            this.cdr.detectChanges();
                            document.querySelector('.button-delete').addEventListener('click', (event) => {
                                let id = event.srcElement.attributes.getNamedItem('id').value;
                                let index = id.substring(id.length - 1, id.length);
                                this.Buttons.splice(parseInt(index, 0), 1);
                                this.cdr.detectChanges();
                            });
                        }
                        updateButtonId(i);
                    }
                    if (target.getAttribute('class').indexOf('input-default') > -1) {
                        if (!document.querySelector('.input-delete')) {
                            this.isInput = true;
                            this.isButton = false;
                            this.cdr.detectChanges();
                            document.querySelector('.input-delete').addEventListener('click', (event) => {
                                let id = event.srcElement.attributes.getNamedItem('id').value;
                                let index = id.substring(id.length - 1, id.length);
                                this.Inputs.splice(parseInt(index, 0), 1);
                                this.cdr.detectChanges();
                            });
                        }
                        updateInputId(i);
                    }
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
            });

        function updateButtonId(i: string) {
            document.querySelector('.button-delete').setAttribute('id', 'delete' + i);
        }

        function updateInputId(i: string) {
            document.querySelector('.input-delete').setAttribute('id', 'delete' + i);
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
