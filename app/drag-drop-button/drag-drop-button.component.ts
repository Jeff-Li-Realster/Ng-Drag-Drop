import { Component, OnInit } from '@angular/core';
import * as interact from 'interact.js';
//import * as $ from 'jquery';

@Component({
    selector: 'app',
    templateUrl: '../app/drag-drop-button/drag-drop-button.component.html',
    styleUrls: ['../app/drag-drop-button/drag-drop-button.component.css'],
})

export class DragDropButtonComponent implements OnInit {

    /* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */
    // enable draggables to be dropped into this

    public draggableElement: Interact.Interactable;
    constructor() {
    }

    public ngOnInit() {
        // target elements with the "draggable" class
        interact('.draggable')
            .draggable({ manualStart: true })
            .on('move', function (event: any) {
                let interaction = event.interaction;

                // if the pointer was moved while being held down
                // and an interaction hasn't started yet
                if (interaction.pointerIsDown && !interaction.interacting()) {
                    // create a clone of the currentTarget element
                    let clone = document.querySelector('#drag-1').cloneNode(true);
                    clone.attributes.removeNamedItem('class');
                    let typ = document.createAttribute('class');
                    typ.value = 'draggable-copy';
                    clone.attributes.setNamedItem(typ);
                    // insert the clone to the page
                    // TODO: position the clone appropriately
                    document.querySelector('#drag-0').appendChild(clone);
                    document.querySelector('#position').textContent = "Moving";
                    let node = document.querySelector('#text');

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
            onend: function (event: Interact.InteractEvent) {
                let documentEl = document.querySelector('#position');
                let textEl = event.target.querySelector('p');
                let target = event.target;
                let x = parseInt(target.getAttribute('data-x'), 0);
                let y = parseInt(target.getAttribute('data-y'), 0);
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
