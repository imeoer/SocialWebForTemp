$(document).ready(function(){


	var loginroll = $('.login_cont ul');
	$('.handover').click(function(){
		loginroll.animate({marginLeft:'-=935px'},800,function(){
			loginroll.find('li').eq(0).appendTo(loginroll);
			loginroll.attr('style','margin-left:0px;');
		});
	});

	$('.nav ul li').click(function(){
		$(this).parent().find('a').attr('class',' ');
		$(this).find('a').attr('class','active');
	});

	$('.nav .ico_article,.nav .ico_article,.nav .ico_image,.nav .ico_audio,.nav .ico_video,.nav .ico_link').click(function(){
		if(($('.nav').css("left").substring(1,2)*1) == 5){
			$('.nav').animate({left:(window.innerWidth-255) + 'px'},500);
			$('.index_cont').animate({left:window.innerWidth + 'px'},500);
			$('.article').animate({left:(window.innerWidth-940) + 'px'},500);
		}else{
			$('.article').animate({left:'-155px'},500);
			$('.publish').delay(500).animate({width:'580px'},500);
			$('.publish ul').animate({height:'0px'},250);
			$('.publish ul').animate({height:'280px'},250);
			$('.publish ul li').find('form').fadeOut(250);
			$('.publish ul li').eq(($('.nav ul li').index($(this))*1-1)).find('form').delay(500).fadeIn(250);
		}

	});


	$('.nav ul li.ico_home').click(function(){
		$('.publish').animate({width:'0px'},500);
		$('.nav').animate({left:(0-5) + 'px'},500);
		$('.index_cont').animate({left:(255) + 'px'},500);
		$('.article').animate({left:(0-685) + 'px'},500);
	});

	$('.publish .cancel').click(function(){
		$('.publish').animate({width:'0px'},500);
		$('.article').delay(500).animate({left:(window.innerWidth-940) + 'px'},500);
	});
});