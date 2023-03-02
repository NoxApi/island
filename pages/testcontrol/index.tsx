import { useThree, useFrame,Canvas,useLoader } from "react-three-fiber";
import { Vector3, Euler } from "three";
import { useEffect, useRef ,useState,Suspense} from "react";
import Head from 'next/head'
import mesh from "react-three-fiber"
import styles from '@/styles/Home.module.css'
import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, useAnimations,Html, Stats, TransformControls,PerspectiveCamera, PivotControls } from "@react-three/drei";
import { useFBX,useGLTF } from '@react-three/drei';
import * as THREE from "three";
import { Camera,PointLight } from 'three';
import * as Gui from "lil-gui";
import { Build } from '@/components/building';
import { Safe } from '@/components/safe';
import { Syn } from '@/components/syn';
export default function Home() {
    //madbox rotation island x-24 y-94 cam x -64
  useEffect(()=>{
  },[])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <div className='bg-red-300 w-[100vw] h-[100vh] cursor-grab active:cursor-grabbing '>
      <Canvas >
        {/* <PerspectiveCamera makeDefault={true}  position={[0,10,20]}/> */}
        {/* <PerspectiveCamera makeDefault={true} position={[position.x,position.y,15]} rotation={[-0.5,0,0]} /> */}
        {/* <Scene/> */}
        <Suspense fallback={null}>
        
          {/* <Box/> */}
          <Island/>
          <Build position={{x:14,y:25.8,z:8}} rotation={{x:8,y:260,z:-2}}/>
          <Safe position={{x:-13,y:18.8,z:5}} rotation={{x:10,y:31,z:3}}/>
          <Syn position={{x:25,y:16.4,z:14}} rotation={{x:16,y:43,z:-11}}/>
        {/* <OrbitControls enableRotate={true} enableZoom={true} enabled={true}
         minDistance={40}
         maxDistance={80}/> */}
        </Suspense>
      </Canvas>
     </div>
    </>
  )
}
const Island = () =>{
//loader
  const nodesloader = useLoader(GLTFLoader, 'island3.glb')['nodes'];
  const glb = useGLTF("island3.glb");
//loader

//ref
  const cameraref=useRef<any>()
  const islandref = useRef<any>()
  const alightref = useRef<any>()
  const dlightref = useRef<any>()
  const pos1 = useRef<any>()
  const pos2 = useRef<any>()
  const pos3 = useRef<any>()
  const pos4 = useRef<any>()
  const pos5 = useRef<any>()
//ref

//position variable
  let light = {alight:0.5,dlight:0.3}
  let pos ={camx:5,camy:20,camz:80}
  let objpos ={x:-2,y:24,z:6}
  let objrot ={x:3,y:-180,z:3}
  let rotatedeg={rotatex:0,rotatey:0,rotatez:0}
  let islandrotate={rotatex:10,rotatey:-100,rotatez:0}
//position variable

//obj
    const safe = useGLTF("capsule/Cap1.glb");
    const node2 = useLoader(GLTFLoader, 'capsule/Cap1.glb');
    const refsafe = useRef<any>()
    const {actions} = useAnimations(safe.animations,refsafe)
//obj

//light
    


//light

//control
const handleWheel = (e:any) => {
    e.preventDefault();
    pos.camy += e.deltaY / 100;
    console.log(pos.camy)
  };

  const mouseDown = useRef(false);
  const mousePosition = useRef([0, 0]);

  const handleMouseDown = (e:any) => {
    e.preventDefault();
    mouseDown.current = true;
    mousePosition.current = [e.clientX, e.clientY];
  };

  const handleMouseUp = () => {
    mouseDown.current = false;
  };

  const handleMouseMove = (e:any) => {
    if (!mouseDown.current) return;
    const [x, y] = mousePosition.current;
    const dx = (e.clientX - x)/50;
    const dy = (e.clientY - y)/50;
    mousePosition.current = [e.clientX, e.clientY];
    pos.camx += -dx
    pos.camz += -dy
  };

//control

//gui
    const gui = new Gui.GUI()
    gui.add(pos,"camx").min(-100).max(100).step(1).name("cam-position-x")
    gui.add(pos,"camy").min(-100).max(100).step(1).name("cam-position-y")
    gui.add(pos,"camz").min(0).max(200).step(1).name("cam-position-z")
    gui.add(rotatedeg,"rotatex").min(-180).max(180).step(1).name("cam-rotation-x")
    gui.add(rotatedeg,"rotatey").min(-180).max(180).step(1).name("cam-rotation-y")
    gui.add(rotatedeg,"rotatez").min(-180).max(180).step(1).name("cam-rotation-z")
    gui.add(objpos,"x").min(-40).max(40).step(1).name("obj pos-x")
    gui.add(objpos,"y").min(-40).max(40).step(1).name("obj pos-y")
    gui.add(objpos,"z").min(-10).max(40).step(1).name("obj pos-z")
    gui.add(objrot,"x").min(-180).max(180).step(1).name("obj rot-x")
    gui.add(objrot,"y").min(-180).max(180).step(1).name("obj rot-y")
    gui.add(objrot,"z").min(-180).max(180).step(1).name("obj rot-z")
    gui.add(light,"alight").min(0).max(1).step(0.1).name("Ambient light")
    gui.add(light,"dlight").min(0).max(1).step(0.1).name("Directional light") 
    gui.add(islandrotate,"rotatex").min(-180).max(180).step(1).name("island rotate x")
    gui.add(islandrotate,"rotatey").min(-180).max(180).step(1).name("island rotate y")
    // gui.add(islandrotate,"rotatey").min(-180).max(180).step(1)
    // gui.add(islandrotate,"rotatez").min(-180).max(180).step(1)
//gui

  useEffect(()=>{
    //log
   console.log(actions)
   console.log(node2)
   window.addEventListener("wheel", handleWheel);
   window.addEventListener("mousedown", handleMouseDown);
     window.addEventListener("mouseup", handleMouseUp);
     window.addEventListener("mousemove", handleMouseMove);
 return () =>{ window.removeEventListener("wheel", handleWheel);
 window.removeEventListener("mousedown", handleMouseDown);
 window.removeEventListener("mouseup", handleMouseUp);
 window.removeEventListener("mousemove", handleMouseMove);
}
  })
  useFrame((state, delta) => {
    cameraref.current!.position.copy(new THREE.Vector3(pos.camx,pos.camy,pos.camz))
    cameraref.current.rotation.x = (Math.PI/180)*rotatedeg.rotatex
    cameraref.current.rotation.y = (Math.PI/180)*rotatedeg.rotatey
    cameraref.current.rotation.z = (Math.PI/180)*rotatedeg.rotatez
    islandref.current!.rotation.x = (Math.PI/180)*islandrotate.rotatex
    islandref.current!.rotation.y = (Math.PI/180)*islandrotate.rotatey
    refsafe.current!.position.copy(new THREE.Vector3(objpos.x,objpos.y,objpos.z))
    refsafe.current.rotation.x = (Math.PI/180)*objrot.x
    refsafe.current.rotation.y = (Math.PI/180)*objrot.y
    refsafe.current.rotation.z = (Math.PI/180)*objrot.z
    alightref.current.intensity= light.alight
    dlightref.current.intensity= light.dlight
      //control
    
  });
  return(
  <>
  <ambientLight intensity={0.5} ref={alightref} />
  <directionalLight intensity={0.3} ref={dlightref}/>
  <PerspectiveCamera makeDefault={true}  ref={cameraref} />
  <group ref={refsafe} position={[0,0,0]} rotation={[0,0,0]}  >
      <mesh scale={1.5}>
        <primitive object={node2.nodes.Main} />
      </mesh>
  </group>
  <group >
  <mesh scale={1} ref={islandref}>
      {/* <TransformControls object={ref2}/> */}
      <primitive object={nodesloader.Main} />
  </mesh>
  {/* <TransformControls object={pos2}/> */}
  </group>
  </>
  )
}
