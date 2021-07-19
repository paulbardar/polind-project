let objectFitPoly = false;
let loadLazyLoadScript = false;

document.addEventListener('DOMContentLoaded', function(){
	loadFonts();
	supportPolyfills();
	correctVh();
	lazyLoad();
});

// load fonts
function loadFonts() {
	WebFont.load({
		custom: {
			families: ['Font Awesome 5 Brands'],
			urls: ['/css/fonts.css']
		},
		google: {
			families: ['Montserrat:400,700,regular']
		}
	});
}

// lazyLoad Images
function lazyLoad() {
	if ('loading' in HTMLImageElement.prototype) {
		var images = document.querySelectorAll('img.lazyload');
		images.forEach(function (img) {
			img.src = img.dataset.src;
			img.onload = function() {
				img.classList.add('lazyloaded');
			};
			if (img.classList.contains('svg-html')) {
				replaseInlineSvg(img);
			}
			if (img.classList.contains('lazyload-bg')) {
				img.style.display = "none";
				img.parentNode.style.backgroundImage = "url(" + img.dataset.src + ")";
			}
		});
	} else {
		if (!loadLazyLoadScript) {
			loadLazyLoadScript = true;
			var script = document.createElement("script");
			script.async = true;
			script.src = '/js/lazysizes.min.js';
			document.body.appendChild(script);
		}
		document.addEventListener('lazyloaded', function (e) {
			var img = e.target;
			if (img.classList.contains('lazyload-bg')) {
				img.style.display = 'none';
				img.parentNode.style.backgroundImage = 'url(' + img.dataset.src + ')';
			}
			if (img.classList.contains('svg-html')) {
				replaseInlineSvg(img);
			}
		});
	}
}

// replaseInlineSvg
function replaseInlineSvg(el) {
	const imgID = el.getAttribute('id');
	const imgClass = el.getAttribute('class');
	const imgURL = el.getAttribute('src');

	fetch(imgURL)
	.then(data => data.text())
	.then(response => {
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(response, 'text/html');
		let svg = xmlDoc.querySelector('svg');

		if (typeof imgID !== 'undefined') {
			svg.setAttribute('id', imgID);
		}

		if (typeof imgClass !== 'undefined') {
			svg.setAttribute('class', imgClass + ' replaced-svg');
		}

		svg.removeAttribute('xmlns:a');

		el.parentNode.replaceChild(svg, el);
	});
}

// correctVh
function correctVh() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh+'px');
}

// support and polyfills
function supportPolyfills() {
	// objectFit
	if('objectFit' in document.documentElement.style === false && !objectFitPoly) {
		const script = document.createElement('script');

		script.src = '/js/ofi.min.js';
		document.body.appendChild(script);
		script.onload = function () {
			objectFitPoly = true;
			objectFitImages();
		};
	}

	// forEach
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}

	// swiper 6 polyfills
	Number.isNaN = Number.isNaN || function isNaN(input) {
		return typeof input === 'number' && input !== input;
	}

	if (!String.prototype.repeat) {
		String.prototype.repeat = function(count) {
			'use strict';
			if (this == null)
			throw new TypeError('can\'t convert ' + this + ' to object');

			var str = '' + this;
			count = +count;
			if (count != count)
			count = 0;

			if (count < 0)
			throw new RangeError('repeat count must be non-negative');

			if (count == Infinity)
			throw new RangeError('repeat count must be less than infinity');

			count = Math.floor(count);
			if (str.length == 0 || count == 0)
			return '';

			if (str.length * count >= 1 << 28)
			throw new RangeError('repeat count must not overflow maximum string size');

			var maxCount = str.length * count;
			count = Math.floor(Math.log(count) / Math.log(2));
			while (count) {
				str += str;
				count--;
			}
			str += str.substring(0, maxCount - str.length);
			return str;
		}
	}
	// swiper 6 polyfills end
};

// mobile menu
// function mobileMenu() {
// 	const openBtn = document.querySelector('.open-menu');
//
// 	openBtn.addEventListener('click', function(event) {
// 		event.preventDefault();
// 		if ( document.body.classList.contains('menu-opened') ) {
// 			document.body.classList.remove('menu-opened');
// 		} else {
// 			document.body.classList.add('menu-opened');
// 		}
// 	});
// };

// Places slider
const swiper_places = document.querySelector('.swiper-places');
const swiperPlaces = new Swiper( swiper_places, {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 10,
	centeredSlides: true,
	breakpoints: {
		576: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 4,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 4.89,
			spaceBetween: 30,
		},
	}
});

// Search block
const search_btn = document.querySelector('.btn-search');

const searchWrapper = document.createElement('span');
searchWrapper.classList.add('btn-parent');
search_btn.parentNode.insertBefore(searchWrapper, search_btn);
searchWrapper.appendChild(search_btn);

const searchcity_btn = document.querySelector('.btn-searchcity');
const searchcityWrapper = document.createElement('span');
searchcityWrapper.classList.add('btn-parent');
searchcity_btn.parentNode.insertBefore(searchcityWrapper, searchcity_btn);
searchcityWrapper.appendChild(searchcity_btn);



const faderSpan = document.createElement('span');
	faderSpan.className = 'fader';
	headerMain = document.querySelector('.header-main');
	headerMain.appendChild(faderSpan);

// jQuery
(function($){
	'use strict';
	const menuToggle = document.querySelector('.open-menu'),
		fader = document.querySelector('.fader'),
		body = document.body;
	menuToggle.addEventListener('click', function(){
		body.classList.toggle('menu-opened');
	});
	fader.addEventListener('click', function(){
		body.classList.toggle('menu-opened');
	});

	$(document).ready(function() {

	}); // ready


	$(window).on('resize', function() {
	}); // resize

	$(window).on('load', function() {
	}); // load

	// functions
})(this.jQuery);
