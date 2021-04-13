(function ($) {
	var jungleSlide = window.jungleSlide || {};

	/* SLIDER OBJECT */

	jungleSlide = (function () {

		var instanceUid = 0;

		function jungleSlide(element, settings) {
			var _ = this,
				dataSettings;

			_.$element = $(element);


			// DEFAULT SETTINGS //
			_.defaults = {
				layout: {
					style: 'default',
					adaptive_height: false,
					zIndex: 1,
					class_list: null, // array
					order: {
						navigation: 1,
						slider: 2,
						button_previous: 3,
						button_next: 4,
					}
				},
				buttons: {
					active: true,
					animated: false,
					append: $(element),
					directions: ['previous', 'next'],
					type: '<button></button>',
					class: 'jungle_button',
					previous: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="arrow" fill-rule="evenodd" clip-rule="evenodd" d="M14.375 9.375C14.5407 9.375 14.6997 9.44084 14.8169 9.55805C14.9341 9.67526 15 9.83424 15 10C15 10.1658 14.9341 10.3247 14.8169 10.4419C14.6997 10.5591 14.5407 10.625 14.375 10.625H7.13374L9.81749 13.3075C9.8756 13.3656 9.92169 13.4346 9.95314 13.5105C9.98459 13.5864 10.0008 13.6678 10.0008 13.75C10.0008 13.8322 9.98459 13.9136 9.95314 13.9895C9.92169 14.0654 9.8756 14.1344 9.81749 14.1925C9.75938 14.2506 9.69039 14.2967 9.61447 14.3282C9.53854 14.3596 9.45717 14.3758 9.37499 14.3758C9.29281 14.3758 9.21143 14.3596 9.13551 14.3282C9.05958 14.2967 8.9906 14.2506 8.93249 14.1925L5.18249 10.4425C5.12428 10.3844 5.07811 10.3155 5.0466 10.2395C5.01509 10.1636 4.99887 10.0822 4.99887 10C4.99887 9.91779 5.01509 9.83639 5.0466 9.76045C5.07811 9.68452 5.12428 9.61555 5.18249 9.5575L8.93249 5.8075C9.04985 5.69014 9.20902 5.62421 9.37499 5.62421C9.54096 5.62421 9.70013 5.69014 9.81749 5.8075C9.93485 5.92485 10.0008 6.08403 10.0008 6.25C10.0008 6.41597 9.93485 6.57514 9.81749 6.6925L7.13374 9.375H14.375Z" fill="black"/></svg>`,
					next: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path class="arrow" fill-rule="evenodd" clip-rule="evenodd" d="M5.625 9.375C5.45924 9.375 5.30027 9.44084 5.18306 9.55805C5.06585 9.67526 5 9.83424 5 10C5 10.1658 5.06585 10.3247 5.18306 10.4419C5.30027 10.5591 5.45924 10.625 5.625 10.625H12.8663L10.1825 13.3075C10.1244 13.3656 10.0783 13.4346 10.0468 13.5105C10.0154 13.5864 9.99921 13.6678 9.99921 13.75C9.99921 13.8322 10.0154 13.9136 10.0468 13.9895C10.0783 14.0654 10.1244 14.1344 10.1825 14.1925C10.2406 14.2506 10.3096 14.2967 10.3855 14.3282C10.4614 14.3596 10.5428 14.3758 10.625 14.3758C10.7072 14.3758 10.7886 14.3596 10.8645 14.3282C10.9404 14.2967 11.0094 14.2506 11.0675 14.1925L14.8175 10.4425C14.8757 10.3844 14.9219 10.3155 14.9534 10.2395C14.9849 10.1636 15.0011 10.0822 15.0011 10C15.0011 9.91779 14.9849 9.83639 14.9534 9.76045C14.9219 9.68452 14.8757 9.61555 14.8175 9.5575L11.0675 5.8075C11.0094 5.74939 10.9404 5.70329 10.8645 5.67184C10.7886 5.64039 10.7072 5.62421 10.625 5.62421C10.5428 5.62421 10.4614 5.64039 10.3855 5.67184C10.3096 5.70329 10.2406 5.74939 10.1825 5.8075C10.1244 5.86561 10.0783 5.93459 10.0468 6.01052C10.0154 6.08644 9.99921 6.16782 9.99921 6.25C9.99921 6.33218 10.0154 6.41355 10.0468 6.48948C10.0783 6.5654 10.1244 6.63439 10.1825 6.6925L12.8663 9.375H5.625Z" fill="black"/>
					</svg>`
				},
				navigation: {
					active: true,
					append: $(element),
					type: '<button></button>',
					class: 'jungle_indicator',
					style: 'dots',
				},
				animations: {
					transition: true,
					fade_effect: true,
					transform_type: 'transform',
					transform_property: 'ease',
					transform_duration: 800,
					transform_delay: 0,
					transform_unit: 'ms',
				},
				autoplay: {
					active: false,
					delay: 5000,
					pause_on_hover: true,

				},
				scroll: {
					accessibility: true,
					infinite_scroll: true,
					// can be both/left/right
					allowed_direction: 'both',
					increment_by: 'default',
					slides_visible: 2,
					draggable: true,
					// ACCEPTS 'LOW', 'NORMAL', 'DEFAULT' AND 'HIGH'
					drag_sensitivity: 'default',
				
				},
				responsive: null,
				// ARRAY: CHANGE HOW THE SLIDER APPEARS/WORKS AT CUSTOM BREAKPOINTS
				respondTo: 'window',
				// STRING: RESPONDS TO EITHER THE WINDOW OR SLIDER WIDTH
				destroyTheJungle: false,
				// BOOLEAN: REMOVES SLIDER
				mobileFirst: true,
				// BOOLEAN: BREAKPOINTS ARE MOBILE FIRST
			};

			// DEFAULT INITIALS //
			_.initials = {
				append_allowed: false,
				prepend_allowed: false,
				doNotMakeSlider: false,
				dragging: false,
				autoplayTimer: null,
				currentSlide: 1,
				loadIndex: 0,
				$nextArrow: null,
				$previousArrow: null,
				scrolling: false,
				slideWidth: null,
				$slides: null,
				swiping: false,
				touchObject: {},
				navigation_obj: {},
				navigation_dragging: false,
			};


	
			// MERGE THE ABOVE //
			$.extend(_, _.initials);

			_.activeBreakpoint = null;
			_.breakpoints = [];
			_.breakpointSettings = [];
			_.focussed = false;
			_.interrupted = false;
			_.paused = true;
			_.respondTo = null;
			_.rowCount = 1;

			// USER DEFINED SETTINGS for attributes //
			dataSettings = format_custom_attributes($(element), 'jungle-') || {};


			// MERGE DEFAULT SETTINGS + USER DEFINED SETTINGS + DATA ATTRIBUTE SETTINGS //
			_.options = $.extend(true, {}, _.defaults, settings, dataSettings);

			_.originalSettings = _.options;


			// FUNCTIONS //

			/** SETTINGS */
			_.defineConstants = $.proxy(_.defineConstants, _, element);
			_.registerBreakpoints = $.proxy(_.registerBreakpoints, _);
			_.checkResponsive = $.proxy(_.checkResponsive, _);
			
			/** BUILDING BLOCKS */
			_.buildTheJungle = $.proxy(_.buildTheJungle, _);
			_.buildWrappers = $.proxy(_.buildWrappers, _);
			_.buildTrack = $.proxy(_.buildTrack, _);
			_.buildSlides = $.proxy(_.buildSlides, _);
			_.buildButtons = $.proxy(_.buildButtons, _);
			_.buildNavigation = $.proxy(_.buildNavigation, _);


			/** EVENTS */
			_.initEvents = $.proxy(_.initEvents, _);
			_.buttonEvent = $.proxy(_.buttonEvent, _);
			_.navigationEvent = $.proxy(_.navigationEvent, _);
			_.keyHandler = $.proxy(_.keyHandler, _);
			_.dragEvent = $.proxy(_.dragEvent, _);
			_.navigationDragEvent = $.proxy(_.navigationDragEvent, _);
			_.navHandler = $.proxy(_.navHandler, _);
			_.navDragStart = $.proxy(_.navDragStart, _);
			_.navDragMove = $.proxy(_.navDragMove, _);
			_.navDragEnd = $.proxy(_.navDragEnd, _);
			_.navDragMoveCSS = $.proxy(_.navDragMoveCSS, _);
			
			_.swipeHandler = $.proxy(_.swipeHandler, _);
			_.swipeStart = $.proxy(_.swipeStart, _);
			_.swipeMove = $.proxy(_.swipeMove, _);
			_.swipeEnd = $.proxy(_.swipeEnd, _);
			_.sliderMoveCSS = $.proxy(_.sliderMoveCSS, _);

			/** ACTIONS */
			_.changeSlide = $.proxy(_.changeSlide, _);
			_.updateClass = $.proxy(_.updateClass, _);
			_.updateSizes = $.proxy(_.updateSizes, _);
			_.moveTrack = $.proxy(_.moveTrack, _);
			_.autoplay = $.proxy(_.autoplay, _);
			_.autoplayIterator = $.proxy(_.autoplayIterator, _);
			_.interrupt = $.proxy(_.interrupt, _);
			_.autoplayStart = $.proxy(_.autoplayStart, _);
			_.autoplayClear = $.proxy(_.autoplayClear, _);
			_.resetTrack = $.proxy(_.resetTrack, _);
			_.resetNavigationSlider = $.proxy(_.resetNavigationSlider, _);


			
			/** MASTER ACTIONS */
			_.refresh = $.proxy(_.refresh, _);
			_.destroy = $.proxy(_.destroy, _);
			_.destroyTheJungle = $.proxy(_.destroyTheJungle, _);


			// STARTS AT 0 - INCREMENT EACH TIME THIS IS CALLED //
			_.instanceUid = instanceUid++;


			// START BUILD //
			_.init(true);

		}


		return jungleSlide;

	}());

 
	/** SETTINGS */
	jungleSlide.prototype.defineConstants = function () {
		var _ = this;


		// original container contents //
		_.$SliderChildren = _.$element.children();
		_.slideCountOriginal = _.$SliderChildren.length;

		// used when re-init slider - remove all and add back this content
		_.$slideContentOriginal = _.$element.children().map(function () {
			return $(this).prop("outerHTML").trim();
		}).get().join('');


		// settings //
		
		
		// define number of slides visible //
		if (_.options.scroll.slides_visible >= (_.slideCountOriginal * 2)) {
		// if (_.options.scroll.slides_visible >= _.slideCountOriginal)
			// cannot be more than there is so set max to be the total slides
			_.SlidesInGroup = _.slideCountOriginal;
			_.doNotMakeSlider = true;
		} else if (_.options.scroll.slides_visible <= 1) {
			// cannot be less than 1 slide visible
			_.SlidesInGroup = _.slideCountOriginal;

		} else {
			_.SlidesInGroup = _.options.scroll.slides_visible;
		}

		// define the increment amount
		if (_.options.scroll.increment_by == 'default') {
			// by default this is the same as the slides visible //
			_.options.scroll.increment_by = 1;
		} else if (_.options.scroll.increment_by > _.SlidesInGroup) {
			// cannot increase by more than the slides visible //
			_.options.scroll.increment_by = _.SlidesInGroup;
		} else if (_.options.scroll.increment_by < 1) {
			// cannot increase by less than 1 //
			_.options.scroll.increment_by = 1;
		}

		if (_.options.scroll.infinite_scroll === true) {
			if (_.options.scroll.allowed_direction === 'left') {
				_.prepend_allowed = true
			} else if (_.options.scroll.allowed_direction === 'right') {
				_.append_allowed = true
			} else {
				_.append_allowed = true
				_.prepend_allowed = true
			}
		}
		
	};

	jungleSlide.prototype.registerBreakpoints = function () {

		var _ = this,
			breakpoint, currentBreakpoint, l,
			responsiveSettings = _.options.responsive || null;

			// if there are responsive settings it will be a type of array  && the array has settings in it then it'll be more than 0


		if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

			// responds to the window OR slider width - defined in settings

			_.respondTo = _.options.respondTo || 'window';

			for (breakpoint in responsiveSettings) {

				// starts as -1 //

				l = _.breakpoints.length - 1;


				if (responsiveSettings.hasOwnProperty(breakpoint)) {

					currentBreakpoint = responsiveSettings[breakpoint].breakpoint;


					// Removes duplicates

					while (l >= 0) {
						if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
							_.breakpoints.splice(l, 1);
						}
						l--;
					}

					_.breakpoints.push(currentBreakpoint);
					_.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

				}

			}

			// uses mobile first as default - can change in settings
			_.breakpoints.sort(function (a, b) {
				return (_.options.mobileFirst) ? a - b : b - a;
			});

		}

	};

	jungleSlide.prototype.checkResponsive = function (initial, forceUpdate) {
		var _ = this,
			breakpoint,
			targetBreakpoint,
			triggerBreakpoint = false,
			windowWidth = window.innerWidth || $(window).width(),
			wrapperWidth = _.$wrapper.width();
		
		if (_.options.responsive !== null && _.options.responsive.length > 0) {

			targetBreakpoint = null;

			for (breakpoint in _.breakpoints) {
				if (_.breakpoints.hasOwnProperty(breakpoint)) {
					
                   
					if (windowWidth > _.breakpoints[breakpoint]) {
						targetBreakpoint = _.breakpoints[breakpoint];
					}
				}
			}

			if (targetBreakpoint !== null) {

				if (_.activeBreakpoint !== null) {

					if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
						_.activeBreakpoint =
							targetBreakpoint;

						_.options = $.extend(true, {}, _.originalSettings, _.breakpointSettings[
							targetBreakpoint]);
					
						_.refresh();
						triggerBreakpoint = targetBreakpoint;
					}
				} else {

					_.activeBreakpoint = targetBreakpoint;
					_.options = $.extend(true, {}, _.originalSettings, 	_.breakpointSettings[
						targetBreakpoint]);
				
					_.refresh(true);

					triggerBreakpoint = targetBreakpoint;
				}
			} else {
				if (_.activeBreakpoint !== null) {
					_.activeBreakpoint = null;
					_.options = _.originalSettings;
					_.refresh();

					triggerBreakpoint = targetBreakpoint;
				}
			}
		}
		_.$wrapper.removeClass('loading');
	};

	/** BUILDING BLOCKS */
	jungleSlide.prototype.buildTheJungle = function () {
		var _ = this;

		// base required //
		_.buildWrappers();
		_.buildSlides();
		_.buildTrack();
		_.updateClass();

		// optional //
		if (_.options.buttons.active === true) {
			_.buildButtons();
		}

		if (_.options.navigation.active === true) {
			_.buildNavigation();
		}
		// _.buildIndicators(init);

		if (_.options.destroyTheJungle) {
			_.destroyTheJungle(true);
		}
		_.updateClass();

		// fix for variable/slow content load in flex container
		_.updateSizes();
	};

	jungleSlide.prototype.buildWrappers = function () {
		var _ = this;

		var layout = _.options.layout.order.slider;

		var track_class = ['jungle_track'];
			 
		if (_.options.animations.fade_effect === true) {
			track_class = track_class.concat(['fade_slides'])
		}
		track_class = track_class.join(' ')

		// BUILD TRACK //
		_.$track = _.$element
			.children()
			.wrapAll('<div/>')
			.parent()
			.addClass(track_class);

		// BUILD TRACK WRAP //
		_.$track_wrap = _.$track
			.wrapAll('<div/>')
			.parent()
			.addClass('jungle_wrap');

		// BUILD SLIDES WRAP //
		_.$wrapper = _.$track_wrap
			.wrapAll('<div/>')
			.parent()
			.addClass('jungle_slides')
			.css({
				order: layout
			});

		// define vars - once wrappers have been created
		_.sliderWidth = _.$wrapper.outerWidth();
		var testt = _.$element.outerWidth();

	
		_.individualSlideWidth = _.sliderWidth / _.SlidesInGroup;

		// .options.animations.transform_type;
		var trans_type = _.options.animations.transform_type;

		var trans_unit = _.options.animations.transform_unit;
		var trans_prop = _.options.animations.transform_property;
		var trans_duration = (_.options.animations.transform_duration * 1) + trans_unit;
		var trans_delay = _.options.animations.transform_delay + trans_unit;

		// BUILD SLIDES //
		
		var slide_transition = 'none';
		if (_.options.animations.fade_effect === true) {
			slide_transition = `opacity ${trans_duration} ${trans_prop} ${trans_delay}`;
		}
		var num = _.options.scroll.increment_by;

		let current_slide_group = 0;

		_.$SliderChildren.each(function (i = 0) {
			var content = $(_.$SliderChildren.get(i));

			var slide = $(content)
				.wrap('<div/>')
				.parent()
				.addClass('jungle_slide original')
				.attr({
					'slide-id': i + 1,
				})
				.css({
					width: `${_.individualSlideWidth}px`,
					'transition': slide_transition,

				})
			
				// only add to the first slide in the group to avoid conflicts when finding 'closest' slide on nav click
				if (i % num === 0) {
					current_slide_group++;
					$(slide).attr({
						'slide-group-num': current_slide_group,
					})
				} 

			_.$track.append(slide);
			i++;
		});

		// define vars //
		_.$slides = _.$track.children();
		_.$real_slides = _.$track.children('.original');

		// entire slider wrapper //
		var element_class = ['jungle_slider_container'];

		
		if (_.options.layout.class_list !== null) {
			element_class = element_class.concat(_.options.layout.class_list)
		}

		element_class = element_class.concat(_.options.layout.class_list)
		element_class = element_class.join(' ')


		// attributes
	

		_.$element
			.addClass(element_class)
			.css({
				zIndex: _.options.layout.zIndex
			})

	};

	jungleSlide.prototype.buildTrack = function () {
		var _ = this;

		_.left_offset = 0;
		var dif = 0;
		var offset_amount;

		// account for cloned slide
		if (_.options.scroll.infinite_scroll === true) {
			if (_.prepend_allowed === true) {
				_.offset_multiplier = get_clone_number('prepend', _.slideCountOriginal, _.SlidesInGroup, _.options.scroll.increment_by);
				_.left_offset += - (_.individualSlideWidth * _.offset_multiplier);

			} else {
				_.offset_multiplier = 1;
				_.left_offset += - 0;

			}
		}

		_.currentOffset = - (_.individualSlideWidth * _.currentSlide) + _.individualSlideWidth;

		var transform = - (_.currentSlide * _.incrementBy) + _.left_offset;

		var track_width = _.sliderWidth * _.total_slides_all;


		var trans_type = _.options.animations.transform_type;

		var trans_unit = _.options.animations.transform_unit;
		var trans_prop = _.options.animations.transform_property;
		var trans_duration = _.options.animations.transform_duration + trans_unit;
		var trans_delay = _.options.animations.transform_delay + trans_unit;


		_.$track.css({
			[trans_type]: `translate3d(${transform}px, 0px, 0px)`,
			'transition': `transform ${trans_duration} ${trans_prop} ${trans_delay}`,
			left: `${_.left_offset}px`,
			width: `${track_width}px`,
		})


	};

	jungleSlide.prototype.buildSlides = function () {

		var _ = this;
		

		if (_.options.scroll.infinite_scroll === true  ) {
			if (_.append_allowed === true) {
				build_clones('append', _.$track, _.slideCountOriginal, _.SlidesInGroup, _.options.scroll.increment_by);
			}
			if (_.prepend_allowed === true) {
				build_clones('prepend', _.$track, _.slideCountOriginal, _.SlidesInGroup, _.options.scroll.increment_by);
			}
		}

		_.total_slides_all = _.$track.children().length;

		if (_.prepend_allowed === true) {
			_.offset_multiplier = get_clone_number('prepend', _.slideCountOriginal, _.SlidesInGroup, _.options.scroll.increment_by);

			_.$allSlidesExceptPrepend = _.$track.children().slice(_.offset_multiplier);
	
		} else {
			_.$allSlidesExceptPrepend = _.$track.children();
			
		}
		
		// adds slide id to all except prepend as this is already been done
		_.$allSlidesExceptPrepend.each(function (i = 1) {
			i++;
			$(this).attr('actual-id', i)
		});


	};

	jungleSlide.prototype.buildButtons = function () {
		var _ = this;

		
		var button_animated = _.options.buttons.animated;
		var button_type = _.options.buttons.type;
		var button_class = _.options.buttons.class;
		var button_append = _.options.buttons.append;
		var button_directions = _.options.buttons.directions;
		var layout = _.options.layout.order;

		if (button_animated === true) {
			button_class += ' animated';
		}
		
		button_directions.forEach(direction => {
			var button_content = _.options.buttons[direction];

			// button_content = $(button_content).wrapAll('<div/>');
			var button_order = layout[`button_${direction}`]

			var jungle_button_wrap = $('<div>', { class: 'jungle_button_wrap' }).html(button_content);
			
			var add_element = false;

			var button_element = $(button_type)
			.html(jungle_button_wrap)
			.addClass(button_class + ' ' + direction)
			.attr('aria-label', direction)
			.attr('jungle-button-direction', direction)
			.css({
				order: button_order
			});

			if (direction == 'previous' ) {

				if (_.prepend_allowed === true) {
					add_element = true;
				_.$previousArrow = button_element;
					
				}
			} else {
				if (_.append_allowed === true) {
					add_element = true;
					_.$nextArrow = button_element;
				}
			}

			if (add_element === true) {
				button_element.appendTo(button_append);
			}
		});

	};

	jungleSlide.prototype.buildNavigation = function () {
		var _ = this;


		var layout = _.options.layout.order.navigation;
		var navigation_type = _.options.navigation.type;
		var navigation_class = _.options.navigation.class;
		var navigation_style = _.options.navigation.style;
		var navigation_append = _.options.navigation.append;

		// _.$element.add('div');

		var navigation_wrapper = $('<div>', {class: 'jungle_navigation'});
		var navigation_track = $('<div>', {class: 'jungle_navigation_track'});

		var num = _.slideCountOriginal % _.SlidesInGroup;
		var add_nav = false;
		var final_num;
		
		for (let i = 1; i < _.slideCountOriginal / _.options.scroll.increment_by + 1; i++) {
			add_nav = true;

			// if (i % num === 0) {
			// 	add_nav = true;
			// 	final_num = i
			// }
			// if (i == 1) {
			// 	add_nav = true;
			// }
			var nav_element = $(navigation_type)
			.html('')
			.attr('slide-id', i );

			if (add_nav === true) {
				if (navigation_style === 'drag_line' && i == 1) {
					nav_element.appendTo(navigation_track);
					nav_element.addClass(' navigation_drag');
					navigation_track.appendTo(navigation_wrapper);

				} else if (navigation_style !== 'drag_line') {
					nav_element.addClass(navigation_class)
					nav_element.appendTo(navigation_wrapper);

				}

			}

			add_nav = false;
			

		}
	
		$(navigation_wrapper)
			.attr('navigation-style', navigation_style)
			.css({
				order: layout,
				'--navigation-item-number': final_num
			});

		_.$navigation_wrapper = navigation_wrapper;
		navigation_wrapper.appendTo(navigation_append);

		_.$nav_wrapper_width = _.$navigation_wrapper.outerWidth();

		if (navigation_style === 'drag_line') {
			_.$nav_drag_line = _.$navigation_wrapper.find('.navigation_drag');
		
			_.$nav_drag_increment_amount = _.$nav_wrapper_width / parseInt(final_num);
			_.nav_item_number = final_num;

			var nav_width_increments = [];
			_.nav_positions = [];
			_.$nav_drag_offset = _.$nav_drag_increment_amount / 2;
			var position,
				sensitivity;
	
			for (let index = 0; index < _.nav_item_number; index++) {
				position = Math.round((_.$nav_drag_increment_amount * (index + 1)) - _.$nav_drag_increment_amount);
				sensitivity = 	Math.round(_.$nav_drag_increment_amount / 4);
	
				_.nav_positions[index] = position;
	
				nav_width_increments[index] = {
					slide_id: index + 1,
					position: position,
					min: position - sensitivity,
					max: position + sensitivity,
				};
			}
			_.$nav_drag_increment_stages = nav_width_increments;
		}

	};
	jungleSlide.prototype.buildNavigationOriginal = function () {
		var _ = this;

		var layout = _.options.layout.order.navigation;
		var navigation_type = _.options.navigation.type;
		var navigation_class = _.options.navigation.class;
		var navigation_style = _.options.navigation.style;
		var navigation_append = _.options.navigation.append;

		// _.$element.add('div');

		var navigation_wrapper = $('<div>', {class: 'jungle_navigation'});
		var navigation_track = $('<div>', {class: 'jungle_navigation_track'});

		var num = _.slideCountOriginal % _.SlidesInGroup;
		var add_nav = false;
		var final_num;
		for (let i = 1; i < _.slideCountOriginal + 1; i++) {

			if (i % num === 0) {
				add_nav = true;
				final_num = i
			}
			if (i == 1) {
				add_nav = true;
			}
			var nav_element = $(navigation_type)
			.html('')
			.attr('slide-id', i );

			if (add_nav === true) {
				if (navigation_style === 'drag_line' && i == 1) {
					nav_element.appendTo(navigation_track);
					nav_element.addClass(' navigation_drag');
					navigation_track.appendTo(navigation_wrapper);

				} else if (navigation_style !== 'drag_line') {
					nav_element.addClass(navigation_class)
					nav_element.appendTo(navigation_wrapper);

				}

			}

			add_nav = false;
			

		}
	
		$(navigation_wrapper)
			.attr('navigation-style', navigation_style)
			.css({
				order: layout,
				'--navigation-item-number': final_num
			});

		_.$navigation_wrapper = navigation_wrapper;
		navigation_wrapper.appendTo(navigation_append);

		_.$nav_wrapper_width = _.$navigation_wrapper.outerWidth();

		if (navigation_style === 'drag_line') {
			_.$nav_drag_line = _.$navigation_wrapper.find('.navigation_drag');
		
			_.$nav_drag_increment_amount = _.$nav_wrapper_width / parseInt(final_num);
			_.nav_item_number = final_num;

			var nav_width_increments = [];
			_.nav_positions = [];
			_.$nav_drag_offset = _.$nav_drag_increment_amount / 2;
			var position,
				sensitivity;
	
			for (let index = 0; index < _.nav_item_number; index++) {
				position = Math.round((_.$nav_drag_increment_amount * (index + 1)) - _.$nav_drag_increment_amount);
				sensitivity = 	Math.round(_.$nav_drag_increment_amount / 4);
	
				_.nav_positions[index] = position;
	
				nav_width_increments[index] = {
					slide_id: index + 1,
					position: position,
					min: position - sensitivity,
					max: position + sensitivity,
				};
			}
			_.$nav_drag_increment_stages = nav_width_increments;
		}

	};
	
	/** EVENTS */
	jungleSlide.prototype.initEvents = function (element) {
		var _ = this;

	
		var pause_on_hover = _.options.autoplay.pause_on_hover;

		if (_.options.buttons.active === true) {
			_.buttonEvent();
		}

		if (_.options.navigation.active === true) {
			_.navigationEvent();
		}

		if (_.options.scroll.draggable === true) {
			_.dragEvent();
		}

		if (_.options.navigation.style === 'drag_line') {
			_.navigationDragEvent();
		}
		

		if (pause_on_hover) {
			_.$element.on('mouseenter', $.proxy(_.interrupt, _, false));
			_.$element.on('mouseleave', $.proxy(_.interrupt, _, true));
		}

		if (_.options.scroll.accessibility === true) {
			_.$element.unbind('keydown').on('keydown', _.keyHandler);
		}

		window.addEventListener('resize', function () {
			clearTimeout(_.resizeId);
			_.resizeId = setTimeout(_.refresh, 1000);
		});

		var handler = onVisibilityChange(_.$element, function (is_visible) {
			_.autoplay(is_visible)
			// if (is_visible === true && _.options.autoplay.active === true && !_.autoplayTimer  ) {

			// 	// always clear before starting!!

			// 	_.autoplayStart();

			// } else {
			// 	_.autoplayClear();
			// }
		});


		$(window).on('DOMContentLoaded load resize scroll', handler);

		//

	};

	jungleSlide.prototype.buttonEvent = function (element) {
			var _ = this;

		if (_.$previousArrow !== null ) {
			_.$previousArrow
				.off('click ontouchstart')
				.on('click ontouchstart', {
					direction: 'previous'
				}, _.changeSlide);
		}
		if (_.$nextArrow !== null) {
			_.$nextArrow
				.off('click ontouchstart')
				.on('click ontouchstart', {
					direction: 'next'
				}, _.changeSlide);
		}

	};

	jungleSlide.prototype.navigationEvent = function () {
		var _ = this;

		_.$navigation_wrapper.children('.jungle_indicator')
			.off('click ontouchstart')
			.on('click ontouchstart', {
				event_type: 'navigation',
				variant: 'default'
			}, _.changeSlide);
		
		// _.$navigation_wrapper
		// 	.off('mouse')
		// 	.on('click ontouchstart', {
		// 		event_type: 'navigation'
		// 	}, _.changeSlide);

	};

	jungleSlide.prototype.keyHandler = function (event) {
		var _ = this;

		// IGNORE IF SELECTION ON A FORM
		if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
			if (event.keyCode === 37) {
				_.changeSlide({
					data: {
						direction: 'previous'
					}
				});
			} else if (event.keyCode === 39) {
				_.changeSlide({
					data: {
						direction: 'next'
					}
				});
			}
		}
	};
	jungleSlide.prototype.navigationDragEvent = function () {
		var _ = this;
	
		_.$navigation_wrapper.on('touchstart mousedown', {
			type: 'start',
			source: 'navigation'
		}, _.navHandler);

		_.$navigation_wrapper.on('touchmove mousemove', {
			type: 'move',
			source: 'navigation'
		}, _.navHandler);

		_.$navigation_wrapper.on('touchend mouseup', {
			type: 'end',
			source: 'navigation'
		}, _.navHandler);


		// maybe change this back to as above - concern over how sensitive it is 
		_.$navigation_wrapper.on('touchcancel mouseleave', {
			type: 'end',
			source: 'navigation'
		}, _.navHandler);

	};

	jungleSlide.prototype.dragEvent = function () {
		var _ = this;

		_.$wrapper.on('touchstart mousedown', {
			type: 'start'
		}, _.swipeHandler);

		_.$wrapper.on('touchmove mousemove', {
			type: 'move'
		}, _.swipeHandler);

		_.$wrapper.on('touchend mouseup', {
			type: 'end'
		}, _.swipeHandler);

		_.$wrapper.on('touchcancel mouseleave', {
			type: 'end'
		}, _.swipeHandler);

	};
	



	// draging events //
	jungleSlide.prototype.navHandler = function (swipe_action) {
		var _ = this,
			touchSensivity;
		
	
		

		// account for zero index 
		_.nav_drag_current_pos = (_.trueCurrentSlideID) * _.$nav_drag_increment_amount;
		

		switch (swipe_action.data.type) {
			case 'start':
				_.navDragStart(swipe_action);
				break;
			case 'move':
				_.navDragMove(swipe_action);
				break;
			case 'end':
				_.navDragEnd(swipe_action);
				break;
			default:
				break;
		}
		

	};

	jungleSlide.prototype.navDragStart = function (swipe_action) {
		var _ = this;

		_.navigation_obj.start_x = swipe_action.originalEvent.clientX - _.$nav_drag_offset;
		_.navigation_dragging = true;

	};

	jungleSlide.prototype.navDragMove = function (swipe_action) {
		var _ = this;

		if (_.navigation_dragging !== true) {
			return false;
		}
		

		_.navigation_obj.current_x = swipe_action.originalEvent.clientX - _.$nav_drag_offset;
		_.$navigation_wrapper.addClass('dragging');

		// if(_.navigation_obj.current_x   snap_to_sensitivity)


		var moveAmount = _.navigation_obj.current_x ;

		var snap_to_element = _.$nav_drag_increment_stages.filter(function (nav_slide) {
			if (moveAmount  >= nav_slide.min && moveAmount  <= nav_slide.max) {
				return nav_slide.position;
			}
		});

		var snapped_position = null;

		if (snap_to_element.length !== 0) {
			_.snapped_to_element = true;

			snapped_position = snap_to_element[0].position;
		} else {
			_.snapped_to_element = false;
		}
			
		_.navDragMoveCSS(moveAmount,snapped_position);

	};
	jungleSlide.prototype.navDragEnd = function (swipe_action) {
		var _ = this;
		
		var new_slide_id;
		_.$navigation_wrapper.removeClass('dragging');

		let reset_position = _.nav_positions.sort( (a, b) => Math.abs(_.nav_current_transform - a) - Math.abs(_.nav_current_transform - b) )[0];

		var element_clicked = _.$nav_drag_increment_stages.filter(function (nav_slide) {
			if (reset_position === nav_slide.position) {
				return nav_slide;
			}
		});


		if (element_clicked.length !== 0) {
			new_slide_id = element_clicked[0].slide_id
		}


		if(_.navigation_dragging === false || _.navigation_obj.moving === false){
			return false
		}
		

		_.navigation_dragging  = false;

		if (new_slide_id !== _.trueCurrentSlideID ) {
			var action = {
				data: {
					event_type: 'navigation',
					variant: 'dragged',
					dragged_id: new_slide_id,
				}
			}
			// MOVE TRACK TO NEW SLIDE
			_.changeSlide(action)
			// RESET THE TOUCH OBJECT
			_.navigation_obj = {};
			_.resetNavigationSlider(reset_position);

		} else {
			_.resetNavigationSlider(reset_position);
		}
	

		





		
	};
	jungleSlide.prototype.resetNavigationSlider = function (reset_position = null) {
		var _ = this,
			positionProps = {},
			x, y;
			var trans_unit = _.options.animations.transform_unit;
			var trans_type = _.options.animations.transform_type;
			var trans_prop = _.options.animations.transform_property;
			var trans_duration = _.options.animations.transform_duration + trans_unit;
			var trans_delay = _.options.animations.transform_delay + trans_unit;
	

		if (reset_position === null) {
			reset_position = _.$nav_drag_increment_stages[_.trueCurrentSlideID - 1].position
		}
			
	
		_.$nav_drag_line.css({
			[trans_type]: `translate3d(${reset_position}px, 0px, 0px)`,
			'transition': `transform ${trans_duration} ${trans_prop} ${trans_delay}`,
		}).removeClass('moving');

	};
	jungleSlide.prototype.navDragMoveCSS = function (moveAmount, snapped_position) {
		var _ = this,
			positionProps = {},
			x, y;

		var trans_type = _.options.animations.transform_type;
		// positionProps[_.positionProp] = moveAmount;
		_.nav_current_transform = moveAmount;
		if (snapped_position !== null) {
			_.nav_current_transform = snapped_position;
		}
		_.$nav_drag_line.css({
			[trans_type]: `translate3d(${_.nav_current_transform}px, 0px, 0px)`,
			'transition': 'none'
		}).addClass('moving');

		// _.$track.css('transform',  'translate3d(' + moveAmount + 'px, 0px, 0px)');


	};

	jungleSlide.prototype.swipeHandler = function (swipe_action) {
		var _ = this,
			touchSensivity;

		switch (_.options.scroll.drag_sensitivity) {
			case 'low':
				touchSensivity = 0.1;
				break;

			case 'normal':
				touchSensivity = 0.2;
				break;

			case 'default':
				touchSensivity = 0.2;
				break;

			case 'high':
				touchSensivity = 0.3;
				break;

			default:
				touchSensivity = 0.2;
				break;

		}

		// MINIMUM DRAG AMOUNT TO TRIGGER SLIDE MOVE
		_.touchObject.minSwipe = Math.round(_.sliderWidth * touchSensivity);


		switch (swipe_action.data.type) {
			case 'start':
				_.swipeStart(swipe_action);
				break;

			case 'move':
				_.swipeMove(swipe_action);
				break;

			case 'end':
				_.swipeEnd(swipe_action);
				break;

			default:
				break;
		}

	};

	jungleSlide.prototype.swipeStart = function (event) {
		var _ = this,
			touches,
			positionProps = {};

		
		if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {

			touches = event.originalEvent.touches[0];
		}

		// SET THE START POSITION
		_.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;

		// SET DRAGGING TO TRUE
		_.dragging = true;
	};

	jungleSlide.prototype.swipeMove = function (event) {
		var _ = this,
			touches,
			currentOffset,
			positionMove,
			moveAmount,
			mouseLeave;




		if (!_.dragging || _.scrolling || touches && touches.length !== 1 || _.touchObject.startX == undefined) {
			return false;
		}
		_.$element.addClass('dragging');

		_.$wrapper.on('touchcancel mouseleave', function () {
			mouseLeave = true;
		});

		if (mouseLeave) {
			return false;
		}

		if (_.dragging === true && mouseLeave !== true) {

			touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

			_.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
			_.touchObject.difference = _.touchObject.curX - _.touchObject.startX;

			positionMove = _.touchObject.curX > _.touchObject.startX ? 1 : -1;

			// CALCULATE THE DIFFERENCE BETWEEN START AND CURRENT POINT
			_.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.difference, 2)));

			// IF CURRENT POSITION IS GREATER THAN THE START POSITION THEN POSITIVE NUMBER
			moveAmount = _.currentOffset + _.touchObject.swipeLength * positionMove;


			_.sliderMoveCSS(moveAmount);

		}

	};
	jungleSlide.prototype.swipeEnd = function (event) {
		var _ = this,
			movedClone = false,
			swipeMessage;

		var direction;
		_.dragging = false;
		_.swiping = false;
		_.interrupted = false;

		_.$element.removeClass('dragging');


		if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
			// PREVIOUS SLIDE //
			if (_.touchObject.difference > 0) {
				direction = 'previous';

				// NEXT SLIDE //
			} else if (_.touchObject.difference < 0) {
				direction = 'next';
			}
		} else {
			direction = 'no move';
		}



		if (direction !== 'no move' && _.touchObject.swipeLength !== undefined) {
			var action = {
				data: {
					direction: direction,
					moved_by_dragging: true,
				}
			}
			// MOVE TRACK TO NEW SLIDE
			_.changeSlide(action)
			// RESET THE TOUCH OBJECT
			_.touchObject = {};
		} else {
			// RESET TRACK TO CURRENT SLIDE
			_.resetTrack()
		}

	};

	jungleSlide.prototype.sliderMoveCSS = function (moveAmount) {
		var _ = this,
			positionProps = {},
			x, y;


		// positionProps[_.positionProp] = moveAmount;

		var trans_type = _.options.animations.transform_type;

		_.$track.css({
			[trans_type]: `translate3d(${moveAmount}px, 0px, 0px)`,
			'transition': 'none'
		}).addClass('moving');

		// _.$track.css('transform',  'translate3d(' + moveAmount + 'px, 0px, 0px)');


	};



	

	/** ACTIONS */
	jungleSlide.prototype.changeSlide = function (action = undefined, true_clone_id) {
		var _ = this;

		var nextSlide;
		var moved_to_clone = false;
		var moveTransition = true;
		var is_a_clone = false;
		var true_clone_id;

		if (action !== undefined) {
			var direction = action.data.direction;
			var track_reset = action.data.track_reset;
			var moved_by_dragging = action.data.moved_by_dragging;
			var event_type = action.data.event_type;
			var variant = action.data.variant;
			var dragged_id = action.data.dragged_id;
			switch (direction) {
				case 'previous':
					if (_.options.scroll.allowed_direction === 'left' || _.options.scroll.allowed_direction === 'both') { 
						nextSlide = _.currentSlide - _.options.scroll.increment_by;
					} else {
						nextSlide = _.currentSlide;
					}
					break;

				case 'next':
					if (_.options.scroll.allowed_direction === 'right' || _.options.scroll.allowed_direction === 'both' ) { 
						nextSlide = _.currentSlide + _.options.scroll.increment_by;
					} else {
						nextSlide = _.currentSlide;
					}

					
					break;
			}
			if (track_reset === true) {
				moveTransition = false;
				nextSlide = true_clone_id;
			}
			if (moved_by_dragging === true && track_reset === true) {
				moveTransition = false;
			}

			if (event_type == 'navigation') {

				var clicked_nav_id;

				if (variant == 'dragged') { 
					clicked_nav_id = parseInt(dragged_id);
				} else {
					var $clicked_navigation_element = $(action.currentTarget);
					clicked_nav_id = parseInt($clicked_navigation_element.attr('slide-id'));
				}
			
				var current_slide = _.$track.children(`.current-slide`);
				var current_slide_index = $(current_slide).index();

				var next_index = $(current_slide).nextAll(`[slide-group-num="${clicked_nav_id}"]`).index();
				var prev_index = $(current_slide).prevAll(`[slide-group-num="${clicked_nav_id}"]`).index();

				var index_arr = [
					next_index,
					prev_index
				]

				var closest_slide_index = index_arr.reduce(function(prev, curr) {
					return (Math.abs(curr - current_slide_index) < Math.abs(prev - current_slide_index) ? curr : prev);
				});

				if (clicked_nav_id !== _.trueCurrentSlideID) {
					var closest_slide = _.$track.children().get(closest_slide_index);

					var closest_id = parseInt($(closest_slide).attr('actual-id'));


					var total_max = _.currentSlide + _.options.scroll.increment_by;
					var max_next = _.$track.children(':not(.prepend)').length;
					var max_previous = (total_max) * -1;


					if (closest_id == max_previous) {
						closest_slide = _.$track.children().get(next_index);
						closest_id = $(closest_slide).attr('actual-id');
					}
					if (closest_id >= max_next) {
						closest_slide = _.$track.children().get(prev_index);
						closest_id = $(closest_slide).attr('actual-id');
					}
					nextSlide = closest_id;

				} else {
					nextSlide = _.currentSlide;
				}
			}
		} else {
			moveTransition = false;
			nextSlide = true_clone_id;
		}

		var end_prepend_clones = (_.offset_multiplier - 1) * -1;
		var end_prepend_clones_min = (_.offset_multiplier - _.options.scroll.increment_by) + 1;
		
		end_prepend_clones_min = end_prepend_clones_min * -1; 


		var is_at_end_prepend = false;

		if (_.currentSlide % _.options.scroll.increment_by === 0) {
			if (nextSlide === (-_.options.scroll.increment_by)) {
				is_at_end_prepend = true;
			}
		} else {
			if (_.currentSlide === end_prepend_clones) {
				is_at_end_prepend = true;
			}
		
			if (nextSlide - _.options.scroll.increment_by  < end_prepend_clones) {
				is_at_end_prepend = true;
			}
			if (nextSlide >= end_prepend_clones && nextSlide <= end_prepend_clones_min) {
				is_at_end_prepend = true;
			}
		}

		var is_at_end_append = false;
			
		if (nextSlide + _.options.scroll.increment_by  > _.slideCountOriginal && direction == 'next') {
			is_at_end_append = true;
		}

		if (nextSlide  > _.slideCountOriginal) {
			is_at_end_append = true;
		}
		
		// if (is_at_end_prepend === true|| nextSlide > _.slideCountOriginal) {

		if (is_at_end_prepend === true || is_at_end_append === true) {
			moved_to_clone = true;
			var clone_id = [];

			_.$track.children().each(function () {
				if ($(this).attr('actual-id') == nextSlide) {
					clone_id.push($(this).attr('slide-id'));
					return false;
				}
			});
			true_clone_id = parseInt(clone_id.join(""));
		}


		// prevents recursion
		if (_.currentSlide !== parseInt(nextSlide)) {
			
			// update current slide
			_.currentSlide = parseInt(nextSlide);

			_.updateClass(true);
			_.moveTrack(moveTransition, moved_to_clone, true_clone_id, moved_by_dragging);
		}




	};

	jungleSlide.prototype.updateClass = function (onChange) {
		var _ = this;

		_.is_updating_class = true;

		// _.currentSlide = parseInt(nextSlide);
		var current_slide_index;
		// account for zero index
		var stop_loop = false;

		var visible_slides = _.options.scroll.slides_visible - 1;
		// console.log(_.options.scroll.slides_visible);
		_.$track.children().each(function () {
			$(this).removeClass('current-slide visible');

			if ($(this).attr('actual-id') == _.currentSlide && stop_loop === false) {
				$(this).addClass('current-slide');
				var slide_id = $(this).attr('slide-group-num');
				current_slide_index = $(this).index();
				_.currentSlideElement = this;
				_.trueCurrentSlideID = parseInt(slide_id);
				stop_loop = true;
			}
		});
		_.visible_selectors = current_slide_index + visible_slides;


		for (let index = current_slide_index; index <= _.visible_selectors; index++) {
			let class_to_add = 'visible';

			if (index == current_slide_index) {
				class_to_add += ' first-visible';
			} else if (index == _.visible_selectors) {
				class_to_add += ' last-visible';
			}
			_.$track.children().eq(index).addClass(class_to_add);
		}
		_.$element.attr('data-current-slide', _.trueCurrentSlideID);


		if (_.options.navigation.active === true && _.$navigation_wrapper !== undefined) {
			_.$navigation_wrapper.children().each(function () {
				$(this).removeClass('current-slide visible');
	
				if ($(this).attr('slide-id') == _.trueCurrentSlideID) {
					$(this).addClass('current-slide');
				}
			});

			if (_.options.navigation.style === 'drag_line' && onChange === true) {
				_.resetNavigationSlider();
			}

		}

		if (_.options.layout.adaptive_height === true) {
			var visible_heights = [];

			_.$track.children('.visible').each(function () {
				var $this = $(this);
				var height = $(this).outerHeight();

				visible_heights.push(height);
			});

			
			_.$track.outerHeight(Math.max(...visible_heights));
		}


	};

	jungleSlide.prototype.updateSizes = function () {
		var _ = this;

		_.sliderWidth = _.$wrapper.outerWidth();
		_.individualSlideWidth = _.sliderWidth / _.options.scroll.slides_visible;
		_.incrementAmount = _.individualSlideWidth * _.options.scroll.increment_by;
		
		_.$track.children().each(function (i = 0) {
			$(this).css({
				width: `${_.individualSlideWidth}px`,
			})
		});

		_.buildTrack();

	};

	jungleSlide.prototype.moveTrack = function (moveTransition = true, moved_to_clone = false, true_clone_id, moved_by_dragging) {
		var _ = this;

		var transform = - (_.individualSlideWidth * _.currentSlide) + _.individualSlideWidth;

		_.currentOffset = - (_.individualSlideWidth * _.currentSlide) + _.individualSlideWidth;

		var trans_unit = _.options.animations.transform_unit;
		var trans_type = _.options.animations.transform_type;
		var trans_prop = _.options.animations.transform_property;
		var trans_duration = _.options.animations.transform_duration + trans_unit;
		var trans_delay = _.options.animations.transform_delay + trans_unit;

		var trans_total_time = _.options.animations.transform_delay + _.options.animations.transform_duration;



		if (moveTransition) {
			_.$track.css({
				[trans_type]: `translate3d(${transform}px, 0px, 0px)`,
				'transition': `transform ${trans_duration} ${trans_prop} ${trans_delay}`,
			}).addClass('moving');
		} else {

			setTimeout(() => {
				_.$track.css({
					[trans_type]: `translate3d(${transform}px, 0px, 0px)`,
					'transition': `none`,
				})
			}, trans_total_time);
		}


		setTimeout(() => {
			_.$track.removeClass('moving');
		}, trans_total_time);


		if (moved_to_clone === true) {
			var action = {
				data: {
					track_reset: true,
					moved_by_dragging: moved_by_dragging,
				}
			}
			_.changeSlide(action, true_clone_id);

		} else {

		}
	};

	jungleSlide.prototype.interrupt = function (startAgain) {

		var _ = this;

		if (_.options.autoplay.active === true && _.doNotMakeSlider !== true) {
			if (startAgain) {
				_.autoplayStart();
				_.$element.removeClass('paused');

			} else {
				_.autoplayClear();
				_.$element.addClass('paused');

			}
		} else {

			_.autoplayClear();

		}

		_.interrupted = startAgain;

	};
	jungleSlide.prototype.autoplayStart = function () {

		var _ = this;

		var delay = _.options.autoplay.delay;


		clearInterval(_.autoplayTimer);
		_.autoplayTimer = setInterval(_.autoplayIterator, delay);

	};

	jungleSlide.prototype.autoplayClear = function () {

		var _ = this;

		if (_.autoplayTimer) {
			clearInterval(_.autoplayTimer);
		}

	};

	jungleSlide.prototype.autoplay = function (is_visible = false) {
		var _ = this;


		var is_visible = isElementInViewport(_.$element);

		_.autoplayClear();
		if (is_visible === true && _.options.autoplay.active === true) {
			// always clear before starting!!
			_.autoplayStart();

		} else {
			_.autoplayClear();
		}


	};

	jungleSlide.prototype.autoplayIterator = function () {
		var _ = this;

		var action = {
			data: {
				direction: 'next'
			}
		}

		var timer_called = true;

		_.changeSlide(action);

	};
	
	jungleSlide.prototype.resetTrack = function () {
		var _ = this,
			positionProps = {},
			x;

		var trans_type = _.options.animations.transform_type;
		_.$track.css({
			[trans_type]: `translate3d(${_.currentOffset}px, 0px, 0px)`
		}).addClass('moving');

		// RESET TRANSITION TO NONE - SO IT DOES NOT INTERFERE WITH DRAGGING

		// positionProps[_.animProp] = 'transform ' + '0' + _.options.transform_unit + ' ' + _.options.transform_property + ' ' + '0' + _.options.transform_unit;


	};
	
	/** MASTER ACTIONS */
	jungleSlide.prototype.refresh = function (initializing) {

		var _ = this,
			currentSlide,
			lastVisibleIndex = _.currentSlide;

		_.currentSlide = 1;


		_.destroy(true);

		$.extend(_, _.initials, { currentSlide: _.currentSlide });

		_.init();


	};

	jungleSlide.prototype.destroy = function (refresh) {

		var _ = this;

		_.touchObject = {};
		_.autoplayClear();

		_.$element.html(_.$slideContentOriginal)

		// if(!refresh) {
		//     _.$element.trigger('destroy', [_]);
		// }

	};

	jungleSlide.prototype.destroyTheJungle = function () {
		var _ = this;
		_.destroy();
		_.init();
	};

	/* INITIALISE SLIDER */
	jungleSlide.prototype.init = function (init) {

		var _ = this;

		_.registerBreakpoints();
		_.defineConstants();



		// builds the slider elements //
		_.buildTheJungle();

		_.initEvents();



		if (_.options.autoplay.active === true && _.doNotMakeSlider === false) {
			_.autoplay();
		}

		_.checkResponsive();

		


	};

	/* SLIDER FUNCTION */
	$.fn.jungleSlide = function () {
		let _ = this,
			opt = arguments[0], // CUSTOMISED SETTINGS OBJECT
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;

		for (i = 0; i < l; i++) {
			// CREATE SLIDER IF OBJECT (SETTINGS SET) OR EMPTY (NO SETTINGS)
			if (typeof opt == 'object' || typeof opt == 'undefined') {
				_[i].jungleSlide = new jungleSlide(_[i], opt);
			}

			else {
				ret = _[i].jungleSlide[opt].apply(_[i].super, args);
			}



			if (typeof ret != 'undefined') {
				return ret;
			}
		}

		return _;
	};


