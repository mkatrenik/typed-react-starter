
/**
 * `logger` factory - creates logger with `name` prefix & supplied styles
 */
export function logger (name: string, styles = {}): (...any) => void {

    if (!styles['color']) {
        var r = Math.round(Math.random() * 255)
        var g = Math.round(Math.random() * 255)
        var b = Math.round(Math.random() * 255)
        styles['color'] = `rgb(${r},${g},${b})`
    }

    if (!styles['font-weight']) styles['font-weight'] = 'bold'

    const style = Object.keys(styles).map(key => `${key}: ${styles[key]}`).join(';')

    return console.log.bind(console, `%c${name}`, style)
};