# Scroll In

A small library for triggering events on elements when they are scrolled into view.

## Usage

Add the `data-scroll-in` attribute to the desired elements, and initialize the plugin by creating a new instance like this:

```html
<div class="element-to-watch" data-scroll-in>
</div>
```

```js
var ScrollIn = require('scroll-in');
new ScrollIn();
```

ScrollIn will monitor your scroll position and trigger the `scroll-in` event on any element in view (or above the current viewport). The data attribute is set to `"in"` when the event has been triggered, which you can use to 

## Options

You can configure some options when initializing the plugin:

```js
new ScrollIn({
  stagger: 50,
  y: 'bottom'
});
```

### stagger
Default: `50`

Time, in milliseconds, to wait before triggering simultaneous scroll-in events.

### y
Default: `100`

Determines where relative to the viewport the element should be scrolled to in order to trigger the event. Can be set as a percentage relative to the height of the viewport, or with a vertical position keyword (`top`, `center`, or `bottom`).