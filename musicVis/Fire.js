/* this function is designed to generate fireworks using the sound three times
one is when the sound is louder than 185 it can drop a firework randomly
Also, the louder the sound on a scale of 160 to 200 will be the highest it can go,
and finally the size of the explosion of the firework also depends on the fourier scale.
  */
function Fire() {
	this.name = "Fire"; // name of visualisation
    this.img = loadImage('images/city-sunset-digital.4.jpg')// image of the planet
    var fireworks = [];// arry empty 
    var gravity;//It will help me apply gravity to make the element fall
    stroke(255);
    strokeWeight(6);

    gravity = createVector(0,0.2);//value of gravity in y axis
  
    this.draw = function() {
        background(0,25)
        //These are the properties to apply the FFT()
        fourier.analyze()
        rf = fourier.getEnergy(50,220)
        //images and their properties
        image(this.img,0,0,width,height)
        //conditional to regulate the launch of the firework
        if(rf >= 185){
            //using the firework constructor and store it in the array
          fireworks.push(new Firework());  
        }
        else if(random(1) < 0.01){//// or else just create a firework
           fireworks.push(new Firework());   
        }

        // after the constructor it is stored in the array using the properties
        for(var i = fireworks.length -1; i >= 0; i--){
            fireworks[i].update();
            fireworks[i].show();
            if(fireworks[i].done()){
                fireworks.splice(i, 1)
            }
        }
        
    }
    
// the particle function will be assigned to launch the firework
function  Particles(x,y, col, fireOn) {
    this.pos = createVector(x, y);// the initial position in the vector
    this.fireworks = fireOn; // a boolean to confirm if it already exploded
    this.liveFire = 255; //the luminosity of the firework so that it disappears
    this.col = col;// color 
  
    if(this.fireworks){
        // we can control the speed of the particles and how high they can go 
        if(rf < 184){
        // the condition helps fireworks that are raised without the bits not past the bottom of the screen
            this.vel = createVector(0, random(rf = -7 ,rf = -8));
        }else{
           this.vel = createVector(0, random(rf = -22 ,rf = -11)); 
        }
    // this else with the nested ifs can have a different size for each explosion
    }else{
        this.vel = p5.Vector.random2D();//velocity with vector value 2D
        //if the beat is between 160 and 170 the size of the explosion will be between 10 and 12 pixels
        if(rf > 160 && rf <=170){
        this.vel.mult(random(12,10 ))
       }else if(rf > 171 && rf <= 180){
          this.vel.mult(random( 5, 8))  
        }else if (rf > 181 && rf < 182){
          this.vel.mult(random( 3, 30))  
       }else if(rf > 191 && rf < 220){
           this.vel.mult(random(20,18))
        }else{
           this.vel.mult(random(1))
       }   
    }
    // acceleration I create a vector with value at 0
    this.acc = createVector(0, 0); 
    //// apply the local function. force so that the particles separate to the opposite directions
    this.applyForce = function (force){
        this.acc.add(force)
    }
    //***** building properties****///   
    this.update = function() {
        // if the condition for the speed and transparency of the firework
        if(!this.fireworks){
            this.vel.mult(0.9)// the speed at which the firework falls
            this.liveFire -=4; //the speed at which the explosion will disappear on the screen
        }
        //  add an acceleration to the velocity
        this.vel.add(this.acc);
       // add position a velocity
        this.pos.add(this.vel);
        // celebration starts at 0
        this.acc.mult(0)
    }
    //when the livefire will be true and remove the particles
    this.done = function(){
        if(this.liveFire < 0){
            return true;
        }else{
            return false;
        }
    }

    this.show = function(){
        if(!this.fireworks){
            //manipulate the colors and size of the firework after exploding
            strokeWeight(3);
          // we choose random for the two properties to generate a better light effect
            stroke(col,random(250),random(0,255),this.liveFire+100)
        }else{
           //colors and size in the launch phase
            strokeWeight(4);
            stroke(col,0,200,255)
        }
        // It is the point of seeing launch from the bottom of the screen
        point(this.pos.x, this.pos.y)
    }
    
    }
    
// function that allows me to create and modify the firework explosion
function Firework() {
    this.col = random(0,255)
    this.firework = new Particles(random(width), height,this.col, true);// construction of the object
    this.explo = false;//boolean to know if I exploit the firework
    // this new array will store the firework exploit
    this.parti = [];// arry where we store the explosion particles
    //  the function where I can eliminate the particles that have already exploded to give way to the new particles
    this.done = function(){
        if( this.explo && this.parti.length ===0){
             return true;
        }else{
            return false;
        }
    }
    
    //***** building properties****///
    this.update = function() {
        // create the object using the properties
        if(!this.explo){ //if the function is fulfilled, create the explosion and also apply the force with the gravity function
           this.firework.applyForce(gravity)//With this gravity the launch is not infinite and it will reach a point value 0 to explode
           this.firework.update();
           if(this.firework.vel.y >= 0){// if axis value is 0 it will explode
            this.explo = true ;
            this.explode();
            } 
        }
        // if the conditions are met. with this for we create and
         // store the explosion in the arry we can show when the firework explodes
        for (var i = this.parti.length-1; i >= 0 ;i--){
             this.parti[i].applyForce(gravity);//  when it explodes, the particles fall
             this.parti[i].update();
             if(this.parti[i].done()){// function that is created to identify if it has exploited
                this.parti.splice(i,1); // remove the firework to make room for a new one
             }
        }
    }
    /*this property creates the explosion particles
    how many particles will we create per explosion*/
    this.explode = function(){
        for (var i = 0; i<= 100;i++){
            var p = new Particles(this.firework.pos.x,this.firework.pos.y,this.col,false);
            this.parti.push(p);
            
        }
        
    }
    // show explosion property
    this.show = function(){
         if(!this.explo){
        this.firework.show();
         }
        for (var i = 0; i < this.parti.length ;i++){
             this.parti[i].show();
            
        }
    }
}
    
}