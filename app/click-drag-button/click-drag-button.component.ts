import { Component, OnInit } from '@angular/core';
import * as interact from 'interact.js';

@Component({
    selector: 'app',
    templateUrl: '../app/click-drag-button/click-drag-button.component.html',
    styleUrls: ['../app/click-drag-button/click-drag-button.component.css'],
})

export class ClickDragButtonComponent implements OnInit {

    public draggableElement: Interact.Interactable;
    public Docs: any = [
        { page: 1 },
        { page: 2 },
        { page: 3 },
    ];
    constructor() {
    }

    public ngOnInit() {
        let index = 1;
        document.querySelector('#drag-1').addEventListener('click', function () {
            let button = document.querySelector('#drag-1').cloneNode(true);
            // set class
            let cl = document.createAttribute('class');
            cl.value = 'draggable-copy';
            button.attributes.setNamedItem(cl);
            // set content
            button.textContent = 'Drag Me';
            // set id
            let id = document.createAttribute('id');
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
                onend: function (event: Interact.InteractEvent) {
                    let documentEl = document.querySelector('#position');
                    let target = event.target;
                    let x = parseInt(target.getAttribute('data-x'), 0);
                    let y = parseInt(target.getAttribute('data-y'), 0);
                    let i = target.getAttribute('id');
                    documentEl.textContent = 'x: ' + x + 'px; y: ' + y + 'px;';
                    if (!document.querySelector('.button-delete')) {
                        addButtonSetting(i);
                    } else {
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
            .on('resizemove', function (event: any) {
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

        function addButtonSetting(i: string) {
            let div = document.createElement('div');
            div.setAttribute('id', 'setting-button');
            div.innerHTML = "<button class='button-delete' id=delete" + i + ">delete</button>";
            document.querySelector('#catalog').appendChild(div);
            addButtonListener();
        }

        function updateId(i: string) {
            document.querySelector('.button-delete').setAttribute('id', 'delete' + i);
        }

        function addButtonListener() {
            document.querySelector('.button-delete').addEventListener('click', function(event){
                console.log(event.srcElement.attributes.getNamedItem('id').value);
                let id = event.srcElement.attributes.getNamedItem('id').value;
                let element = document.getElementById(id.split('delete')[1]);
                element.remove();
            })
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
