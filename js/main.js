var topicheader = {
    init: function() {
        var this_class = this;
        
        // Register event handlers
        /*$(window).scroll(function() {
            this_class.update();
        });
        $(window).resize(function() {
            this_class.update();
        });*/
        scroll_delegator.register(function() {
        	this_class.update();
        });
        
        // Run update function once to start
        this_class.update();
    },
    update: function() {
        // Offset from top of page
        var top = $(window).scrollTop() + 50;
        $($('.topic').get().reverse()).each(function () {
            // If this is the current topic
            if ($(this).offset().top <= top) {
                // Pin it at the top of the page
                $('.topic').removeClass('current');
                $(this).addClass('current');
                
                
                if ($(this).next('.topic').length != 0) {
                    // If the next topic header is touching or overlapping it
                    var nextOffset = $(this).next('.topic').offset().top - $(window).scrollTop();
                    if (nextOffset <= 79) {
                        // Push the current header up accordingly
                        $(this).find('h2').css({'top': (nextOffset - 29) + 'px'});
                    } else {
                        // Otherwise keep the normal offset
                        $(this).find('h2').css({'top': '50px'});
                    }
                } else {
                    $(this).find('h2').css({'top': '50px'});
                }
                
                return false;
            }
        });
    }
}

var imagepop = {
    init: function() {
        // Find sections
        $('.section').each(function() {
            var maxOffset = 100;
            // Find images with float class
            $(this).find('.image.float').each(function() {
                // Determine correct offset
                var offset = $(this).position().top - 40;
                // Remove element, position absolutely to right below previous element
                if (maxOffset > offset) {
                    offset = maxOffset;
                }
                $(this).css({'position': 'absolute', 'top': offset + 'px', 'right': '40px', 'border': '0', 'margin': '0'});
                // Determine bottom of this image, update variable
                maxOffset = offset + $(this).outerHeight() + 50;
            })
        });
    }
}

var panorama = {
    init: function() {
        return true;
    }
}

var csshelper = {
    init: function() {
        $('*[data-rotate]').each(function() {
            var rotate = $(this).attr('data-rotate');
            $(this).css({'-webkit-transform': 'rotate(' + rotate + 'deg)',
                        '-moz-transform': 'rotate(' + rotate + 'deg)',
                        '-o-transform': 'rotate(' + rotate + 'deg)',
                        '-ms-transform': 'rotate(' + rotate + 'deg)'});
        });
    }
}

var parallax = {
	background_only: false,
    init: function() {
        var this_class = this;
        
        // Cache data into the DOM
        if (!this.background_only) {
	        $('.section').each(function() {
	            $(this).data('bgspeed', $(this).attr('data-bgspeed'));
	            // Fixed background
	            $(this).css({'background-attachment': 'fixed'});
	        });
	        $('.component').each(function() {
	            $(this).data('speed', $(this).attr('data-speed'));
	            $(this).data('originalPositionTop', $(this).position().top);
	        });
        }
        
        // Register event handlers
        /*$(window).scroll(function() {
            this_class.update();
        });
        $(window).resize(function() {
            this_class.update();
        });*/
        
    	scroll_delegator.register(function() {
        	this_class.update();
        });
        
        // Run update function once to start
        this_class.update();
    },
    update: function () {
        var this_class = this; 
        this.scrollTop = $(window).scrollTop();
        this.viewportHeight = window.innerHeight;
        
        var topOfViewport = this.scrollTop;
        var bottomOfViewport = this.scrollTop + this.viewportHeight;
        
        if (!this.background_only) {
	        $('.section').each(function() {
	            // Check if the section can be seen on the page
	            // Top of page is above the bottom of the viewport, and bottom of page is below the top of the viewport.
	            var sectionIsVisible = ($(this).offset().top < bottomOfViewport) && (($(this).offset().top + $(this).height()) > topOfViewport);
	            
	            if (sectionIsVisible) {
	            	$(this).removeClass('hidden').addClass('visible');
	                this_class.section_update(this);
	            } else {
	            	$(this).removeClass('visible').addClass('hidden');
	            }
	        });
        }
        
        this.background_update();
    },
    section_update: function(section) {
        var this_class = this;
        var innerScroll = this_class.scrollTop - $(section).offset().top;
        
        // Update section background position
        var newOffset = (-1) * ($(section).data('bgspeed')) * innerScroll;  
        $(section).css({'background-position': '50% ' + newOffset + 'px'});
        
        // Update component positions
        $(section).find('.component[data-speed]').each(function() {
            if ($(this).data('speed') != 1) {
                var distanceFromCenter = ($(this).data('originalPositionTop') + ($(this).height() / 2)) - (innerScroll + ($(window).height() / 2)); // Distance from the center of the component to the center of the viewport
                var newPosition = ((-1) * distanceFromCenter * (1 - $(this).data('speed'))) + $(this).data('originalPositionTop');
                $(this).css({'top': newPosition + 'px'});
            }
        });
    },
    background_update: function() {
    	// Update document background position
    	var newOffset = -0.05 * this.scrollTop;  
        $('body').css({'background-position': '0 ' + newOffset + 'px'});
    }
}

