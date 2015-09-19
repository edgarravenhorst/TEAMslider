
RehabAnimations['slide'] = function(slider, animationVars) {

    this.sliderObj = slider.sliderObj;
    this.speedseconds = animationVars.speed/10000;
    this.clockwise = false;

    this.init = function(){

        if(slider.slides.length < 3){
            firstClone = this.sliderObj.find(".rehabslide").first();
            lastClone = this.sliderObj.find(".rehabslide").last();
            firstClone.clone().addClass('clone').appendTo( slider.slideContainer );
            lastClone.clone().addClass('clone').prependTo( slider.slideContainer );
            slider.initSlides(true);
        }
        this.sliderObj.find('#image-' + slider.currentSlide).css('z-index', "999");

        containerWidth = slider.width*3;
        slider.slideContainer.css('width', containerWidth);

        previousSlide = slider.currentSlide - 1;
        if (previousSlide < 0 ) previousSlide = slider.slides.length-1;

        nextSlide = slider.currentSlide + 1;
        if (nextSlide > slider.slides.length ) previousSlide = 0;


        this.sliderObj.find('.rehabslide').css('left', slider.width+"px");

        this.translateX('.rehabslide', -slider.width)
        this.translateX('#image-' + slider.currentSlide, 0)
        this.translateX('#image-' + nextSlide, slider.width)

        this.setCSS3(slider.slideContainer, 'transform', 'translateX(-' + slider.width + 'px)');

        nextBtn.click(function(e){
            this.clockwise = false;

        }.bind(this));
        prevBtn.click(function(e){
            this.clockwise = true;

        }.bind(this));
    };

    this.animate = function(previousSlide, currentSlide){

        this.sliderObj.find('.rehabslide').css('z-index', "-1");
        this.sliderObj.find('#image-' + previousSlide).css('z-index', "998");
        this.sliderObj.find('#image-' + currentSlide).css('z-index', "999");

        if(!this.clockwise){
            this.translateX('#image-' + previousSlide, -slider.width)
            this.translateX('#image-' + currentSlide, 0)


            nextSlide = currentSlide + 1;
            if (nextSlide > slider.slides.length-1 ) nextSlide = 0;
            this.translateX('#image-' + nextSlide, slider.width)
            this.enableCSSAnimation('.rehabslide');

        }else{
            this.setCSS3(this.sliderObj.find('#image-' + previousSlide), 'transform', 'translateX(' + slider.width + 'px)');
            this.setCSS3(this.sliderObj.find('#image-' + currentSlide), 'transform', 'translateX(' + 0 + 'px)');

            this.translateX('#image-' + previousSlide, slider.width)
            this.translateX('#image-' + currentSlide, 0)

            previousSlide = currentSlide - 1;
            if (previousSlide < 0 ) previousSlide = slider.slides.length-1;
            this.translateX('#image-' + previousSlide, -slider.width)
            this.enableCSSAnimation('.rehabslide');
        }

    };

    this.onswipe = function(event, phase, direction, distance){
        var tempScrollX;
        var slideposition = 0;

        previousSlide = slider.currentSlide - 1;
        if (previousSlide < 0 ) previousSlide = slider.slides.length-1;

        nextSlide = slider.currentSlide + 1;
        if (nextSlide > slider.slides.length-1 ) nextSlide = 0;

        if (phase == "start"){
            this.disableCSSAnimation('.rehabslide');
        }

        if(direction == 'left') tempScrollX = slideposition + distance;
        if(direction == 'right') tempScrollX = slideposition - distance;

        this.translateX('#image-' + previousSlide, -slider.width - tempScrollX );
        this.translateX('#image-' + slider.currentSlide, - tempScrollX );
        this.translateX('#image-' + nextSlide, slider.width - tempScrollX );

        if (phase == "end" || phase == "cancel"){

            if (direction == 'left'){
                this.enableCSSAnimation('#image-' + nextSlide)
                this.enableCSSAnimation('#image-' + slider.currentSlide)
                this.clockwise = false;
                slider.nextSlide();
            }

            if (direction == 'right'){
                this.enableCSSAnimation('#image-' + previousSlide)
                this.enableCSSAnimation('#image-' + slider.currentSlide)
                this.clockwise = true;
                slider.prevSlide();
            }
        }
    };

    this.onresize = function(){

    };

    this.translateX = function(elem, position){
        this.setCSS3(this.sliderObj.find(elem), 'transform', 'translateX(' + position + 'px)');
    }

    this.enableCSSAnimation = function(elem){
        this.setCSS3(this.sliderObj.find(elem), 'transition', 'all 0.4s ease-in-out');
    }

    this.disableCSSAnimation = function(elem){
        this.setCSS3(this.sliderObj.find(elem), 'transition', 'initial');
    }

    this.setCSS3 = function (element, property, value) {
        element.css('-webkit-'+property, value);
        element.css('-moz-'+property, value);
        element.css('-o-'+property, value);
        element.css(property, value);
    };
};
