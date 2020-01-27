// ********************************************************************* //
// * LATEST CORE 2 - Default Functions
// * (Do NOT alter this document! - Override defaults by placing them in the document <head>)
// ********************************************************************* //

// ===============================
// MODULE PRINT VIEW CONTROL
// ===============================
$(document).ready (function (){	
	
	// Auto controls hiding of elements in Print View or Module View.
	if (printVersion) {
		$(document.body).addClass('prt');
		}
	else {
		$(document.body).addClass('dyn');
		};
});

// ===============================
// JQUERY UI COMPONENTS
// ===============================

// Sortable List Items (jQuery UI)
$(function() {
	$( '.sortable' ).sortable({placeholder: 'ui-state-highlight'});
	$( '.sortable' ).disableSelection();
});
	
// Back-to-Top Button
$(function(){
	// hide .back-top first
	$('.back-top').hide();
		// fade in .back-top
		$(function () {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 100) {
					$('.back-top').fadeIn();
				} else {
					$('.back-top').fadeOut();
				}
		});
		// scroll body to 0px on click
		$('.back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
			});
		});
});

// ===============================
// BOOTSTRAP COMPONENTS
// ===============================

// Tooltips and Popovers
$(function() {
   $('[data-toggle="tooltip"]').tooltip();
   $('.lc-tip, .lc-tip-top').tooltip({ placement : 'top' });
   $('.lc-tip-right').tooltip({ placement : 'right' });
   $('.lc-tip-bottom').tooltip({ placement : 'bottom' });
   $('.lc-tip-left').tooltip({ placement : 'left' });
   
   $('[data-toggle="popover"]').popover();
   $('.lc-pop, .lc-pop-top').popover({ placement : 'top' });
   $('.lc-pop-right').popover({ placement : 'right' });
   $('.lc-pop-bottom').popover({ placement : 'bottom' });
   $('.lc-pop-left').popover({ placement : 'left' });
});

// SIDEBAR - Stick to Top
$(function(){
	$('#toc-panel').affix({
      offset: {
      	top: 150, // This must be the same size as the Module Top-Banner height in pixels
	  	bottom: function () {
        return (this.bottom = $('#module-footer').outerHeight(true))
      	}
      }
  	})
});
// SIDEBAR - Collapse for Smaller Devices
$(window).resize (function() {
  if ($(window).width() <= 992) {  
    $('#collapse-toc').removeClass('in');
  }
  if ($(window).width() >= 992) {  
    $('#collapse-toc').addClass('in');
  }
});
//SIDEBAR - Collapse on Window Resize
$(function(){
  if ($(window).width() <= 992) {  
    $('#collapse-toc').removeClass('in');
  }
});
// SIDEBAR - Size fix at smaller size
$(function(){
	if ($('#toc-panel').hasClass('affix-top')) {
  		$('#toc-panel').removeClass('col-xs-12')
	}
	else if ($('#toc-panel').hasClass('affix')) {
  		$('#toc-panel').addClass('col-xs-12')
	};
});
$(window).scroll(function(){
	if ($('#toc-panel').hasClass('affix-top')) {
  		$('#toc-panel').removeClass('col-xs-12')
	}
	else if ($('#toc-panel').hasClass('affix')) {
  		$('#toc-panel').addClass('col-xs-12')
	};
});

// TABLE OF CONTENTS - Scroll Spy
$(function(){
	$('body').scrollspy({ target: '.sidebar-toc' });
});


// ===============================
// LEARNING INTERACTIONS
// ===============================

