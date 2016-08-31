(function() {
  'use strict';


  // Utilities helpers
  var utils = {
    // From http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
    extend: function(defaults, options) {
      if (typeof(options) !== 'object') {
        options = {};
      }

      for (var key in options) {
        if (defaults.hasOwnProperty(key)) {
          defaults[key] = options[key];
        }

      }

      return defaults;

    },

    // From https://davidwalsh.name/javascript-debounce-function.
    debounce: function(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      }
    },

    setStyle: function(el, property, value) {
      el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;

    },

    setVendor: function(el, property, value) {
      el.style[property.charAt(0).toLowerCase() + property.slice(1)] = value;
      el.style['webkit' + property] = value;
      el.style['moz' + property] = value;
      el.style['ms' + property] = value;
      el.style['o' + property] = value;

    },

    // From http://jaketrent.com/post/addremove-classes-raw-javascript/
    hasClass: function(el, className) {
      if (el.classList) {
        return el.classList.contains(className);
      } else {
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
      }

    },

    addClass: function(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else if (!utils.hasClass(el, className)) {
        el.className += " " + className;
      }
    },

    removeClass: function(el, className) {
      if (el.classList) {
        el.classList.remove(className)
      } else if (utils.hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, ' ');
      }

    },

  };

  function TuinSlider(element, options) {

    var defaults = {
      selector: '.slider',

      // Greensock options
      ease: 'SlowMo',
      easeType: 'easeOut',
      duration: 1,

      nextHtml: '',
      prevHtml: '',
      paginationHtml: '',

      arrows: true,
      keyboard: true,
      pagination: true,

      onLeave: null,
      afterLoad: null,

    };

    // Element
    this.el = document.querySelector(element);

    // Settings
    this.settings = utils.extend(defaults, options);

    // body
    this.body = document.querySelector('body');

    //El container
    this.container = this.el.querySelector(this.settings.selector + '__container');

    // Sliders
    this.items = this.el.querySelectorAll(this.settings.selector + '__item');

    //init
    this.init();

    return this;

  };

  TuinSlider.prototype.init = function() {

    this.index = 0;
    this.slideWidth = parseInt(getComputedStyle(this.container).width);

    this.build();
    this.bindEvents();
    this.makeActive(this.index);

    if (typeof this.settings.afterLoad === 'function') {
      this.settings.afterLoad(this.index);
    }

  };

  TuinSlider.prototype.build = function() {
    if (this.settings.arrows) {
      this.appendArrows();

    }

    if (this.settings.pagination) {
      this.appendPagination();
    }

  };

  TuinSlider.prototype.bindEvents = function() {
    var self = this;

    if (this.settings.keyboard) {
      document.addEventListener('keydown', this.keyboard.bind(this));

    }

    if (this.settings.arrows) {
      this.settings.nextHtml.addEventListener('click', this.moveToNext.bind(this));
      this.settings.prevHtml.addEventListener('click', this.moveToPrev.bind(this));

    }

    if (this.settings.pagination) {
      var paginationLinks = document.querySelectorAll('.slider-navigation li a');

      for (var i = 0; i < paginationLinks.length; i++) {

        (function(index) {

          paginationLinks[i].addEventListener('click', function(event) {
            self.move(index);
            event.preventDefault();

          });

        })(i);

      }

    }

    window.addEventListener('resize', this.resize.bind(this), false);

  };

  TuinSlider.prototype.makeActive = function(index) {
    var self = this;

    if (this.settings.pagination) {
      var paginationLinks = document.querySelectorAll('.slider-navigation li a');
    }

    for (var i = 0; i < this.items.length; i++) {
      utils.removeClass(this.items[i], 'is-active');
      if (this.settings.pagination) {
        utils.removeClass(paginationLinks[i], 'is-active');
      }

    }

    utils.addClass(this.items[index], 'is-active');
    if (this.settings.pagination) {
      utils.addClass(paginationLinks[index], 'is-active');
    }

  };

  TuinSlider.prototype.move = function(index) {
    var tl = new TimelineLite();
    var self = this;

    if (!utils.hasClass(this.items[index], 'is-active')) {
      tl.eventCallback('onStart', function() {
        if (self.settings.arrows) {
          utils.setStyle(self.settings.prevHtml, 'pointerEvents', 'none');
          utils.setStyle(self.settings.nextHtml, 'pointerEvents', 'none');
        }

        if (self.settings.pagination) {
          utils.setStyle(this.settings.paginationHtml, 'pointerEvents', 'none');
        }

      });

      if (typeof self.settings.onLeave === 'function') {
        tl.add(self.settings.onLeave(self.index));
      }

      tl.to(this.container, this.settings.duration, {
        x: -index * this.slideWidth,
        ease: this.settings.ease + '.' + this.settings.easeType,

      }, '-=0.5');

      if (typeof self.settings.afterLoad === 'function') {
        tl.add(self.settings.afterLoad(index));
      }

      tl.eventCallback('onComplete', function() {
        if (self.settings.arrows) {
          utils.setStyle(self.settings.prevHtml, 'pointerEvents', 'auto');
          utils.setStyle(self.settings.nextHtml, 'pointerEvents', 'auto');

        }

        if (self.settings.pagination) {
          utils.setStyle(self.settings.paginationHtml, 'pointerEvents', 'auto');
        }

      });

    }

    this.index = index;

    this.makeActive(this.index);

    return tl;

  };

  TuinSlider.prototype.moveToNext = function(index) {
    if ((this.index + 1) < this.items.length) {
      this.move(this.index + 1);

    }

  };

  TuinSlider.prototype.moveToPrev = function() {
    if (this.index > 0) {
      this.move(this.index - 1);

    }

  };

  TuinSlider.prototype.keyboard = function(event) {

    if (event.keyCode === 37) {
      this.moveToPrev();

    }

    if (event.keyCode === 39) {
      this.moveToNext();

    }

  };

  TuinSlider.prototype.appendArrows = function() {
    var arrows = document.createElement('div');
    arrows.setAttribute('class', 'slider-controls');

    var next = document.createElement('button');
    next.setAttribute('type', 'button');
    next.setAttribute('class', 'next');

    var prev = document.createElement('button');
    prev.setAttribute('type', 'button');
    prev.setAttribute('class', 'previous');

    this.el.appendChild(arrows);

    var controlsElement = this.el.querySelector('.slider-controls');
    controlsElement.appendChild(next);
    controlsElement.appendChild(prev);

    this.settings.nextHtml = next;
    this.settings.prevHtml = prev;

  };

  TuinSlider.prototype.appendPagination = function() {
    var paginationList = '';

    for (var i = 0; i < this.items.length; i++) {
      paginationList += '<li><a data-index=\"' + i + '\" href=\"#' + i + '"\></a></li>';

    }

    this.settings.paginationHtml = document.createElement('ul');
    this.settings.paginationHtml.setAttribute('class', 'slider-navigation');
    this.settings.paginationHtml.innerHTML = paginationList;

    this.body.appendChild(this.settings.paginationHtml);

  };

  TuinSlider.prototype.resize = utils.debounce(function() {
    var self = this;

    self.slideWidth = parseInt(getComputedStyle(this.container).width);

    var sliderOffset = self.slideWidth * self.index + 1;

    utils.setVendor(self.container, 'Transform', 'matrix(1, 0, 0, 1, -' + sliderOffset + ', 0)');

  }, 10);

  window.TuinSlider = TuinSlider;

})(window);