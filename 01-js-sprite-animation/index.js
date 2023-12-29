let playerState = 'run'
const dropDown = document.getElementById('animations')
dropDown.addEventListener('change', function (e) {
  playerState = e.target.value
})

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// set canvas width and height same as css
const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)

const playerImage = new Image()
playerImage.src = '/assets/shadow_dog.png'
const spriteWidth = 575
const spriteHeight = 523

let gameFrame = 0
const staggerFrames = 5

const spriteAnimations = []
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
]
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  }
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth
    let positionY = index * spriteHeight
    frames.loc.push({ x: positionX, y: positionY })
  }
  spriteAnimations[state.name] = frames
})

// simpler solution for cycling through sprite sheet
function animateSimple() {
  let frameX = 0
  let frameY = 0
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

// more advanced solution for cycling through sprite sheet
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) // clear canvas on repaint
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length
  let frameX = spriteWidth * position
  let frameY = spriteAnimations[playerState].loc[position].y

  // crop out one frame from the sprite sheet and draw it on the canvas
  ctx.drawImage(
    playerImage, // image
    frameX, // source x
    frameY, // source y
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
