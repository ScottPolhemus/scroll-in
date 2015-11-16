function ScrollIn() {
  this.updateTargetMap();
  this.onScroll();

  window.addEventListener('resize', this.updateTargetMap.bind(this));
  window.addEventListener('scroll', this.onScroll.bind(this));
}

ScrollIn.prototype.updateTargetMap = function() {
  var targets = document.querySelectorAll('[data-scroll-in]');
  var targetMap = {};

  for(var i = 0; i < targets.length; i++) {
    var el = targets[i];
    var rect = el.getBoundingClientRect();
    var top = rect.top;

    targetMap[top] = targetMap[top] || [];
    targetMap[top].push(el);
  }

  this.map = targetMap;
};

ScrollIn.prototype.onScroll = function(event) {
  var scrollTop = window.pageYOffset;
  var scrollBottom = scrollTop + window.innerHeight;

  for(var targetY in this.map) {
    if(scrollBottom > targetY) {
      var targets = this.map[targetY];

      targets.forEach(function(targetEl, i) {
        if(targetEl.getAttribute('data-scroll-in') !== 'in') {
          setTimeout(function() {
            targetEl.setAttribute('data-scroll-in', 'in');
            this.trigger(targetEl, 'scroll-in');
          }.bind(this), 50 * i);
        }
      }.bind(this));
    }
  }
}

ScrollIn.prototype.trigger = function(el, name) {
  if (window.CustomEvent) {
    var event = new CustomEvent(name, {detail: {}});
  } else {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, true, true, {});
  }

  el.dispatchEvent(event);
}

module.exports = ScrollIn;