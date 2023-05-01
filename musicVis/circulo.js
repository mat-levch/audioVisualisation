/* this visualization will show two semicircles that will be like two soles that will create small colored stars
the fourier applied it in three parts one to move the semicircles, so that the small stars are expelled with
strength depending on the strength of the sound, and train with the bit more outside we can also notice that the
image of the strip can shake */

function Circulo() {
	this.name = "Circulo";//viewer name
    var part = [];//array where to store the particles
    this.img = loadImage('images/tierrapng.png')// image of the earth

	this.draw = function() {
        
		push();
        angleMode(DEGREES)// change mode to degrees
        //These are the properties to apply the FFT()
        fourier.analyze()
        rf = fourier.getEnergy(20,200)

        //******from push() to pop() I can handle this process independently****
        push();
        // if the condition is fulfilled the image will have a small rotation
        if(rf >190){
            rotate(random(-0.5,0.5))
        }
        image(this.img,width/2-160,height/2-100,200,180)
        pop();


        // first wave
        //assign the beat values to the wave
        var wave = fourier.waveform();
        push();
        translate(width+5, height+5);// move wave to bottom of screen 
        //comenzar la figuera 
        beginShape();
            stroke([random(0,255),random(0,255),random(0,255)]);// assign random color
            strokeWeight(3);
            noFill();
            // generate the curve with 360 degrees,
            for(var i = 0; i <=360 ;i+= 0.5){

               //wave index
                var index = floor(map(i,0,360,0,wave.length-1));
                // size of the radius of the circle
                var r = map(wave[index],-1,1,150,350);
                // using x y together with the radius, we make the curve applying sin and cos
                var x = r * sin(i);
                var y = r * cos(i);
                // together with this function we finish the curvature process
                vertex(x, y);
            }
        //end of figure
        endShape();
       // constructor and creation of the particles, we store in the array part
        var nPart = new Starts();
        part.push(nPart);
            // loop that helps us store and use the properties of starts to create the meteor shower
            for(var i = part.length - 1; i >= 0;i--){
            //If it meets the condition of with the position of the particles, it will create new stars.
            if(!part[i].edges()){
                part[i].update(rf > 170)//when updating if the rate is greater than 170 it will move the stars with the condition;
                part[i].show();//show the news starts
            }else{
                part.splice(i,1)// remove the stars one by one
            }    
        }
        pop();

        /* create the second wave
         ************ it is the same process for both waves ************
         */
        var wave2 = fourier.waveform();
        beginShape();
        stroke([random(0,255),random(0,255),random(0,255)])
        strokeWeight(3);
        noFill();
        for(var i = 0; i <=180 ;i+= 0.5){
            var index = floor(map(i,0,180,0,wave2.length - 1))
            var r = map(wave2[index],-1,1,150,350)
            var x = r * sin(i) 
            var y = r * cos(i)    
            vertex(x, y);
            }
        endShape(); 
		var nPart2 = new Starts();
        part.push(nPart2);
            for(var i = part.length - 1; i >= 0;i--){
            if(!part[i].edges()){
              part[i].update(rf > 170);
              part[i].show();
            }else{
                part.splice(i,1);
                }    
            }         
	};
    //start class with constructor,update,edges and show properties
    class Starts{
        //constructor property
        constructor() {
            // position when creating the particles
            this.pos = p5.Vector.random2D().mult(250);
            //velocity
            this.velo = createVector(0 ,0)
            //acceleration, beat condition so that the particles are slow if there is no sound
            if(rf < 2){
                this.acele = this.pos.copy().mult(random(0.000001,0.000001))
            }else{
                this.acele = this.pos.copy().mult(random(0.00001,0.00001))
            }
            // size
            this.tama = random(3, 5)
            //color
            this.color = [random(0,255),random(0,255),random(0,255)]
            
        }
        // update property that receives a parameter (fourier condition < 170)
        update(condi){
            this.velo.add(this.acele);// to the velocity we add acceleration
            this.pos.add(this.velo);// to the position we add velocity
            if(condi){
                /* if the condition is fulfilled we multiply by three the position add veil does the effect
                of stars faster than others,*/
                this.pos.add(this.velo);
                this.pos.add(this.velo);
                this.pos.add(this.velo);    
            }
        }
        /*edges helps me to delete the Starts and create them again if
         it meets the condition of being larger than the size of the screen */
        edges(){
            if(this.pos.x < -width || this.pos.x > width  || this.pos.y < -width || this.pos.y > width ){
                return true;
            }else{
                return false;
            }
        }
        // property that shows the color, and the position and size of the parts
        show(){
            noStroke();
            fill(this.color);//using the color property
            ellipse(this.pos.x, this.pos.y, this.tama+2,5,20)
            //with the x position and the size that arrives from the property,

        }
        
    }
}
 