import { STEP_DELAY, SWAP_ANIMATION, SWAP_LEFT_COLOR, SWAP_RIGHT_COLOR } from "../config"
import type { Box } from "../types"

import { gsap } from "gsap"
import delay from "./delay"


async function swapBoxes (
    boxes: Box[ ], 
    leftIndex: number, 
    rightIndex: number
) {
    const leftBox = boxes[leftIndex]
    const rightBox = boxes[rightIndex]

    // *****
    // TODO: Need to fade the color change so it's not so abrupt

    leftBox.material.color.setHex(SWAP_LEFT_COLOR)
    rightBox.material.color.setHex(SWAP_RIGHT_COLOR)

    await delay(STEP_DELAY / 1.5)

    const temp = {
        position: {
            z: leftBox.position.z
        }
    }

    gsap.to(leftBox.position, {
        z: rightBox.position.z,
        ...SWAP_ANIMATION
    })

    gsap.to(rightBox.position, {
        z: temp.position.z,
        ...SWAP_ANIMATION
    })

    const tmp = boxes[leftIndex]
    boxes[leftIndex] = boxes[rightIndex]
    boxes[rightIndex] = tmp
}


export default swapBoxes
