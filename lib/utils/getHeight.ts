import type { BoxGeometry, Mesh, MeshBasicMaterial } from "three"

function getHeight (box: Mesh<BoxGeometry, MeshBasicMaterial>) {
    return box.geometry.parameters.height
}


export default getHeight
