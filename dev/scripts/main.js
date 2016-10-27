var selectedProducts = [];
var userPriceMin;
var userPriceMax;
var makeupApp = {};
var productLimit = 3;

makeupApp.getMakeup = function() {
	for (var i = 0; i < selectedProducts.length; i++) {
		$.ajax({
			url: 'http://makeup-api.herokuapp.com/api/v1/products.json',
			method: 'GET',
			dataType: 'json',
			data: {
				price_greater_than: userPriceMin,
				price_less_than: userPriceMax,
				product_type: selectedProducts[i]
			}
		}).then(function(results){
			makeupApp.filterProduct(results);
		});
	}
};

makeupApp.selectProducts = function() {
    $('input[name=product-type]:checked').each(function() {
      selectedProducts.push($(this).val());
    });
    console.log(selectedProducts);
 }

makeupApp.selectedPrice = function() {
	var userSelectedPrice = $('input[name=makeup-price]:checked').val();
	console.log(userSelectedPrice);
	var newPrice = userSelectedPrice.split(',');
	userPriceMin = newPrice[0];
	userPriceMax = newPrice[1];
	console.log(userPriceMin);
	console.log(userPriceMax);
	makeupApp.getMakeup();

}

makeupApp.filterProduct = function(results) {
	var firstResults = results
	firstResults.forEach(function(item){
		var $resultsContainer = $('<div>');
		var $productName = $('<p>').text(item.name);
		var $productPrice = $('<p>').text(item.price);
		var $productImage = $('<img>').attr({
			src: item.image_link,
			alt: item.name,
			title: item.name
		});
		var $productlink = $('<a>').attr({
			href: item.product_link,
			target: '_blank'
		});
		$productlink.append('Details');
		$resultsContainer.append($productImage, $productName, $productPrice, $productlink);
		var $labelContainer = $('<div>').attr({
			class: 'productItem'
		});
		var $label = $('<label>').attr({
			for: item.id
		});
		var $input = $('<input>').attr({
			type: 'checkbox',
			id: item.id,
			name: 'selected-makeup',
			value: item.id
		});
		$label.append($resultsContainer);
		$labelContainer.append($label, $input);
		$('.last-results').append($labelContainer);
		makeupApp.selectFinals();
	});

}


//user needs to select up to 3 choices
//user cannot select more than 3 choices
$('input[name=product-type]').on('change', function(){
	if ($('input[name=product-type]:checked').length > productLimit) {
		this.checked = false;
	}
});

makeupApp.selectFinals = function() {
	$('input[name=selected-makeup]').on('change', function(){
		if ($('input[name=selected-makeup]:checked').length > productLimit) {
			this.checked = false;
		}
	});
}

// $('input[name=selected-makeup]').on('change', function(){
// 	console.log("Works");
// 	// if ($('input[name=selected-makeup]:checked').length >= productLimit) {
// 	// 	this.checked = false;
// 	// }
// });

$('#start').on('click', function(e){
	e.preventDefault();
	$('#section1').fadeOut();
	$('#section2').delay(500).fadeIn();
})

$('#next1').on('click', function(e){
	e.preventDefault();
	$('#section2').fadeOut();
	$('#section3').delay(500).fadeIn();
	makeupApp.selectProducts();
})

$('#next2').on('click', function(e){
	e.preventDefault();
	$('#section3').fadeOut();
	$('#section4').delay(500).fadeIn();
	makeupApp.selectedPrice();
})

$('#next3').on('click', function(e){
	e.preventDefault();
	$('#section4').fadeOut();
	$('#section5').delay(500).fadeIn();
})

$(function(){
});


