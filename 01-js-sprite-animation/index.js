const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// set canvas width and height same as css
const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

const playerImage = new Image()
playerImage.src = '/assets/shadow_dog.png'
const spriteWidth = 575
const spriteHeight = 523
let frameX = 0
let frameY = 0
let gameFrame = 0
const staggerFrames = 5

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // clear canvas on repaint
  //   ctx.fillRect(50, 50, 100, 100) // draw a rectangle

  // crop out one frame from the sprite sheet and draw it on the canvas
  ctx.drawImage(
    playerImage, // image
    frameX * spriteWidth, // source x
    frameY * spriteHeight, // source y
    spriteWidth, // source width
    spriteHeight, // source height
    0, // destination x
    0, // destination y
    spriteWidth, // destination width
    spriteHeight // destination height
  ) // draw player image

  // control sprite animation speed
  if (gameFrame % staggerFrames === 0) {
    if (frameX < 6) frameX++
    else frameX = 0
  }
  gameFrame++

  requestAnimationFrame(animate) // call animate() again before the next repaint (typically 60fps)
}

animate()
