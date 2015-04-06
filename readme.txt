== Images Of Chamonix ==

A developer test excercise to fetch and display the latest images of snowy Chamonix tagged 'ski' or 'climb', from Flickr's public image feed.


= Build Notes =

Flickr API:

* The JSON that Flickr returns has escaped single quotes. This was undone before output as native browser/jQuery parsing is generally strict.  

* The image size used on the frontend is bigger than the one returned in the feed. This was possible to swap by noticing that the image url contained size information. This needs some tightening up.   


Backend:

* Time limitation - no error handler implemented for php's file_get_contents for this example. However, there's no detrimental effect in this case as an error in the php will still fire error handling in the frontend js.


Frontend: 

* Used fixed image sizes, in a centred layout, collapsable down to a single column.

* Used a fast transition speed for the icon opacity to keep the feel responsive in use.

* Used a slower transition speed for the image opacity to make the effect more apparent (the icon distracts from the image effect).

* made use of graphics acceleration via CSS3.
 
