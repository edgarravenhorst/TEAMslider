
AllSlider.prototype.init_slide_animation = function(){
	this.currentSlide = 1;
	
	firstClone = this.element.find(".sliderElem").first();
	lastClone = this.element.find(".sliderElem").last();
	firstClone.clone().appendTo( this.slideContainer );
	lastClone.clone().prependTo( this.slideContainer );
	this.initSlides(true);
	
	containerWidth = this.width*(this.element.find('.sliderElem').length);
	this.element.find('.sliderElem').show();
	this.slideContainer.css('width', containerWidth);
	
	slideposition = (this.currentSlide)*this.width;
	setCSS3(this.slideContainer, 'transition', 'initial');
	setCSS3(this.slideContainer, 'transform', 'translateX(-' + slideposition + 'px)');
	
	if(this.animVars.descriptionAnim == 'slideUp'){
		description = this.slideContainer.find('#image-' + this.currentSlide + ' .description');
		setCSS3(this.slideContainer.find('.description'), 'transform', 'translateY(' + description.outerHeight() + 'px)');
		setCSS3(description, 'transition', 'all 0.4s ease-in-out');
		setCSS3(description, 'transform', 'translateY(0px)');
	}
	
	this.slideContainer.on(transitionEvent, function() {
		var is_max = false;
		if (this.currentSlide >= this.slideCount-1) {
			this.currentSlide = 1;
			is_max = true;
		}
		if (this.currentSlide <= 0) {
			this.currentSlide = this.slideCount-2;
			is_max = true;
		}
		
		if (is_max) {
			//this.pause();
			setCSS3(this.slideContainer, 'transition', 'initial');
			slideposition = (this.currentSlide)*this.width;
			setCSS3(this.slideContainer, 'transform', 'translateX(-' + slideposition + 'px)');
			
			if(this.animVars.descriptionAnim == 'slideUp'){
				description = this.slideContainer.find('#image-' + this.currentSlide + ' .description');
				setCSS3(description, 'transition', 'initial');
				setCSS3(description, 'transform', 'translateY(0px)');
			}
		}
	}.bind(this));
};

AllSlider.prototype.animation_slide = function(){
	
	slideposition = (this.currentSlide)*this.width;
	setCSS3(this.slideContainer, 'transition', 'all 0.4s ease-in-out');
	setCSS3(this.slideContainer, 'transform', 'translateX(-' + slideposition + 'px)');
	
	if(this.animVars.descriptionAnim == 'slideUp'){
		description = this.slideContainer.find('#image-' + this.currentSlide + ' .description');
		setCSS3(description, 'transition', 'all 0.4s ease-in-out');
		setCSS3(this.slideContainer.find('.description'), 'transform', 'translateY(' + description.outerHeight() + 'px)');
		setCSS3(description, 'transform', 'translateY(0px)');
	}
};

AllSlider.prototype.swipeHandler_slide = function(event, phase, direction, distance) {
	var tempScrollX;
	var slideposition = this.currentSlide*this.width;
	var maxScrollX = this.width*this.slideCount;
	
	if (phase == "start"){
		this.pause();
		setCSS3(this.slideContainer, 'transition', 'initial');
	}
	
	if(direction == 'left')
        tempScrollX = slideposition + distance;
    if(direction == 'right')
    	tempScrollX = slideposition - distance;
    
	setCSS3(this.slideContainer, 'transform', 'translateX(-' + tempScrollX + 'px)');

	if (phase == "end" || phase == "cancel"){

		setCSS3(this.slideContainer, 'transition', 'all 0.4s ease-in-out');
			
		if (direction == 'left')
			this.nextSlide();
		if (direction == 'right')
		   	this.prevSlide();
	}
};

AllSlider.prototype.resizeHandler_slide = function(){
	$.each(this.slides, function(i, slide){
		
		containerWidth = this.width*this.slideCount;
		this.slideContainer.css('width', containerWidth);
		var image = slide.image;
		if (image.hasClass('slideimage')){
			slide.resize(this.width, this.height);
			setCSS3(this.slideContainer, 'transition', 'initial');
			slideposition = (this.currentSlide)*this.width;
			setCSS3(this.slideContainer, 'transform', 'translateX(-' + slideposition + 'px)');
		}
	}.bind(this));
};

function setCSS3(element, property, value) {
	element.css('-webkit-'+property, value);
	element.css('-moz-'+property, value);
	element.css('-o-'+property, value);
	element.css(property, value);
}

function checkTransitionEnd(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
var transitionEvent = checkTransitionEnd();