import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { useEffect, useRef } from 'react'

import sortingAlgorithms from '../lib/sorting-algorithms'
import Navigation from '../lib/components/Navigation'


// *****TODO: put data-sorting-algorithm="" attribute on nav items



function Home () {

    const canvasRef = useRef<HTMLCanvasElement>()
    let renderer: WebGLRenderer

    // Don't run three.js code on server
    if (process.browser) {

        // onMount
        useEffect(() => {
            const sizes = { width: 0, height: 0 }

            // ————————— 3D World —————————

            // Scene
            const scene = new Scene()

            
            // ************* TODO: Need to make the class that sorts 
            // boxes using the algorithm specified in its constructor

            const boxes = [
                // TODO: array of boxes to be sorted.
                // gets passed to sorting function to mutate cubes.
            ]


            const boxGeometry = new BoxGeometry(1, 1, 1)
            const boxMaterial = new MeshBasicMaterial({ color: 0x00FFFF })
            const boxMesh = new Mesh(boxGeometry, boxMaterial)

            scene.add(boxMesh)


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
            camera.position.x = 10
            camera.position.y = 25
            camera.position.z = 10

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

        // Get rid of the WebGL context onDestroy
        useEffect(() => {
            return function onDestroy() {
                canvasRef.current = undefined
                renderer.dispose()

                renderer.getContext()
                    .getExtension('WEBGL_lose_context')
                    .loseContext()
            } 
        }, [ ])
        
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

            <canvas ref={canvasRef} ></canvas>

        </div>
    )

}


export default Home
