$(document).ready(function() {

	jsoncallback = function(data) {
		var numNew = 0;
		console.log(data);
		var gifResults = data.pagination.count;
		console.log(data[0]);
		
		

		for (i = 0; i < gifResults; i++) {

			if (firstPost == data.response.posts[i].id) {
				console.log('break');

				numNew = i;
				break;
			} else {
				//$('html').load('http://100k.ishothim.com #intro-panel');
			}
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