var floatmenu = {
	basic_mode: false,
	init: function() {
		var this_class = this;
		// Count the number of menu elements
		var count = $('#navbar_float li').length;
		var menu_percent_total = 0;
		
		this.count_topics = $('#navbar_float > ul > li').length;
		
		// Assign a percentage to each topic in the menu
		$('#navbar_float > ul > li').each(function() {
			var menu_percent = ($(this).find('li').length + 1) / count;
			$(this).data('menu_percent', menu_percent);
			
			$(this).data('menu_percent_total', menu_percent_total);
			menu_percent_total = menu_percent_total + menu_percent;
		});
		
		// Set mouseover events
		$('#navbar_float').data('isMouseOver', 'false');
		$('#column_left').mouseenter(function() {
			$('#navbar_float').data('isMouseOver', 'true');
			this_class.update();
		});
		$('#column_left').mouseleave(function() {
			$('#navbar_float').data('isMouseOver', 'false');
			this_class.update();
		});
		$('#column_left').mousemove(function(e) {
			this_class.mouseY = e.pageY - ($(window).scrollTop() + 50);
			this_class.update();
		});
		
		// Register event handlers
        /*$(window).scroll(function() {
            this_class.update();
        });
        $(window).resize(function() {
            this_class.update();
        });*/
        scroll_delegator.register(function() {
        	this_class.update();
        });
       
        
        // Run update function once to start
        this_class.update();
	},
	init_basic: function() {
		this.basic_mode = true;
		this.init();
	},
	update: function() {
		var this_class = this;
		if ($('#navbar_float').data('isMouseOver') == "true") {
			this.center = this_class.mouseY / (window.innerHeight - 50);
		} else {
			var documentHeight = document.documentElement.offsetHeight;
			if (documentHeight == window.innerHeight) {
				documentHeight = document.body.offsetHeight;
			}
			this.center = ($(window).scrollTop() + (window.innerHeight / 2)) / documentHeight;
		}
		this.min = this.logistic(0);
		this.max = this.logistic(1);
		$('#navbar_float > ul > li').each(function() {
			var menu_percent_total = $(this).data('menu_percent_total');
			var offset = this_class.set_position(this_class.find_position(menu_percent_total), this);
			
			this_class.update_topic(this, offset);
		});
	},
	update_topic: function(topic, offset) {
		var this_class = this;
		var menu_percent = $(topic).data('menu_percent');
		var menu_percent_total = $(topic).data('menu_percent_total');
		var count = $(topic).find('li').length + 1;
		var i = 1;
		$(topic).find('li').each(function() {
			var position = ((i / count) * menu_percent) + menu_percent_total;
			this_class.set_position_section(this_class.find_position(position), this, offset);
			i++;
		});
	},
	logistic: function(x) {
		if (this.basic_mode == false) {
			return 1 / (1 + Math.pow(2, (-1) * ((x*10) - (this.center*10))));
		} else {
			return x;
		}
	},
	find_position: function(x) {
		return (this.logistic(x, this.center) - this.min) / (this.max - this.min);
	},
	set_position: function(position, element) {
		var offset = ((window.innerHeight - 80) * position);
		
		/*
		if (offset >= ((window.innerHeight-50) - ((this.count_topics - $(element).index()) * 30))) {
		    offset = ((window.innerHeight-50) - ((this.count_topics - $(element).index()) * 30))
		}
        if (offset <= ($(element).index() * 30)) {
		    offset = ($(element).index * 30);
		}*/
		
		$(element).css({'top': offset + 'px'});
		return offset;
	},
	set_position_section: function(position, element, offset) {
	    var offset = ((window.innerHeight - 80) * position) - offset - 30;
        $(element).css({'top': offset + 'px'});
	}
}

var scroll_delegator = {
	last_run_time: 0,
	step: 50,
	functions: Array(),
	register: function(callback) {
		this.functions.push(callback);
	},
	update: function() {
		if (this.last_run_time + this.step < +new Date) {
			this.last_run_time = +new Date;
			for (i=0; i<this.functions.length; i++) {
				this.functions[i].call();
			}
		}
	},
	init: function() {
		var this_class = this;
		$(window).scroll(function() {
            this_class.update();
        });
        $(window).resize(function() {
            this_class.update();
        });
	}
}

var ios_scroll = {
	step: 100,
	is_scrolling: false,
	event: true,
	init: function() {
		var this_class = this;
		document.addEventListener('touchmove', function() {
			window.clearTimeout(this_class.event);
			this_class.is_scrolling = true;
			this_class.update();
			this_class.event = window.setTimeout(function() {
				this_class.is_scrolling = false;
			}, 1000);
		});
	},
	update: function() {
		var this_class = this;
		if (this_class.is_scrolling) {
			$(window).trigger('scroll');
			window.setTimeout(function() {
				this_class.update();
			}, this_class.step);
		}
	}
}

var smooth_scroll = {
	init: function() {
		var settings = {offset: {top: -50}, lazy: true, duration: 250, onAfter: function() {
			$('body').trigger('scroll');
		}};
		$.localScroll.hash(settings);
		$('#navbar_fixed a').localScroll(settings);
	}
}

var navbar_fixed = {
    init: function() {
        var this_class = this;
        
        scroll_delegator.register(function() {
            this_class.update();
        });
        
        // Run update function once to start
        this.update();
    },
    update: function() {
        // Offset from top of page
        var top = $(window).scrollTop() + 50;
        $($('.section').get().reverse()).each(function () {
            // If this is the current topic
            if ($(this).offset().top <= top) {
                // Highlight the topic in the menu
                var href = "#" + $(this).attr('id');
                
                $('#navbar_fixed a[href!="' + href + '"]').removeClass('active');
                $('#navbar_fixed a[href="' + href + '"]').addClass('active');
                
                return false;
            }
        });
    }
}

$(function() {
    topicheader.init();
    imagepop.init();
    csshelper.init();
    //parallax.background_only = true;
	if (navigator.platform.indexOf("iPad") == -1) {
		parallax.init();
		//floatmenu.init();
	} else {
		ios_scroll.init();
		//floatmenu.init_basic();
	}
    scroll_delegator.init();
    
    $('.panorama span div.panorama_inner').dragscrollable({dragSelector: 'img:first', acceptPropagatedEvent: false});
    
    smooth_scroll.init();
    navbar_fixed.init();
    
    $('body').trigger('scroll');
});

