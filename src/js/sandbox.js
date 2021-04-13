
// (function (factory) {
// 	if (typeof define === 'function' && define.amd) {
// 		define(['jquery'], factory);
// 	} else if (typeof exports !== 'undefined') {
// 		module.exports = factory(require('jquery'));
// 	} else {
// 		factory(jQuery);
// 	}

// }(function ($) {
// 	$(window).on("load", function () {
// 		console.log($('body'));
// 	});
// }));

(function ($) {
	$(window).on("load", function () {

		$('.grid_container').jungleSlide({
			scroll:{
				slides_visible: 3,
				increment_by: 1,
			},
		});

	});
})( jQuery );
