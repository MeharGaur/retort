const BOX_COUNT = 15
const BOX_WIDTH = 3
const BOX_GAP = 2 * BOX_WIDTH
const BOX_MIN_HEIGHT = 5
const BOX_MAX_HEIGHT = BOX_COUNT + BOX_MIN_HEIGHT
const BOX_HEIGHT_OFFSET = BOX_MAX_HEIGHT / 3

const RESTING_COLOR = 0x00FFFF

const SWAP_LEFT_COLOR = 0xFF00FF // pink
const SWAP_RIGHT_COLOR = 0xFFFF00 // yellow

const SWAP_ANIMATION = {
    duration: 0.3
}

/** Milliseconds to wait between iterations/steps in sorting algorithms */
const STEP_DELAY = 300

/** The animation duration for resetting/randomizing the boxes */
const RESET_ANIMATION_DURATION = 1

export {
    BOX_COUNT,
    BOX_WIDTH,
    BOX_GAP,
    BOX_MIN_HEIGHT,
    BOX_MAX_HEIGHT,
    BOX_HEIGHT_OFFSET,
    RESTING_COLOR,
    SWAP_LEFT_COLOR,
    SWAP_RIGHT_COLOR,
    STEP_DELAY,
    SWAP_ANIMATION,

    RESET_ANIMATION_DURATION
}
