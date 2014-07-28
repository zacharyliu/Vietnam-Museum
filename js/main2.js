$(function() {
    $('#topnav_container').affix({
        offset: {top: $("#header").outerHeight()}
    });
    
    /*$('.tile p').each(function() {
        $(this).html(stringGen());
    });*/
    
    var $isotope = $('#main');
    
    $isotope.isotope({
        itemSelector: '.tile',
        animationOptions: {
            duration: 200,
            queue: false
        }
    });
    
    $isotope.imagesLoaded(function() {
        $isotope.isotope('reLayout');
    });
    
    $(window).smartresize(function() {
        $isotope.isotope('reLayout');
    });
    
    /*$('.tile').click(function() {
        var i = $(this).index();
        reader.show(i);
    });*/
    
    $('#modal_bg').click(function(e) {
        $target = $(e.target);
        if ($target.hasClass('closable')) {
            reader.hide();
        }
    });
    
    reader.init();
    
    // Set up history plugin
    $('#main a.tile_inner').history(function(e, hash) {
        if (!ignoreHash) {
            if (hash != '') {
                var index = $(e.target).parent().parent().index();
                reader.show(index);
            } else {
                reader.hide();
            }
        }
    });
    $('#main .tile').each(function() {
        $(this).attr('id', ''); // Clear id attribute to prevent page jumping
    });
    
    // Flat layout switcher button
    $("#layout").click(function() {
        $('link[title="flat"]').each(function(){
            if (this.disabled == true) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        });
        $isotope.isotope('reLayout')
        return false;
    });
    $('link[title="flat"]').each(function(){
        this.disabled = true;
    });
});

function stringGen() {
    return (new Array(Math.floor(Math.random()*100)+1)).join(Math.floor(Math.random()*1000) + " ");
}

var carousel;
var ignoreHash = false;

var reader = {
    isShown: false,
    duration: 300,
    easing: 'easeOutQuad',
    sv_options: {
        loop: false,
        hastyPageFlip: true
    },
    init: function() {
        var this_class = this;
        
        // Count number of pages
        this.sv_options.numberOfPages = $('#main .tile').length;
        
        // Initialize SwipeView
        carousel = new SwipeView('#modal_inner', this.sv_options);
        carousel.onFlip(this.onFlip);
        
        // Remove mouse-related swipe gestures, so mouse text selection works
        document.getElementById('modal_inner').removeEventListener('mousedown', carousel);
        document.getElementById('modal_inner').removeEventListener('mousemove', carousel);
        document.getElementById('modal_inner').removeEventListener('mouseup', carousel);
        
        // Bind prev and next buttons
        $('#prev').click(function() {
            carousel.prev();
            return false;
        });
        $('#next').click(function() {
            carousel.next();
            return false;
        });
        
        // Bind keyboard shortcuts
        $('body').keyup(function(e) {
            switch(e.keyCode) {
                case 37: // left arrow = prev
                    reader.prev();
                    break;
                case 39: // right arrow = next
                    reader.next();
                    break;
                case 27: // esc = close
                    reader.hide();
                    break;
            }
        });
        
        // Load initial frames
        for (var i=0; i<3; i++) {
            var el = document.createElement('div');
            var eq = carousel.masterPages[i].dataset.pageIndex;
            $(el).html($('#main .tile_container').eq(eq).html()).addClass('tile_container');
            carousel.masterPages[i].appendChild(el);
        }
    },
    onFlip: function() {
        carousel.__resize(); // Bugfix for blank pages appearing
        for (var i=0; i<3; i++) { // for all three frames
            var upcoming = carousel.masterPages[i].dataset.upcomingPageIndex; // get the new page index for each frame
            console.log('i: ' + i + ', upcoming: ' + upcoming);
            if (upcoming != carousel.masterPages[i].dataset.pageIndex) { // if we need to load a new page
                carousel.masterPages[i].childNodes[0].innerHTML = $('#main .tile_container').eq(upcoming).html(); // copy tile_container into the frame
                carousel.masterPages[i].childNodes[0].scrollTop = 0; // Scroll to top
            }
        }
        
        // Set the correct hash
        ignoreHash = true;
        window.location.hash = $(carousel.masterPages[carousel.currentMasterPage]).find('a.tile_inner').attr('href');
        ignoreHash = false;
        
        // Initialize any new panoramas
        $('.panorama_inner').each(function() {
            if ($(this).data('panoramaLoaded') != true) {
                $(this).dragscrollable({dragSelector: 'img:first', acceptPropagatedEvent: false});
                $(this).data('panoramaLoaded', true);
            }
        });
        
        reader.updateButtons();
    },
    updateButtons: function() {
        // Hide the previous or next buttons if appropriate
        if (carousel.page == 0) {
            $('#prev_bg').fadeOut(this.duration);
        } else {
            $('#prev_bg').fadeIn(this.duration);
        }
        if (carousel.page == reader.sv_options.numberOfPages-1) {
            $('#next_bg').fadeOut(this.duration);
        } else {
            $('#next_bg').fadeIn(this.duration);
        }
    },
    show: function(i) {
        if (this.isShown) {
            // If the reader is already shown, jump to the specified page
            carousel.goToPage(i);
            return;
        }
        this.isShown = true;
        
        if (typeof i === 'undefined') {
            i = 0;
        }
        
        var this_class = this;
        
        $('body').addClass('scrolllock'); // Lock main page scrolling
        $("#modal_bg").addClass('active'); // Show blank modal
        
        $frame = $('#modal'); // For reference purposes
        $tile = $('#main .tile_container').eq(i); // Get referenced original tile for positioning
        
        $frame.offset($tile.offset()).width($tile.width()).height($tile.height()); // Set same offset and size as tile on page
        
        $("#modal_bg").addClass('visible', this.duration, this.easing); // Fade in the background
        
        $frame.addClass('visible', this.duration, this.easing, function() { // Expand the modal to full size
            $('#modal_inner').addClass('visible');
            this_class.updateButtons();
            carousel.goToPage(i); // Jump to specified tile
            carousel.refreshSize(); // Update for expanded size
            //$('#modal_inner').addClass('visible', this.duration, this.easing); // Fade in tile contents
        });
    },
    hide: function() {
        if (!this.isShown) { return; }
        this.isShown = false;
        
        $("#modal_bg").removeClass('active', this.duration, this.easing, function() {
            $('body').removeClass('scrolllock');
            $('#prev_bg, #next_bg').hide();
            $('#modal_bg, #modal, #modal_inner').removeClass('visible');
        });
        
        // Clear the hash
        ignoreHash = true;
        if (window.history && window.history.pushState) {
            window.history.pushState('', document.title, window.location.pathname);
        } else {
            window.location.hash = '';
        }
        ignoreHash = false;
    },
    prev: function() {
        if (this.isShown) {
            carousel.prev();
            return true;
        } else {
            return false;
        }
    },
    next: function() {
        if (this.isShown) {
            carousel.next();
            return true;
        } else {
            return false;
        }
    }
}