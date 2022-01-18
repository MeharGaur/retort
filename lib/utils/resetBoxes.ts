import { delay } from "."
import { RESTING_COLOR, STEP_DELAY } from "../config"

async function resetBoxes(leftBox, rightBox) {
    await delay(STEP_DELAY + 100)

    // Reset swapped boxes back to the resting color
    leftBox.material.color.setHex(RESTING_COLOR)
    rightBox.material.color.setHex(RESTING_COLOR)

    // Delay before the next swap
    await delay(STEP_DELAY / 1.5)
}


export default resetBoxes
