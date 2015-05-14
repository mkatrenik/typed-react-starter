import { logger } from './utils'

const log = logger('observer')

// thanks to http://www.reddit.com/r/javascript/comments/34zrhj/reimagining_flux_actionsstores_with_es6es7/
export class ObservableClass {
  subscriptions = []
  
  constructor(public name: string) {}

  on(handler: () => any): void {
    this.subscriptions.push(handler)
  }

  notify(...args): void {
    log(`dispatching: ${this.name} -`, ...args)
    for(let subscription of this.subscriptions) {
      subscription(...args)
    }
  }
}


export function observable(name: string): ObservableClass {
  return new ObservableClass(name)
}


export function observe(observable: ObservableClass, handler: (...args: any[]) => any) {
  observable.on(handler)
}
