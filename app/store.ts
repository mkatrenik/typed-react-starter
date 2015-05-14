
import { observe, observable, ObservableClass } from './observe'
import { Actions } from './actions'
import { logger } from './utils'

const log = logger('store')

function uid(): string {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

class Item {
    id: string
    checked = false
    constructor(public text: string) {
        this.id = uid()
    }
}

class Store {
    change = observable('Store.change')

    items: Item[] = []

    constructor() {
        observe(Actions.ADD, this.add.bind(this));
        observe(Actions.TOGGLE, this.toggle.bind(this));
    }

    add(item: string) {
        this.items.push(new Item(item));
        this.change.notify(null);
    }

    toggle(item: Item, checked: boolean) {
        item.checked = checked
        this.change.notify(null)
    }
}

export { Store, Item }