//4-Panel Looper Comparison
$(document).ready(function(){
	// set doc vars
	var loopSize = 9;
	var p1p = '';
	var p2p = '';
	var p3p = '';
	var p4p = '';
	
	
	
	//Dynamic Loop Setup
	function loopDynamicSetup (panel, product) {
		panel = panel.slice(-1);
		//Define HTML element
		var $panel = $('#panel-' + panel);
		
		//Empty Panel Content
		$panel.empty();
		
		
		//Revert to Panel number if no product selected
		if (product !== '--') {
			//Generate new product loop elements
			var i;
			for( i=0; i<loopSize; i++)
			{
				$panel.append('<img class="img-responsive" src="media/loop-sample/'+ product +'_2013020312_000'+(i+1)+'.jpg" data-frame="'+ i +'">');
			}
		} else {
			$panel.append('<p class="panel-identifier">'+ panel +'</p>')
		}
		
		
		
		//console.log(panel, product);
		
		
		switch ( panel ) {
			case 'p1':
				
				break;
				
			case 'p2':
				
				break;
				
			case 'p3':
				
				break;
				
			case 'p4':
				
				break;
				
			default:
				break;	
		}
	}
	
	
	//PANEL LOOP SELECTOR
	$('.panel-selector').on('change', function(){
		//TODO: pause all loops and retrieve active frame
		
		
		
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
	
});