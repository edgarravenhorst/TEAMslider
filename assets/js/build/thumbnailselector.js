var ThumbnailSelector = function(slider, slidesVisible, vars){

    this.slider = slider;
    this.currentSlide = slider.currentSlide;
    this.elemW = Math.round(slider.width/slidesVisible);
    this.elemH = 100;
    this.slideMargin = 0;
    this.currentSlide = 0;
    this.slidesVisible = slidesVisible;
    this.slidesTotal = 0;

    this.init = function () {
        this.source.attr('id', this.slider.sliderID + "-selector");
        this.source.attr('class', "rehabselector");
        this.source.removeAttr('style');
        this.source.find('.rehabslide').removeAttr('style');
        this.source.find('.rehabslide .description').remove();
        this.source.find('.sliderContainer').removeAttr('style');
        this.source.find('.clone').remove();
        this.source.find('.bullets').remove();
        this.slidesTotal = this.source.find('.rehabslide').length;

        this.source.css("width", this.slider.width + 'px');
        this.source.find('.rehabslide').css("width", this.elemW + 'px');


        $.each(this.source.find('.rehabslide'), function(i, slide){


            var imgW = this.elemW;
            var containerH = this.elemH;
            var img = $(slide).find('img')[0];

            img.onload = function() {
                img = this
                img.width = imgW;
                //var imgH = img.height * (imgW/img.width);

                if (containerH > img.height) img.height = containerH;

                console.log(imgW, img.width, img.height)

                //$(img).css("margin-top", '50%');
                $(img).css("top", ((containerH-img.height)/2) + 'px');
                $(img).css("position", 'relative');
            }
            img.src = img.src



        }.bind(this))


        this.slideMargin = this.elemW;
        this.elemW = this.source.find('.rehabslide').outerWidth(true);
        this.slideMargin = this.elemW - this.slideMargin;

        var containerWidth = this.elemW * this.slidesTotal;
        this.source.find('.sliderContainer').css('width', containerWidth + "px");
        var slideposition = this.slideMargin*(slidesVisible-1) - this.slideMargin/2;
        this.setCSS3(this.source.find('.sliderContainer'), 'transform', 'translateX(-' + slideposition + 'px)');

        this.source.find('.rehabslide').click(this.selectSlide.bind(this));
        this.source.find('.btn-next').click(this.next.bind(this));
        this.source.find('.btn-prev').click(this.previous.bind(this));

        this.source.find('.rehabslide:first').addClass('currentItem');
    };

    this.selectSlide = function(e) {
        var id = $(e.currentTarget).attr('data-id');
        this.slider.toSlide(id);

    };

    this.highlight = function(id){
        if (!this.source.find('#image-'+id).hasClass('currentItem')){
            this.source.find('.rehabslide').removeClass('currentItem');
            this.source.find('#image-'+id).addClass('currentItem');
        }
    };

    this.select = function(id, selectImage) {
        if (typeof selectImage === 'undefined') selectImage = true;
        if (selectImage) this.highlight(id);

        this.currentSlide = id;
        if(this.currentSlide > this.slidesTotal)
            this.currentSlide = this.slidesTotal;

        var slideposition = this.elemW * ((id-2 < 0) ? 0 : (id-2)) + this.slideMargin*(slidesVisible-1) - this.slideMargin/2;
        var slideLimit = this.slidesTotal*this.elemW-this.slidesVisible*this.elemW;
        if(slideposition > slideLimit) slideposition = slideLimit;
        this.setCSS3(this.source.find('.sliderContainer'), 'transform', 'translateX(-' + slideposition + 'px)');

    };

    this.next = function(){
        if (this.currentSlide < this.slidesVisible)
            this.currentSlide = this.slidesVisible-1;

        if (this.currentSlide <= this.slidesTotal-this.slidesVisible+1) {
            this.currentSlide ++;
            this.select(this.currentSlide, false);
        }
    };

    this.previous = function() {
        if(this.currentSlide > this.slidesTotal-this.slidesVisible+1)
            this.currentSlide = this.slidesTotal-this.slidesVisible+2;

        if (this.currentSlide >= this.slidesVisible) {
            this.currentSlide --;
            this.select(this.currentSlide, false);
        }
    };

    this.createSelector = function() {
        var sliderClone = this.source = this.slider.sliderObj.clone();
        $(this.slider.sliderID).after(sliderClone);
        this.init();
    };

    this.onResizeHandler = function(){
        this.elemW = Math.round(slider.width/slidesVisible);
        this.source.css("width", this.slider.width + 'px');
        this.source.find('.rehabslide').css("width", this.elemW + 'px');
        this.elemW = this.source.find('.rehabslide').outerWidth(true);
    };

    this.setCSS3 = function(element, property, value) {
        element.css('-webkit-'+property, value);
        element.css('-moz-'+property, value);
        element.css('-o-'+property, value);
        element.css(property, value);
    };

    this.createSelector();
};


