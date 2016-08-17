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
