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
import * as Gui from "lil-gui";
import firestore from "@/firebase/ClientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs,addDoc,updateDoc, doc} from "@firebase/firestore";

export default function Home() {
  const [saved,setsaved] = useState<any>(null)
  const [message, setMessage] = useState("nomsg");
  const getsaved = async () => {
    const spolight1 = collection(firestore as any,'safe');
    const fetchvalue= query(spolight1);
    const data = await getDocs(fetchvalue);
    const result:any = [];
    data.forEach((data) => {
    result.push(data);
    });
    // set it to state
    // console.log(result)
    setsaved(result[0]._document.data.value.mapValue.fields)
  };
  
  let safevalue: { x?: any; y?: any; z?: any; rx?: any; ry?: any; rz?: any; s?: any; } | null=null
  if(saved){
    // console.log(saved)
    safevalue = {x:parseFloat(saved.x.stringValue),y:parseFloat(saved.y.stringValue),z:parseFloat(saved.z.stringValue),rx:parseFloat(saved.rx.stringValue),ry:parseFloat(saved.ry.stringValue),rz:parseFloat(saved.rz.stringValue),s:parseFloat(saved.s.stringValue)}
  }
  const update = async () => {
    try {
      updateDoc(doc(firestore,'safe',"TtO7RwUpHHN1wfxbCxdm"),{
        s: (safevalue!.s).toString(),
        x: (safevalue!.x).toString(),
        y: (safevalue!.y).toString(),
        z: (safevalue!.z).toString(),
        rx: (safevalue!.rx).toString(),
        ry: (safevalue!.ry).toString(),
        rz: (safevalue!.rz).toString(),
      });
      // Set a success message
      setMessage("save เสดแล้วไอ่สัส click สี่เหลี่ยมนี้เพื่อปิด");
      setTimeout( () => {
        getsaved()
      },2000)
    } catch (error) {
      // Set an error message
      setMessage("update ผิดพลาด เสดแล้วไอ่สัส เกิดปัญหาอะดิ๊ click สี่เหลี่ยมนี้เพื่อปิด");
    }
  };
  useEffect(()=>{ 
    setTimeout( () => {
      getsaved()
    },2000)
    },[])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     {saved?(<div className='bg-white w-[100vw] h-[100vh] cursor-grab active:cursor-grabbing '>
     <button onClick={()=>update()} className="w-60 h-20 bg-slate-400 bg-opacity-80 absolute bottom-[1vw] left-[1vw] z-40 rounded-xl border-4 border-black">
        <p className="text-xl text-black">{"SAVE"}</p>
      </button>
      {message=="nomsg"?(null):(<button onClick={()=>setMessage("nomsg")} className="w-[50vw] h-[20vw] bg-slate-400 bg-opacity-80 absolute bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] z-40 rounded-xl border-4 border-black">
        <p className="text-4xl text-black">{message}</p>
      </button>)}     
      <Canvas >
        {/* <PerspectiveCamera makeDefault={true}  position={[0,10,20]}/> */}
        {/* <PerspectiveCamera makeDefault={true} position={[position.x,position.y,15]} rotation={[-0.5,0,0]} /> */}
        {/* <Scene/> */}
        <Suspense fallback={null}>
        
          {/* <Box/> */}
          <Island safevalue = {safevalue}/>
          {/* <Build position={{x:14,y:25.8,z:8}} rotation={{x:8,y:260,z:-2}}/>
          <Safe position={{x:-13,y:18.8,z:5}} rotation={{x:10,y:31,z:3}}/>
          <Syn position={{x:25,y:16.4,z:14}} rotation={{x:16,y:43,z:-11}}/>
          <Capsule position={{x:-2,y:24,z:6}} rotation={{x:3,y:-180,z:3}}/> */}
        {/* <OrbitControls enableRotate={true} enableZoom={true} enabled={true}
         minDistance={40}
         maxDistance={80}/> */}
        </Suspense>
      </Canvas>
     </div>):(null)}
    </>
  )
}
const Island = ({safevalue}:{safevalue:any}) =>{
  console.log(safevalue)
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
  let pos ={camx:6,camy:46,camz:60}
  // <Safe position={{x:-13,y:18.8,z:5}} rotation={{x:10,y:31,z:3}}/>
  let rotatedeg={rotatex:-19,rotatey:0,rotatez:0}
  let islandrotate={rotatex:10,rotatey:-100,rotatez:0}
//position variable

//obj
    const safe = useGLTF("safe/Safef.glb");
    const node2 = useLoader(GLTFLoader, "safe/Safef.glb");
    const refsafe = useRef<any>()
    const {actions} = useAnimations(safe.animations,refsafe)
//obj

//light
    


//light

//control
const handleWheel = (e:any) => {
    e.preventDefault();
    if(pos.camy>50){
      if (e.deltaY<0){
    pos.camz += e.deltaY / 100;
    pos.camy += e.deltaY / 200;
      }
    }
    else if(pos.camy<35){
      if (e.deltaY>0){
    pos.camz += e.deltaY / 100;
    pos.camy += e.deltaY / 200;
      }
    }
    else{
    pos.camz += e.deltaY / 100;
    pos.camy += e.deltaY / 200;
    }
    // console.log(pos.camy)
  };

//control

//gui
    const gui = new Gui.GUI()
        gui.add(safevalue,"x").min(-18).max(-7).step(0.1).name("obj pos-x")
        gui.add(safevalue,"y").min(13).max(23).step(0.1).name("obj pos-y")
        gui.add(safevalue,"z").min(0).max(10).step(0.1).name("obj pos-z")
        gui.add(safevalue,"rx").min(-180).max(180).step(1).name("obj rot-x")
        gui.add(safevalue,"ry").min(-180).max(180).step(1).name("obj rot-y")
        gui.add(safevalue,"rz").min(-180).max(180).step(1).name("obj rot-z")
        gui.add(safevalue,"s").min(0).max(2).step(0.1).name("obj scale")
   
//gui

  useEffect(()=>{
    //log
   console.log(actions)
   actions.Safe_safe_door_Anim_0?.play()
  //  console.log(node2)
   window.addEventListener("wheel", handleWheel);
//    window.addEventListener("mousedown", handleMouseDown);
//      window.addEventListener("mouseup", handleMouseUp);
//      window.addEventListener("mousemove", handleMouseMove);
 return () =>{ window.removeEventListener("wheel", handleWheel);
//  window.removeEventListener("mousedown", handleMouseDown);
//  window.removeEventListener("mouseup", handleMouseUp);
//  window.removeEventListener("mousemove", handleMouseMove);
}
  })
  useFrame((state, delta) => {
    cameraref.current.position.copy(new THREE.Vector3(pos.camx,pos.camy,pos.camz))
    cameraref.current.rotation.x = (Math.PI/180)*rotatedeg.rotatex
    cameraref.current.rotation.y = (Math.PI/180)*rotatedeg.rotatey
    cameraref.current.rotation.z = (Math.PI/180)*rotatedeg.rotatez
    islandref.current!.rotation.x = (Math.PI/180)*islandrotate.rotatex
    islandref.current!.rotation.y = (Math.PI/180)*islandrotate.rotatey
    islandref.current!.rotation.z = (Math.PI/180)*islandrotate.rotatez
    refsafe.current!.position.copy(new THREE.Vector3(safevalue.x,safevalue.y,safevalue.z))
    refsafe.current.rotation.x = (Math.PI/180)*safevalue.rx
    refsafe.current.rotation.y = (Math.PI/180)*safevalue.ry
    refsafe.current.rotation.z = (Math.PI/180)*safevalue.rz
    refsafe.current.scale.x = safevalue.s
    refsafe.current.scale.y = safevalue.s
    refsafe.current.scale.z = safevalue.s
      //control
    
  });
  return(
  <>
  <ambientLight intensity={0.5} ref={alightref} />
  <directionalLight intensity={0.3} ref={dlightref}/>
  
  <PerspectiveCamera makeDefault={true}  ref={cameraref} />
  <group ref={refsafe} position={[0,0,0]} rotation={[0,0,0]} scale={1.5}  >
      <mesh >
        <primitive object={node2.nodes.Main} />
      </mesh>
  </group>
  <group >
  <mesh scale={1} ref={islandref}>
      {/* <TransformControls object={ref2}/> */}
      <primitive object={nodesloader.Main} />
  </mesh>
  </group>
  </>
  )
}