function onVisibilityChange(el = undefined, callback) {
    var old_visible;
	return function () {
		if (typeof el  !== undefined && el !== null) {
			var visible = isElementInViewport(el);
			if (visible != old_visible) {
				old_visible = visible;
				if (typeof callback == 'function') {
					callback(old_visible);
				}
			}
		}else{
			return false
		}

    }
}

function get_offset_number(original_slides, slides_visible,increment_by) {
	var
		i = original_slides,
		offset_num = 0,
		dif,
		total_slides_vis = slides_visible + Math.ceil((original_slides / (slides_visible * increment_by) ));
		// total_slides_vis = slides_visible + increment_by;

	while (original_slides % total_slides_vis !== 0) {
		i++;
		if (i % total_slides_vis === 0) {
			break;
		}
	}

	dif = i - original_slides;
	offset_num = dif;

	return offset_num;
}

function get_clone_number(type, original_slides, slides_visible, increment_by) {
	var
		number = slides_visible,
		offset = 0,
		total_slides_vis = slides_visible + Math.ceil((original_slides / (slides_visible * increment_by)));
	
	number = total_slides_vis;
	// var original_slide_count = total_slides_vis;
	
	if (type == 'append') {
		offset = get_offset_number(original_slides, slides_visible,increment_by);
		number += offset;
		number += increment_by; // account for variable increase
	} else if (type == 'prepend') {
		// dif = number - increment_by;
		// number += dif;
		offset = get_offset_number(original_slides, slides_visible,increment_by);
		number += offset;
	}


	return number;
}

