import type { BoxGeometry, Mesh, MeshBasicMaterial } from "three"

function bubbleSort (boxes: Mesh<BoxGeometry, MeshBasicMaterial>[ ]) {
    console.log('bubbleSort xddd', boxes)

    console.log( boxes[ 0 ].geometry.parameters.height )
}

export default bubbleSort
