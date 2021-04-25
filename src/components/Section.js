export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderAll() {
    this._items.map((element) => {
      this._renderer(element);
    });
  }

  addItem(element) {
    this._containerSelector.append(element);
  }

  addItemPrepend(element) {
    this._containerSelector.prepend(element);
  }
}
