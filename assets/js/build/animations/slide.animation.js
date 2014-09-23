
AllSlider.prototype.init_slide_animation = function(){
	this.appendFirstLast = true;
	this.currentSlide = 1;
	
	firstClone = this.element.find(".sliderElem").first();
	lastClone = this.element.find(".sliderElem").last();
	firstClone.clone().appendTo( this.slideContainer );
	lastClone.clone().prependTo( this.slideContainer );
	this.initSlides();
	
	containerWidth = this.width*(this.element.find('.sliderElem').length);
	this.element.find('.sliderElem').show();
	this.slideContainer.css('width', containerWidth);
	
	this.slideContainer.find('.description').css('-webkit-transform', 'translateY(' + this.slideContainer.find('.description').outerHeight() + 'px)');
	this.slideContainer.find('.description').css('transform', 'translateY(' + this.slideContainer.find('.description').outerHeight() + 'px)');
	this.slideContainer.find('.description').css('-ms-transform', 'translateY(' + this.slideContainer.find('.description').outerHeight() + 'px)');
	
	this.slideContainer.find('.description').css('-webkit-transition', 'all 0.4s ease-in-out');
	this.slideContainer.find('.description').css('-moz-transition', 'all 0.4s ease-in-out');
	this.slideContainer.find('.description').css('-o-transition', 'all 0.4s ease-in-out');
	this.slideContainer.find('.description').css('transition', 'all 0.4s ease-in-out');
	
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
			this.slideContainer.css('-webkit-transition', 'initial');
			this.slideContainer.css('-moz-transition', 'initial');
			this.slideContainer.css('-o-transition', 'initial');
			this.slideContainer.css('transition', 'initial'); 
		
			slideposition = (this.currentSlide)*this.width;
			this.slideContainer.css('-webkit-transform', 'translateX(-' + slideposition + 'px)');
			this.slideContainer.css('transform', 'translateX(-' + slideposition + 'px)');
			this.slideContainer.css('-ms-transform', 'translateX(-' + slideposition + 'px)');
		}
	}.bind(this));
};

AllSlider.prototype.animation_slide = function(){
	slideposition = (this.currentSlide)*this.width;
	this.slideContainer.css('-webkit-transform', 'translateX(-' + slideposition + 'px)');
	this.slideContainer.css('transform', 'translateX(-' + slideposition + 'px)');
	this.slideContainer.css('-ms-transform', 'translateX(-' + slideposition + 'px)');
	
	this.slideContainer.css('-webkit-transition', 'all 0.4s ease-in-out');
	this.slideContainer.css('-moz-transition', 'all 0.4s ease-in-out');
	this.slideContainer.css('-o-transition', 'all 0.4s ease-in-out');
	this.slideContainer.css('transition', 'all 0.4s ease-in-out');
	
	this.slideContainer.find('.description').css('-webkit-transform', 'translateY(' + this.slideContainer.find('#image-' + this.currentSlide + ' .description').outerHeight() + 'px)');
	this.slideContainer.find('.description').css('transform', 'translateY(' + this.slideContainer.find('#image-' + this.currentSlide + ' .description').outerHeight() + 'px)');
	this.slideContainer.find('.description').css('-ms-transform', 'translateY(' + this.slideContainer.find('#image-' + this.currentSlide + ' .description').outerHeight() + 'px)');

	this.slideContainer.find('#image-' + this.currentSlide + ' .description').css('-webkit-transform', 'translateY(0px)');
	this.slideContainer.find('#image-' + this.currentSlide + ' .description').css('transform', 'translateY(0px)');
	this.slideContainer.find('#image-' + this.currentSlide + ' .description').css('-ms-transform', 'translateY(0px)');
};

AllSlider.prototype.swipeHandler_slide = function(event, phase, direction, distance) {
	var tempScrollX;
	var slideposition = this.currentSlide*this.width;
	var maxScrollX = this.width*this.slideCount;
	
	if (phase == "start"){
		this.pause();
		this.slideContainer.css('-webkit-transition', 'initial');
		this.slideContainer.css('-moz-transition', 'initial');
		this.slideContainer.css('-o-transition', 'initial');
		this.slideContainer.css('transition', 'initial');
	}
	
	if(direction == 'left')
        tempScrollX = slideposition + distance;
    if(direction == 'right')
    	tempScrollX = slideposition - distance;
    
	this.slideContainer.css('-webkit-transform', 'translateX(-' + tempScrollX + 'px)');
	this.slideContainer.css('transform', 'translateX(-' + tempScrollX + 'px)');
	this.slideContainer.css('-ms-transform', 'translateX(-' + tempScrollX + 'px)');

	if (phase == "end" || phase == "cancel"){
		this.slideContainer.css('-webkit-transition', 'all 0.4s ease-in-out');
		this.slideContainer.css('-moz-transition', 'all 0.4s ease-in-out');
		this.slideContainer.css('-o-transition', 'all 0.4s ease-in-out');
		this.slideContainer.css('transition', 'all 0.4s ease-in-out');
			
		if (direction == 'left')
			this.nextSlide();
		if (direction == 'right')
		   	this.prevSlide();
	}
};
