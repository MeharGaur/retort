import { STEP_DELAY, SWAP_ANIMATION, SWAP_LEFT_COLOR, SWAP_RIGHT_COLOR } from "../config"
import type { Box } from "../types"

import { gsap } from "gsap"
import delay from "./delay"


async function swapBoxes (
    boxes: Box[ ], 
    index: number, 
    leftBox: Box, 
    rightBox: Box
) {
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

    boxes[ index ] = rightBox
    boxes[ index + 1 ] = leftBox
}


export default swapBoxes
