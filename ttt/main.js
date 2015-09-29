$(document).ready(function() {
	var count = 0;

	$('td').one('click', function user_move(e){

		if (!$(this).hasClass('selected-x') && !$(this).hasClass('selected-o')) {
			var self = $(this)
			self.addClass("selected-x").append( "<p>x</p>" );
			addX();

			$("td").off("click");
			comp_move_delay = Math.floor(Math.random() * (2000 - 1000)) + 1000;
			setTimeout(function() { computer_move(); }, comp_move_delay);
			checkBoard();
		};

		function computer_move(){
			if (($('.selected-x').length + $('.selected-o').length) < 9){
				do {
					var comp_select = Math.floor(Math.random() * (10 - 1)) + 1;
				} while ($('#' + comp_select).hasClass("selected-o") || $('#' + comp_select).hasClass("selected-x"));
				$('#' + comp_select).addClass("selected-o").append( "<p>o</p>"  );
				addO();
			};
			$('td').on('click', user_move);
		};

		function checkBoard(){
				var	selectedSquares = $('.selected-x').length + $('.selected-o').length
				if ($('td').length === selectedSquares){
					$('td').css({"backgroundColor": "rgba(255,255,255,0.50)"});
					setTimeout(function() { reloadPage(); }, 750);
				};
		};

		function addO() {
			var idArrayO = [];

			$('.selected-o').each(function() {
				idArrayO.push(this.id);
			});
			var ps_array = powerset(idArrayO);

			for (var i = 0; i < ps_array.length; i++){
				var subset = ps_array[i];
				var total = 0;

				if (subset.length === 3){
					for ( var j = 0; j < subset.length; j++ ){
		  			total += parseInt(subset[j]);
		  			};
	  			if (total === 15 ){
	  			 	for ( var k = 0; k < subset.length; k++ ){
	  			 		$('#' + subset[k]).css({"backgroundColor": "rgba(255,255,255,0.50)"});
				 	};

        	$("td").off("click");
				 	setTimeout(function() { reloadPage(); }, 750);
				};
			};
		};
	};

		function addX() {
			var idArrayX = [];

			$('.selected-x').each(function() {
				idArrayX.push(this.id);
			});

			var ps_array = powerset(idArrayX);

			for (var i = 0; i < ps_array.length; i++){
				var subset = ps_array[i];
				var total = 0;
				if (subset.length === 3){
					for ( var j = 0; j < subset.length; j++ ){
		  			total += parseInt(subset[j]);
		  			};
	  			if (total === 15 ){
	  			 	for ( var k = 0; k < subset.length; k++ ){
	  			 		$('#' + subset[k]).css({"backgroundColor": "rgba(255,255,255,0.50)"});
				 	};
				 	$("td").off("click");
				 	setTimeout(function() { reloadPage(); }, 750);
				};
			};
		};
	};

		function powerset(ary) {
	    var ps = [[]];
	    for (var i=0; i < ary.length; i++) {
	        for (var j = 0, len = ps.length; j < len; j++) {
	            ps.push(ps[j].concat(ary[i]));
	        };
	    };
	    return ps;
		};

		function reloadPage() {
			location.reload();
		};
	});
});