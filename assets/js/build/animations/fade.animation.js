
RehabAnimations['fade'] = function(slider, animationVars) {

    this.sliderObj = slider.sliderObj;
    this.speedseconds = animationVars.speed/10000;

    this.init = function(){
        this.sliderObj.find('.rehabslide').css('opacity', '0');
        this.sliderObj.find('.rehabslide:first-child').css('z-index', '999');
        this.sliderObj.find('.rehabslide:first-child').css('opacity', '1');

        this.setCSS3(this.sliderObj.find('.rehabslide'), "transition", 'opacity ' + this.speedseconds + 's ease-in-out');
    };

    this.animate = function(previousSlide, currentSlide){
        this.animateOut(previousSlide);
        this.animateIn(currentSlide);
    };

    this.animateIn = function(currentSlide){
        this.sliderObj.find('#image-' + currentSlide).css('z-index', '1');
        this.sliderObj.find('#image-' + currentSlide).css('opacity', '1');
    };

    this.animateOut = function(previousSlide){
        this.sliderObj.find('#image-' + previousSlide).css('z-index', '0');
        this.sliderObj.find('#image-' + previousSlide).css('opacity', '0');
    };

    this.onresize = function(){

    };

    this.setCSS3 = function (element, property, value) {
        element.css('-webkit-'+property, value);
        element.css('-moz-'+property, value);
        element.css('-o-'+property, value);
        element.css(property, value);
    };
};
