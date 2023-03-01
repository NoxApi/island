import Head from 'next/head'
import mesh from "react-three-fiber"
import styles from '@/styles/Home.module.css'
import { Canvas,useThree } from 'react-three-fiber'
import { Suspense, useEffect, useState,useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, useAnimations,Html, Stats, TransformControls,PerspectiveCamera, PivotControls } from "@react-three/drei";
import { useFBX,useGLTF } from '@react-three/drei';
import * as THREE from "three";
import { Camera } from 'three';
import * as Gui from "lil-gui";
// import { Build } from '@/components/building';
// import { Safe } from '@/components/safe';
export default function Home() {
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
     <div className='bg-red-300 w-[100vw] h-[100vh]'>
      <Canvas >
        {/* <PerspectiveCamera makeDefault={true}  position={[0,10,20]}/> */}
        {/* <PerspectiveCamera makeDefault={true} position={[position.x,position.y,15]} rotation={[-0.5,0,0]} /> */}
        {/* <Scene/> */}
        <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.3}/>
          {/* <Box/> */}
          <Island/>

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
  const cameraref=useRef<any>()
  const nodesloader = useLoader(GLTFLoader, 'island3.glb')['nodes'];
  const glb = useGLTF("island3.glb");
  const islandref = useRef<any>()
  const pos1 = useRef<any>()
  const pos2 = useRef<any>()
  const pos3 = useRef<any>()
  const pos4 = useRef<any>()
  const pos5 = useRef<any>()
  let pos ={camx:5,camy:20,camz:80}
  let objpos ={x:-13,y:18,z:4}
  let objrot ={x:-1,y:34,z:3}
  let rotatedeg={rotatex:0,rotatey:0,rotatez:0}
  let islandrotate={rotatex:10,rotatey:-100,rotatez:0}
  const gui = new Gui.GUI()
  const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(0,20,60))
  const [ destination,setdestination ] = useState(() => new THREE.Vector3(0,20,60))
  const movetosafe= () =>{
    setdestination(() => new THREE.Vector3(8.5,4,70))
    // setitems(1)
  }
//obj
    const safe = useGLTF("build/1.glb");
    const node2 = useLoader(GLTFLoader, 'build/1.glb');
    const refsafe = useRef<any>()
    const {actions} = useAnimations(safe.animations,refsafe)


//obj
    gui.add(pos,"camx").min(-100).max(100).step(1)
    gui.add(pos,"camy").min(-100).max(100).step(1)
    gui.add(pos,"camz").min(0).max(200).step(1)
    gui.add(rotatedeg,"rotatex").min(-180).max(180).step(1)
    gui.add(rotatedeg,"rotatey").min(-180).max(180).step(1)
    gui.add(rotatedeg,"rotatez").min(-180).max(180).step(1)
    gui.add(objpos,"x").min(-40).max(40).step(1).name("obj pos-x")
    gui.add(objpos,"y").min(-40).max(40).step(1).name("obj pos-y")
    gui.add(objpos,"z").min(-10).max(40).step(1).name("obj pos-z")
    gui.add(objrot,"x").min(-180).max(180).step(1).name("obj rot-x")
    gui.add(objrot,"y").min(-180).max(180).step(1).name("obj rot-y")
    gui.add(objrot,"z").min(-180).max(180).step(1).name("obj rot-z")
   
    gui.add(islandrotate,"rotatex").min(-180).max(180).step(1).name("island rotate x")
    gui.add(islandrotate,"rotatey").min(-180).max(180).step(1).name("island rotate y")
    // gui.add(islandrotate,"rotatey").min(-180).max(180).step(1)
    // gui.add(islandrotate,"rotatez").min(-180).max(180).step(1)
  useEffect(()=>{
    // setdestination(new THREE.Vector3(pos.x,pos.y,pos.z))
    //obj
    actions.Safe_safe_door_Anim_0?.play()
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
  });
  return(
  <>
  <PerspectiveCamera makeDefault={true}  ref={cameraref} />
  {/* <Build position={{x:6,y:10,z:30}} rotation={{x:0,y:13,z:0}}/> */}
  {/* <Safe position={{x:0,y:0,z:0}} rotation={{x:0,y:0,z:0}}/> */}
  <Build position={{x:14,y:25.5,z:8}} rotation={{x:0,y:270,z:0}}/>
  {/* <Safe position={{x:-10,y:19,z:12}} rotation={{x:10,y:0,z:0}}/> */}
  <mesh scale={1} position={[0,0,0]}>
          <sphereGeometry args={[1.5,32,32]}/>
          <torusKnotGeometry />
          <meshNormalMaterial wireframe/>
  </mesh>
  <group ref={refsafe} position={[0,0,0]} rotation={[0,0,0]}  >
      <mesh scale={1.5}>
        <primitive object={node2.nodes.Main} />
      </mesh>
    </group>
  <group position={[0,0,0]}>
  <mesh scale={1} ref={islandref}>
      {/* <TransformControls object={ref2}/> */}
      <primitive object={nodesloader.Main} />
  </mesh>
     <mesh ref={pos5}  position={[4.1,21,7]}   >    
        <Html center={true} distanceFactor={60} >
            <button onClick={()=>null} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
              <a className='text-white text-2xl'>5</a>
            </button>
        </Html>
      </mesh> 
      <mesh ref={pos3}  position={[-4.9,27,0.9]}   >    
        <Html center={true} distanceFactor={60} >
            <button onClick={()=>null} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
              <a className='text-white text-2xl'>3</a>
            </button>
        </Html>
      </mesh> 
      <mesh ref={pos4}  position={[-14.5,24,3.4]}   >    
        <Html center={true} distanceFactor={60} >
            <button onClick={()=>movetosafe()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
              <a className='text-white text-2xl'>4</a>
            </button>
        </Html>
      </mesh> 
      <mesh ref={pos1}  position={[24.6,23,3.4]}   >    
        <Html center={true} distanceFactor={60} >
            <button onClick={()=>null} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
              <a className='text-white text-2xl'>1</a>
            </button>
        </Html>
      </mesh> 
      <mesh ref={pos2}  position={[12.21,29,-3]}   >    
        <Html center={true} distanceFactor={60} >
            <button onClick={()=>null} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
              <a className='text-white text-2xl'>2</a>
            </button>
        </Html>
      </mesh> 
  {/* <TransformControls object={pos2}/> */}
  </group>
  </>
  )
}

