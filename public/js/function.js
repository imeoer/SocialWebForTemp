$(document).ready(function(){

	// login
	$('#register').on('click', function() {

		$.post('register', {
			user_name: 'test',
			pass_word: 'test'
		}, function(res) {
			console.log(res);
		});

	});
});