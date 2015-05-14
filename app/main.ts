/// <reference path="../typings/react/react.d.ts" />
import React = require('react');

import { App } from './app.react'

const { DOM, render } = React;

function main() {
    render(App({ label: 'foo' }), document.body)
}

main()