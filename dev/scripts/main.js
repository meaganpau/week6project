var userPrice = '20';
var userProduct = 'bronzer';

var makeupApp = {};
makeupApp.getMakeup = function() {
	$.ajax({
		url: 'http://makeup-api.herokuapp.com/api/v1/products.json',
		method: 'GET',
		dataType: 'json',
		data: {
			price_less_than: userPrice,
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


$(function(){
	console.log('hey hey');
	makeupApp.init();
});