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
	$('#preassessment-message').prepend('<div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">MetEd et le programme COMET® font partie de <a href="http://www.ucp.ucar.edu/">UCP</a> [University Corporation for Atmospheric Research (UCAR) Community Programs], un groupe interne de UCAR, et sont sponsorisés par le <a href="http://www.weather.gov/abou</button><h4 class="modal-title" id="preassessment-label">Pré-évaluation</h4></div><div class="modal-body" id="module-preassessment-modal"><p>Avant de commencer cette leçon, veuillez compléter une rapide pré-évaluation en cliquant sur le bouton ci-dessous.</p><p>Cette pré-évaluation couvre le matériel de la leçon que vous êtes sur le point de suivre. Elle vous aidera à évaluer votre niveau actuel de connaissances sur ce sujet. Vous aurez aussi l’occasion de compléter un quiz avec des questions très similaires à la fin de la leçon. En comparant les deux, cela vous fera réaliser ce que vous avez pu apprendre et améliorer et nous renseignera sur l’atteinte des objectifs de cette leçon.</p></div>');
	
	// Quiz Prompt
	//var moduleQuiz = $('#quiz-prompt').attr('data-item-id');
	$('#quiz-prompt').append('<div id="userQuiz" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="userquiz-label" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">MetEd et le programme COMET® font partie de <a href="http://www.ucp.ucar.edu/">UCP</a> [University Corporation for Atmospheric Research (UCAR) Community Programs], un groupe interne de UCAR, et sont sponsorisés par le <a href="http://www.weather.gov/abou</button><h4 class="modal-title" id="userquiz-label">Questionnaire</h4></div><div class="modal-body" id="module-userquiz-modal"><p>Pour utiliser les liens de cette page, vous devez être connecté. Si vous n’avez ouvert pas de session MetEd ou si vous devez créer votre compte MetEd, des messages vous indiqueront la marche à suivre. Votre réponse à une question est sauvegardée chaque fois que choisissez «&nbsp;Question suivante&nbsp;», même si vous fermez votre navigateur et continuez plus tard. Vous pouvez sauter une question et y revenir n’importe quand. Quand vous avez sauvegardé vos réponses à toutes les questions, votre note est calculée et signalée.</p><a href="http://www.meted.ucar.edu/about_external_lms.htm" target="_blank">Important note for NOAA, Air Force, and Navy LMS users!</a> </div><div class="modal-footer"> <a class="btn btn-default" href="http://www.meted.ucar.edu/loginForm.php?urlPath=logonOption.php&quizID='+moduleQuiz+'&fromModule=true" target="_blank">Cliquez pour répondre au questionnaire &raquo;</a> </div></div></div></div>');
	
	// Survey Prompt
	$('#quiz-prompt').append('<div id="userSurvey" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="usersurvey-label" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">MetEd et le programme COMET® font partie de <a href="http://www.ucp.ucar.edu/">UCP</a> [University Corporation for Atmospheric Research (UCAR) Community Programs], un groupe interne de UCAR, et sont sponsorisés par le <a href="http://www.weather.gov/abou</button><h4 class="modal-title" id="usersurvey-label">Sondage auprès des utilisateurs</h4></div><div class="modal-body" id="module-usersurvey-modal"><p>Votre aide nous est indispensable pour améliorer nos prestations. Nous vous remercions de bien vouloir nous aider, en nous faisant savoir ce que vous pensez de ce module. Vos réponses nous aideront à réaliser des enseignements plus efficaces à l’avenir. </p><p>En cliquant sur le lien ci-après, vous accéderez à une brève enquête de satisfaction. Pour cela, vous devrez avoir ouvert une session, utilisant votre compte d’utilisateur de MetEd. Si vous n’avez ouvert pas de session MetEd ou si vous devez créer votre compte MetEd, des messages vous indiqueront la marche à suivre.</p></div><div class="modal-footer"> <a class="btn btn-default" href="http://www.meted.ucar.edu/registration/surveys/logonOption.php?quizID='+moduleQuiz+'" target="_blank">Évaluation du cours &raquo;</a> </div></div></div></div>');
});
