//4-Panel Looper Comparison - Dynamic build
$(document).ready(function(){

	var loopSize = 27;
	var p1p = $('#p1').val();
	var p2p = $('#p2').val();
	var p3p = $('#p3').val();
	var p4p = $('#p4').val();
	
	var activeFrame = $('.crosslooper').data('active-frame');
	
	
	//Dynamic Loop Setup
	function loopDynamicSetup (panel, product) {
		panel = panel.slice(-1);
		//Define panels
		var $panel = $('#panel-' + panel);
		var activeFrame = $('.crosslooper').attr('data-active-frame');
		
		//Empty Panel Content
		$panel.empty();
		
		
		//Revert to Panel number if no product selected
		if (product !== '--') {
			
			//Iterate and write loop images in order starting from activeFrame.
			//Filename index starts at 1, data-frame index starts at 0
			var i;
			for( i=0; i<loopSize; i++)
			{
				activeFrame = parseInt(activeFrame);
				var elementSum = activeFrame + i + 1;
				var elementSub = (i - loopSize) + activeFrame + 1;
				var frameNumberSum = parseInt(elementSum - 1);
				var frameNumberSub = parseInt(elementSub - 1);
				
				//Generate new product loop elements
				if (elementSum<=loopSize) {
					$panel.append('<img class="img-responsive" src="media/'+ product + elementSum +'.jpg" data-frame="'+ frameNumberSum +'">');
				}
				else {
					$panel.append('<img class="img-responsive" src="media/'+ product + elementSub +'.jpg" data-frame="'+ frameNumberSub +'">');
				}
				
			}
		} else {
			$panel.append('<p class="panel-identifier">'+ panel +'</p>')
		}
		
	}
	
	
	
	
	//PANEL LOOP SELECTOR onChange
	$('.panel-selector').on('change', function(){
		
		activeFrame = $('.crosslooper').data('active-frame');
		
		//Determine which panel and what product were selected
		switch ( $(this).attr('name') ) {
			case 'p1':
				p1p = $(this).val();
				loopDynamicSetup('p1', p1p);
				break;
				
			case 'p2':
				p2p = $(this).val();
				loopDynamicSetup('p2', p2p);
				break;
				
			case 'p3':
				p3p = $(this).val();
				loopDynamicSetup('p3', p3p);
				break;
				
			case 'p4':
				p4p = $(this).val();
				loopDynamicSetup('p4', p4p);
				break;
				
			default:
				break;
		}
	});
	
	
	//PANEL LOOP SELECTOR onLoad
	$('.panel-selector').each(function(){
		var panelComp = $(this).attr('name');
		var prod = $(this).val();
		
		loopDynamicSetup(panelComp, prod);
	});

});