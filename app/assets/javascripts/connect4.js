$(function(){
	// Default primary player
	var currentDiscColor = 'red_disc';
	$('#p span').attr('class', currentDiscColor);

	// Temporary
	$('td').each(function(index, element) {
		$(element).text($(element).attr('data-id'));
	});

	// Board click event
	$('table#board').on('click', 'td',function() {
		var selected_col = $(this).attr('data-col');

		// Traverse entire column
		$('td[data-col=' + selected_col + ']').each(function(index, element) {
			var curr_data_id = $(element).attr('data-id');
			var curr_data_obj = $('td[data-id=' + curr_data_id + ']');

			// Exit loop if current cell has class declared
			if(typeof curr_data_obj.attr('class') != 'undefined') return false;

			// If below cell has class declared set current class value
			if(index < 5) {
				var next_data_id = parseInt(curr_data_id) + 1;
				var next_data_obj = $('td[data-id=' + next_data_id + ']');
				if(typeof next_data_obj.attr('class') != 'undefined') {
					curr_data_obj.attr('class', currentDiscColor);
					return false;
				}
			} else {
				curr_data_obj.attr('class', currentDiscColor);
				return false;
			}
		});

		// Get current disc id
		var current_disc_id = parseInt($('td[data-col=' + selected_col + '].' + currentDiscColor + ':first').attr('data-id'));

		// Check if current player won
		if(checkHorizontalMatch(current_disc_id) || checkVerticalMatch(current_disc_id, parseInt(selected_col)) || checkDiagonalRtlMatch(current_disc_id) || checkDiagonalLtrMatch(current_disc_id)) {
			alert((currentDiscColor == 'red_disc' ? 'Red Player' : 'Yellow Player') + ' wins!');
			$('td').removeAttr('class');
			currentDiscColor = 'red_disc';
			$('#p span').attr('class', currentDiscColor);
		} else {
			if($('td[class]').size() >= 42) {
				alert('No winner! Please try again!');
				$('td').removeAttr('class');
				currentDiscColor = 'red_disc';
				$('#p span').attr('class', currentDiscColor);
			} else if($('td[data-col=' + selected_col + '][class]').size() >= 6) {
				// do nothing, don't add disc to column
			} else {
				// Switch Player
				currentDiscColor = currentDiscColor == 'red_disc' ? 'yellow_disc' : 'red_disc';
				$('#p span').attr('class', currentDiscColor);
			}
		}
	});

   // Check if current and next disc have the same color
	var checkIfSameColor = function(current_disc, next_disc) {
		var current_disc_color = $('td[data-id=' + current_disc + ']').attr('class');
		var next_disc_color = $('td[data-id=' + next_disc + ']').attr('class');
		if(typeof current_disc_color != 'undefined' && typeof next_disc_color != 'undefined') {
			return current_disc_color == next_disc_color;
		} else {
			return false;
		}
	}

	// Check horizontal match
	var checkHorizontalMatch = function(current_disc) {
		var matching_pieces_rtl = 0;
		for(var next_disc = current_disc - 6; next_disc > 0; next_disc -= 6) {
			if(!checkIfSameColor(current_disc, next_disc)) break;
			matching_pieces_rtl++;
		}
		var matching_pieces_ltr = 0;
		for(var next_disc = current_disc + 6; next_disc < (current_disc + 19); next_disc += 6) {
			if(!checkIfSameColor(current_disc, next_disc)) break;
			matching_pieces_ltr++;
		}
		return (matching_pieces_rtl >= 3 || matching_pieces_ltr >= 3);
	}

	// Check vertical match
	var checkVerticalMatch = function(current_disc, current_col) {
		var matching_pieces_ttb = 0;
		for(var next_disc = current_disc + 1; next_disc < (current_col * 6) + 1; next_disc++) {
			if(!checkIfSameColor(current_disc, next_disc)) break;
			matching_pieces_ttb++;
		}
		return matching_pieces_ttb >= 3;
	}

	// Check diagonal right to left match
	var checkDiagonalRtlMatch = function(current_disc) {
		var matching_pieces_rtl = 0;
		for(var next_disc = current_disc - 7; next_disc > 0; next_disc -= 7) {
			if(!checkIfSameColor(current_disc, next_disc)) break;
			matching_pieces_rtl++;
		}
		var matching_pieces_ltr = 0;
		for(var next_disc = current_disc + 7; next_disc < (current_disc + 22) && next_disc < 43; next_disc += 7) {
			if(!checkIfSameColor(current_disc, next_disc)) break;
			matching_pieces_ltr++;
		}
		return (matching_pieces_rtl >= 3 || matching_pieces_ltr >= 3);
	}

	// Check diagonal left to right match
	var checkDiagonalLtrMatch = function(current_disc) {
		var matching_pieces_rtl = 0;
		var curr_row_id = parseInt($('td[data-id=' + current_disc + ']').parent('tr').attr('data-row'));
		for(var next_disc = current_disc - 5, ctr = 1; ctr < (curr_row_id + 1); next_disc -= 5, ctr++) {
			if(!checkIfSameColor(current_disc, next_disc)) break;
			matching_pieces_rtl++;
		}
		var matching_pieces_ltr = 0;
		for(var next_disc = current_disc + 5, ctr = 1; ctr < curr_row_id; next_disc += 5, ctr++) {
			if(!checkIfSameColor(current_disc, next_disc)) break;
			matching_pieces_ltr++;
		}
		return (matching_pieces_rtl >= 3 || matching_pieces_ltr >= 3);
	}
});