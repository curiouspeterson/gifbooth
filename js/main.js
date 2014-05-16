$(document).ready(function() {

	jsoncallback = function(data) {
		var numNew = 0;
		console.log(data);
		var gifResults = data.pagination.count;

		for (i = 0; i < gifResults; i++) {
			
				$currentGif = data.data[i];
				$originalImg = $currentGif.images.original;
				$newString = '<div id="' + $currentGif.id +'-container" class="image-container"><div class="share-hover"></div><img data-original-width="' + $originalImg.width +'" data-original-height="' + $originalImg.height +'" data-padding-top="0" data-id="' + $currentGif.id +'" data-image_url="' + $originalImg.url +'" data-bitly_gif_url="' + $currentGif.bitly_gif_url +'" data-tumblr_share_url="' + $originalImg.url +'" data-gif_id="' + $currentGif.id +'" item_prop="content_url" id="gif" class="a-gif" src="' + $originalImg.url +'" alt="Animation Domination High-Def animated GIF" style="width: 400px; height: 400px" width="400" height="400"></div>';

        $('#results').prepend($newString);

		}

		while (numNew > 0) {
			var newPost = numNew - 1;
			var newID = '#' + data.response.posts[newPost].id + '';
			//var postString = 'http://gifboothtesting.tumblr.com ' + newID + '';
			//console.log(postString);
			//$('#posts').load(postString);
			console.log(newID);

			$.post("http://gifboothtesting.tumblr.com", function(data) {
				var newContent = $(data).find(newID);
				$('#posts').prepend(newContent);
			});
			console.log(i);
			numNew--;
		}
	};

	function apiCall() {
		$.ajax({
			method: "GET",
			url: 'http://api.giphy.com/v1/gifs/search?q=foxadhd&api_key=dc6zaTOxFJmzC',
			datatype: 'json',
			success: function(data) {
				jsoncallback(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('error');
			}
		});
	}

	apiCall();
	
});
