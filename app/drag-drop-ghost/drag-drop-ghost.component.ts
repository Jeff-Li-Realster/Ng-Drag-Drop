import { Component, OnInit } from '@angular/core';
import * as interact from 'interact.js';

@Component({
    selector: 'app',
    templateUrl: '../app/drag-drop-ghost/drag-drop-ghost.component.html',
    styleUrls: ['../app/drag-drop-ghost/drag-drop-ghost.component.css'],
})

export class DragDropGhostComponent implements OnInit {

    public draggableElement: Interact.Interactable;
    public Docs: any = [
        { page: 1 },
        { page: 2 },
        { page: 3 },
    ];
    constructor() {
    }

    public ngOnInit() {
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
            onend: function (event: any) {
                let documentEl = document.querySelector('#position');
                let target = event.target;
                let x = parseInt(target.getAttribute('data-x'), 0);
                let hiddenScroll = document.querySelector('.scroll-bar').scrollTop;
                let y = parseInt(target.getAttribute('data-y'), 0);
                y += hiddenScroll;
                documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                // make a copy of drag-ghost
                let interaction = event.interaction;
                let clone = document.querySelector('#drag-ghost').cloneNode(true);
                // replace attribute class
                let typ = document.createAttribute('class');
                typ.value = 'draggable-copy';
                clone.attributes.setNamedItem(typ);
                // calculate & set the x, y coordinates
                let left = document.querySelector('.scroll-bar').getBoundingClientRect().left;
                let frame = document.querySelector('.frame');
                let style = window.getComputedStyle(frame);
                let pageHeight = style.getPropertyValue('height');
                console.log(y);
                let pageIndex: number = y / parseInt(pageHeight + 50, 0);
                pageIndex = Math.floor(pageIndex);
                document.querySelector('#page' + Math.floor(pageIndex)).appendChild(clone);
                console.log(pageIndex);
                // replace data-x
                let dx = document.createAttribute('data-x');
                let new_x: number = x - left;
                dx.value = new_x + "";
                clone.attributes.setNamedItem(dx);
                // replace data-y
                let dy = document.createAttribute('data-y');
                // let new_y: number = y + parseInt(pageHeight + 50, 0) * pageIndex; // margin_top = 50
                dy.value = y + "";
                clone.attributes.setNamedItem(dy);
                // replace style - translate
                let st = document.createAttribute('style');
                st.value = 'transform: translate(' + new_x + 'px, ' + y + 'px)';
                clone.attributes.setNamedItem(st);
                // make a copy and put in original place of ghost
                interaction.start({ name: 'drag' }, event.interactable, clone);
                let self_clone = document.querySelector('#drag-self').cloneNode(true);
                let cl = document.createAttribute('class');
                cl.value = 'draggable';
                self_clone.attributes.setNamedItem(cl);
                let id = document.createAttribute('id');
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
            onend: function (event: Interact.InteractEvent) {
                let documentEl = document.querySelector('#position');
                let target = event.target;
                let x = parseInt(target.getAttribute('data-x'), 0);
                let y = parseInt(target.getAttribute('data-y'), 0);
                documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                // get page index and remove it to new page
                let frame = document.querySelector('.frame');
                let style = window.getComputedStyle(frame);
                let pageHeight = style.getPropertyValue('height');
                let pageIndex: number = y / parseInt(pageHeight + 50, 0);
                pageIndex = Math.floor(pageIndex);
                let clone = event.target.cloneNode(true);
                document.querySelector('#page' + Math.floor(pageIndex)).appendChild(clone);
                event.target.remove();
                // let result = document.querySelector('.frame').getAttributeNode.length;
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
