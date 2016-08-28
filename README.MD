# A basic Tween slideshow
Create amazing fullpage:
* **[See live example.](https://mverissimo.github.io/tweenslideshow/)**

## Installation
###Step 1: Link required files

html
```
<!-- tuinslider Javascript file -->
<script src="/js/tuinslider.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
```

###Step 2: Create HTML markup

html
```
<div class="slider" id="slider">
  <div class="slider__container">
    <div class="slider__item"><div class="slider__content"></div></div>
    <div class="slider__item"><div class="slider__content"></div></div>
    <div class="slider__item"><div class="slider__content"></div></div>
    <div class="slider__item"><div class="slider__content"></div></div>
  </div>
</div>
```

###Step 3: Call the FullPage

Call .TuinSlider() on `<div id="slider">`.

```javascript
var slider = new TuinSlider("#slider");
```

##Options

**slider selector**
```
default: '.slider'
options: String
```

**ease**
```
default: 'SlowMo'
options: 'Power0', 'Power1', 'Elastic'
```

**easeType**
```
default: 'easeOut'
options: 'ease', 'easeIn'
```

For more options check: [For more options](href="http://greensock.com/ease-visualizer)

**duration**
```
default: 1,
options: int
```

**arrows**
```
default: 'true',
options: boolean (true / false)
```

**pagination**
```
default: 'true',
options: boolean (true / false)
```

**keyboard**
```
default: 'true',
options: boolean (true / false)
```

##Methods

**move()**
```
page.move(index);
```

##Callbacks
**onLeave**
```
default: null,
option: onLeave: function(index, items) {},
```

**afterLoad**
```
default: null,
option: afterLoad: function(index, items) {},
```

## Gulp commands

* `gulp` —— Default for task development
* `gulp --prod` —— Task production
* Access http://localhost:3000

## Change log

**Version 1.0.0**

* Support for internet explorer 9.

##Image license
[Pixel Squid](https://www.pixelsquid.com/)

## Contributing

Everyone is welcome to help [contribute](CONTRIBUTING.md) and improve this project. There are several ways you can contribute:

* Reporting issues (please read [issue guidelines](https://github.com/necolas/issue-guidelines))
* Suggesting new features
* Writing or refactoring code
* Fixing [issues](https://github.com/roots/roots/issues)

### Version BETA

**I create this fullpage for study, sorry for any bugs, contribute with this repo. Thank's enjoy! **

### License:

This boilerplate is free and open source software, distributed under the The MIT License. So feel free to use this to create your site without linking back to me or using a disclaimer.
