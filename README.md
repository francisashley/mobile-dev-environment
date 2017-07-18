MobileDevEnvironment inserts a simple toolset into browsers lacking basic dev features.

![g_20161226_2147093](https://cloud.githubusercontent.com/assets/12685308/21486950/dc803590-cbb5-11e6-922e-78e4a59ad59c.gif)

## Features

A refresh button that will clear the cache.

A tray that displays console.log() messages.

That is also resizable, toggleable, colour coded, catches errors and displays trace info. Great!

## Install

At present MDE is only available on GitHub.


## Usage
```html
<link href="mde/styles.css" rel="stylesheet">
<script src="mde/mde.js"></script>

<script>
    new MobileDevEnvironment();
</script>
```

## API

### new MobileDevEnvironment([options])

#### options

##### reload

Type: `boolean`
Default: `true`

Choose to display reload button in the browser.

##### hardReload

Type: `boolean`
Default: `true`

Enable to clear the cache.

##### logbox

Type: `boolean`
Default: `true`

Choose to display logbox (log tray) in the browser.

##### logErrors

Type: `boolean`
Default: `true`

Enable to catch javascript errors. Great for debugging.

##### group

Type: `string`
Default: `'global'`

Share state information with other instances of MDE in the group. Information like logbox toggle and height will be shared.

This is useful if you want to use MDE in multiple files across the same project.


## Heads up
Retrieving trace info only works when the caller is in a file that is directly accessable to the client. URL rewriting will break this.

For example:

`http://localhost:8080/project/index.html`
will work

`http://localhost:8080/project` won't

## License

MIT License

Copyright (c) 2016 Francis Ashley

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
