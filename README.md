# Scroll In

A small library for triggering events on elements when they are scrolled into view.

Finds elements with a `data-scroll-in` attribute, and triggers `scroll-in` events when the page is scrolled past each element. Also applies `data-scroll-in="in"` to the visible elements.

## Usage

```html
<div class="element-to-watch" data-scroll-in>
</div>
```

```js
var ScrollIn = require('scroll-in');
new ScrollIn();
```
