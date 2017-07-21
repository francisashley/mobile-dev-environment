# MobileDevEnvironment

**MobileDevEnvironment**  is a basic set of tools injected into the DOM of browsers lacking basic dev features.

![g_20161226_2147093](https://cloud.githubusercontent.com/assets/12685308/21486950/dc803590-cbb5-11e6-922e-78e4a59ad59c.gif)

## Features
- A hard reload button for clearing browser cache.
- An output display for `console.log()` messages with trace info.
- An error Interceptor that displays error messages along with trace info
- A nice crispy, configurable, resizable, toggleable, colour coded interface. Great!


## Usage

```javascript
new MobileDevEnvironment({
  modules             : ['reload', 'logtray'],
  controlBarOrder     : ['reload', 'logtray'],
  controlbarPosition  : 'tr',
  hardReload          : true,
  displayErrors       : true,
  useConsoleLog       : true,
  group               : 'global'
});
```

## Options

<table>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
<th>Default</th>
</tr>
<tr>
<td>modules</td>
<td>array</td>
<td>Choose list of modules to load</td>
<td>['reload', 'logtray']</td>
</tr>
<tr>
<td>controlBarOrder</td>
<td>array</td>
<td>Customise order of modules in control bar</td>
<td>['reload', 'logtray']</td>
</tr>
<tr>
<td>controlBarPosition</td>
<td>string</td>
<td>Position the control bar either top left (tl) or top right (tr)</td>
<td>'tr'</td>
</tr>
<tr>
<td>displayErrors</td>
<td>boolean</td>
<td>Display javascript errors</td>
<td>true</td>
</tr>
<tr>
<td>useConsoleLog</td>
<td>boolean</td>
<td>Toggle between console.log() or log() to display messages</td>
<td>true</td>
</tr>
<tr>
<td>hardReload</td>
<td>string</td>
<td>Refresh browser cache</td>
<td>'tr'</td>
</tr>
<tr>
<td>group</td>
<td>string</td>
<td>Share state information like open/close, height etc with instances of MDE on other pages</td>
<td>'global'</td>
</tr>
</table>

## Modules
<table>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
<tr>
<td>reload</td>
<td>An easily accessible button for reloading the page</td>
</tr>
<tr>
<td>logtray</td>
<td>A toggleable, color coded, resizable tray for displaying log messages</td>
</tr>
</table>

## Installation

Install from NPM

```bash
npm install mobile-dev-environment
```

Clone from Github

```bash
git clone https://github.com/prjctnxt/MobileDevEnvironment.git
```

You can access the most up to date version via a CDN by passing these links into [RawGit](https://rawgit.com).
```html
https://github.com/prjctnxt/MobileDevEnvironment/blob/master/dist/mde.min.css
https://github.com/prjctnxt/MobileDevEnvironment/blob/master/dist/mde.min.js
```

Setup index.html

```html
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="path/to/mde.min.css">
  </head>
  <body>
    ....
    <script src="path/to/mde.min.js"></script>
    <script>
      new MobileDevEnvironment(options);
    </script>
  </body>
</html>
```
Or include the NPM package 
```
const MobileDevEnvironement = require('mobile-dev-environment');
```
## Heads up
Retrieving trace info only works when the caller is in a file that is directly accessable to the client. URL rewriting will break this. 

**For example:**

`http://localhost:8080/project/index.html`
will work

`http://localhost:8080/project` won't

## License

MIT
