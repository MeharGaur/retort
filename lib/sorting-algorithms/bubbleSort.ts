import type { BoxGeometry, Mesh, MeshBasicMaterial } from "three"
import { gsap } from "gsap"

import { RESTING_COLOR, STEP_DELAY, SWAP_ANIMATION, SWAP_LEFT_COLOR, SWAP_RIGHT_COLOR } from "../config"
import getHeight from "../utils/getHeight"


// TODO: Need to extract out as much functionality as I can
// so I can reuse the same animation code for all algos


async function bubbleSort (boxes: Mesh<BoxGeometry, MeshBasicMaterial>[ ]) {
    let didSwap = false

    do {
        didSwap = false

        let didSwapInternal = false

        for (let i = 0; i < (boxes.length - 1); i++) {
            didSwapInternal = false

            const leftBox = boxes[ i ]
            const rightBox = boxes[ i + 1 ]

            if (getHeight(leftBox) > getHeight(rightBox)) {
                leftBox.material.color.setHex(SWAP_LEFT_COLOR)
                rightBox.material.color.setHex(SWAP_RIGHT_COLOR)

                await new Promise(resolve => setTimeout(resolve, STEP_DELAY / 1.5))

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

                boxes[ i ] = rightBox
                boxes[ i + 1 ] = leftBox

                didSwap = true
                didSwapInternal = true
            }

            if (didSwapInternal) {
                // Only delay if there was a swap
                await new Promise(resolve => setTimeout(resolve, STEP_DELAY + 100))

                // Reset swapped boxes back to the resting color
                leftBox.material.color.setHex(RESTING_COLOR)
                rightBox.material.color.setHex(RESTING_COLOR)

                await new Promise(resolve => setTimeout(resolve, STEP_DELAY / 1.5))
            }
        }
    } 
    while (didSwap)

    // Stagger dance animation when finished sorting
    const boxPositions = boxes.map(box => box.position)

    for (const boxPosition of boxPositions) {
        gsap.timeline()
            .to(boxPosition, {
                y: '+=5',
                ease: 'power2.out',
                duration: 0.4
            })
            .to(boxPosition, {
                y: '-=5',
                ease: 'power1.in',
                duration: 0.3
            })
        
        await new Promise(resolve => setTimeout(resolve, 20))
    }
}

export default bubbleSort
