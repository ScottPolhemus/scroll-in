/**
 * Creates a ScrollIn watcher instance.
 * @constructor
 */
function ScrollIn(opts) {
  // Default options
  this.options = {
    y: 100
  };

  // Options passed to the constructor
  if(opts) {
    for(var name in opts) {
      var value = opts[name];
      name = name.toLowerCase();
      this.options[name] = normalizeOption(name, value);
    }
  }

  window.addEventListener('resize', this.update.bind(this));
  window.addEventListener('scroll', this.checkScroll.bind(this));

  this.update();
  this.checkScroll();
}

function normalizeOption(name, value) {
  if(name === 'y') {
    if(value === 'top') {
      return 0;
    } else if(value === 'center') {
      return 50;
    } else if(value === 'bottom') {
      return 100;
    } else {
      return parseFloat(value);
    }
  }
}

/**
 * Updates the internal map of target elements.
 * Elements are arranged by vertical offset in the format:
 * { 
 *   1000: [el, el]
 *   1800: [el]
 *   1900: [el]
 *   2000: [el, el, el]
 * }
 */
ScrollIn.prototype.update = function() {
  var targets = document.querySelectorAll('[data-scroll-in]');
  var targetMap = {};

  for(var i = 0; i < targets.length; i++) {
    var el = targets[i];
    var rect = el.getBoundingClientRect();
    var top = rect.top;

    var percentOffset = this.options.y;

    if(el.hasAttribute('data-scroll-in-y')) {
      percentOffset = normalizeOption('y', el.getAttribute('data-scroll-in-y'));
    }

    var actualOffset = window.innerHeight * ((100 - percentOffset) / 100);

    top += actualOffset;

    targetMap[top] = targetMap[top] || [];
    targetMap[top].push(el);
  }

  this.map = targetMap;
  this.checkScroll();
};

/**
 * Iterates through the target map and triggers
 * any element groups above the current scroll position.
 */
ScrollIn.prototype.checkScroll = function() {
  var scrollTop = window.pageYOffset;
  var scrollBottom = scrollTop + window.innerHeight;

  for(var targetY in this.map) {
    if(scrollBottom > targetY) {
      var targets = this.map[targetY];

      targets.forEach(function(targetEl, index) {
        if(targetEl.getAttribute('data-scroll-in') !== 'in') {
          // Stagger simultaneous events
          var delay = 50 * index;

          this.triggerElement(targetEl, delay);
        }
      }.bind(this));
    }
  }
}

/**
 * Triggers the scroll-in event on an element.
 * @param el - The element to be triggered.
 * @param delay - Delay (in milliseconds) before triggering element.
 */
ScrollIn.prototype.triggerElement = function(el, delay) {
  delay = delay || 0;

  if(typeof CustomEvent === 'function') {
    var event = new CustomEvent('scroll-in');
  } else {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('scroll-in', true, true);
  }

  setTimeout(function() {
    el.setAttribute('data-scroll-in', 'in');
    el.dispatchEvent(event);
  }, delay);
}

module.exports = ScrollIn;
