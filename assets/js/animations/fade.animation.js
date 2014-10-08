
AllSlider.prototype.init_fade_animation = function(){
	
	
	this.element.find('.description').css('-webkit-transform', 'translateY(' + this.element.find('.description').outerHeight() + 'px)');
	this.element.find('.description').css('transform', 'translateY(' + this.element.find('.description').outerHeight() + 'px)');
	this.element.find('.description').css('-ms-transform', 'translateY(' + this.element.find('.description').outerHeight() + 'px)');
	
	this.element.find('.description').css('-webkit-transition', 'all 0.4s ease-in-out 0.5s');
	this.element.find('.description').css('-moz-transition', 'all 0.4s ease-in-out 0.5s');
	this.element.find('.description').css('-o-transition', 'all 0.4s ease-in-out 0.5s');
	this.element.find('.description').css('transition', 'all 0.4s ease-in-out 0.5s');
	
	this.element.find('.sliderElem').css('-webkit-transition', 'opacity 0.7s ease-in-out');
	this.element.find('.sliderElem').css('-moz-transition', 'opacity 0.7s ease-in-out');
	this.element.find('.sliderElem').css('-o-transition', 'opacity 0.7s ease-in-out');
	this.element.find('.sliderElem').css('transition', 'opacity 0.7s ease-in-out');

};

AllSlider.prototype.animation_fade = function(){
	this.element.find('.sliderElem').show();
	//this.element.find('.sliderElem').fadeOut(this.animVars.animSpeed);
	//this.element.find('#image-'+this.currentSlide).stop().fadeIn(this.animVars.animSpeed);

	this.element.find('.description').css('-webkit-transform', 'translateY(' + this.element.find('#image-' + this.currentSlide + ' .description').outerHeight() + 'px)');
	this.element.find('.description').css('transform', 'translateY(' + this.element.find('#image-' + this.currentSlide + ' .description').outerHeight() + 'px)');
	this.element.find('.description').css('-ms-transform', 'translateY(' + this.element.find('#image-' + this.currentSlide + ' .description').outerHeight() + 'px)');

	this.element.find('#image-' + this.currentSlide + ' .description').css('-webkit-transform', 'translateY(0px)');
	this.element.find('#image-' + this.currentSlide + ' .description').css('transform', 'translateY(0px)');
	this.element.find('#image-' + this.currentSlide + ' .description').css('-ms-transform', 'translateY(0px)');
	
	this.element.find('.sliderElem').css('z-index', '1');
	this.element.find('.sliderElem').css('opacity', '0');
	this.element.find('#image-' + this.currentSlide).css('z-index', '999');
	this.element.find('#image-' + this.currentSlide).css('opacity', '1');
	
};