const Build = ({
  position,
  rotation,
}:{
  position:any,
  rotation:any,   
}) =>{
const glb1 = useGLTF("build/1.glb");
const node1 = useLoader(GLTFLoader, 'build/1.glb');
const glb2 = useGLTF("build/2.glb");
const node2 = useLoader(GLTFLoader, 'build/2.glb');
const glb3 = useGLTF("build/3.glb");
const node3 = useLoader(GLTFLoader, 'build/3.glb');
const glb4 = useGLTF("build/4.glb");
const node4 = useLoader(GLTFLoader, 'build/4.glb');
const glb5 = useGLTF("build/5.glb");
const node5 = useLoader(GLTFLoader, 'build/5.glb');
const glb6 = useGLTF("build/6.glb");
const node6 = useLoader(GLTFLoader, 'build/6.glb');
const ref1 = useRef<any>()
const ref2 = useRef<any>()
const ref3 = useRef<any>()
const ref4 = useRef<any>()
const ref5 = useRef<any>()
const ref6 = useRef<any>()
const animate2 = useAnimations(glb2.animations,ref2)
const animate3 = useAnimations(glb3.animations,ref3)
const animate4 = useAnimations(glb4.animations,ref4)
const animate5 = useAnimations(glb5.animations,ref5)
const animate6 = useAnimations(glb6.animations,ref6)
// const mixer = new THREE.AnimationMixer(glb)
// void mixer.clipAction(glb.animations[0]).play();
useFrame((state, delta) => {
// mixer.update(delta);
});
useEffect(()=>{
console.log(animate6)
animate2.actions.Building_ArmRotor_Animate_Anim_0?.play()
animate3.actions.Building_LowerRotor_Animate_Anim_0?.play()
animate4.actions.Building_UpperRotor_Animate_Anim_0?.play()
animate5.actions.Building_Sphere_Animate_Anim_0?.play()
animate6.actions.Building_Cylinder_Animate__2__Anim_0?.play()


})
return(
<>

<group ref={ref1} position={[position.x,position.y,position.z ]} rotation={[(Math.PI/180)*rotation.x,(Math.PI/180)*rotation.y,(Math.PI/180)*rotation.z]} >
<group position={[0,-24.2,12]}>
<mesh >
  <primitive object={node1.nodes.Main} />
</mesh>
<mesh ref={ref2}>
  <primitive object={node2.nodes.Main} />
</mesh>
<mesh ref={ref3}>
  <primitive object={node3.nodes.Main} />
</mesh>
<mesh ref={ref4}>
  <primitive object={node4.nodes.Main} />
</mesh>
<mesh ref={ref5}>
  <primitive object={node5.nodes.Main} />
</mesh>
<mesh ref={ref6}>
  <primitive object={node6.nodes.Main} />
</mesh>
</group>
</group>
{/* <TransformControls ref={ref1}/> */}
</>
)
}