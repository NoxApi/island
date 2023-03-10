import Head from 'next/head'
import mesh from "react-three-fiber"
import styles from '@/styles/Home.module.css'
import { Canvas,useThree } from 'react-three-fiber'
import { Suspense, useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, useAnimations,Html, Stats, TransformControls,PerspectiveCamera, PivotControls,Torus } from "@react-three/drei";
import { useFBX,useGLTF } from '@react-three/drei';
import * as THREE from "three";
import { Build } from '@/components/building';
import { Safe } from '@/components/safe';
import { Syn } from '@/components/syn';
import { Capsule } from '@/components/capsule';
export default  function Home() {
  const [ destination,setdestination ] = useState(() => new THREE.Vector3(0,0,30))
  const [items,setitems] = useState(0)
  const set0 = () =>{
    setdestination(() => new THREE.Vector3(0,0,60))
    setitems(0)
  }
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
     <div className='bg-black w-[100vw] h-[100vh]'>
     {/* <button onClick={()=>set0()} className='bg-[#000000] flex justify-center items-center bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[60px] h-[60px]  border-2 rounded-[50%] absolute top-[10vw] right-[10vw] z-30'>
              <a className='text-white text-5xl mb-3'>x</a>
      </button> */}
      <div className='w-full h-full z-20'>
      <Canvas >
        {/* <PerspectiveCamera makeDefault={true}  position={[0,10,20]}/> */}
        {/* <PerspectiveCamera makeDefault={true} position={[position.x,position.y,15]} rotation={[-0.5,0,0]} /> */}
        {/* <Scene/> */}
        <Suspense fallback={null}>
        <ambientLight intensity={0} />
        <directionalLight intensity={0}/>
        <directionalLight intensity={0} position={[2,1,3]}/>
          {/* <Box/> */}
          <Island setdestination={setdestination} destination={destination} setitems={setitems} items={items} />
          {/* <mesh  position={[0,0,0]}>
            <sphereBufferGeometry args={[2, 50, 50]} wireframe={true} />
            <meshStandardMaterial  color={"#ff0000"} />
          </mesh> */}
          <Build position={{x:0,y:0,z:0}} rotation={{x:8,y:260,z:-2}}/>
        {/* <OrbitControls enableRotate={true} enableZoom={true} enabled={true}
         minDistance={40}
         maxDistance={80}/> */}
        </Suspense>
      </Canvas>
      </div>
     </div>
    </>
  )
}
const Island = ({
  destination,
  setdestination,
  setitems,
  items
}:
{
  destination:any,
  setdestination:any
  setitems:any,
  items:any
}) =>{
  const cameraref=useRef<any>()
  const glb = useGLTF("island3.glb");
  const node = useLoader(GLTFLoader, 'island3.glb');
  const ref2 = useRef<any>()
  const pos1 = useRef<any>()
  const pos2 = useRef<any>()
  const pos3 = useRef<any>()
  const pos4 = useRef<any>()
  const pos5 = useRef<any>()
  const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(0,0,0))
  useEffect(()=>{
    console.log(node)
  },)
  useFrame((state, delta) => {
    smoothedCameraPosition.lerp(destination, 0.04)
    cameraref.current.position.copy(smoothedCameraPosition)
  });
  const object = new THREE.Object3D();
  object.position.set(4,24,0)
  
  return(
  <>
  <ambientLight intensity={0.5}/>
  <PerspectiveCamera makeDefault={true} position={[0,0,0]} rotation={[0,0,0]} ref={cameraref} />
  <group position={[0,0,0]}>
  </group>
  <spotLight

        color="#FFD7D7"
        intensity={0.15}
        position={[30, 100,-20]}  
        penumbra={1}
        angle={(Math.PI/180)*40}
        distance={400}
        castShadow={false} 
      />
    <spotLight

        color="#ffffff"
        intensity={1.8}
        position={[60, 50,30]}  
        penumbra={1}
        angle={(Math.PI/180)*40}
        distance={90}
        castShadow={false} 
      />
      <spotLight
 
        color="#ffffff"
        intensity={2}
        position={[-60, 50,20]}  
        penumbra={1}
        angle={(Math.PI/180)*40}
        distance={80}
        castShadow={false} 
      />
      <spotLight

        color="#ffffff"
        intensity={1.5}
        position={[5, 55,80]}
        penumbra={1}
        angle={(Math.PI/180)*40}
        distance={160}
        castShadow={false} 
        target={object}
        
      />
  </>
  )
}