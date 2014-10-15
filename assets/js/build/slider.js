var AllSlider = function(element, width, height, vars){
	// default config
	this.width = width;
	this.height = height;

	this.animType = 'fade';
	this.animVars = {
		speed:4000,
		animSpeed:1500
	};
	

	this.elementID = element;
	this.element = $(element);
	this.slideContainer = this.element.find('.sliderContainer');
	this.slides = [];
	this.currentSlide = 0;
	this.slideCount = 0;
	this.imagesToLoad = 0;
	this.ImagesLoaded = 0;
	this.slidesInitialized = false;
	
	this.init = function(){
		this.element.hide();
		if (vars.animType) this.animType = vars.animType;
		if (vars.animVars) this.animVars = vars.animVars;
			
		this.element.addClass('allslider');
		this.element.addClass(this.animType);
		this.element.css('width',width);
		this.element.css('height',height);
		
		//initialize the interface
		this.initInterface();
		this.element.find('.sliderElem').hide();
		this.initAnimation = this['init_' + this.animType + '_animation'];
		this.playAnimation = this['animation_' + this.animType];
		this.initAnimation();
		if(!this.slidesInitialized ) this.initSlides();
		//this.playAnimation();
		this.timer = setInterval(this.nextSlide.bind(this), this.animVars.speed);
		this.initSwiping();
		
		$('.overlaybutton').click(function(event){
			event.preventDefault();
		});
		
		window.onresize = this.onResizeHandler.bind(this);
	};

	this.initSlides = function(reinitialize){
		if (this.slidesInitialized === false || reinitialize === true){
			this.ImagesLoaded = 0;
			this.slides = [];
			this.sliderElements = this.element.find('.sliderElem');
			this.slideCount = this.element.find('.sliderElem').length;
			
			$.each(this.sliderElements, function(id, sliderElem){
				var slide = new TEAMslider_Slide(id, this, sliderElem, this.imageLoaded.bind(this));
				this.slides.push(slide);
			}.bind(this));
			this.slidesInitialized = true;
		}
	};
	
	this.initInterface = function(){
		nextBtn = this.element.find('.btn-next');
		prevBtn = this.element.find('.btn-prev');
		nextBtn.click(this.nextSlide.bind(this));
		prevBtn.click(this.prevSlide.bind(this));
		
		//add bullet stuff here;
	};

	this.imageLoaded = function(){
		this.ImagesLoaded ++;
		if (this.ImagesLoaded >= this.slideCount) this.letTheShowBegin();
	};
	
	this.initSwiping = function(){
		swipeSlider = this.swipeHandler.bind(this);
		this.element.find('.sliderContainer').swipe({excludedElements:"", swipeStatus:swipeSlider});
	};
	
	this.letTheShowBegin = function (){
		setTimeout(function(){
			this.onResizeHandler();
			this.element.fadeIn();
		}.bind(this), 100);
	};
	
	/*
	 =======================================================================
	 Usable Slider functions
	 =======================================================================
	*/
	
	this.play = function(){
		this.timer = setInterval(this.nextSlide.bind(this), this.animVars.speed);
	};
	
	this.pause = function(){
		clearInterval(this.timer);
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
	
	this.toSlide = function(slideNR){
		this.pause();
		this.currentSlide = slideNR;
		if (this.currentSlide < 0) this.currentSlide = this.slideCount-1;
		if (this.currentSlide >= this.slideCount) this.currentSlide = 0;
		this.timer = setInterval(this.nextSlide.bind(this), this.animVars.speed);
		this.playAnimation();
	};
	
	this.changeAnimation = function(type){
		this.pause();
		this.playAnimation = this['animation_' + this.animType];
		this.timer = setInterval(this.nextSlide(), this.animVars.speed);
	};
	
	/* initialize slider */
	this.init(vars);
};

/*
 =======================================================================
 Overwritable functions
 =======================================================================
*/
AllSlider.prototype.swipeHandler = function(event, phase, direction, distance) {
	console.log(event, phase, direction, distance);
	
	if ($(event.target).attr('href') && distance < 7) {
		if (phase == "end" || phase == "cancel"){
			$(event.target).unbind('click').click();
			return;
		}
	}
	
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

AllSlider.prototype.onResizeHandler = function(e){
	this.pause();
	this.width = $(this.elementID).innerWidth();
	this.height = $(this.elementID).innerHeight();
	this.resizeHandler_animtype = this['resizeHandler_' + this.animType];
	if(this.resizeHandler_animtype) this.resizeHandler_animtype();
	else {
		$.each(this.slides, function(i, slide){
			slide.resize(this.width, this.height);
		}.bind(this));
	}
	this.play();
};
