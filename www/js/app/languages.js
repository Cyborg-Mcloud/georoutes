var langStrings = {
	registration_title_ge: 'რეგისტრაცია',
	registration_title_en: 'Registration',
	registration_form_email_ge: 'ელ. ფოსტა',
	registration_form_email_en: 'E-mail',
	registration_form_password_ge: 'პაროლი',
	registration_form_password_en: 'Password',
	registration_form_password_repeat_ge: 'გაიმეორეთ პაროლი',
	registration_form_password_repeat_en: 'Repeat Password',
	registration_form_name_ge: 'სახელი',
	registration_form_name_en: 'Name',
	registration_form_button_registration_ge: 'რეგისტრაცია',
	registration_form_button_registration_en: 'Register',
	registration_internet_error_ge: 'რეგისტრაციისთვის აუცილებელია ინტერნეტთან წვდომა',
	registration_internet_error_en: 'Internet is required for registration',

	registration_form_login_social_ge: 'გაიარეთ ავტორიზაცია სოციალური ქსელით',
	registration_form_login_social_en: 'Login using social account',
	// registration_form_email_ge: 'Registration',


	//მარჯვენა მენიუს დასაწყისი
	menu_right_history_ge: 'ბოლოს ნანახი',
	menu_right_history_en: 'History',
	menu_right_favourites_ge: 'ფავორიტები',
	menu_right_favourites_en: 'Favourites',
	menu_right_tours_ge: 'ჩემი მარშრუტები',
	menu_right_tours_en: 'My tours',
	menu_right_rated_ge: 'ჩემი შეფასებული',
	menu_right_rated_en: 'My rated',
	menu_right_login_ge: 'შესვლა',
	menu_right_login_en: 'Login',
	menu_right_register_ge: 'რეგისტრაცია',
	menu_right_register_en: 'Register',
	menu_right_logout_ge: 'გამოსვლა',
	menu_right_logout_en: 'Logout',
	menu_right_change_region_ge: 'რეგიონის შეცვლა',
	menu_right_change_region_en: 'Change Region',
	menu_sync_ge: 'განახლება',
	menu_sync_en: 'Sync',
	//მარჯვენას მენიუს დასასრული
	//მარცხენა მენიუს დასაწყისი
	left_menu_categories_ge: 'კატეგორიები',
	left_menu_categories_en: 'Categories',
	left_menu_nearest_ge: 'უახლოესი',
	left_menu_nearest_en: 'Nearest',
	left_menu_search_placeholder_ge: 'ძებნა',
	left_menu_search_placeholder_en: 'Search',
	//მენიუს დასასრული

	regions_title_ge: 'რეგიონები',
	regions_title_en: 'Regions',



	login_title_ge: 'შესვლა',
	login_title_en: 'Login',
	login_internet_error_ge: 'ავტორიზაციისთვის აუცილებელია ინტერნეტთან წვდომა',
	login_internet_error_en: 'Internet is required for authorisation',
	login_form_login_social_ge: 'გაიარეთ ავტორიზაცია სოციალური ქსელით',
	login_form_login_social_en: 'Login using social account',
	login_form_button_registration_ge: 'შესვლა',
	login_form_button_registration_en: 'Login',


	tour_list_popular_ge: 'პოპულარული',
	tour_list_popular_en: 'Popular',
	tour_list_new_ge: 'ახალი',
	tour_list_new_en: 'New',
	tour_list_recommended_ge: 'რეკომენდებული',
	tour_list_recommended_en: 'Recommended',

	//ტურის და ობიექტის დეტალური გვერდი
	button_favourite_ge: 'ფავორიტი',
	button_favourite_en: 'Favourite',
	button_share_ge: 'გაზიარება',
	button_share_en: 'Share',


	search_title_ge: 'ძიება',
	search_title_en: 'Search',

	review_popup_title_ge: 'დაწერეთ კომენტარი',
	review_popup_title_en: 'Comment',
	review_popup_textarea_placeholder_ge: 'თქვენი კომენტარი...',
	review_popup_textarea_placeholder_en: 'Your comment...',
	review_popup_submit_button_ge: 'გაგზავნა',
	review_popup_submit_button_en: 'Send',
	review_need_authorization_ge: 'შეფასების დასაწერად აუცილებელია ავტორიზაცია',
	review_need_authorization_en: 'You must be logged in to write review',
	review_successful_ge: 'მადლობა შეფასებისთვის!',
	review_successful_en: 'Thanks for feedback!',
	review_error_ge: 'შეფასების დაწერა ვერ მოხერხდა, დაფიქსირდა შეცდომა',
	review_error_en: 'Error occurred in submitting reviewing',


	review_bar_review_ge: 'შეფასება',
	review_bar_review_en: 'Review',

	review_bar_very_good_ge: 'ძალიან კარგი',
	review_bar_very_good_en: 'Very Good',
	review_bar_good_ge: 'კარგი',
	review_bar_good_en: 'Good',
	review_bar_average_ge: 'საშუალო',
	review_bar_average_en: 'Average',
	review_bar_bad_ge: 'ცუდი',
	review_bar_bad_en: 'Bad',
	review_bar_very_bad_ge: 'ძალიან ცუდი',
	review_bar_very_bad_en: 'Very Bad',


	share_ge: 'გაზიარება',
	share_en: 'Share',

	ajax_error_ge: 'დაფიქსირდა შეცდომა',
	ajax_error_en: 'Error Occurred',


	map_title_ge: 'რუკა',
	map_title_en: 'Map',

	objects_title_ge: 'ობიექტები',
	objects_title_en: 'Objects',


	history_title_ge: 'ისტორია',
	history_title_en: 'History',

	favourites_title_ge: 'ფავორიტები',
	favourites_title_en: 'Favourites',
};

function string(name) {
	return langStrings[name + lang];
}

function setLanguage(language) {
	localStorage.setItem("language", '_' + language);
	lang = '_' + language;
	showHome();
	menuCloseClick('right');
	updateLeftMenuStrings();
	updateLeftCategories();
	updateNearest();
	setTimeout(function() {renderRightMenuList()}, 1000);
}

function getLanguage() {
	if (localStorage.getItem("language")) {
		return localStorage.getItem("language");
	}
	else return '_ge';
}