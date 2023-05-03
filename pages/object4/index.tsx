import { useThree, useFrame,Canvas,useLoader } from "react-three-fiber";
import { Vector3, Euler,SpotLightHelper } from "three";
import { useEffect, useRef ,useState,Suspense} from "react";
import Head from 'next/head'
import mesh from "react-three-fiber"
import styles from '@/styles/Home.module.css'
import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, useAnimations,Html, Stats, TransformControls,PerspectiveCamera, PivotControls,useHelper } from "@react-three/drei";
import { useFBX,useGLTF } from '@react-three/drei';
import * as THREE from "three";
import * as Gui from "lil-gui";
import firestore from "@/firebase/ClientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs,addDoc,updateDoc, doc} from "@firebase/firestore";

export default function Home() {
  const [savedo,setsavedo] = useState<any>(null)
  const [message, setMessage] = useState("nomsg");
  const [saved,setsaved] = useState<any>(null)
  const [saved2,setsaved2] = useState<any>(null)
  const [saved3,setsaved3] = useState<any>(null)
  const [saved4,setsaved4] = useState<any>(null)
  const [saved5,setsaved5] = useState<any>(null)
  const getsavedo = async () => {
    setsaved(null)
    setsavedo(null)
    const object1 = collection(firestore as any,'object');
    const fetchvalue= query(object1);
    const spolight1 = collection(firestore as any,'spotlight1');
    const Collection2= query(spolight1);
    const data = await getDocs(fetchvalue);
    const data2 = await getDocs(Collection2);
    const result:any = [];
    const result2:any = [];
    data.forEach((data) => {
    result.push(data);
    });
    data2.forEach((data2) => {
    result2.push(data2);
    });
    // set it to state
    // console.log(result)
    setsavedo(result[3]._document.data.value.mapValue.fields)
    setsaved2(result2[1]._document.data.value.mapValue.fields)
    setsaved3(result2[2]._document.data.value.mapValue.fields)
    setsaved4(result2[3]._document.data.value.mapValue.fields)
    setsaved(result2[0]._document.data.value.mapValue.fields)
    setsaved5(result2[4]._document.data.value.mapValue.fields)
  };
  
  let safevalue: { x?: any; y?: any; z?: any; rx?: any; ry?: any; rz?: any; s?: any;a?: any; d?: any; i?: any; ly?: any; p?: any; } | null=null
  let spotlight: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let spotlight2: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let spotlight3: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let spotlight4: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let d: { al: any; dc?: any; dl?: number; drx?: number; drz?: number;} | null=null  
  if(savedo){
    // console.log(savedo)
    safevalue = {x:parseFloat(savedo.x.stringValue),y:parseFloat(savedo.y.stringValue),z:parseFloat(savedo.z.stringValue),rx:parseFloat(savedo.rx.stringValue),ry:parseFloat(savedo.ry.stringValue),rz:parseFloat(savedo.rz.stringValue),s:parseFloat(savedo.s.stringValue),a:parseFloat(savedo.a.stringValue),d:parseFloat(savedo.d.stringValue),i:parseFloat(savedo.i.stringValue),ly:parseFloat(savedo.ly.stringValue),p:parseFloat(savedo.p.stringValue)}
    spotlight = {x:parseFloat(saved.posx.stringValue),y:parseFloat(saved.posy.stringValue),z:parseFloat(saved.posz.stringValue),tx:parseFloat(saved.targetx.stringValue),ty:parseFloat(saved.targety.stringValue),tz:parseFloat(saved.targetz.stringValue),penum:parseFloat(saved.penumbra.stringValue),inten:parseFloat(saved.intensity.stringValue),d:parseFloat(saved.distance.stringValue),angle:parseFloat(saved.angle.stringValue),c:saved.color.stringValue}
    spotlight2 = {x:parseFloat(saved2.posx.stringValue),y:parseFloat(saved2.posy.stringValue),z:parseFloat(saved2.posz.stringValue),tx:parseFloat(saved2.targetx.stringValue),ty:parseFloat(saved2.targety.stringValue),tz:parseFloat(saved2.targetz.stringValue),penum:parseFloat(saved2.penumbra.stringValue),inten:parseFloat(saved2.intensity.stringValue),d:parseFloat(saved2.distance.stringValue),angle:parseFloat(saved2.angle.stringValue),c:saved2.color.stringValue}
    spotlight3 = {x:parseFloat(saved3.posx.stringValue),y:parseFloat(saved3.posy.stringValue),z:parseFloat(saved3.posz.stringValue),tx:parseFloat(saved3.targetx.stringValue),ty:parseFloat(saved3.targety.stringValue),tz:parseFloat(saved3.targetz.stringValue),penum:parseFloat(saved3.penumbra.stringValue),inten:parseFloat(saved3.intensity.stringValue),d:parseFloat(saved3.distance.stringValue),angle:parseFloat(saved3.angle.stringValue),c:saved3.color.stringValue}
    spotlight4 = {x:parseFloat(saved4.posx.stringValue),y:parseFloat(saved4.posy.stringValue),z:parseFloat(saved4.posz.stringValue),tx:parseFloat(saved4.targetx.stringValue),ty:parseFloat(saved4.targety.stringValue),tz:parseFloat(saved4.targetz.stringValue),penum:parseFloat(saved4.penumbra.stringValue),inten:parseFloat(saved4.intensity.stringValue),d:parseFloat(saved4.distance.stringValue),angle:parseFloat(saved4.angle.stringValue),c:saved4.color.stringValue}
    d = {al:parseFloat(saved5.al.stringValue),dc:saved5.dc.stringValue,dl:parseFloat(saved5.dl.stringValue),drx:parseFloat(saved5.drx.stringValue),drz:parseFloat(saved5.drz.stringValue)}
  }
  const update = async () => {
    try {
      setsavedo(null)
      updateDoc(doc(firestore,'object',"safe"),{
        s: (safevalue!.s).toString(),
        x: (safevalue!.x).toString(),
        y: (safevalue!.y).toString(),
        z: (safevalue!.z).toString(),
        rx: (safevalue!.rx).toString(),
        ry: (safevalue!.ry).toString(),
        rz: (safevalue!.rz).toString(),
        ly: (safevalue!.ly).toString(),
        i: (safevalue!.i).toString(),
        p: (safevalue!.p).toString(),
        d: (safevalue!.d).toString(),
        a: (safevalue!.a).toString(),
      });
      // Set a success message
      setMessage("save เสดแล้วไอ่สัส click สี่เหลี่ยมนี้เพื่อปิด");
      setTimeout( () => {
        getsavedo()
      },2000)
    } catch (error) {
      // Set an error message
      setMessage("update ผิดพลาดไอ่สัส เกิดปัญหาอะดิ๊ click สี่เหลี่ยมนี้เพื่อปิด");
    }
  };
  useEffect(()=>{ 
    setTimeout( () => {
      getsavedo()
    },2000)
    },[])
    console.log(spotlight)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     {(savedo&&saved)?(<div className='bg-black w-[100vw] h-[100vh] cursor-grab active:cursor-grabbing '>
     <button onClick={()=>update()} className="w-60 h-20 bg-slate-400 bg-opacity-80 absolute bottom-[1vw] left-[1vw] z-40 rounded-xl border-4 border-black">
        <p className="text-xl text-black">{"SAVE"}</p>
      </button>
      {message=="nomsg"?(null):(<button onClick={()=>setMessage("nomsg")} className="w-[50vw] h-[20vw] bg-slate-400 bg-opacity-80 absolute bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] z-40 rounded-xl border-4 border-black">
        <p className="text-4xl text-black">{message}</p>
      </button>)}     
      <Canvas >
        <Suspense fallback={null}>
        
          <Island safevalue = {safevalue} s1={spotlight} s2={spotlight2} s3={spotlight3} s4={spotlight4} d={d}/>
        </Suspense>
      </Canvas>
     </div>):(null)}
    </>
  )
}
const Island = ({safevalue,s1,s2,s3,s4,d}:{safevalue:any,s1:any,s2:any,s3:any,s4:any,d:any}) =>{
  console.log(s1)
//loader
  const nodesloader = useLoader(GLTFLoader, 'island4.glb')['nodes'];
  const glb = useGLTF("island4.glb");
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
  let alllight={s1:true}
//position variable

//obj
    const safe = useGLTF("safe/safef2.glb");
    const node2 = useLoader(GLTFLoader, "safe/safef2.glb");
    const refsafe = useRef<any>()
    const {actions} = useAnimations(safe.animations,refsafe)
    
//obj

//light
const spotlightrefo = useRef<any>()
const spotlightref1 = useRef<any>()
const spotlightref2 = useRef<any>()
const spotlightref3 = useRef<any>()
const spotlightref4 = useRef<any>()

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
        gui.add(safevalue,"ly").min(1).max(40).step(1).name("spotlight-height")
        gui.add(safevalue,"p").min(0).max(1).step(0.1).name("penumbra")
        gui.add(safevalue,"i").min(0).max(10).step(0.1).name("intensity")
        gui.add(safevalue,"d").min(1).max(300).step(1).name("distance")
        gui.add(safevalue,"a").min(0).max(90).step(1).name("angle")
        gui.add( alllight, 's1' ).name("Sync Light");
   
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
    spotlightref3.current.intensity=s3.inten
    spotlightref1.current.intensity=s1.inten
    spotlightref2.current.intensity=s2.inten
    spotlightref4.current.intensity=s4.inten
    alightref.current.intensity= d.al
    dlightref.current.intensity= d.dl
    dlightref.current.color.set(d.dc)
    spotlightrefo.current.intensity=safevalue.i
    spotlightrefo.current.distance=safevalue.d
    spotlightrefo.current.penumbra=safevalue.p
    spotlightrefo.current.angle=(Math.PI/180)*safevalue.a
    spotlightrefo.current.position.y=safevalue.ly
      //lightcondition
    if(!(alllight.s1)){
        spotlightref3.current.intensity=0
        spotlightref1.current.intensity=0
        spotlightref2.current.intensity=0
        spotlightref4.current.intensity=0
        dlightref.current.color.set('#ffffff')
        dlightref.current.intensity=0
        alightref.current.intensity=0
    }
      //control
    
  });
  const object = new THREE.Object3D();
  object.position.set(s1.tx,s1.ty,s1.tz)
  const object2 = new THREE.Object3D();
  object2.position.set(s2.tx,s2.ty,s2.tz)
  const object3 = new THREE.Object3D();
  object3.position.set(s3.tx,s3.ty,s3.tz)
  const object4 = new THREE.Object3D();
  object4.position.set(s4.tx,s4.ty,s4.tz)
  useHelper(spotlightrefo,SpotLightHelper, 'yellow')
  
  return(
  <>
  <ambientLight intensity={0.5} ref={alightref} />
  <directionalLight intensity={0.3} ref={dlightref}/>
  
  <PerspectiveCamera makeDefault={true}  ref={cameraref} />
  <group ref={refsafe} position={[0,0,0]} rotation={[0,0,0]} scale={1.5}  >
      <mesh >
        <primitive object={node2.nodes.Main} />
      </mesh>
      <spotLight
        ref={spotlightrefo}
        color={"#ffffff"}
        intensity={safevalue.i}
        position={[0,safevalue.ly,0]}  
        penumbra={safevalue.p}
        angle={(Math.PI/180)*safevalue.a}
        distance={safevalue.d}
        castShadow={false} 
        target={node2.nodes.Main}
      />
  </group>
  <group >
  <mesh scale={1} ref={islandref}>
      {/* <TransformControls object={ref2}/> */}
      <primitive object={nodesloader.Main} />
  </mesh>
  <spotLight
        ref={spotlightref1}
        color={s1.c}
        intensity={s1.inte}
        position={[s1.x,s1.y,s1.z]}  
        penumbra={s1.penum}
        angle={(Math.PI/180)*s1.angle}
        distance={s1.d}
        castShadow={false} 
        target={object}
      />
    <spotLight
        ref={spotlightref2}
        color={s2.c}
        intensity={s2.inten}
        position={[s2.x,s2.y,s2.z]}  
        penumbra={s2.penum}
        angle={(Math.PI/180)*s2.angle}
        distance={s2.d}
        castShadow={false} 
        target={object2}
      />
     <spotLight
        ref={spotlightref3}
        color={s3.c}
        intensity={s3.inten}
        position={[s3.x,s3.y,s3.z]}  
        penumbra={s3.penum}
        angle={(Math.PI/180)*s3.angle}
        distance={s3.d}
        castShadow={false} 
        target={object3}
      />
     <spotLight
      ref={spotlightref4}
        color={s4.c}
        intensity={s4.inten}
        position={[s4.x,s4.y,s4.z]}  
        penumbra={s4.penum}
        angle={(Math.PI/180)*s4.angle}
        distance={s4.d}
        castShadow={false} 
        target={object4}
      />
  </group>
  </>
  )
}