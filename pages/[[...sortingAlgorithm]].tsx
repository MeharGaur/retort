import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import { AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useEffect, useRef } from 'react'

import sortingAlgorithms from '../lib/sorting-algorithms'
import Navigation from '../lib/components/Navigation'
import { useRouter } from 'next/router'
import { mapRange } from '../lib/utils'


/** Array of boxes to be sorted */
const boxes: Mesh<BoxGeometry, MeshBasicMaterial>[ ] = [ ]


function Home () {

    const router = useRouter()

    const canvasRef = useRef<HTMLCanvasElement>()

    // Don't run three.js code on server
    if (process.browser) {
        let renderer: WebGLRenderer

        // onMount - create WebGL context and 3D world
        useEffect(function onMount () {
            const sizes = { width: 0, height: 0 }

            // ————————— 3D World —————————

            // Scene
            const scene = new Scene()

            // Axes Helper
            // scene.add(new AxesHelper(100))

            // *********TODO: Initialize the boxes already sorted in order

            // Generate 10 boxes of varying height
            const boxCount = 20
            const boxWidth = 2
            const boxGap = 2 * boxWidth
            const boxMinHeight = 5
            const boxMaxHeight = 20
            const boxHeightOffset = boxMaxHeight / 3
            const boxMaterial = new MeshBasicMaterial({ color: 0x00FFFF })

            for (let i = 0; i < boxCount; i++) {
                // Map range to ensure minimum height of 5
                const randomHeight = mapRange(
                    0, boxMaxHeight, boxMinHeight, boxMaxHeight, 
                    Math.random() * boxMaxHeight
                ) 

                const newBox = new Mesh(
                    new BoxGeometry(boxWidth, randomHeight, boxWidth),
                    boxMaterial
                )

                // Level the boxes y value
                newBox.position.y = (randomHeight / 2) - boxHeightOffset

                newBox.position.z = ((i - 0.5) - (boxCount / 2)) * boxGap

                boxes.push(newBox)

                scene.add(newBox)
            }

            // ————————— WebGL Boilerplate —————————

            // Window & Resizing
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            window.addEventListener('resize', () => {
                // Update sizes
                sizes.width = window.innerWidth
                sizes.height = window.innerHeight

                renderer.setSize(sizes.width, sizes.height)

                // Update camera
                camera.aspect = sizes.width / sizes.height
                camera.updateProjectionMatrix()

            }, { passive: true })

            // Camera
            const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
            camera.position.x = 42
            camera.position.y = 10
            camera.position.z = 20

            scene.add(camera)

            // Controls
            const controls = new OrbitControls(camera, canvasRef.current)
            controls.enableDamping = true
            controls.enablePan = false
            controls.enableZoom = false

            // Renderer
            renderer = new WebGLRenderer({
                canvas: canvasRef.current,
                antialias: true
            })

            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setClearColor(0x333333)

            // Render Loop
            function render() {
                // Update controls
                controls.update()

                // Render to canvas
                renderer.render(scene, camera)

                // Call render again on the next frame
                window.requestAnimationFrame(render)
            }

            // Start render loop
            render()
        }, [ ])

        // onDestroy - get rid of the WebGL context 
        useEffect(function onDestroy () {
            return () => {
                canvasRef.current = undefined
                renderer.dispose()

                renderer.getContext()
                    .getExtension('WEBGL_lose_context')
                    .loseContext()
            } 
        }, [ ])

        // onRouteChange - use the sorting algorithm specified in the route
        useEffect(function onRouteChange () {
            const sortingAlgorithm = router.asPath.split('/')[ 1 ]

            if (sortingAlgorithm in sortingAlgorithms) {
                // **********TODO: Randomize order of the boxes,
                // so that it 'resets' and can be sorted again.
                // Each box needs to be tweened to a new position,
                // based on total number of boxes.
                // Put a lil alert in the top right 'Randomizing Order...' when reseting

                // boxes.map(box => ({
                //     uuid: box.uuid, 
                //     height: box.geometry.parameters.height 
                // }))

                sortingAlgorithms[ sortingAlgorithm ]( boxes )
            }
        }, [ router.asPath ])
        
    }

    // Render HTML
    return (
        <div className={styles.container}>
            <Head>
                <title>Retort — Mehar Gaur</title>
                {/* <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <Navigation />

            <div className="nav-shadow" />

            <canvas ref={canvasRef} />

        </div>
    )

}


export default Home
