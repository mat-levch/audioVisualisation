/*
Matvii Levchenko 
This function is an audio visualisation in Retrowave style. It has different objects such as the sun, circle, bushes, car and stars.
All of them are sound related so their moves are changing depending on bass, mid or treble frequency. 

Plan:

Create visualizations:
a. Use the frequency spectrum and amplitude data to create different visualizations.
b. Use the translate(), rotate(), and scale() functions to create interesting visual effects.
c. Use loops and conditional statements to create animations that respond to the audio.

Test the project:
a. Test the project on different devices and browsers to ensure compatibility.
b. Make adjustments to the project as needed to improve performance or address any issues.

*/

function Retrowave(){
    this.name = "Retrowave"

    this.img = loadImage('images/road.jpg')
	this.img2 = loadImage("images/star2.png");
	this.img3 = loadImage("images/car.png")


    this.draw = function() {
    push();
    angleMode(DEGREES);
	imageMode(CENTER);
	rectMode(CENTER);
    

    // Set the center of the canvas as the origin
    translate(width / 2, height / 2 );

    fourier.analyze()
    amp = fourier.getEnergy(20,200)

	if(amp > 230) {
		rotate(random(-0.5, 0.5))
	}

	/* Set a backgroung image */
	image (this.img, 0, 0, width, height)

    /* Create a shadow for a bg image using dark tranparent rect */
	var shadow = map(amp, 0, 255, 120, 150);
	fill(0, shadow);
	noStroke();
	rect(0, 0, width, height);

	// Get the amplitude of the sound wave at different frequencies
    var spectrum = fourier.analyze();
	var bass = fourier.getEnergy("bass");
	var mid = fourier.getEnergy("mid");
	var treble = fourier.getEnergy("treble");

    /* Stars drawing */
	push()
	translate(-width/2, -height/2)
    //This is a for loop that will run bass / 80 times
    //The loop will run fewer times if bass is smaller, and more times if bass is larger.
    for (let i = 0; i < bass / 80; i++) {
        //These two lines generate random x and y coordinates for the star within the width and height of the canvas.
        let starX = random(width);
        let starY = random(height/2);
        //The map() function scales the value of bass from the range 0-255 to the range 20-80.
        let starSize = map(bass, 0, 255, 20, 80);
        // Draw the star image at the generated coordinates
        image(this.img2, starX, starY, starSize, starSize);
    }    
    pop();


    //Bushes drawing
	//draw a bush on the left side of the screen
	push();
	//Translate to the left side of the screen
	translate(-width/3, height/6);	

	//Set the radius based on the bass energy
	var radius = map(bass / 6, 0, 100, 50, 150);
	stroke(22, 255, 0);
	strokeWeight(5);
	
	// Draw the bush using lines with different angles
	for (var i = 0; i < 360; i += 30) {
		var x = cos(i) * (radius + map(spectrum[i], 0, 300, 0, 100));
		var y = sin(i) * (radius + map(spectrum[i], 0, 300, 0, 100));
		line(0, 150, x, y);
	}
	pop();

	// Draw another bush on the right side of the screen
	push();
	//Translate to the right side of the screen
	translate(width/3, height/6); 

	//Set the radius based on the bass energy
	var radius = map(bass / 6, 0, 100, 50, 150);
	stroke(22, 255, 0);
	strokeWeight(5);

	// Draw the bush using lines with different angles
	for (var i = 0; i < 360; i += 30) {
	var x = cos(i) * (radius + map(spectrum[i], 0, 300, 0, 100));
	var y = sin(i) * (radius + map(spectrum[i], 0, 300, 0, 100));
	line(0, 150, x, y);
	}

	pop();

    /* Draw a sun */
    push();
	//This line changes the position of the origin (0,0) to (0,-130) on the canvas.
	translate(0, -130);
	//Scale the size of the sun by a factor of 0.9. This will make the sun slightly smaller than its original size.
	scale(0.9);

	fill(255, 94, 14);
	strokeWeight(5);
	noStroke();

	//maps the value of mid from the range 0-255 to the range 200-400,
	let sunSize = map(mid, 0, 255, 200, 400);
	//This creates a wave with a maximum amplitude of 20.
	let sunWave = sin(frameCount*2)*20;
	// Draw a sun with a slightly wavy effect on the sun's surface.
	ellipse(0, 0, sunSize + sunWave, sunSize + sunWave);


	/* Draw rays for the sun  */
	
	for (let i = 0; i < 20; i++) {
	//This line maps the current treble value from the range 0 to 255 to the range 100 to 300.
	let rayLength = map(treble, 0, 255, 100, 300);
	//The angle of the current ray calculated based on the loop index i
	let rayAngle = i * 18;

	//Calculate the coordinates for the start and end points of each ray based on the current angle, 
	//the sunSize variable, and the rayLength variable.
	let rayX = cos(rayAngle) * sunSize / 2;
	let rayY = sin(rayAngle) * sunSize / 2;
	let rayEndX = cos(rayAngle) * (sunSize / 2 + rayLength);
	let rayEndY = sin(rayAngle) * (sunSize / 2 + rayLength);
	stroke(255, 94, 14);
	strokeWeight(6);
	line(rayX, rayY, rayEndX, rayEndY);
	}

    pop();


	
    /* Circle drawing */ 
    var wave = fourier.waveform();
    push();
    stroke(255, 143, 0);
    strokeWeight(6)
    noFill();
	for(var j = -1; j <= 1; j += 2 ){
		beginShape();
		for (var i = 0; i <= 180; i += 10){
			//The map() function scales the value of i from the range 0-180 to the range 0-wave.length-1, 
			//and floor() rounds down to the nearest integer.
			var index = floor(map(i ,0, 180, 0, wave.length - 1));

			// The map() function scales the value of wave[index] from the range -1 to 1 to the range 50 to 125.
			var r = map(wave[index], -1, 1, 50, 125)

			// These two calculate the x and y coordinates of the vertex based on the radius r, the angle i, and the value of j
			// The sin() and cos() functions calculate the x and y coordinates on the unit circle, 
			// which are then scaled by r and flipped vertically by subtracting 130 from y.
			var x = r * sin(i) * j;
			var y = r * cos(i) - 130;
			vertex(x, y);
			
		}
		endShape();
	}
    pop();
    

	/* Car drawing*/
	push();
	translate(-width/2, -height/2)
	// Set the coordinates for the car
	if (sound.isPlaying()) {
		// Move the car object from left to right by 25px
		let carX = width / 2 + 50 * sin(frameCount);
		let carY = height / 1.22;
		let carWidth = 400;
		let carHeight = 350;

		// Draw the car image at the new coordinates
		image(this.img3, carX, carY, carWidth, carHeight);
	} else {
		// Draw the car image at the original coordinates
		let carX = width / 2;
		let carY = height / 1.22;
		let carWidth = 400;
		let carHeight = 350;
		
		// Draw the car image at the original coordinates
		image(this.img3, carX, carY, carWidth, carHeight);
	}
	pop();   	    

    pop();
    }


}