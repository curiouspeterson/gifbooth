$(document).ready(function() {
	
	var initialLoad = true;
	var gifOffset = 0; 
	var gifOffsetString = '&offset='+gifOffset+'';

	jsoncallback = function(data) {
		gifCount = data.pagination.count;
		gifOffset = gifOffset + data.pagination.count;
		gifOffsetString = '&offset='+gifOffset+'';
		console.log('success callback '+gifOffset+'');
		var totalCount = data.pagination.total_count;
		var numNew = 0;

		var gifResults = data.pagination.count;
		
		
		if (gifOffset < totalCount) {
			
			for (i = 0; i < gifResults; i++) {
			
					$currentGif = data.data[i];
					$originalImg = $currentGif.images.original;
				
					$shareLinks = '<a class="facebook-share" href="http://www.facebook.com/sharer.php?u=' + $currentGif.bitly_gif_url +'" title="Comedy Hack Day Gif Booth" target="_blank">share on facebook</a> <a class="twitter-share" href="http://twitter.com/share?url=' + $currentGif.bitly_gif_url +'?tc=1&amp;via=Comedy+Hack+Day" title="Comedy Hack Day Gif Booth" target="_blank">Share on twitter</a>';
				
				
				
					$newString = '<div id="' + $currentGif.id +'-container" class="image-container"><div class="share-hover">'+ $shareLinks +'</div><img data-original-width="' + $originalImg.width +'" data-original-height="' + $originalImg.height +'" data-padding-top="0" data-id="' + $currentGif.id +'" data-image_url="' + $originalImg.url +'" data-bitly_gif_url="' + $currentGif.bitly_gif_url +'" data-tumblr_share_url="' + $originalImg.url +'" data-gif_id="' + $currentGif.id +'" item_prop="content_url" id="gif" class="a-gif" src="' + $originalImg.url +'" alt="Animation Domination High-Def animated GIF" style="width: 400px; height: 400px" width="400" height="400"></div>';

	        $('#results').prepend($newString);
					initialLoad = false;

			}
			
			
		}

		while (numNew > 0) {
			var newPost = numNew - 1;
			var newID = '#' + data.response.posts[newPost].id + '';
			//var postString = 'http://gifboothtesting.tumblr.com ' + newID + '';
			//console.log(postString);
			//$('#posts').load(postString);


			$.post("http://gifboothtesting.tumblr.com", function(data) {
				var newContent = $(data).find(newID);
				$('#posts').prepend(newContent);
			});
			console.log(i);
			numNew--;
		}
	};

	function apiCall() {
		console.log('api call '+gifOffset+'');
		
		var apiURL = 'http://api.giphy.com/v1/gifs/search?q=foxadhd&api_key=dc6zaTOxFJmzC'+gifOffsetString+'';
		console.log(apiURL);
		$.ajax({
			method: "GET",
			url: apiURL,
			datatype: 'json',
			success: function(data) {
				
				jsoncallback(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('error');
			}
		});
	}
	
	$('#pagination-trigger').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
	  if (isInView) {
			console.log('in view');
			if (initialLoad !== true) {
				apiCall();
			} 
			
	  } else {
			console.log('not in view');
	  }
	});

	apiCall();
	
});
