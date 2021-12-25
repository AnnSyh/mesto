'use strict'


export class Section {
    constructor({ data, renderer }, container) {
        this._renderedItems = data;
        this._renderer = renderer;

        this._container = container;

        console.log('this._container = ', this._container);
    }
    renderItems() {
        // Переберем массив _initialArray с начальными карточками
        this._renderedItems.forEach(item => {
            this._renderer(item);
            console.log('Section: this._renderer(item) = ', this._renderer(item));

            // Вставим разметку на страницу,
            // используя метод addItem класса Section

            this.addItem(this._renderer(item));
        });
    }
    addItem(element) {
        this._container.append(element);
    }
}