function renderLogin() {
	logOperation('login');
	clearContent();
	setTitle( string('login_title') );


	// if (navigator.connection.type === Connection.NONE) {
	if (false) {
		contentDiv.innerHTML = '<div class="registration-form">' + string('registration_internet_error') + '</div>';
	}
	else {

		contentDiv.innerHTML =
			'<div class="registration-form">' +
				'<form method="post" action="' + siteURL + '/api/login.php" id="login-form"> ' +
					'<input type="text" class="input-primary width-100 mb-1" name="l_m" placeholder="' + string('registration_form_name') + ' "/>' +
					'<input type="password" class="input-primary width-100 mb-3" name="l_p" placeholder="' + string('registration_form_password') + ' "/>' +
					'<div id="login-error" class="form-error"></div>' +
					'<input type="submit" class="button-primary" value="' + string('login_form_button_registration') + '"/>' +
				'</form>' +
				'<p class="text-light">' + string('login_form_login_social') + '</p>' +
			'</div>';

		$("#login-form").submit(function (e) {

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
						logIn(data);
					}
					else {
						console.log('ვერშევედიი');
						$('#login-error').html(data.html);
					}
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
}
