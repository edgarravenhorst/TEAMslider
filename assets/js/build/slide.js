var TEAMslider_Slide = function(id, slider, sliderElem, onLoadedFunc){
	
	this.id = id;
	this.slider = slider;
	this.width = slider.width;
	this.height = slider.height;
	
	this.image = $(sliderElem).find('img.slideimage');
	this.imagesizing = 'cover';
	this.onLoadedFunc = onLoadedFunc;
	
	this.sliderElem = $(sliderElem);
	this.sliderElem.attr('id', 'image-'+this.id);
	this.sliderElem.css('width', this.width);
	this.sliderElem.css('height', this.height);
	
	this.centerImage = function() {
		imgRatio = this.imageH/this.imageW;
		imgW = this.slider.width;
		imgH = this.slider.width*imgRatio;

		if (imgH < this.slider.height){
			imgRatio = this.imageW/this.imageH;
			imgH = this.slider.height;
			imgW = this.slider.height*imgRatio;
		}
		
		this.image.attr('width', imgW);
		this.image.attr('height', imgH);
				
		offsetX = (imgW) / 2;
		offsetY = (imgH) / 2;
				
		this.image.css('margin-top', '-'+offsetY+'px');
		this.image.css('margin-left', '-'+offsetX+'px'); 
	};
	
	this.resize = function (width, height){
		this.sliderElem.css('width', width);
		this.sliderElem.css('height', height);
		if (this.imagesizing == 'cover') this.centerImage();
	};
	
	this.loadImage = function() {
		if (this.image){
			this.image.one("load", function(e) {
				this.imageW = $(e.currentTarget)[0].width;
				this.imageH = $(e.currentTarget)[0].height;
				this.centerImage();
				this.onLoadedFunc();
			}.bind(this)).each(function() {
			  if(this.complete) $(this).load();
			});
		}else{
			this.onLoadedFunc();
		}
	};
	this.loadImage();
};
