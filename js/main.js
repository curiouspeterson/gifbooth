$(document).ready(function() {
	var searchTerm = 'pizza';
	var initialLoad = true;
	var gifOffset = 0; 
	var gifOffsetString = '&offset='+gifOffset+'';
	var apiURL = 'http://api.giphy.com/v1/gifs/search?q='+searchTerm+'&api_key=dc6zaTOxFJmzC';

	jsoncallback = function(data) {
		gifCount = data.pagination.count;
		gifOffset = gifOffset + data.pagination.count;
		gifOffsetString = '&offset='+gifOffset+'';
		apiURL = 'http://api.giphy.com/v1/gifs/search?q='+searchTerm+'&api_key=dc6zaTOxFJmzC'+gifOffsetString+'';
		var totalCount = data.pagination.total_count;
		var numNew = 0;

		var gifResults = data.pagination.count;
		
		
		if (gifOffset < totalCount) {
			
			for (i = 0; i < gifResults; i++) {
			
					$currentGif = data.data[i];
					$originalImg = $currentGif.images.original;
				
					$shareLinks = '<a class="facebook-share" href="http://www.facebook.com/sharer.php?u=' + $currentGif.bitly_gif_url +'" title="Comedy Hack Day Gif Booth" target="_blank">share on facebook</a> <a class="twitter-share" href="http://twitter.com/share?url=' + $currentGif.bitly_gif_url +'?tc=1&amp;via=Comedy+Hack+Day" title="Comedy Hack Day Gif Booth" target="_blank">Share on twitter</a>';
				
					$newString = '<div id="' + $currentGif.id +'" class="image-container"><div class="share-hover">'+ $shareLinks +'</div><img data-original-width="' + $originalImg.width +'" data-original-height="' + $originalImg.height +'" data-padding-top="0" data-id="' + $currentGif.id +'" data-image_url="' + $originalImg.url +'" data-bitly_gif_url="' + $currentGif.bitly_gif_url +'" data-tumblr_share_url="' + $originalImg.url +'" data-gif_id="' + $currentGif.id +'" item_prop="content_url" id="gif" class="a-gif" src="' + $originalImg.url +'" alt="Animation Domination High-Def animated GIF" style="width: 400px; height: 400px" width="400" height="400"></div>';

	        $('#results').append($newString);
					initialLoad = false;
			}
		}
		
	};

	function apiCall() {
				
		

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

			if (initialLoad !== true) {
				apiCall();
			} 
			
	  } else {

	  }
	});
	
	function checkForNew(data) {
    var numNew = 0;
		
    var gifResults = data.pagination.count;

    var firstPost = $('.image-container').first().attr('id');
    

    for(i = 0; i < gifResults; i++){
      
        if (firstPost == data.data[i].id) {
           
            numNew = 0;
						console.log('break');
            break;
        }
        else {
					numNew = i;
        }
               
    }

    while (numNew > 0) {
        var newPost = numNew - 1;
        var newID = '#' + data.data[newPost].id + '';

				$currentGif = data.data[numNew];
				$originalImg = $currentGif.images.original;

				$newString = '<div id="' + $currentGif.id +'" class="image-container"><div class="share-hover">'+ $shareLinks +'</div><img data-original-width="' + $originalImg.width +'" data-original-height="' + $originalImg.height +'" data-padding-top="0" data-id="' + $currentGif.id +'" data-image_url="' + $originalImg.url +'" data-bitly_gif_url="' + $currentGif.bitly_gif_url +'" data-tumblr_share_url="' + $originalImg.url +'" data-gif_id="' + $currentGif.id +'" item_prop="content_url" id="gif" class="a-gif" src="' + $originalImg.url +'" alt="Animation Domination High-Def animated GIF" style="width: 400px; height: 400px" width="400" height="400"></div>';

        $('#results').prepend($newString);

        numNew--;   
    }
		
	}
		
	
	var timerID = setInterval(function() {
   
		$.ajax({
			method: "GET",
			url: 'http://api.giphy.com/v1/gifs/search?q=pizza&api_key=dc6zaTOxFJmzC',
			datatype: 'json',
			success: function(data) {
				
				checkForNew(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('error');
			}
		});
		
	}, 3 * 1000);
	

	apiCall();
	
});
