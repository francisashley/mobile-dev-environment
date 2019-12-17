<div align="center">

# Mobile Dev Environment

MDE displays a console output tray and extendable action bar inside your browser window.

[![version][version-badge]][package] [![MIT License][license-badge]][license]

![Markdown Dev Environment example](https://cloud.githubusercontent.com/assets/12685308/21486950/dc803590-cbb5-11e6-922e-78e4a59ad59c.gif)
</div>


## Table of Contents
<!-- no toc -->
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Install](#install)
- [Node usage](#node-usage)
- [Browser usage](#browser-usage)
- [Configuration](#configuration)
- [Actions](#actions)
- [Packaged actions](#packaged-actions)
- [Custom actions](#custom-actions)

## Features

- **Actions bar:** is a configurable menu containing quick access buttons (called actions).
- **Bundled actions:** include reloading / cache busting the page and toggling the console tray.
- **Console tray:** catches and displays `console.log()`, `console.error()`, `console.assert()` output.
- **Runtime errors:** are caught and shown in the console tray.

## Install

With node:

```shell
npm install @fa-repo/mobile-dev-environment
```

With [unpkg.com](https://unpkg.com/browse/@fa-repo/mobile-dev-environment@latest/):

```html
<script src="https://unpkg.com/@fa-repo/mobile-dev-environment@latest/dist/mde.min.js"></script>
<link href="https://unpkg.com/@fa-repo/mobile-dev-environment@latest/dist/mde.min.css" rel="stylesheet" type="text/css">
```

## Node usage

```js
// app.js
import mobileDevEnvironment from '@fa-repo/mobile-dev-environment';
import '@fa-repo/mobile-dev-environment/mobile-dev-environment.css';

window.addEventListener("DOMContentLoaded", event => {
  new mobileDevEnvironment({
    root: document.getElementById('mde'),
    stateId : 'my-multi-page-app',
    actionsCorner : 'tl'
  });
});

// app.html
<!-- ... -->
<html>
  <head>
    <link href="./link/to/app.min.css" rel="stylesheet" type="text/css" />
    <script src="./link/to/app.min.js" defer></script>
  </head>
  <body>
    <div id="mde"></div>
  </body>
</html>
```

## Browser usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
  <link href="https://unpkg.com/@fa-repo/mobile-dev-environment@latest/dist/mde.min.css" rel="stylesheet" type="text/css">
  <script src="https://unpkg.com/@fa-repo/mobile-dev-environment@latest/dist/mde.min.js" defer></script>
</head>
<body>
  <div id="mde"></div>
  <script>
    new mobileDevEnvironment({
      root: document.getElementById('mde'),
      stateId : 'my-multi-page-app',
      actionsCorner : 'tl'
    });
  </script>
</body>
</html>
```

## Configuration

<table>
  <tr>
    <th align="left" valign="top">Option</th>
    <th align="left" valign="top">Description</th>
    <th align="left" valign="top">Type</th>
    <th align="left" valign="top">Default</th>
    <th align="left" valign="top">Required</th>
  </tr>
  <tr>
    <td valign="top"><code>actions</code></td>
    <td valign="top">An array of <a href="#modules" name="modules">actions</a> to load</td>
    <td valign="top"><code>array</code></td>
    <td valign="top"><code>['reload','tray']</code></td>
    <td valign="top"></td>
  </tr>
  <tr>
    <td valign="top"><code>actionsCorner</code></td>
    <td valign="top">The actions bar position, top left <code>'tl'</code> or right <code>'tr'</code></td>
    <td valign="top"><code>string</code></td>
    <td valign="top"><code>'tr'</code></td>
    <td valign="top"></td>
  </tr>
  <tr>
    <td valign="top"><code>root</code></td>
    <td valign="top">Provide a DOM element for MDE to hook on too.</td>
    <td valign="top"><code>DOM element</code></td>
    <td valign="top"></td>
    <td valign="top">Required</td>
  </tr>
  <tr>
    <td valign="top"><code>stateId</code></td>
    <td valign="top">Share state information like open/close, height etc across instances of MDE on other pages</td>
    <td valign="top"><code>string</code></td>
    <td valign="top"><code>'global'</code></td>
    <td valign="top"></td>
  </tr>
</table>

## Actions

Actions are easily accessible buttons that appear in the actions bar. You can either use the buttons that come packaged with MDE or make your own.


## Packaged actions

Packaged actions can be referenced in two ways. Either as strings by name or as objects which enable configuration.

```js
// Example A
[ "reload", "toggle-tray" ]
// Example B
[ { action: "reload", refreshCache: false }, "toggle-tray" ]
// Example C
[ { action: "reload", refreshCache: false }, { action: "toggle-tray"} ]
```

**Packaged action - `reload`:** this action reloads the page.


<table>
  <tr>
    <th colspan="1" align="left" valign="top">Option</th>
    <th colspan="3" align="left" valign="top">Description</th>
    <th colspan="1" align="left" valign="top">Default</th>
  </tr>
  <tr>
    <td colspan="1" valign="top"><code>refreshCache</code></td>
    <td colspan="3" valign="top">Refresh the browsers cache on each reload.</td>
    <td colspan="1" valign="top"><code>true<code></td>
  </tr>
</table>


**Packaged action - `toggle-tray`:** this action toggles the console tray.

## Custom actions

Custom actions are a way to extend MDE with your own buttons. The API is quite flexible but at a minimum all custom actions require an `action` key with a value of `"custom"`.

```js
// Example
[
    { action: "custom", content: "Click me", onClick: e => alert("Hi!") }
]
```

<table>
  <tr>
    <th colspan="1" align="left" valign="top">Option</th>
    <th colspan="3" align="left" valign="top">Description</th>
    <th colspan="1" align="left" valign="top">type</th>
  </tr>
  <tr>
    <td colspan="1" valign="top"><code>action</code></td>
    <td colspan="3" valign="top">Is the action type. If we're creating a custom action, this must be `"custom"`.</td>
    <td colspan="1" valign="top">`string`</td>
  </tr>
  <tr>
    <td colspan="1" valign="top"><code>content</code></td>
    <td colspan="3" valign="top">This goes inside the button. It could be some text or maybe another element like an icon.</td>
    <td colspan="1" valign="top">`string|element`</td>
  </tr>
    <tr>
    <td colspan="1" valign="top"><code>onClick</code></td>
    <td colspan="3" valign="top">This function is called when the button is clicked</td>
    <td colspan="1" valign="top">`function`</td>
  </tr>
</table>

[version-badge]: https://img.shields.io/npm/v/@fa-repo/mobile-dev-environment.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/@testing-library/react.svg?style=flat-square
[package]: https://www.npmjs.com/package/@fa-repo/mobile-dev-environment
[license]: https://github.com/fa-repo/mobile-dev-environment/blob/master/LICENSE.md