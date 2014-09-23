var AllSlider = function(element, width, height, vars){
	// default config
	this.width = width;
	this.height = height;
	this.animType = 'fade';
	this.animVars = {
		speed:4000,
		animSpeed:1500
	};
	this.element = $(element);
	this.slideContainer = this.element.find('.sliderContainer');
	this.slides = [];
	this.currentSlide = 0;
	this.slideCount = 0;
	this.ImagesLoaded = 0;
	this.appendFirstLast = false;
	this.slidesInitialized = false;
	
	this.init = function(){
		this.element.hide();
		if (vars.animType) this.animType = vars.animType;
		if (vars.animVars) this.animVars = vars.animVars;
			
		this.element.addClass('allslider');
		this.element.addClass(this.animType);
		this.element.css('width',width);
		this.element.css('height',height);
		
		//Turn html slides into usable objects
		
		//initialize the interface
		this.initInterface();
		this.element.find('.sliderElem').hide();
		this.initAnimation = this['init_' + this.animType + '_animation'];
		this.playAnimation = this['animation_' + this.animType];
		this.initAnimation();
		this.initSlides();
		this.playAnimation();
		this.timer = setInterval(this.nextSlide.bind(this), this.animVars.speed);
		this.initSwiping();
	};
	
	this.pause = function(){
		clearInterval(this.timer);
	};
	
	this.changeAnimation = function(type){
		this.pause();
		this.playAnimation = this['animation_' + this.animType];
		this.timer = setInterval(this.nextSlide(), this.animVars.speed);
	};
	
	this.initInterface = function(){
		nextBtn = this.element.find('.btn-next');
		prevBtn = this.element.find('.btn-prev');
		nextBtn.click(this.nextSlide.bind(this));
		prevBtn.click(this.prevSlide.bind(this));
	};
	
	this.nextSlide = function(e){
		this.pause();
		this.currentSlide ++;
		if (this.currentSlide >= this.slideCount) this.currentSlide = 0;
		this.timer = setInterval(this.nextSlide.bind(this), this.animVars.speed);
		this.playAnimation();
		if (e)e.preventDefault();
	};
	
	this.prevSlide = function(e){
		this.pause();
		this.currentSlide --;
		if (this.currentSlide < 0) this.currentSlide = this.slideCount-1;
		this.timer = setInterval(this.nextSlide.bind(this), this.animVars.speed);
		this.playAnimation();
		if (e)e.preventDefault();
	};
	
	this.initSlides = function(reinitialize){
		if (this.slidesInitialized === false || reinitialize === true){
			this.slides = [];
			this.sliderElements = this.element.find('.sliderElem');
			this.slideCount = this.element.find('.sliderElem').length;
			$.each(this.sliderElements, function(i, sliderElem){
				$(sliderElem).attr('id', 'image-'+i);
				$(sliderElem).css('width', this.width);
				$(sliderElem).css('height', this.height);
				this.positionImage($(sliderElem).find('img'));
				this.slides.push(sliderElem);
			}.bind(this));
		
			this.slidesInitialized = true;
		}
	};
	
	this.positionImage = function(image){
		
		image.on("load", function(e) {
			slider = this;
			img = $(e.currentTarget);
			imgH = img[0].height;
			imgW = img[0].width;
			imgH = img[0].height;
			
			//make sure the slider is filled up
			if (imgW < slider.width){
				imgRatio = imgH/imgW;
				imgW = img[0].width = slider.width;
				imgH = img[0].height = slider.width*imgRatio;
			}
			if (imgH < slider.height){
				imgRatio = imgW/imgH;
				imgH = img[0].height = slider.height;
				imgW = img[0].width = slider.height*imgRatio;
			}
			
			offsetX = (imgW) / 2;
			offsetY = (imgH) / 2;
			
			image.css('margin-top', '-'+offsetY+'px');
			image.css('margin-left', '-'+offsetX+'px');
			
			this.ImagesLoaded ++;
			if (slider.ImagesLoaded >= slider.slideCount) slider.letTheShowBegin();
		}.bind(this)).each(function() {
		  if(this.complete) $(this).load();
		});
	};
	
	this.letTheShowBegin = function (){
		this.element.fadeIn();
		this.element.css('display','inline-block');
	};
	
	this.initSwiping = function(){
		swipeSlider = this.swipeHandler.bind(this);
		this.element.find('.sliderContainer').swipe({swipeStatus:swipeSlider});
	};
	
	this.init(vars);
};

AllSlider.prototype.swipeHandler = function(event, phase, direction, distance) {
	this.swipeHandler_animtype = this['swipeHandler_' + this.animType];
	if(!this.swipeHandler_animtype){
		if (phase == "end" || phase == "cancel"){
			this.pause();
			if (direction == 'left')
				this.nextSlide();
			if (direction == 'right')
			   	this.prevSlide();
		}
	}else this.swipeHandler_animtype(event, phase, direction, distance);	
};







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