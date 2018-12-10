function renderReviews(type, id, divID) {
	var div = $('#' + divID);

	$.ajax({
		url: siteURL + '/api/review-get-reviews.php',
		type: 'GET',
		data: {
			id: id,
			type: type
		},
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (review) {
			if (review.success) {
				var ratingDiv = $('#' + divID);
				ratingDiv.html(
	'<div class="rating-info">' +
		'<div class="rating-info-top">' +
		'</div>' +
		'<div class="rating-info-bars">' +
			'<div class="rating-info-bar-row row" id="rating-bar-5">' +
				'<div class="col-4">' + string('review_bar_very_good') + '</div>' +
				'<div class="col-7"><div class="rating-info-bar"><div class="rating-info-bar-inner" style="width: ' + review.percentage[5] + '%"></div></div></div>' +
				'<div class="col-1">(' + review.stars[5] + ')</div>' +
			'</div>' +
			'<div class="rating-info-bar-row row" id="rating-bar-4">' +
				'<div class="col-4">' + string('review_bar_good') + '</div>' +
				'<div class="col-7"><div class="rating-info-bar"><div class="rating-info-bar-inner" style="width: ' + review.percentage[4] + '%"></div></div></div>' +
				'<div class="col-1">(' + review.stars[4] + ')</div>' +
			'</div>' +
			'<div class="rating-info-bar-row row" id="rating-bar-3">' +
				'<div class="col-4">' + string('review_bar_average') + '</div>' +
				'<div class="col-7"><div class="rating-info-bar"><div class="rating-info-bar-inner" style="width: ' + review.percentage[3] + '%"></div></div></div>' +
				'<div class="col-1">(' + review.stars[3] + ')</div>' +
			'</div>' +
			'<div class="rating-info-bar-row row" id="rating-bar-2">' +
				'<div class="col-4">' + string('review_bar_bad') + '</div>' +
				'<div class="col-7"><div class="rating-info-bar"><div class="rating-info-bar-inner" style="width: ' + review.percentage[2] + '%"></div></div></div>' +
				'<div class="col-1">(' + review.stars[2] + ')</div>' +
			'</div>' +
			'<div class="rating-info-bar-row row" id="rating-bar-1">' +
				'<div class="col-4">' + string('review_bar_very_bad') + '</div>' +
				'<div class="col-7"><div class="rating-info-bar"><div class="rating-info-bar-inner" style="width: ' + review.percentage[1] + '%"></div></div></div>' +
				'<div class="col-1">(' + review.stars[1] + ')</div>' +
			'</div>' +
		'</div>' +
		'<div class="rating-info-comments"></div>' +
		'</div>');
			}
			// console.log('sigrdzeeeeeeeeeeeeee' + review.reviews_user.length);
			if (review.reviews_user) {
				for (var i = 0; i < review.reviews_user.length; i++) {
					console.log('review');
					$('.rating-info-comments').append('' +
				'<div class="rating-info-comment row">' +
					'<div class="rating-info-comment-user col-3">' +
						'<div class="rating-info-comment-user-avatar"></div>' +
						'<div class="rating-info-comment-user-name">' + review.reviews_user[i] + '</div>' +
					'</div>' +
					'<div class="rating-info-comment-content col-9">' +
						'<div class="rating-info-comment-content-top">' + renderStars(review.reviews_rating[i], false, 0.8, true) + '<span class="rating-info-comment-content-date">' + review.reviews_date[i] + '</span> </div>' +
						'<div class="rating-info-comment-content-comment">' + review.reviews_content[i] + '</div> ' +
					'</div> ' +
				'</div>' +
			'</div>');
				}
			}

		},
		error: function () {
			showAjaxError()
		}
	});

}

function retrieveReviews(type, id) {

}

