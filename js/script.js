
/**
*	Control
*/
var UX = {
	
	dataURL: 	'php/flickr-app.php',
	displayID: 	'#display',
	
	messages: 	{
		nodata:		'<h2 class="feedback c">No images found.</h2>',
		error:		'<h3 class="feedback c">There was a problem, please try later.</h3>'
	},
	
	options: 	{ 
		town: 		'chamonix', 
		weather: 	'snow', 
		activity: 	'ski'
	},
	
	init: function () {
		this.setControls();
		this.addEventHandlers();
		this.getImages();
	},
	
	setControls: function () {
		$('#activity').val( this.options.activity );
	},
	
	addEventHandlers: function () {
		DATA.callbacks.success.push( this.onDataSuccess );
		DATA.callbacks.error.push( this.onDataFail );
		$('#activity').on( 'change', function ( e ) {
			UX.onActivityChange( e );
		});
	},
	
	getImages: function () {
		DATA.request( this.dataURL, this.options, this.displayID );
	},
	
	onActivityChange: function ( event ) {
		this.options.activity = $('#activity').val();
		this.getImages();
	},
	
	onDataSuccess: function ( elemID, response, status, jqXHR ) {
		var hasItems = false;
		if ( typeof response.items !== 'undefined' ) {
			if ( response.items.length > 0 ) {
				hasItems = true;
				DRAW.imageTiles( response.items, elemID );
			}
		}
		if ( ! hasItems ) {
			DRAW.feedback( UX.messages.nodata, elemID );
		}
	},
	
	onDataFail: function ( elemID, jqXHR, status, error ) {
		DRAW.feedback( UX.messages.error, elemID );
	}
};



/**
*	Data
*/
var DATA = {

	callbacks: {
		success:	[],
		error:		[]
	},
	
	request: function ( url, options, elemID )	{
		var that = this;
		var data = { 
			'options':	options
		};
		
		$( elemID ).empty().append( '<div class="spinner"><i class="fa fa-spinner fa-pulse"></i></div>' );
		
		$.ajax({
			type: 	"POST",
			data: 	data,
			url:	url,
			dataType: 'json',
			success: function( response, status, jqXHR ) {
				var j;
				for ( j in that.callbacks.success ) {
					that.callbacks.success[ j ]( elemID, response, status, jqXHR );
				}
			},
			error: function ( jqXHR, status, error ) {
				var j;
				for ( j in that.callbacks.error ) {
					that.callbacks.error[ j ]( elemID, jqXHR, status, error );
				}
			}
		});
	}
};



/**
*	Drawing
*/
var DRAW = {

	imageTiles: function ( items, elemID ) {
		var j;
		var authorParts;
		var username;
		var caption;
		var imageUrl;
		var html;
		
		$( elemID ).empty();
		
		for ( j in items ) {
			//modify media url for a larger image size
			imageUrl = items[ j ].media.m.replace( '_m.', '_z.' );
			
			//extract username
			authorParts = items[ j ].author.split( '(', 2 );
			if ( typeof authorParts[1] === 'undefined' ) {
				username = '(Unknown author)';
			} else {
				username = authorParts[1].replace( /\)$/, '' );
			}
			
			//assemble caption
			caption = ( "" == items[ j ].title ) ? '(Untitled)' : items[ j ].title;
			caption += ' by ' + username;
			
			//make html
			html = '<div id="wrap_' + j + '" class="item-wrap unselectable accel">';
			html += '<img src="' + imageUrl + '" alt="' + items[ j ].title + '" />';
			html += '<div class="item-caption">' + caption + '</div>';
			html += '<div class="icon"><i class="fa fa-camera-retro"></i></div>';
			html += '<a href="' + items[ j ].link + '"></a>';
			html += '</div>';
			
			$( elemID ).append( html );
		}

		$( elemID ).append( '<br class="clear">' );
	},
	
	feedback: function ( message, elemID ) {
		$( elemID ).empty().append( message );
	}
};



/**
*	Startup
*/
$( document ).ready( function () {
	UX.init();
});
