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

## Features

- **Reload button** <br> An easily accessible button that can be configured to refresh browser cache.
- **Log tray**  <br> A toggleable, resizable, colour coded output area bound to console.log().
- **Error messages** <br/> Catch and display errors that occur after the script has been initialised.
- **Trace information** <br/> View filenames and line numbers of all log messages.

## Install

With node:

```shell
npm install @fa-repo/mobile-dev-environment
```

With [unpkg.com](https://unpkg.com/browse/mobile-dev-environment@1.0.2/):

```html
<script src="https://unpkg.com/browse/mobile-dev-environment@1.0.2/dist/mde.min.js"></script>
<link href="https://unpkg.com/browse/mobile-dev-environment@1.0.2/dist/mde.min.css" rel="stylesheet" type="text/css">
```

## Node usage

```js
// app.js
import mobileDevEnvironment from '@fa-repo/mobile-dev-environment';
import '@fa-repo/mobile-dev-environment/mobile-dev-environment.css';

new mobileDevEnvironment({
  group : 'my-multi-page-app',
  controlBarPosition : 'tl'
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
  <link href="https://unpkg.com/browse/mobile-dev-environment@1.0.2/dist/mde.min.css" rel="stylesheet" type="text/css">
  <script src="https://unpkg.com/browse/mobile-dev-environment@1.0.2/dist/mde.min.js" defer></script>
  <script defer>  
    new mobileDevEnvironment({
      group : 'my-multi-page-app',
      controlBarPosition : 'tl'
    });
  </script>
</head>
<body>
  <div id="mde"></div>
</body>
</html>
```

## Configuration

<table>
  <tr>
    <th colspan="4" align="left" valign="top"><a href="#options" name="options">Options</a></th>
  </tr>
  <tr>
    <th align="left" valign="top">Option</th>
    <th align="left" valign="top">Description</th>
    <th align="left" valign="top">Type</th>
    <th align="left" valign="top">Default</th>
  </tr>
  <tr>
    <td valign="top"><code>modules</code></td>
    <td valign="top">An array of <a href="#modules" name="modules">modules</a> to load</td>
    <td valign="top"><code>array</code></td>
    <td valign="top"><code>['reload','logtray']</code></td>
  </tr>
  <tr>
    <td valign="top"><code>controlBarOrder</code></td>
    <td valign="top">The module order in control bar</td>
    <td valign="top"><code>array</code></td>
    <td valign="top"><code>['reload','logtray']</code></td>
  </tr>
  <tr>
    <td valign="top"><code>controlBarPosition</code></td>
    <td valign="top">The controlbar position, top left <code>'tl'</code> or right <code>'tr'</code></td>
    <td valign="top"><code>string</code></td>
    <td valign="top"><code>'tr'</code></td>
  </tr>
  <tr>
    <td valign="top"><code>displayErrors</code></td>
    <td valign="top">Catch and output javascript errors</td>
    <td valign="top"><code>boolean</code></td>
    <td valign="top"><code>true</code></td>
  </tr>
  <tr>
    <td valign="top"><code>useConsoleLog</code></td>
    <td valign="top">Use console.log() or else log() to display messages</td>
    <td valign="top"><code>boolean</code></td>
    <td valign="top"><code>true</code></td>
  </tr>
  <tr>
    <td valign="top"><code>hardReload</code></td>
    <td valign="top">Refresh browser cache</td>
    <td valign="top"><code>string</code></td>
    <td valign="top"><code>true</code></td>
  </tr>
  <tr>
    <td valign="top"><code>group</code></td>
    <td valign="top">Share state information like open/close, height etc across instances of MDE on other pages</td>
    <td valign="top"><code>string</code></td>
    <td valign="top"><code>'global'</code></td>
  </tr>
  <tr>
    <th colspan="4" align="left" valign="top"><a href="#modules" name="modules">Modules</a></th>
  </tr>
  <tr>
    <th colspan="1" align="left" valign="top">Module</th>
    <th colspan="3" align="left" valign="top">Description</th>
  </tr>
  <tr>
    <td colspan="1" valign="top"><code>reload</code></td>
    <td colspan="3" valign="top">An easily accessible button for reloading the page</td>
  </tr>
  <tr>
    <td colspan="1" valign="top"><code>logtray</code></td>
    <td colspan="3" valign="top">A toggleable, color coded, resizable tray for displaying log messages</td>
  </tr>
</table>


[version-badge]: https://img.shields.io/npm/v/@fa-repo/mobile-dev-environment.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/@testing-library/react.svg?style=flat-square
[package]: https://www.npmjs.com/package/@fa-repo/mobile-dev-environment
[license]: https://github.com/fa-repo/mobile-dev-environment/blob/master/LICENSE.md