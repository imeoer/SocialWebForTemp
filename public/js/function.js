$(document).ready(function(){

	// login


	$('#register').on('click', function() {

		$.post('register', {
			user_name: $('#register_email').val(),
			pass_word: $('#register_password').val()
		}, function(res) {
			console.log(res);
			
		});

	});
});