//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {

	this.menuDisplayed = false;

	//playback button displayed in the top left of the screen
	
	this.playbackButton = new PlaybackButton();
	console.log(this.playbackButton)
	//make the window fullscreen or revert to windowed
    
	this.mousePressed = function() {
        
        this.playbackButton.hitCheck()
		//???
		//check if the playback button has been clicked
		//if not make the visualisation fullscreen
		
        
		let fs = fullscreen();//********volver a quitar para el full screen********///
		if(!this.playbackButton.playing){
			 
		}else{
			fullscreen(!fs)
		}
	
	};
	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode) {
		console.log(keycode)
		if (keycode == 32) {
			this.menuDisplayed = !this.menuDisplayed;
			
		
		}

		if (keycode > 48 && keycode < 58) {
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
		}
		
		
	};

	//draws the playback button and potentially the menu
	this.draw = function() {
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(34);

		//playback button
		this.playbackButton.draw();
		
		//only draw the menu if menu displayed is set to true.
		if (this.menuDisplayed) {
			text("Select a visualisation:", 100, 60);
			this.menu();
		pop();

	};

	this.menu = function() {
		//draw out menu items for each visualisation
		//???
		for(var i=0; i < vis.visuals.length;i++){
			var y  = 100+45*i;
			var list = vis.visuals[i].name;
			var num = i+1 * 1;
			text(num +" : "+list,100,y)
			}
		}
		
	};
} 