function openReviewPopup(type, id) {
	if (!isLogged()) showToast( string('review_need_authorization'), 'long');
	else {
		if ($('#review-popup').length == 0) {

			$.ajax({
				url: siteURL + '/api/review-check.php',
				type: 'POST',
				data: {
					'token': getUser().token,
					'last': getUser().last,
					'type': type,
					'id': id
				},
				dataType: 'json',
				success: function (review) {
					console.log(review.content);
					$(contentDiv).append('' +
						'<form class="review-popup" id="review-popup">' +
							'<div class="inner-padding">' +
								'<div class="review-popup-title">' + string('review_popup_title') + '</div><div class="review-popup-close"><i class="icon icon-cancel-circle" onClick="closeReviewPopup()"></i> </div>' +
								'<div class="rating-stars" id="rating-stars" data-stars="' + review.rating + '">' +
									'<div class="rating-star my-icon icon-1-5x my-icon-star-full"></div><div class="rating-star my-icon icon-1-5x my-icon-star-full"></div><div class="rating-star my-icon icon-1-5x my-icon-star-full"></div><div class="rating-star my-icon icon-1-5x my-icon-star-full"></div><div class="rating-star my-icon icon-1-5x my-icon-star-full"></div><div class="rating-star my-icon icon-1-5x my-icon-star-empty"></div><div class="rating-star my-icon icon-1-5x my-icon-star-empty"></div><div class="rating-star my-icon icon-1-5x my-icon-star-empty"></div><div class="rating-star my-icon icon-1-5x my-icon-star-empty"></div><div class="rating-star my-icon icon-1-5x my-icon-star-empty"></div>' +
								'</div>' +
								'<textarea class="review-popup-textarea" id="review-popup-textarea" name="review-comment" placeholder="' + string('review_popup_textarea_placeholder') + '">' + (review.content ? review.content : '') + '</textarea>' +
								'<input type="submit" class="button-primary float-right" value="' + string('review_popup_submit_button') + '"/>' +
							'</div>' +
						'</form>');

					$(".rating-star").click(function() {
						console.log('rating click');
						var index = $(".rating-star").index(this);
						console.log(index);
						$(this).parent().attr("data-stars", index + 1);
						// $('#productRating').val(index + 1);
						renderRatingStars(index);
					});
					renderRatingStars(review.rating - 1);

					var popup = $('#review-popup');
					popup.fadeIn("normal");
					popup.submit(function (event) {
						submitReview(type, id);
						event.preventDefault();
					});
				},
				error: function () {
					showAjaxError();
				}
			});
		}
	}
}

function closeReviewPopup() {
	$('#review-popup').fadeOut("normal", function() {
		$(this).remove();
	})
}

function submitReview(type, id) {
	var url = siteURL + '/api/review-write.php';

	$.ajax({
		url: url,
		type: 'POST',
		data: {
			'token': getUser().token,
			'last': getUser().last,
			'type': type,
			'id': id,
			'content': $('#review-popup-textarea').val(),
			'stars': $('#rating-stars').attr("data-stars")
		},
		dataType: 'json',
		// contentType: "application/json; charset=utf-8",
		success: function (response) {
			if (response.success) {
				showToast( string('review_successful'), 'long');
				renderReviews(type, id, 'rating-div');
			}
			else {
				showToast( string('review_error'), 'long');
			}
			closeReviewPopup();
		},
		error: function () {
			showAjaxError();
		}
	});
}


function renderStars(rating, quantity, size, inline) {
	var ratingFloor = Math.floor(rating);
	var decimal = rating - ratingFloor;
	var starX;

	switch (size) {
		case 1: starX = ''; break;
		case 2: starX = ' icon-2x'; break;
		case 1.5: starX = ' icon-1-5x'; break;
		case 0.8: starX = ' icon-0-8x'; break;
		defualt: starX = '';
	}

	var divText = '<div class="star-rating' + (inline ? ' star-rating-inline' : '' ) + '">';

	for (var i = 1; i < 11; i++) {
		if (i <= ratingFloor)
			divText += '<i class="my-icon my-icon-star-full' + starX + '"></i>';
		else if ( (decimal >= 0.25 && decimal <= 0.75) && i == ratingFloor + 1)
			divText += '<i class="my-icon my-icon-star-half' + starX + '"></i>';
		else if ( decimal > 0.75 && i == ratingFloor + 1)
			divText += '<i class="my-icon my-icon-star-full' + starX + '"></i>';
		else
			divText += '<i class="my-icon my-icon-star-empty' + starX + '"></i>';
	}
	if (quantity !== false) divText += ' (' + quantity + ')';
	divText += '</div>';
	return divText;
}

function renderRatingStars(index) {
	console.log(index);
	var indexint = Math.floor(index);
	console.log(index + " " + indexint);
	var i = 0;
	var stars = document.getElementsByClassName('rating-star');
	var length = stars.length;
	for (i = 0; i <= length; i++) {
		if (i <= indexint) {
			$(stars[i]).removeClass("my-icon-star-empty my-icon-star-half").addClass("my-icon-star-full");
		}
		else {
			console.log(index + " " + indexint);
			if ((index - indexint >= 0.25 && index - indexint <= 0.75) && i == indexint + 1)
				$(stars[i]).removeClass("my-icon-star-full my-icon-star-empty").addClass("my-icon-star-half");
			else if ( (index - indexint > 0.75) && i == indexint + 1)
				$(stars[i]).removeClass("my-icon-star-full my-icon-star-empty").addClass("my-icon-star-half");
			else
				$(stars[i]).removeClass("my-icon-star-full my-icon-star-half").addClass("my-icon-star-empty");
		}
	}
}