var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// variables

var gap = 90;
var birdX = 10;
var birdY = 215;
var gravity = 1.25;
var score = 0;





// movement

  // actions
document.addEventListener("keydown", move);

function move() {
  birdY -= 30;
}

  // pipe animation

var pipe = [];

pipe[0] = {
  y : 0,
  x : cvs.width
}





function draw(){

    // drawImage(image, x, y, dimension, dimension);
    ctx.drawImage(bg,0,0);  // draw background


    // add moving pipe
    for(var i = 0; i < pipe.length; i++) {
      var positionX = pipe[i].x;
      var positionY = pipe[i].y;
      ctx.drawImage(pipeNorth, positionX, positionY);
      ctx.drawImage(pipeSouth, positionX,positionY+pipeNorth.height+gap);

      pipe[i].x--;  // move pipe along x axis

      // generate pipe when
      if (pipe[i].x == 100) {
        pipe.push({
          x: cvs.width,
          y: Math.floor((Math.random()*pipeNorth.height) - pipeNorth.height)
        })
      }


      // end game rule

      if ( birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeNorth.width && (birdY <= pipe[i].y + pipeNorth.height || birdY+bird.height >= pipe[i].y+pipeNorth.height+gap) || birdY + bird.height >=  cvs.height - fg.height ) {
        location.reload();
      }

      if (pipe[i].x == 0) {
        score += 1;
      }

    }


    // console.log(pipeNorth.height); // 242
    // console.log(pipeSouth.height); // 348


    ctx.drawImage(bird, birdX, birdY);
    ctx.drawImage(fg, 0, cvs.height-fg.height+20);  // draw ground

    birdY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height-30);
    requestAnimationFrame(draw); // force animation

}

draw();




