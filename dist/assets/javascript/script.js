(function() {
  'use strict';

  // From https://davidwalsh.name/javascript-debounce-function.
  function debounce(func, wait, immediate) {
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
    };

  }

  var defaults = {
    selector: '.slider',

    // Greensock options
    ease: 'SlowMo',
    easeType: 'easeOut',
    duration: 1,

    nextHtml: '',
    prevHtml: '',

    arrows: true,
    keyboard: true,
    pagination: true,

    onLeave: null,
    afterLoad: null,

  };

  var utils = {
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

  };

  var TuinSlide = function(element, options) {

    // Element
    this.el = document.querySelector(element);

    // Settings
    this.settings = Object.assign({}, defaults, options);

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

  TuinSlide.prototype.init = function() {

    this.index = 0;
    this.slideWidth = parseInt(getComputedStyle(this.container).width);

    this.build();
    this.bindEvents();
    this.makeActive(this.index);

    if (typeof this.settings.onLeave === 'function') {
      this.settings.afterLoad(this.index, this.items);
    }

  };

  TuinSlide.prototype.build = function() {
    if (this.settings.arrows) {
      this.appendArrows();

    }

    if (this.settings.pagination) {
      this.appendPagination();
    }

  };

  TuinSlide.prototype.bindEvents = function() {
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

  TuinSlide.prototype.makeActive = function(index) {
    var self = this;
    var paginationLinks = document.querySelectorAll('.slider-navigation li a');

    for (var i = 0; i < this.items.length; i++) {
      this.items[i].classList.remove('is-active');
      paginationLinks[i].classList.remove('is-active');

    }

    this.items[index].classList.add('is-active');
    paginationLinks[index].classList.add('is-active');

  };

  TuinSlide.prototype.move = function(index) {
    var tl = new TimelineLite();
    var self = this;

    var paginationLinks = document.querySelector('.slider-navigation');

    if (!this.items[index].classList.contains('is-active')) {
      tl.eventCallback('onStart', function() {
        utils.setStyle(self.settings.prevHtml, 'pointerEvents', 'none');
        utils.setStyle(self.settings.nextHtml, 'pointerEvents', 'none');
        utils.setStyle(paginationLinks, 'pointerEvents', 'none');

      });

      if (typeof self.settings.onLeave === 'function') {
        tl.add(self.settings.onLeave(self.index, self.items));
      }

      tl.to(this.container, this.settings.duration, {
        x: -index * this.slideWidth,
        ease: this.settings.ease + '.' + this.settings.easeType,

      }, '-=0.5');

      if (typeof self.settings.afterLoad === 'function') {
        tl.add(self.settings.afterLoad(index, self.items));
      }

      tl.eventCallback('onComplete', function() {
        utils.setStyle(self.settings.prevHtml, 'pointerEvents', 'initial');
        utils.setStyle(self.settings.nextHtml, 'pointerEvents', 'initial');
        utils.setStyle(paginationLinks, 'pointerEvents', 'initial');

      });

    }

    this.index = index;

    this.makeActive(this.index);

    return tl;

  };

  TuinSlide.prototype.moveToNext = function(index) {
    if ((this.index + 1) < this.items.length) {
      this.move(this.index + 1);

    }

  };

  TuinSlide.prototype.moveToPrev = function() {
    if (this.index > 0) {
      this.move(this.index - 1);

    }

  };

  TuinSlide.prototype.keyboard = function(event) {

    if (event.keyCode === 37) {
      this.moveToPrev();

    }

    if (event.keyCode === 39) {
      this.moveToNext();

    }

  };

  TuinSlide.prototype.appendArrows = function() {
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

  TuinSlide.prototype.appendPagination = function() {
    var paginationList = '';

    for (var i = 0; i < this.items.length; i++) {
      paginationList += '<li><a data-index=\"' + i + '\" href=\"#' + i + '"\></a></li>';

    }

    var pagination = document.createElement('ul');
    pagination.setAttribute('class', 'slider-navigation');
    pagination.innerHTML = paginationList;

    this.body.appendChild(pagination);

  };

  TuinSlide.prototype.resize = debounce(function() {
    var self = this;

    self.slideWidth = parseInt(getComputedStyle(this.container).width);

    var sliderOffset = self.slideWidth * self.index + 1;

    utils.setVendor(self.container, 'Transform', 'matrix(1, 0, 0, 1, -' + sliderOffset + ', 0)');

  }, 10);

  window.TuinSlide = TuinSlide;

})(window);

var slider = new TuinSlide('#slider', {
  onLeave: function(index, items) {
    var tl = new TimelineLite();
    var current = items[index];

    // Animate title every slide current
    var title = current.querySelectorAll('.slider__item__title');
    var content = current.querySelector('.slider__content');

    // First slide = 0
    var burger = current.querySelector('.burger');

    // Second slide = 1
    var astronaut = current.querySelector('.astronaut');

    // Third slide = 2
    var cup = current.querySelectorAll('.cup');

    if (index === 0) {
      tl.staggerFromTo(title, 0.8, {
          y: 0,
          opacity: 1,
        }, {
          y: -100,
          opacity: 0,
          ease: Power3.easeOut

        }, 0.5)
        .to(burger, 0.6, {
          x: 200,
          opacity: 0,
          ease: Power3.easeOut

        });

    }

    if (index === 1) {
      tl.staggerFromTo(title, 0.8, {
          y: 0,
          opacity: 1,
        }, {
          y: 100,
          opacity: 0,
          ease: Power3.easeOut
        }, 0.5)
        .to(astronaut, 0.5, {
          y: -100,
          opacity: 0
        }, '=-1');

    }


    return tl;

  },

  afterLoad: function(index, items) {
    var tl = new TimelineLite();
    var current = items[index];

    // Animate title every slide current
    var title = current.querySelectorAll('.slider__item__title');
    var content = current.querySelector('.slider__content');

    // First slide = 0
    var burger = current.querySelector('.burger');

    // Second slide = 1
    var astronaut = current.querySelector('.astronaut');

    // Third slide = 2
    var cup = current.querySelectorAll('.cup');


    TweenLite.set(content, {
      visibility: 'visible'
    });


    if (index === 0) {
      tl.staggerFromTo(title, 0.8, {
          y: 100,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          ease: Power3.easeOut

        }, 0.5)
        .fromTo(burger, 1.5, {
          x: 100,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          ease: Power3.easeOut

        }, '-=0.6');

    }

    if (index === 1) {
      tl
        .staggerFromTo(title, 0.8, {
          y: -100,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          ease: Power3.easeOut
        }, 0.5).fromTo(astronaut, 0.5, {
          y: 100,
          opacity: 0
        }, {
          y: 0,
          opacity: 1
        }, '=-1');

    }

    if (index === 2) {
      tl.staggerFromTo(title, 0.8, {
          y: 100,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          ease: Power3.easeOut

        }, 0.5)
        .staggerFromTo(cup, 1.5, {
          x: 100,
          opacity: 0,
        }, {
          x: 0,
          opacity: 1,
          ease: Power3.easeOut

        }, 0.5);

    }

    return tl;

  }

});
