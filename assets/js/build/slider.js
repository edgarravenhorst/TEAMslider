
var activeSliders = Array();
var RehabAnimations = Array();

var RehabSlider = function(elementID, width, height, vars){

    //slider vars
    this.sliderID = elementID;
    this.sliderObj = $(elementID);
    this.width = width;
    this.height = height;
    this.currentSlide = 0;
    this.previousSlide = -1;

    //animation vars
    this.animationType = vars.animation.type || 'slide';
    this.animationspeed = vars.animation.speed || 1500;
    this.slideDelay = vars.animation.delay || 4000;
    this.animationVars = vars.animation;
    this.animation = RehabAnimations[this.animationType] ? new RehabAnimations[this.animationType](this, this.animationVars) : false;

    //selector vars
    this.selector = false;
    this.selectorItemsInView = 3;

    //timer vars
    this.timer;
    this.timelineTimer;
    this.timeline = true;

    //initialisation vars
    this.dynamicWidth = (!width || width == "auto" || width == -1) ? true : false;
    this.dynamicHeight = (!height || height == "auto" || height == -1) ? true : false;

    this.imagesToLoad = 0;
    this.ImagesLoaded = 0;

    this.slides = [];
    this.slideCount = 0;
    this.slidesInitialized = false;

    //=====================================================================================
    //initialize vars & slides
    //=====================================================================================

    //this.sliderObj.find('.sliderElem').hide();

    this.init = function(){
        //prepare html structure
        this.sliderObj.addClass('rehabslider');
        this.sliderObj.addClass('animation_' + this.animationType);
        this.bullets = this.sliderObj.find('.bullets');
        this.slideContainer = this.sliderObj.find('.sliderContainer');

        //prepare settings
        this.setSliderSize(this.width, this.height);

        //init slides
        if(!this.slidesInitialized ) this.initSlides();

        //init interface
        this.initInterface();

        //extend html structure
        if(this.bullets) this.bulletsCreate();

        //init animation
        this.animation.init();

        //init swipeing
        this.initSwiping();

        //init timer
        if(this.timeline) this.initTimeline();

        if(this.selector) this.selector = new ThumbnailSelector(this, this.selectorItemsInView);

        $(window).resize(this.onResizeHandler.bind(this));
        activeSliders.push(this);
    };

    //this function prepares the slides.
    this.initSlides = function(reinitialize){
        if (this.slidesInitialized === false || reinitialize === true){
            this.ImagesLoaded = 0;
            this.slides = [];
            this.sliderElements = this.sliderObj.find('.rehabslide');
            this.slideCount = this.sliderObj.find('.rehabslide').length;

            $.each(this.sliderElements, function(id, sliderElem){
                var slide = new RehabSlide(id, this, sliderElem, this.imageLoaded.bind(this));
                this.slides.push(slide);
            }.bind(this));

            this.slidesInitialized = true;
        }
    };

    this.imageLoaded = function(){
        this.ImagesLoaded ++;
        if (this.ImagesLoaded >= this.slideCount) this.letTheShowBegin();
    };

    this.letTheShowBegin = function (){
        if(this.hasSelector) this.selector = new ThumbnailSelector(this, this.selectorThumbsVisible);
        this.sliderObj.fadeIn();
        this.onResizeHandler();
    };

    this.onResizeHandler = function(e){
        this.pause();

        //resize slider & slides
        this.setSliderSize(this.width, this.height);
        $.each(this.slides, function(i, slide){
            slide.resize(this.width, this.height);
        }.bind(this));

        if(this.selector) this.selector.onResizeHandler();

        this.play();
    };


    //=====================================================================================
    //initialization functions
    //=====================================================================================

    //this function sets the slider size;
    this.setSliderSize = function(width, height) {
        //set width
        if (this.dynamicWidth) this.width = this.sliderObj.parent().innerWidth();
        this.sliderObj.css('width', this.width);

        //set height
        if(this.dynamicHeight) this.height = this.sliderObj.parent().innerHeight();
        this.sliderObj.css('height', this.height);
    };

    //this function creates bullets
    this.bulletsCreate = function(){
        // create bullets depending on slide count
        for(var i=0; i<(this.slideCount-2); i++){
            $(".bullets",this.sliderID)
                .append('<button data-slide="'+(i+1)+'"></button>');
        }
    };

    this.initInterface = function(){
        nextBtn = this.sliderObj.find('.btn-next');
        prevBtn = this.sliderObj.find('.btn-prev');
        nextBtn.click(this.nextSlide.bind(this));
        prevBtn.click(this.prevSlide.bind(this));

        this.initBullets();
    };

    this.initBullets = function(){
        var slider = this;
        $(".bullets button",this.elementID).each(function(index,element){
            slider.activeState(slider.currentSlide);
            $(this).on('click',function(){
                slider.toSlide((index+1));
                slider.activeState();
            });
        });
    };

    this.initTimeline = function(){
        this.sliderObj.prepend("<section class='timeline'><div class='curtime'></div></section>");
        this.timelineStatusBar = this.sliderObj.find('.timeline .curtime');

    };

    this.updateTimeline = function(){
        var elapsedTime = new Date() - this.timelineStartDate;
        var curtime = (elapsedTime / this.animationVars.delay) * 100;
        this.timelineStatusBar.css('width', curtime+"%");

    };

    this.initSwiping = function(){
        var swipeHandler = this.swipeHandler.bind(this);
        this.sliderObj.swipe({allowPageScroll:"vertical", excludedElements:".btn-prev, .btn-next, button", triggerOnTouchLeave:true, swipeStatus:swipeHandler});
    };

    this.swipeHandler = function(event, phase, direction, distance) {
        //console.log(event, phase, direction, distance);

        if(phase == "move" && direction != "up" && direction != "down" && distance > 10) this.pause();

        if ($(event.target).attr('href') && distance < 7) {
            if (phase == "end" || phase == "cancel"){
                $(event.target).unbind('click').click();
                return;
            }
        }
        if (!this.animation.onswipe){
            if (phase == "end" || phase == "cancel"){
                if (direction == 'left')
                    this.nextSlide();
                if (direction == 'right')
                    this.prevSlide();
            }
        }else this.animation.onswipe(event, phase, direction, distance);
    };

    /*
	 =======================================================================
	 Usable Slider functions
	 =======================================================================
	*/

    this.play = function(){
        clearInterval(this.timer);
        this.timer = setInterval(this.nextSlide.bind(this), this.slideDelay);
        if (this.timeline) {
            this.timelineStartDate = new Date();
            clearInterval(this.timelineTimer);
            this.timelineTimer = setInterval(this.updateTimeline.bind(this), 10);
        }
    };

    this.pause = function(){
        clearInterval(this.timer);
        clearInterval(this.timelineTimer);
    };

    this.nextSlide = function(e){
        this.pause();
        this.previousSlide = this.currentSlide;
        this.currentSlide ++;
        if (this.currentSlide >= this.slideCount) this.currentSlide = 0;
        this.play();
        this.animation.animate(this.previousSlide, this.currentSlide);
        if (e)e.preventDefault();
        this.activeState();
        if(this.hasSelector) this.selector.highlight(this.currentSlide);
    };

    this.prevSlide = function(e){
        this.pause();
        this.previousSlide = this.currentSlide;
        this.currentSlide --;
        if (this.currentSlide < 0) this.currentSlide = this.slideCount-1;
        this.play();
        this.animation.animate(this.previousSlide, this.currentSlide);
        if (e)e.preventDefault();
        this.activeState();
        if(this.hasSelector) this.selector.highlight(this.currentSlide);
    };

    this.activeState = function(){
        var activeNum;
        if((this.currentSlide) > (this.slideCount-2))
            activeNum = 0;
        else
            activeNum = (this.currentSlide-1);

        $("button", this.bullets).removeClass('active');
        $("button", this.bullets).eq(activeNum).addClass('active');
    }.bind(this);

    this.toSlide = function(slideNR){
        this.pause();
        this.previousSlide = this.currentSlide;
        this.currentSlide = slideNR;
        if (this.currentSlide < 0) this.currentSlide = this.slideCount-1;
        if (this.currentSlide >= this.slideCount) this.currentSlide = 0;
        this.play();
        this.animation.animate(this.previousSlide, this.currentSlide);
        this.activeState();
        if(this.hasSelector) this.selector.select(this.currentSlide);
    };
}
