var AllSlider = function(element, width, height, vars){
	// default config
	this.width = width;
	this.height = height;
<<<<<<< HEAD
	this.initialWidth = width;
	this.initialHeight = height;
=======
	
>>>>>>> 7033ab310b7f0c141423f528f7aa2ae6c609111c
	this.animType = 'fade';
	this.animVars = {
		speed:4000,
		animSpeed:1500
	};
<<<<<<< HEAD
=======
	
>>>>>>> 7033ab310b7f0c141423f528f7aa2ae6c609111c
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
		this.element.find('.sliderContainer').swipe({swipeStatus:swipeSlider});
	};
	
	this.letTheShowBegin = function (){
		this.element.fadeIn();
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
	
<<<<<<< HEAD
	this.initSlides = function(reinitialize){
		if (this.slidesInitialized === false || reinitialize === true){
			this.slides = [];
			this.sliderElements = this.element.find('.sliderElem');
			this.slideCount = this.element.find('.sliderElem').length;
			$.each(this.sliderElements, function(i, sliderElem){
				$(sliderElem).attr('id', 'image-'+i);
				$(sliderElem).css('width', this.width);
				$(sliderElem).css('height', this.height);
				if ($(sliderElem).find('img').hasClass('slideimage')){
					this.imagesToLoad ++;
					this.positionImage($(sliderElem).find('img.slideimage'));
				}
				this.slides.push(sliderElem);
			}.bind(this));
			
			console.log(this.imagesToLoad);
			if (this.imagesToLoad <= 0) this.letTheShowBegin();
			
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
			imgRatio = imgH/imgW;
			imgW = img[0].width = slider.width;
			imgH = img[0].height = slider.width*imgRatio;
			
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
			if (slider.ImagesLoaded >= slider.imagesToLoad) slider.letTheShowBegin();
		}.bind(this)).each(function() {
		  if(this.complete) $(this).load();
		});
	};
	
	this.onResizeHandler = function(e){
		this.width = $(this.elementID).innerWidth();
		this.height = $(this.elementID).innerHeight();
		
		containerWidth = this.width*(this.element.find('.sliderElem').length);
		this.slideContainer.css('width', containerWidth);
		 
		$.each(this.sliderElements, function(i, sliderElem){
			$(sliderElem).css('width', this.width);
			$(sliderElem).css('height', this.height);
			 
			var image = $(sliderElem).find('img');
			if (image.hasClass('slideimage')){
				
			  	imgW = image.width();
			  	imgH = image.height();
			  	
			  	imgRatio = imgH/imgW;
			  	imgW = this.width;
				imgH = this.width*imgRatio;
				console.log(imgH, this.width, imgRatio);

				if (imgH < this.height){
					console.log('height to small');
					imgRatio = imgW/imgH;
					imgH = this.height;
					imgW = this.height*imgRatio;
				}
				
				image.attr('width', imgW);
			  	image.attr('height', imgH);
				
				offsetX = (imgW) / 2;
				offsetY = (imgH) / 2;
				
				image.css('margin-top', '-'+offsetY+'px');
				image.css('margin-left', '-'+offsetX+'px'); 
				
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
	 
	this.letTheShowBegin = function (){
		this.element.fadeIn();
		this.element.css('display','inline-block');
=======
	this.toSlide = function(slideNR){
		this.pause();
		this.currentSlide = slideNR;
		if (this.currentSlide < 0) this.currentSlide = this.slideCount-1;
		if (this.currentSlide >= this.slideCount) this.currentSlide = 0;
		this.timer = setInterval(this.nextSlide.bind(this), this.animVars.speed);
		this.playAnimation();
		if (e)e.preventDefault();
>>>>>>> 7033ab310b7f0c141423f528f7aa2ae6c609111c
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
	this.width = $(this.elementID).innerWidth();
	this.height = $(this.elementID).innerHeight();
	this.resizeHandler_animtype = this['resizeHandler_' + this.animType];
	if(this.resizeHandler_animtype) this.resizeHandler_animtype();
	else {
		$.each(this.slides, function(i, slide){
			slide.resize(this.width, this.height);
		}.bind(this));
	}
};
