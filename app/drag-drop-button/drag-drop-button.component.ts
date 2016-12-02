import { Component, OnInit } from '@angular/core';
import * as interact from 'interact.js';

@Component({
    selector: 'app',
    templateUrl: '../app/drag-drop-button/drag-drop-button.component.html',
    styleUrls: ['../app/drag-drop-button/drag-drop-button.component.css'],
})

export class DragDropButtonComponent implements OnInit {

    public draggableElement: Interact.Interactable;
    public Docs: any = [
            {page: 1},
            {page: 2},
            {page: 3},
        ];
    constructor() {
    }

    public ngOnInit() {
        interact('.draggable')
            .draggable({ manualStart: true })
            .on('move', function (event: any) {
                let interaction = event.interaction;
                if (interaction.pointerIsDown && !interaction.interacting()) {

                    let clone = document.querySelector('#drag-1').cloneNode(true);
                    clone.attributes.removeNamedItem('class');
                    let typ = document.createAttribute('class');
                    typ.value = 'draggable-copy';
                    clone.attributes.setNamedItem(typ);
                    let hiddenScroll = document.querySelector('.scroll-bar').scrollTop;
                    let frame = document.querySelector('.frame');
                    let style = window.getComputedStyle(frame);
                    let pageHeight = style.getPropertyValue('height');
                    let pageIndex: number = hiddenScroll / parseInt(pageHeight, 0);
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
            onend: function (event: Interact.InteractEvent) {
                let documentEl = document.querySelector('#position');
                let target = event.target;
                let x = parseInt(target.getAttribute('data-x'), 0);
                let y = parseInt(target.getAttribute('data-y'), 0);
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
            onend: function (event: Interact.InteractEvent) {
                let documentEl = document.querySelector('#position');
                let target = event.target;
                let x = parseInt(target.getAttribute('data-x'), 0);
                let y = parseInt(target.getAttribute('data-y'), 0);
                documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                let result = document.querySelector('.frame').getAttributeNode.length;
                // let frameRect = document.querySelector('.frame').getBoundingClientRect();
                // if (x < frameRect.left || x > frameRect.right && y < frameRect.top || y > frameRect.bottom) {
                //     target.remove();
                // }
            }
        });

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
