function Spectrum() {
	this.name = "spectrum";

	this.draw = function() {
		push();
		var spectrum = fourier.analyze();
		noStroke();

		
		for (var i = 0; i< spectrum.length; i++){
			var y = map(i, 0, spectrum.length, 0, height);
			fill (spectrum[i]+ 100, 255-spectrum[i],0);
		    var w = map(spectrum[i],0, 255,0, width,);	
		    rect(0,y, w,height/ spectrum.length);
  		}
		pop();
	};
}
