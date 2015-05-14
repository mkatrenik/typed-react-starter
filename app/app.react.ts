/// <reference path="../typings/react/react.d.ts" />
import React = require('react')
import { Store, Item } from './store'
import { Actions } from './actions'
import { logger } from './utils'

const stor = new Store()
const { DOM } = React
const log = logger('app.react')


/**
 * TS bug: EventTarget definition don't contains all props
 */
interface InputEventTarget extends EventTarget {
    value: string
}

class AppComponent extends React.Component<{ label: string }, any> {
    state = {
        data: []
    }

    componentDidMount() {
        stor.change.on(() => {
            log('rendering')
            this.setState({ data: stor.items })
        })
    }

    render(): any {
        const { label } = this.props
        return DOM.div(null,
            DOM.h2(null, label),
            DOM.input({ ref: 'in', onKeyDown: (e) => {
                if (e.keyCode === 13) {
                    this.add(<InputEventTarget>e.nativeEvent.target)
                }
            } }),
            DOM.ul({ style: { listStyleType: 'none' } },
                this.state.data.map((i: Item) => {
                    return DOM.li(null,
                        DOM.label(null,
                            DOM.input({
                                type: 'checkbox', checked: i.checked,
                                style: { marginRight: '10px' },
                                onChange: e => this.toggle(i)
                            }),
                            i.text
                        )
                    )
                })
            )
        )
    }

    add(input: InputEventTarget) {
        if (input.value !== '') {
            Actions.ADD.notify(input.value)
        }
        input.value = ''
    }

    toggle(item: Item) {
//        console.log(item, !item.checked)
        Actions.TOGGLE.notify(item, !item.checked)
    }
}

const App = React.createFactory(AppComponent)

export { App }