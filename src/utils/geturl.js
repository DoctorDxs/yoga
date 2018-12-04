function GetRequest() {
  var url = decodeURIComponent(location.search);
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
          theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
  }
  return theRequest;
};



function getVideoDimensionsOf(url){
	return new Promise(function(resolve){
		// create the video element
		let video = document.createElement('video');

		// place a listener on it
		video.addEventListener( "loadedmetadata", function () {
			// retrieve dimensions
			let height = this.videoHeight;
			let width = this.videoWidth;
			// send back result
			resolve({
				height : height,
				width : width
			});
		}, false );

		// start download meta-datas
		video.src = url;
	});
}

export default {GetRequest,getVideoDimensionsOf}