function build_clones(type, container, original_slide_count, slides_visible, increment_by) {
	var
		$container = container,
		i = 0,
		arr = [],
		clone_number = get_clone_number(type, original_slide_count, slides_visible, increment_by);

	if (type == 'prepend') {
		var slide_id = original_slide_count + 1; // add offset by 1 always
	} else {
		var slide_id = 0;
	}

	while (i < clone_number) {
		if (i === original_slide_count) {
			slide_id = 0;
			if (type == 'prepend') {
				slide_id = original_slide_count + 1; // add offset by 1 always
			}
		}
		i++;

		if (type == 'prepend') {
			slide_id--;
		} else {
			slide_id++;
		}
		var prepend_i = (i - 1) * -1;
		var clone = $container.children().get(slide_id - 1);
		var new_clone = $(clone)
			.clone()
			.removeClass('original')
			.addClass(`cloned ${type}`);

		if (type == 'prepend') {
			$(new_clone).attr('actual-id', prepend_i).removeClass('append');
		}

		arr.push(new_clone);
	}

	if (type == 'append') {
		arr.forEach(currentItem => {
			$container.append(currentItem);
		});
	} else {
		arr.forEach(currentItem => {
			$container.prepend(currentItem);
		});
	}

}

function getAttributes ( $node , filter = null ) {
    var attrs = {};
	$.each($node[0].attributes, function (index, attribute) {
		if (filter !== null) {
			if (attribute.name.includes(filter)) {
				attrs[attribute.name] = attribute.value;
			}
		} else {
			attrs[attribute.name] = attribute.value;
		}
    } );
    return attrs;
}

