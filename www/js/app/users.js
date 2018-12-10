var logged = true;

function isLogged() {
	return localStorage.getItem('login');
}
function getUser() {
	return JSON.parse(localStorage.getItem('login'));
}

// function logIn(token, username, email) {
//
// }
function logIn(data) {
	logged = true;
	localStorage.setItem('login', JSON.stringify(data));
	showHome();
	renderRightMenuList();
}
function logOut() {
	logged = false;
	localStorage.removeItem('login');
	menuCloseClick('right');
	setTimeout(function() {renderRightMenuList()}, 1000);
}