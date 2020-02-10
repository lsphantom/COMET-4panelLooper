// CROSSPANEL Looper
(function($) {

  $.fn.crosslooper = function(options) {
    var defaults = {
      speed				:	100, // transition between slides, in milliseconds
      pause				:	1000, // length of time to remain on each slide, in milliseconds
      transition		:	'crossfade', // crossfade is the only option right now
      navigation		:	true, // set to false to turn off the navigation
      slide_reset		:	true,
      slide_captions	:	false,
      slide_counter		:	false,
      speed_controls	:	false,
      forward_backward	:	true,
      autoplay			:	true
    },
    
    options = $.extend(defaults, options);
    
    if (options.pause <= options.speed) options.pause = options.speed + 100;
	  
	  
	
	  
	
	
	// CREATE A DATA LOOPER FOR EACH DIV.looper
    return this.each(function() {
	  //THIS .CROSSLOOPER
      var $this = $(this);
		
      
      var $interval = ''; // variable used in the setInterval method
      var $curr_pause = options.pause; // take the start value from defaults. this is used for the speed controls
	  var $active_frame = 0; //$this.data('active-frame');
		
	  var $nav = $('#cl-navigation');
	        
      //$this.wrap('<div class="looper-wrap" />');
		
	  //SET ACTIVE FRAME
	  $this.attr('data-active-frame', $active_frame);
		
	  
	  // GRAB THE FIRST IMAGE DIMENSIONS
	  var $image_width = $this.children('img:first').width()+'px';
	  var $image_height = $this.children('img:first').height()+'px';
	  $this.children('.dv-panel').css({
		'position'	:	'relative',
		'width'		:	'650px',
		'height'	:	'403px'
	  });
		
		

      var $paused = '';
      if (options.autoplay === true) {
        $paused = false;
      } else {
        $paused = true;
      }
		
	
	  //Access through click stop looping
	  $('.panel-selector').on('click', function(){
		stopIt();
	  });
		
		
	  //Access through selection
	  $('.panel-selector').on('change', function(){
		 showActiveFrame(); 
	  });
		
		
	  $this.children().each(function(){		  
		  // THE DEFAULT CROSSFADE EFFECT
		  if (options.transition === 'crossfade') {

			var $images = $(this).children('img');

			for (var i = 0; i<$images.length; i++){
			  //$images[i].setAttribute('id', i+1);
			}

			$(this).children('img').css({
			  'position'	:	'absolute'
			  //'left'		:	0
			});

			$(this).children(':first').appendTo($(this)).show();  //Offsetting onload frame set			

		  // CHECK AUTOPLAY
		  if (options.autoplay === false) {
			  stopIt();
			} else {
			  $interval = setInterval(function() {
				forward();
			  }, options.pause);
			}
		  }		
	  });
		
		
	  //Ready up each loop
	  function showActiveFrame() {
		  $('.crosslooper').children().each(function(){
			 $(this).children(':first').appendTo($(this)).show();  //Offsetting onload frame set 
		  });
		  console.log('showactiveframe fx');
	  }
		
		
	  //READ MASTERFRAME ONLOAD
	  var masterFrame = $this.children().first().children(':last').attr('data-frame');
	  
		
	  
	  
	  // PLAY PAUSE BUTTON
	  $nav.children('.pauseplay').click(function() {
		if ($paused === false) {
		  stopIt();  
		} else {
		  moveIt();
		}
	  });
	  // NEXT BUTTON
	  $nav.children('.next').click(function() {
		stopIt();
		forward();
	  });
      // PREVIOUS BUTTON
	  $nav.children('.prev').click(function() {
		stopIt();
		backward();
	  });
	  // RESET BUTTON
	  $nav.children('.reset').click(function() {
		stopIt();
		resetSlides();
	  });
		
		
		/*  if (options.navigation === true) {
          createNavigation();      
                   
          /// SPEED CONTROLS
          var $slower = $nav.children('.speed').children('.slower');
          var $faster = $nav.children('.speed').children('.faster');
          $slower.click(function() {
            if ($curr_pause < 2000) {
              clearInterval($interval);
              $curr_pause = $curr_pause * 1.5;
              moveIt();
            }
          });
          $faster.click(function() {
            if ($curr_pause > 100) {
              clearInterval($interval);
              $curr_pause = $curr_pause / 1.5;
              moveIt();
            }
          });
        } */
		
	 
      
      // PAUSE THE CYCLING
      function stopIt() {
        $('.button-wrap')
          .children('.pauseplay')
          .removeClass('pause')
		  .removeClass('glyphicon-pause');
        $('.button-wrap')
          .children('.pauseplay')
          .addClass('play')
		  .addClass('glyphicon-play');
        clearInterval($interval);
        $paused = true;
      }
      
      
      // START THE CYCLING	
      function moveIt() {
        $('.button-wrap')
          .children('.pauseplay')
          .removeClass('play')
		  .removeClass('glyphicon-play');
        $('.button-wrap')
          .children('.pauseplay')
          .addClass('pause')
		  .addClass('glyphicon-pause');
        $interval = setInterval(function() {
          forward();
        }, $curr_pause);
        $paused = false;
      }
      
      
      // STEP FORWARD
      function forward() {
		//Read/Write MASTERFRAME
		masterFrame = $this.children().first().children(':first').attr('data-frame');
		  masterFrame = parseInt(masterFrame) + 1;
		$this.attr('data-active-frame', masterFrame);
		
		
		$this.children().each(function(){
			var $curr_first = $(this).children(':first');
        	$curr_first.hide().appendTo($(this)).fadeIn(options.speed);
		});
      }

      // STEP BACKWARD
      function backward() {
		//Read/Write MASTERFRAME
		masterFrame = $this.children().first().children(':first').attr('data-frame');
		  masterFrame = parseInt(masterFrame) + 1;
		$this.attr('data-active-frame', masterFrame);
		  
		$this.children().each(function(){
			var $curr_last = $(this).children(':last');
			$curr_last.show().prependTo($(this));
        });
      }
		
	  // RESET SLIDES
	  function resetSlides() {
		// set active frame to 0
		$('.crosslooper').attr('data-active-frame', 0);		

		// take the first slide OF EACH DV-PANEL and move it to the end
		$this.children().each(function(){
			//$(this).children(':first').appendTo($(this)).show();
			
			// gather all the slides and stuff them into an array
			var $collectedSlides = new Array();
			var $slidesToCollect = $(this).children('img');
			for (var i = 0; i < $slidesToCollect.length; i++) {
			  var $curr_slide = $slidesToCollect[i].getAttribute('data-frame', i);
			  $collectedSlides[i] = $(this).children('img[data-frame="'+ i +'"]');
			}
			

			// sort the array numerically and ascending
			//this next line broke the reset button in FF 6-10-13, removing it seemed to solve the issue
			//$collectedSlides.sort(function(a,b){return a-b});

			// loop through the array and append them in order
			for (var x in $collectedSlides) {
			  $(this).append($collectedSlides[x]);
			}
			
			//Offset and display frame 0
			$(this).children(':first').appendTo($(this)).show();
			
		});
		

		/*if (options.navigation === true) {
		  if (options.slide_counter === true) {
			fetchSlideNumber();
		  }
		  if (options.slide_captions === true) {
			updateCaption();
		  }
		}*/
	  }
      

	
	
	}); 
    
   
  }
})(jQuery);