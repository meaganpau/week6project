// var userPriceMin = array[0];
// var userPriceMax = array[1];
// var userProduct = product.val();
// var array = val.split(',');


var makeupApp = {};
makeupApp.getMakeup = function() {
	$.ajax({
		url: 'http://makeup-api.herokuapp.com/api/v1/products.json',
		method: 'GET',
		dataType: 'json',
		data: {
			price_greater_than: userPriceMin,
			price_less_than: userPriceMax,
			product_type: userProduct
		}
	}).then(function(results){
		makeupApp.filterProduct(results);

	});
};

makeupApp.filterProduct = function(results) {
	var firstResults = results
	console.log(results);
	firstResults.forEach(function(item){
		var $resultsContainer = $('<div>');
		var $productName = $('<p>').text(item.name);
		var $productPrice = $('<p>').text(item.price);
		var $productImage = $('<img>').attr({
			src: item.image_link,
			alt: item.name,
			title: item.name
		});
		var $productURL = $('<p>').text(item.product_link);
		$resultsContainer.append($productName, $productPrice, $productImage);
		$('body').append($resultsContainer);
	});
}


makeupApp.init = function() {
	console.log('hey');
	makeupApp.getMakeup();
}

$('#start').on('click', function(e){
	e.preventDefault();
	$('#section1').fadeOut();
	$('#section2').delay(500).fadeIn();
})

$('#next1').on('click', function(e){
	e.preventDefault();
	$('#section2').fadeOut();
	$('#section3').delay(500).fadeIn();
})

$('#next2').on('click', function(e){
	e.preventDefault();
	$('#section3').fadeOut();
	$('#section4').delay(500).fadeIn();
})

$('#next3').on('click', function(e){
	e.preventDefault();
	$('#section4').fadeOut();
	$('#section5').delay(500).fadeIn();
})

$(function(){
	console.log('hey hey');
	makeupApp.init();
});


