## Mobile Dev Environment

**Mobile Dev Environment** (or **MDE**) is a simple set of tools injected into the DOM of minimalistic browsers lacking basic dev features. Developed during a period confined to a mobile device, the limitations of the platform became all to familiar and so to maintain a good balance of yang in the universe the library arose. So in that light, if you discover any bugs or have any feature ideas feel free to get in contact by submitting an issue on Github or sending an email to fa.repo.dev@gmail.com.

![g_20161226_2147093](https://cloud.githubusercontent.com/assets/12685308/21486950/dc803590-cbb5-11e6-922e-78e4a59ad59c.gif)

### Features

- **Reload button** <br> An easily accessible button that can be configured to refresh browser cache.
- **Log tray**  <br> A toggleable, resizable, colour coded output area bound to console.log().
- **Error messages** <br/> Catch and display errors that occur after the script has been initialised.
- **Trace information** <br/> View filenames and line numbers of all log messages.

### Installation

If you are using npm, `npm install mobile-dev-environment`. Otherwise, grab the [latest release](https://github.com/fa-repo/mobile-dev-environment/releases) or link via a [CDN](https://unpkg.com/mobile-dev-environment/dist/).

**Include in the browser**
```html
// head
<link rel="stylesheet" type="text/css" href="path/to/mde.min.css">

// body
<script src="path/to/mde.min.js"></script>
```

**or in Node**

```javascript
const mobileDevEnvironement = require('mobile-dev-environment');
```

### Usage

```javascript
let options =  {
  controlBarPosition  : 'tl',
  group               : 'myMultiPageApp',
  ...
};

new mobileDevEnvironment(options);
```

### Configuration

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