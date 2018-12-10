// function createTourListLayout() {
// 	var div = document.createElement("div");
// 	div.className = "tour-list active";
// 	div.id = "tour-popular";
// 	contentDiv.appendChild(div)
//
// 	var div = document.createElement("div");
// 	div.className = "tour-list";
// 	div.id = "tour-new";
// 	contentDiv.appendChild(div)
//
// 	var div = document.createElement("div");
// 	div.className = "tour-list";
// 	div.id = "tour-recommended";
// 	contentDiv.appendChild(div)
// }
//
// function createTourListDiv(text, image, id) {
// 	var div = document.createElement("div");
// 	div.className = "tour-list-item";
// 	div.setAttribute('data-id', id);
//
// 	var detailDiv = document.createElement("div");
// 	detailDiv.className = "tour-list-item-photo";
// 	detailDiv.style.backgroundImage = 'url(\'' + image + '\')';
//
// 	var textDiv = document.createElement("div");
// 	textDiv.className = "tour-list-item-text";
// 	textDiv.innerHTML = text;
//
// 	div.appendChild(detailDiv);
// 	div.appendChild(textDiv);
// 	document.getElementById('tour-popular').appendChild(div);
//
// 	return div;
// }
// function handleTours(data){
// 	console.log(data);
// 	for (i = 0; i < data.length; i++) {
// 		createTourListDiv(data[i]['name' + lang], data[i].image, data[i].id);
// 	}
// 	$('.region').on('click', function() {
// 		alert($(this).attr('data-id'));
// 	})
// }

function renderRegistration() {
	logOperation('registration');
	clearContent();
	setTitle( string('registration_title') );


	// if (navigator.connection.type === Connection.NONE) {
	if (false) {
		contentDiv.innerHTML = '<div class="registration-form">' + string('registration_internet_error') + '</div>';
	}
	else {

		contentDiv.innerHTML =
			'<div class="registration-form">' +
				'<form method="post" action="' + siteURL + '/api/registration.php' + '" id="registration-form"> ' +
					'<input type="text" class="input-primary width-100 mb-1" name="r_n" placeholder="' + string('registration_form_name') + ' "/>' +
					'<input type="text" class="input-primary width-100 mb-1" name="r_m" id="registration_email" placeholder="' + string('registration_form_email') + '"/>' +
					'<input type="password" class="input-primary width-100 mb-1" name="r_p" id="registration_password" placeholder="' + string('registration_form_password') + ' "/>' +
					'<input type="password" class="input-primary width-100 mb-3" name="r_pr" placeholder="' + string('registration_form_password_repeat') + ' "/>' +
					'<div id="registration-error" class="form-error"></div>' +
					'<input type="submit" class="button-primary" value="' + string('registration_form_button_registration') + '"/>' +
				'</form>' +
				'<p class="text-light">' + string('registration_form_login_social') + '</p>' +
			'</div>';

		$("#registration-form").submit(function (e) {


			var form = $(this);
			var url = form.attr('action');
			console.log(url);
			console.log(form.serialize());
			$.ajax({
				type: "POST",
				url: url,
				dataType: 'json',
				data: form.serialize(), // serializes the form's elements.
				success: function (data) {
					if (data.success) {
						$.ajax({
							type: "POST",
							url: siteURL + '/api/login.php',
							dataType: 'json',
							data: 'l_m=' + encodeURIComponent($('#registration_email').val()) + '&l_p='+ encodeURIComponent($('#registration_password').val()), // serializes the form's elements.
							success: function (data) {
								if (data.success) {
									logIn(data);
								}
								//	alert(data); // show response from the php script.
							},
							error: function () {
								alert('oe')
							}
						});
					}
					else console.log('ვერვქენი');
					$('#registration-error').html(data.html);
					//	alert(data); // show response from the php script.
				},
				error: function () {
					alert('oe')
				}
			});

			e.preventDefault(); // avoid to execute the actual submit of the form.
		});
	}

	menuCloseClick('right');
	// var url = '';
	// if (id) url = siteURL + '/api/tours.php?region=' + id;
	// else url = siteURL + '/api/tours.php';
	//
	// $.ajax({
	// 	url: url,
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	contentType: "application/json; charset=utf-8",
	// 	success: function (arr) {
	// 		handleTours(arr);
	// 	},
	// 	error: function () {
	// 		alert('2');
	// 	}
	// });
}

function submitRegistration() {
	url = siteURL + '/api/register.php';

	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (arr) {
			handleTours(arr);
		},
		error: function () {
			alert('2');
		}
	});
}