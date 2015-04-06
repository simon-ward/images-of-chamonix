<?php

class FLICKR_APP {

	protected $feedUrl = 'https://api.flickr.com/services/feeds/photos_public.gne';
	
	public function __construct () {
		$data = $this->getData();
		$this->output( $data );
	}
	
	public function getData() {
		$params = '?format=json';
		$params .= '&lang=en-us';
		$params .= '&nojsoncallback=1';
		$params .= '&tagmode=all';
		
		$town 		= ( empty( $_POST['options']['town'] ) ) 	 ? 'chamonix'	: urlencode( $_POST['options']['town'] );
		$weather 	= ( empty( $_POST['options']['weather'] ) )  ? 'snow' 		: urlencode( $_POST['options']['weather'] );
		$activity 	= ( empty( $_POST['options']['activity'] ) ) ? 'ski' 		: urlencode( $_POST['options']['activity'] );
		$tags = $town . ',' . $weather . ',' . $activity;
		
		$params .= '&tags=' . $tags;
		
		$data = file_get_contents( $this->feedUrl . $params );
		return $data;
	}
	
	public function output( $data ) {
		if ( $data === false ) {
			$json = '{}'; //an empty js object fires the error handler.
		} else {	
			$json = str_replace( "\'", "'", $data ); //undo Flickr's escaped single quotes in their JSON.
		}
		echo $json;
	}
}

new FLICKR_APP();

?>