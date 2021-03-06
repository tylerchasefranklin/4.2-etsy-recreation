var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=spiderman&includes=Images,Shop";
var products;

function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

function logData(data) {
  products = data.results;
  console.log(products);
  displayProducts(products);
}

fetchJSONP(url, logData);


function displayProducts(productList){

  var source = $('#product-template').html();
  var productTemplate = Handlebars.compile(source);

  _.each(productList, function(product){
    var $productHtml = $(productTemplate(product));

    $('.products').append($productHtml);
  });
}
