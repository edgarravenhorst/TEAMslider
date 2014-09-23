<!doctype html>

<html lang="en">
	<head>
		<meta charset="utf-8">
	
		<title>Allslide</title>
		<meta name="description" content="The best slider you can get!">
		<meta name="author" content="Edge-Art">
		<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
		
	    <link rel="stylesheet" href="assets/css/slider.css">

	    <!--[if lt IE 9]>
	    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	    <![endif]-->
	</head>
	<body>
		
		<section id='allslider-1' class=''>
			<section id='' class='sliderContainer'>
				<figure class='sliderElem'>
					<img src='http://images.visitcanberra.com.au/images/canberra_hero_image.jpg' />
					<section class='description'>
						<section class='inner'>
							<h1>Hallo Wereld!</h1>
							<p>Dit is een stukje tekst</p>
							<a href='#'>Lees meer</a>
						</section>
						<section class='btn-prev'></section>
						<section class='btn-next'></section>
					</section>
				</figure>
				
				<figure class='sliderElem'>
					<img src='http://www.menucool.com/slider/jsImgSlider/images/image-slider-4.jpg' />
					<section class='description'>
						<section class='inner'>
							<h1>Hallo Wereld!</h1>
							<p>Dit is een stukje tekst Dit is een stukje tekst Dit is een stukje tekst</p>
							<a href='#'>Lees meer ></a>
						</section>
						<section class='btn-prev'></section>
						<section class='btn-next'></section>
					</section>
				</figure>
				
				<figure class='sliderElem'>
					<img src='http://www.last-video.com/wp-content/uploads/2013/11/superbe-image-de-poissons-sous-l-eau.jpg' />
					<section class='description'>
						<section class='inner'>
							<h1>Hallo Wereld!</h1>
							<p>Dit is een stukje tekst Dit is een stukje tekst Dit is een stukje tekst Dit is een stukje tekst Dit is een stukje tekst Dit is een stukje tekst</p>
							<a href='#'>Lees meer ></a>
						</section>
						<section class='btn-prev'></section>
						<section class='btn-next'></section>  
					</section>
				</figure>
			</section>
			<div class='bullets'>
				<button data-slide='1'></button>
				<button data-slide='2'></button>
			</div>
		</section>		
		
		<section id='allslider-2' class=''>
			<section id='' class='sliderContainer'>
				<figure class='sliderElem'>
					<img src='http://images.visitcanberra.com.au/images/canberra_hero_image.jpg' />
				</figure>
				
				<figure class='sliderElem'>
					<img src='http://www.menucool.com/slider/jsImgSlider/images/image-slider-4.jpg' />
					<section class='description'>
						<section class='inner'>
							<h1>Hallo Wereld!</h1>
							<p>Dit is een stukje tekst Dit is een stukje tekst Dit is een stukje tekst</p>
							<a href='#'>Lees meer ></a>
						</section>
					</section>
				</figure>
				
				<figure class='sliderElem'>
					<img src='http://www.last-video.com/wp-content/uploads/2013/11/superbe-image-de-poissons-sous-l-eau.jpg' />
					<section class='description'>
						<section class='inner'>
							<h1>Hallo Wereld!</h1>
							<p>Dit is een stukje tekst Dit is een stukje tekst Dit is een stukje tekst</p>
							<a href='#'>Lees meer ></a>
						</section>
					</section>
				</figure>
			</section>
			
			<section class='btn-prev'></section>
			<section class='btn-next'></section>
			<div class='bullets'>
				<button data-slide='1'></button>
				<button data-slide='2'></button>
			</div>
		</section>
		
		<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
		<script src="assets/js/build/jquery.touchSwipe.min.js"></script>
		<script src="assets/js/build/slider.js"></script>
		<script src="assets/js/build/animations/fade.animation.js"></script>
		<script src="assets/js/build/animations/slide.animation.js"></script>
		
		<script>
			var new_slider = new AllSlider('#allslider-1', 600, 262, {animType:'fade'});
			var new_slider = new AllSlider('#allslider-2', window.innerWidth, window.innerHeight, {animType:'slide', animVars:{
				direction:'left',
				speed:2500,
				animSpeed:900
			}});
		</script>
		
	</body>
</html> 