$(function(){
  
  // MULTIPLE CHOICE QUESTION - RADIO BUTTONS
  $('.radio .submit-button').click(function(){
	var my_boolean=false;
	for (i=1; i< this.form.length-1; i++){
		if (this.form[i].checked==true){
			my_boolean = true;
		}
	}//end for loop

	if (my_boolean){
		//alert(i);
	  $(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
	  $(this).parent().parent().parent().children('.answer')
	  .css('display', 'block');
	  $(this).parent().parent().parent().children('.message')
	  .css('display', 'none');
	  $(this).siblings('.correct')
	  .addClass('correct-answer');
	  
	  $(this).closest('.question-wrap').next('.show-after').show();
	  $(this).closest('.interaction-question').next('.show-after').show();
	  $(this).closest('.show-after').next('.show-after').show();
	}else{
		$(this).parent().parent().parent().children('.answer')
	  .css('display', 'none');
		$(this).parent().parent().parent().children('.message')
	  .css('display', 'block');
	   $(this).siblings('.correct')
	  .removeClass('correct-answer');
	}//end if else
  });
  
  // MULTIPLE SELECT QUESTIONS - CHECKBOXES
  $('.checkboxes .submit-button').click(function(){
	var my_boolean=false;
	for (i=1; i< this.form.length-1; i++){
		if (this.form[i].checked==true){
			my_boolean = true;
		}
	}//end for loop

		if (my_boolean){
		  //alert(i);
	      $(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
		  $(this).parent().parent().parent().children('.answer')
		  .css('display', 'block');
		  $(this).parent().parent().parent().children('.message')
		  .css('display', 'none');
		  $(this).siblings('.correct')
		  .addClass('correct-answer');
		  
		  $(this).closest('.question-wrap').next('.show-after').show();
	  	  $(this).closest('.interaction-question').next('.show-after').show();
	      $(this).closest('.show-after').next('.show-after').show();
		}else{
			$(this).parent().parent().parent().children('.answer')
		  .css('display', 'none');
			$(this).parent().parent().parent().children('.message')
		  .css('display', 'block');
		   $(this).siblings('.correct')
		  .removeClass('correct-answer');
		}//end if else
  });
  
  // SHORT/LONG ANSWER QUESTION - TEXT ENTRY 
  $('.textentry .submit-button').click(function(){
	$(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
    $(this).closest('.question-wrap').find('.answer').show();
    $(this).closest('.question-wrap').find('.correct').addClass('correct-answer');
    $(this).closest('.question-wrap').next('.show-after').show();
	
  	$(this).closest('.interaction-question').next('.show-after').show();
  	$(this).closest('.show-after').next('.show-after').show();
  });
   
  // SHORT/LONG ANSWER QUESTION (MINIMUM CHARACTER REQUIREMENT) - TEXT ENTRY
  $('.req-text').each(function(){
	  $('.submit-button').click(function(){
		var inputText = $(this).parent().find('.text-response').val();
		var characterMin = $(this).parent().find('.text-response').attr('data-text-min');
		
		if ( inputText.length > characterMin ){
			$(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
			$(this).closest('.question-wrap').find('.answer').show();
			$(this).closest('.question-wrap').find('.correct').addClass('correct-answer');
			$(this).closest('.question-wrap').next('.show-after').show();
			$(this).parent().parent().siblings('.message').css('display', 'none');
			
  			$(this).closest('.interaction-question').next('.show-after').show();
  			$(this).closest('.show-after').next('.show-after').show();
		}
		else {
			$(this).parent().parent().siblings('.message').css('display', 'block');
		}
	  });
  });
  
  // COMPLETE THE STATEMENT - INLINE DROPDOWNS
  $('.inlinedropdowns .submit-button').click(function(){
	$(this).attr('disabled','disabled')
		.addClass('btn-default').removeClass('btn-primary');
	$(this).parent().children('.dropdown_correct')
		.css('display','block');
	$(this).parent().parent().parent().children('.answer')
		.css('display','block');
	  $(this).siblings('.correct').addClass('correct-answer');
	  
	  $(this).closest('.question-wrap').next('.show-after').show();
	  $(this).closest('.interaction-question').next('.show-after').show();
	  $(this).closest('.show-after').next('.show-after').show();
  });

  // REORDERING QUESTIONS - SORTABLE LIST
  $('.reordering .submit-button').click(function(){
  $(this).attr('disabled','disabled').addClass('btn-default').removeClass('btn-primary');
  $(this).parent().children('.dropdown-correct')
	.css('display','block');
  $(this).parent().parent().parent().children('.answer')
	.css('display','block');
  $(this).siblings('.correct')
	.addClass('correct-answer');
  
  $(this).closest('.question-wrap').next('.show-after').show();
  $(this).closest('.interaction-question').next('.show-after').show();
  $(this).closest('.show-after').next('.show-after').show();
  });
  
  // NESTED QUESTION - Reset
  $('.show-after').hide();
  
  // DRAG AND DROP QUESTION - Done
  $('.question-wrap-drag .done_drag').click(function(){
    $(this).closest('.question-wrap-drag').find('.answer').show();
    $(this).closest('.question-wrap-drag').find('.correct').addClass('correct-answer');
    $(this).closest('.question-wrap-drag').next('.show-after').show();
  });
  // DRAG AND DROP QUESTION - Reset
  $('.question-wrap-drag .reset_drag').click(function(){
    $(this).closest('.question-wrap-drag').find('.answer').hide();
    $(this).closest('.question-wrap-drag').find('.correct').removeClass('correct-answer');
    $(this).closest('.question-wrap-drag').next('.show-after').hide();
  });
  
  // DRAWING QUESTION - Done
  $('.question-wrap-draw .done').click(function(){
    $(this).closest('.question-wrap-draw').find('.answer').show();
    $(this).closest('.question-wrap-draw').find('.correct').addClass('correct-answer');
	$(this).closest('.question-wrap').find('.answer').show();
    $(this).closest('.question-wrap-draw').next('.show-after').show();
  });
  // DRAWING QUESTION - Reset
  $('.question-wrap-draw .reset').click(function(){
    $(this).closest('.question-wrap-draw').find('.answer').hide();
    $(this).closest('.question-wrap-draw').find('.correct').removeClass('correct-answer');
	$(this).closest('.question-wrap').find('.answer').show();
    $(this).closest('.question-wrap-draw').next('.show-after').hide();
  });
  
});


// ===============================
// MODULE TITLE
// ===============================
$(document).ready(function() {
	var moduleTitle = $('title').text();
	$('.module-title-text').html( moduleTitle );
});


// ===============================
// MODULE QUIZ AND SURVEY PROMPTS
// ===============================

// Set the Quiz and Survey ID
var moduleQuiz = 000;

// Module Preassessment, Quiz, and Survey Modal Prompts
$(document).ready(function() {
	// Preassessment Text
	$('#preassessment-message').prepend('<div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="preassessment-label">Preevaluaci&oacute;n</h4></div><div class="modal-body" id="module-preassessment-modal"><p>Antes de comenzar, haga clic en el bot&oacute;n que aparece a continuaci&oacute;n y complete esta breve preevaluaci&oacute;n.<br><br>La preevaluaci&oacute;n, que cubre el material que se presenta en la lecci&oacute;n que est&aacute; a punto de estudiar, le ayudar&aacute; a evaluar su nivel de comprensi&oacute;n actual del tema. Una vez que termine la lecci&oacute;n podr&aacute; tomar una prueba con preguntas muy parecidas. La comparaci&oacute;n de los dos resultados le permitir&aacute; ver cu&aacute;nto aprendi&oacute;; asimismo, nos permitir&aacute; saber en qu&eacute; medida la lecci&oacute;n logra sus objetivos.</p></div>');
	
	// Quiz Prompt
	//var moduleQuiz = $('#quiz-prompt').attr('data-item-id');
	$('#quiz-prompt').append('<div id="userQuiz" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="userquiz-label" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="userquiz-label">Prueba</h4></div><div class="modal-body" id="module-userquiz-modal"><p>Si est&aacute; viendo esta p&aacute;gina desde una versi&oacute;n descargada de la lecci&oacute;n, deber&aacute; conectarse a internet para tomar la prueba. Si no tiene una sesi&oacute;n abierta en MetEd o necesita crear una cuenta de MetEd, recibir&aacute; un mensaje al respecto. Cada vez que haga clic en <i>Pregunta siguiente</i>, el sistema guardar&aacute; sus respuestas, incluso si cierra el navegador y contin&uacute;a en alg&uacute;n otro momento. Puede saltar preguntas y volver a ellas en cualquier momento. Una vez que haya guardado una respuesta para todas las preguntas, el sistema calcular&aacute; y le presentar&aacute; el resultado de la prueba.</p></div><div class="modal-footer"> <a class="btn btn-default" href="http://meted.ucar.edu/loginForm_es.php?urlPath=logonOption_es.php&quizID='+moduleQuiz+'&fromModule=true" target="_blank">Comenzar la prueba &raquo;</a> </div></div></div></div>');
	
	// Survey Prompt
	$('#quiz-prompt').append('<div id="userSurvey" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="usersurvey-label" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="usersurvey-label">Encuesta al usuario</h4></div><div class="modal-body" id="module-usersurvey-modal"><p>No podemos mejorar sin su ayuda. T&oacute;mese el tiempo de enviarnos su opini&oacute;n sobre esta lecci&oacute;n. Sus respuestas nos ayudar&aacute;n a crear materiales de instrucci&oacute;n m&aacute;s eficaces en el futuro.<br><br>Haga clic en el enlace siguiente para abrir la breve encuesta de satisfacci&oacute;n. Si est&aacute; viendo esta p&aacute;gina desde una versi&oacute;n descargada de la lecci&oacute;n, deber&aacute; conectarse a internet para participar en la encuesta. Si no tiene una sesi&oacute;n abierta en MetEd o necesita crear una cuenta en MetEd, recibir&aacute; un mensaje al respecto.</p></div><div class="modal-footer"> <a class="btn btn-default" href="http://meted.ucar.edu/registration/surveys/logonOption_es.php?quizID='+moduleQuiz+'" target="_blank">Comenzar la encuesta &raquo;</a> </div></div></div></div>');
});
