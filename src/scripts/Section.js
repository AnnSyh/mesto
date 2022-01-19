'use strict'
export class Section {
    constructor({ data, renderer }, container) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = container;
    }
    renderItems(data) {
        // Переберем массив _initialArray с начальными карточками
        data.forEach(item => {
            this._renderer(item);
        });
    }
    addItem(element, method = 'append') {
        this._container[method](element);
    }
}