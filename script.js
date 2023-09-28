let canvas = document.querySelector("canvas"); // Get the canvas element

canvas.height = window.innerHeight; // Set the canvas height to the window height
canvas.width = window.innerWidth; // Set the canvas width to the window width

let context = canvas.getContext("2d"); // Get the context of the canvas

// context.fillStyle = "red"; // Set the fill color to red
// context.fillRect(100, 100, 100, 100);
// context.fillStyle = "blue";  // Draw a rectangle
// context.fillRect(200, 200, 400, 400);
// context.fillStyle = "green";  // Draw a rectangle
// context.fillRect(600, 100, 100, 100); // Draw a rectangle

// for (let i = 0; i < 200; i++) {
//   let r = Math.random() * 55;
//   let x = Math.random() * window.innerWidth - r;
//   let y = Math.random() * window.innerHeight - r;

//   let red = Math.floor(Math.random() * 255);
//   let blue =Math.floor(Math.random() * 255);
//   let green = Math.floor(Math.random() * 255);

//   context.beginPath(); // Start a new path
//   context.arc(x, y, r, 0, Math.PI * 2, false); // Draw a circle
//   context.strokeStyle = `rgb(${red}, ${green}, ${blue})`; // Set the stroke color to random colors
//   context.stroke(); // Set the stroke color to blue
// }

const mousePosition = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", (event) => {
  mousePosition.x = event.x;
  mousePosition.y = event.y;
});

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x; // x position
    this.y = y; // y position
    this.dx = dx; // velocity in the x direction
    this.dy = dy; // velocity in the y direction
    this.radius = radius; // radius of the circle
  }

  draw() {
    context.beginPath(); // Start a new path
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // Draw a circle
    context.strokeStyle = "white"; // Set the stroke color to random colors
    context.stroke(); // Set the stroke color to blue
  }

  update() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    this.dispereCircles();
    this.draw();
  }

  dispereCircles() {
    // We are applying the formula for distance between two points
    // https://www.youtube.com/watch?v=dMc_PZ1Md90 
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - this.x, 2) +
        Math.pow(mousePosition.y - this.y, 2)
    );

    if (distance < 100) {
      // Adjust this distance to control the "repel" range using
      const angle = Math.atan2(
        mousePosition.y - this.y,
        mousePosition.x - this.x
      );

      // Calculate new velocities to move away from the mouse
      this.dx = -Math.cos(angle) * 2;
      this.dy = -Math.sin(angle) * 2;
    }
  }
}

const circleArray = [];

for (let i = 0; i < 600; i++) {
  let radius = Math.random() * 7 + 1;
  let x = Math.random() * (window.innerWidth - radius * 3) + radius;
  let y = Math.random() * (window.innerWidth - radius * 3) + radius;
  let dx = (Math.random() - 0.5) * 8; // velocity in the x direction
  let dy = (Math.random() - 0.5) * 8; // velocity in the y direction

  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, window.innerWidth, window.innerHeight); // Clear the canvas
  circleArray.forEach((circle) => {
    circle.update();
  });
}

animate();