function format_custom_attributes(element, filter = null) {
	dataSettings = getAttributes($(element), filter) || {};

	var new_obj = {};
	for (const [key, value] of Object.entries(dataSettings)) {
		var new_key;
		if (key.includes("jungle-")) { 
			new_key = key.replace("jungle-", "");
			var split_arr = new_key.split('-');
			var arr_length = split_arr.length;
			var parent_obj;
			split_arr.forEach(function (item, index, array) {
				if (index === 0) {
					parent_obj = new_obj;
					if (arr_length > 1) {
						parent_obj[item] = {};
					} else {
						parent_obj[item] = format_string_to_boolean(value);
					}
				} else {
					if (index !== arr_length - 1) {
						parent_obj[item] = {};
					} else {
						parent_obj[item] = format_string_to_boolean(value)
					}
				}
				parent_obj = parent_obj[item];
			});
		}
	}
	return new_obj;
}

function format_string_to_boolean(val) {
	if (val === 'true') {
		val = true;
	} else if (val === 'false') {
		val = false;
	} else {
		val = val;
	}
	return val;
}
function getClosestValue(myArray, myValue){
	//optional
	var i = 0;

	while(myArray[++i] < myValue);

	return i;
}
})( jQuery );


// HELPER FUNCTIONS //

function isElementInViewport (el = undefined) {

	if (typeof el !== undefined && el !== null) {
		// Special bonus for those using jQuery
		if (typeof jQuery === "function" && el instanceof jQuery) {
			el = el[0];
		}

		var rect = el.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
		);
	}else{
		return false;
	}

}
