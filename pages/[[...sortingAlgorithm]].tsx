import Head from 'next/head'
import { useEffect, useRef } from 'react'

import { AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'gsap'

import sortingAlgorithms from '../lib/sorting-algorithms'
import Navigation from '../lib/components/Navigation'
import { useRouter } from 'next/router'
import { calculateBoxPosition, delay, getBoxPositions, shuffle } from '../lib/utils'
import { BOX_COUNT, BOX_HEIGHT_OFFSET, BOX_WIDTH, RESET_ANIMATION_DURATION, RESTING_COLOR, STEP_DELAY } from '../lib/config'
import type { Box } from '../lib/types'


/** Array of boxes to be sorted */
let boxes: Box[ ] = [ ]

const routeTimestamps: number[ ] = [ ]


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

            generateBoxes(scene)

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

        // onRouteChange - Reset/randomize the box order and sort using 
        // the new algorithm specified in the route param.
        useEffect(function onRouteChange () {
            // Use an async IIFE because React useEffect doesn't allow promise
            (async () => {
                const sortingAlgorithm = router.asPath.split('/')[ 1 ]

                if (sortingAlgorithm in sortingAlgorithms) {
                    // Timestamp of when route changed
                    const currentTimestamp = Date.now()

                    routeTimestamps.push(currentTimestamp)

                    // Get the scene object from one of the box's
                    const scene = boxes[0].parent as Scene

                    scene.remove(...boxes)
                    
                    boxes = [ ]

                    // Regenerate all boxes in case any sorting function is currently running
                    generateBoxes(scene)

                    // Create range from 1 to BOX_COUNT then shuffle it
                    const randomizedIndices = shuffle([
                        ...Array(BOX_COUNT).keys()
                    ])

                    // New array to hold a randomized version of the boxes array
                    const newBoxes: Box[ ] = [ ]

                    for (let i = 0; i < BOX_COUNT; i++) {
                        newBoxes[ randomizedIndices[ i ] ] = boxes[ i ]

                        // Tween each box to its new position
                        gsap.to(boxes[ i ].position, {
                            z: boxes[ randomizedIndices[ i ] ].position.z,
                            duration: RESET_ANIMATION_DURATION,
                            ease: 'power2.inOut'
                        })
                    }

                    // Use the randomized array instead of the sorted one
                    boxes = newBoxes

                    // Wait for randomization tween to finish playing
                    await delay(RESET_ANIMATION_DURATION * 1_000)

                    const boxPositions = getBoxPositions(boxes)

                    // Make the boxes do a 'jump' to indicate sorting is about to start
                    await gsap.timeline()
                        .to(boxPositions, {
                            y: '+=3',
                            ease: 'power2.out',
                            duration: 0.3
                        })
                        .to(boxPositions, {
                            y: '-=3',
                            ease: 'power2.in',
                            duration: 0.25
                        })

                    await delay(STEP_DELAY)
                    
                    sortingAlgorithms[sortingAlgorithm](boxes)
                }
            })()
        }, [ router.asPath ])
    }

    // Render HTML
    return (
        <div>
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


function generateBoxes (scene: Scene) {
    // Generate boxes of varying height in ascending order
    for (let i = 0; i < BOX_COUNT; i++) {
        const boxHeight = (BOX_COUNT - i) + 5

        const newBox = new Mesh(
            new BoxGeometry(BOX_WIDTH, boxHeight, BOX_WIDTH),
            new MeshBasicMaterial({ color: RESTING_COLOR })
        )

        // Level the boxes y value
        newBox.position.y = (boxHeight / 2) - BOX_HEIGHT_OFFSET

        newBox.position.z = calculateBoxPosition(i)

        boxes.push(newBox)

        scene.add(newBox)
    }

    // Reverse boxes array so it in appears ascending order in the WebGL scene
    boxes.reverse()
}


export default Home
