var RehabSlide = function(id, slider, sliderElem, onLoadedFunc){

    this.id = id;
    this.slider = slider;
    this.width = slider.width;
    this.height = slider.height;

    this.image = $(sliderElem).find('img.slideimage');
    this.imagesizing = 'cover';
    this.onLoadedFunc = onLoadedFunc;

    this.slideObj = $(sliderElem);
    this.slideObj.attr('id', 'image-'+this.id);
    this.slideObj.attr('data-id', this.id);
    this.slideObj.css('width', this.width);
    this.slideObj.css('height', this.height);

    this.centerImage = function() {
        //console.log("Center Image")
        var imgRatio = this.imageH/this.imageW;
        var imgW = this.slider.width;
        var imgH = this.slider.width*imgRatio;

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
        //console.log("Resize Image")
        //console.log(width, height);
        //var imgRatio = this.imageH/this.imageW;

        this.slideObj.css('width', width);
        this.slideObj.css('height', height);
        if (this.imagesizing == 'cover' && this.image.length !== 0) this.centerImage();
    };

    this.loadImage = function() {
        //console.log("Start Loading Image");
        if (this.image.length !== 0){
            this.image.one("load", function(e) {
                console.log("Image Loaded");
                this.imageH = $(e.currentTarget)[0].height;
                this.imageW = $(e.currentTarget)[0].width;

                console.log(this.imageW, this.imageH);

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
