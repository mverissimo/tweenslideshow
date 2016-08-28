var slider = new TuinSlider('#slider', {
  onLeave: function(index) {
    // Tween timeline object
    var tl = new TimelineLite();

    // Select elements in current slide, 
    // if not the animation triggers for all elements
    var items = document.querySelectorAll('.slider__item')
    var item = items[index];

    // Animate title
    var title = item.querySelectorAll('.title');

    // First slide = 0
    var burger = item.querySelector('.burger');

    // Second slide = 1
    var astronaut = item.querySelector('.astronaut');

    // Third slide = 2
    var cup = item.querySelectorAll('.cup');

    // Exit animations
    if (index === 0) {
      tl.staggerTo(title, 0.8, {
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
      tl.staggerTo(title, 0.8, {
          y: 100,
          opacity: 0,
          ease: Power3.easeOut
        }, 0.5)
        .to(astronaut, 0.5, {
          y: -100,
          opacity: 0
        }, '=-1');

    }

    if (index === 2) {
      tl.staggerTo(title, 0.8, {
          y: -100,
          opacity: 0,
          ease: Power3.easeOut
        }, 0.5)
        .to(cup, 0.5, {
          x: 100,
          opacity: 0
        });

    }

    return tl;

  },

  afterLoad: function(index) {
    // Tween timeline object
    var tl = new TimelineLite();

    // Select elements in current slide, 
    // if not the animation triggers for all elements
    var items = document.querySelectorAll('.slider__item')
    var item = items[index];

    // Animate title every slide item
    var title = item.querySelectorAll('.title');

    // Hide the content case click in between values dots
    // By example you are slide one and click slide third
    // this make hide the content in slide two
    var content = item.querySelector('.slider__content');
    TweenLite.set(content, {
      visibility: 'visible'
    });

    // First slide = 0
    var burger = item.querySelector('.burger');

    // Second slide = 1
    var astronaut = item.querySelector('.astronaut');

    // Third slide = 2
    var cup = item.querySelectorAll('.cup');

    // Enter animations
    if (index === 0) {
      tl.staggerFromTo(title, 1, {
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