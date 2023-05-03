import { useThree, useFrame,Canvas,useLoader } from "react-three-fiber";
import { Vector3, Euler,Camera, HemisphereLight, PointLightHelper,SpotLight, SpotLightHelper, RectAreaLight, Vector, AmbientLight} from "three";
import { useEffect, useRef ,useState,Suspense} from "react";
import Head from 'next/head'
import mesh from "react-three-fiber"
import styles from '@/styles/Home.module.css'
import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, useAnimations,Html, Stats, TransformControls,PerspectiveCamera, PivotControls, useHelper, Point } from "@react-three/drei";
import { useFBX,useGLTF } from '@react-three/drei';
import * as THREE from "three";
import * as Gui from "lil-gui";
import LinkNewTab from "@/components/generals/LinkNewTab";
import firestore from "@/firebase/ClientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs,addDoc,updateDoc, doc} from "@firebase/firestore";
import Image from "next/image";

export default function Home() {
  const [saved,setsaved] = useState<any>(null)
  const [saved2,setsaved2] = useState<any>(null)
  const [saved3,setsaved3] = useState<any>(null)
  const [saved4,setsaved4] = useState<any>(null)
  const [saved5,setsaved5] = useState<any>(null)
  const [savedo1,setsavedo1] = useState<any>(null)
  const [savedo2,setsavedo2] = useState<any>(null)
  const [savedo3,setsavedo3] = useState<any>(null)
  const [savedo4,setsavedo4] = useState<any>(null)
  const [savedo5,setsavedo5] = useState<any>(null)
  const getsaved = async () => {
    setsaved(null)
    setsavedo1(null)
    const object1 = collection(firestore as any,'object');
    const fetchvalue= query(object1);
    const spolight1 = collection(firestore as any,'spotlight1');
    const Collection2= query(spolight1);
    const data = await getDocs(fetchvalue);
    const data2 = await getDocs(Collection2);
    const result:any = [];
    const result2:any = [];
    data2.forEach((data2) => {
    result.push(data2);
    });
    data.forEach((data) => {
    result2.push(data);
    });
    // set it to state
    setsaved2(result[1]._document.data.value.mapValue.fields)
    setsaved3(result[2]._document.data.value.mapValue.fields)
    setsaved4(result[3]._document.data.value.mapValue.fields)
    setsaved(result[0]._document.data.value.mapValue.fields)
    setsaved5(result[4]._document.data.value.mapValue.fields)
    setsavedo2(result2[0]._document.data.value.mapValue.fields)
    setsavedo3(result2[1]._document.data.value.mapValue.fields)
    setsavedo5(result2[2]._document.data.value.mapValue.fields)
    setsavedo4(result2[3]._document.data.value.mapValue.fields)
    setsavedo1(result2[4]._document.data.value.mapValue.fields)
  };
  let spotlight: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let spotlight2: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let spotlight3: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let spotlight4: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let d: { al: any; dc?: any; dl?: number; drx?: number; drz?: number;} | null=null  
  let o1: { x?: any; y?: any; z?: any; rx?: any; ry?: any; rz?: any; s?: any;a?: any; d?: any; i?: any; ly?: any; p?: any; } | null=null
  let o2: { x?: any; y?: any; z?: any; rx?: any; ry?: any; rz?: any; s?: any;a?: any; d?: any; i?: any; ly?: any; p?: any; } | null=null
  let o3: { x?: any; y?: any; z?: any; rx?: any; ry?: any; rz?: any; s?: any;a?: any; d?: any; i?: any; ly?: any; p?: any; } | null=null
  let o4: { x?: any; y?: any; z?: any; rx?: any; ry?: any; rz?: any; s?: any;a?: any; d?: any; i?: any; ly?: any; p?: any; } | null=null
  let o5: { x?: any; y?: any; z?: any; rx?: any; ry?: any; rz?: any; s?: any;a?: any; d?: any; i?: any; ly?: any; p?: any; } | null=null
  if(saved){
    spotlight = {x:parseFloat(saved.posx.stringValue),y:parseFloat(saved.posy.stringValue),z:parseFloat(saved.posz.stringValue),tx:parseFloat(saved.targetx.stringValue),ty:parseFloat(saved.targety.stringValue),tz:parseFloat(saved.targetz.stringValue),penum:parseFloat(saved.penumbra.stringValue),inten:parseFloat(saved.intensity.stringValue),d:parseFloat(saved.distance.stringValue),angle:parseFloat(saved.angle.stringValue),c:saved.color.stringValue}
    spotlight2 = {x:parseFloat(saved2.posx.stringValue),y:parseFloat(saved2.posy.stringValue),z:parseFloat(saved2.posz.stringValue),tx:parseFloat(saved2.targetx.stringValue),ty:parseFloat(saved2.targety.stringValue),tz:parseFloat(saved2.targetz.stringValue),penum:parseFloat(saved2.penumbra.stringValue),inten:parseFloat(saved2.intensity.stringValue),d:parseFloat(saved2.distance.stringValue),angle:parseFloat(saved2.angle.stringValue),c:saved2.color.stringValue}
    spotlight3 = {x:parseFloat(saved3.posx.stringValue),y:parseFloat(saved3.posy.stringValue),z:parseFloat(saved3.posz.stringValue),tx:parseFloat(saved3.targetx.stringValue),ty:parseFloat(saved3.targety.stringValue),tz:parseFloat(saved3.targetz.stringValue),penum:parseFloat(saved3.penumbra.stringValue),inten:parseFloat(saved3.intensity.stringValue),d:parseFloat(saved3.distance.stringValue),angle:parseFloat(saved3.angle.stringValue),c:saved3.color.stringValue}
    spotlight4 = {x:parseFloat(saved4.posx.stringValue),y:parseFloat(saved4.posy.stringValue),z:parseFloat(saved4.posz.stringValue),tx:parseFloat(saved4.targetx.stringValue),ty:parseFloat(saved4.targety.stringValue),tz:parseFloat(saved4.targetz.stringValue),penum:parseFloat(saved4.penumbra.stringValue),inten:parseFloat(saved4.intensity.stringValue),d:parseFloat(saved4.distance.stringValue),angle:parseFloat(saved4.angle.stringValue),c:saved4.color.stringValue}
    d = {al:parseFloat(saved5.al.stringValue),dc:saved5.dc.stringValue,dl:parseFloat(saved5.dl.stringValue),drx:parseFloat(saved5.drx.stringValue),drz:parseFloat(saved5.drz.stringValue)}
    o1 = {x:parseFloat(savedo1.x.stringValue),y:parseFloat(savedo1.y.stringValue),z:parseFloat(savedo1.z.stringValue),rx:parseFloat(savedo1.rx.stringValue),ry:parseFloat(savedo1.ry.stringValue),rz:parseFloat(savedo1.rz.stringValue),s:parseFloat(savedo1.s.stringValue),a:parseFloat(savedo1.a.stringValue),d:parseFloat(savedo1.d.stringValue),i:parseFloat(savedo1.i.stringValue),ly:parseFloat(savedo1.ly.stringValue),p:parseFloat(savedo1.p.stringValue)}
    o2 = {x:parseFloat(savedo2.x.stringValue),y:parseFloat(savedo2.y.stringValue),z:parseFloat(savedo2.z.stringValue),rx:parseFloat(savedo2.rx.stringValue),ry:parseFloat(savedo2.ry.stringValue),rz:parseFloat(savedo2.rz.stringValue),s:parseFloat(savedo2.s.stringValue),a:parseFloat(savedo2.a.stringValue),d:parseFloat(savedo2.d.stringValue),i:parseFloat(savedo2.i.stringValue),ly:parseFloat(savedo2.ly.stringValue),p:parseFloat(savedo2.p.stringValue)}
    o3 = {x:parseFloat(savedo3.x.stringValue),y:parseFloat(savedo3.y.stringValue),z:parseFloat(savedo3.z.stringValue),rx:parseFloat(savedo3.rx.stringValue),ry:parseFloat(savedo3.ry.stringValue),rz:parseFloat(savedo3.rz.stringValue),s:parseFloat(savedo3.s.stringValue),a:parseFloat(savedo3.a.stringValue),d:parseFloat(savedo3.d.stringValue),i:parseFloat(savedo3.i.stringValue),ly:parseFloat(savedo3.ly.stringValue),p:parseFloat(savedo3.p.stringValue)}
    o4 = {x:parseFloat(savedo4.x.stringValue),y:parseFloat(savedo4.y.stringValue),z:parseFloat(savedo4.z.stringValue),rx:parseFloat(savedo4.rx.stringValue),ry:parseFloat(savedo4.ry.stringValue),rz:parseFloat(savedo4.rz.stringValue),s:parseFloat(savedo4.s.stringValue),a:parseFloat(savedo4.a.stringValue),d:parseFloat(savedo4.d.stringValue),i:parseFloat(savedo4.i.stringValue),ly:parseFloat(savedo4.ly.stringValue),p:parseFloat(savedo4.p.stringValue)}
    o5 = {x:parseFloat(savedo5.x.stringValue),y:parseFloat(savedo5.y.stringValue),z:parseFloat(savedo5.z.stringValue),rx:parseFloat(savedo5.rx.stringValue),ry:parseFloat(savedo5.ry.stringValue),rz:parseFloat(savedo5.rz.stringValue),s:parseFloat(savedo5.s.stringValue),a:parseFloat(savedo5.a.stringValue),d:parseFloat(savedo5.d.stringValue),i:parseFloat(savedo5.i.stringValue),ly:parseFloat(savedo5.ly.stringValue),p:parseFloat(savedo5.p.stringValue)}
  }
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
     <div className='bg-black w-[100vw] h-[100vh] '>
      <div className="absolute bottom-[1vw] left-[1vw] flex z-40">
      <LinkNewTab href="/object1">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20   rounded-xl border-2 border-teal-200">
          <p className="text-sm text-teal-200">{"Synthesis"}</p>
        </button>
      </LinkNewTab>
      <LinkNewTab href="/object2">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 ml-1">
          <p className="text-sm text-teal-200">{"Building)"}</p>
        </button>
      </LinkNewTab>
      <LinkNewTab href="/object3">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 ml-1">
          <p className="text-sm text-teal-200">{"Capsule)"}</p>
        </button>
      </LinkNewTab>
      <LinkNewTab href="/object4">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 ml-1">
          <p className="text-sm text-teal-200">{"Safe"}</p>
        </button>
      </LinkNewTab>
      <LinkNewTab href="/object5">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 ml-1">
          <p className="text-sm text-teal-200">{"Sacred Beast"}</p>
        </button>
      </LinkNewTab>
      <LinkNewTab href="/light">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 ml-1">
          <p className="text-sm text-teal-200">{"Light"}</p>
        </button>
      </LinkNewTab>
      </div>
      <div className="absolute top-[1vw] left-[1vw] flex z-40">
        <button onClick={()=>getsaved()} className=" w-16 h-16 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 flex justify-center items-center">
          <div className="w-12 h-12 relative">
          <Image src="/sync.png" alt="" width={80} height={80}/>
          <p className="absolute text-xs top-[50%] left-[50%] translate-x-[-50%] translate-y-[-55%] text-teal-200">{"sync"}</p>
          </div>
        </button>
      </div>
   
      {(saved&&savedo1)?(<Canvas >   
        <Suspense fallback={null}>
          <Island s1={spotlight} s2={spotlight2} s3={spotlight3} s4={spotlight4} d={d} o1={savedo1}/>         
          <Synthesis savedvalue={o1}/>
          <Build savedvalue={o2}/>
          <Capsule savedvalue={o3}/>
          <Safe savedvalue={o4}/>
          <Egg savedvalue={o5}/>
        </Suspense>
      </Canvas>):(null)}
     </div>
    </>
  )
}

const Island = ({s1,s2,s3,s4,d,o1}:{s1:any,s2:any,s3:any,s4:any,d:any,o1:any}) =>{
//loader
  const nodesloader = useLoader(GLTFLoader, 'island4.glb')['nodes'];
  const glb = useGLTF("island4.glb");
//loader

//ref
  const cameraref=useRef<any>()
  const islandref = useRef<any>()
 
  const allgroupref = useRef<any>()
  const alightref = useRef<any>()
  const dlightref = useRef<any>()
//lightref
  const sunref = useRef<any>()
  const spotlightref1 = useRef<any>()
  const spotlightref2 = useRef<any>()
  const spotlightref3 = useRef<any>()
  const spotlightref4 = useRef<any>()
  

//position variable
  let light = {alight:0,dlight:0}
  let pos ={camx:6,camy:60,camz:100}
  let rotatedeg={rotatex:-19,rotatey:0,rotatez:0}
  let sunrotate={rotatex:0,rotatey:0,rotatez:0}
  let grouprotate={rotatex:0,rotatey:0,rotatez:0}
  let alllight={s1:true}
  const colorFormats = {
    string: '#ffffff',
    int: 0xffffff,
    object: { r: 1, g: 1, b: 1 },
    array: [ 1, 1, 1 ]
  };
//position variable

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
  };

//gui
    const gui = new Gui.GUI()
    gui.add(pos,"camx").min(-100).max(100).step(1).name("cam-position-x")
    gui.add(pos,"camy").min(-100).max(100).step(1).name("cam-position-y")
    gui.add(pos,"camz").min(0).max(200).step(1).name("cam-position-z")
    gui.add(rotatedeg,"rotatex").min(-180).max(180).step(1).name("cam-rotation-x")
    gui.add(rotatedeg,"rotatey").min(-180).max(180).step(1).name("cam-rotation-y")
    gui.add(rotatedeg,"rotatez").min(-180).max(180).step(1).name("cam-rotation-z")
    gui.add( alllight, 's1' ).name("Sync Light");  // Checkbox
//gui
  useEffect(()=>{
   window.addEventListener("wheel", handleWheel);
   return () =>{ window.removeEventListener("wheel", handleWheel);
}
  })
  
  useFrame((state, delta) => {
    cameraref.current.position.copy(new THREE.Vector3(pos.camx,pos.camy,pos.camz))
    cameraref.current.rotation.x = (Math.PI/180)*rotatedeg.rotatex
    cameraref.current.rotation.y = (Math.PI/180)*rotatedeg.rotatey
    cameraref.current.rotation.z = (Math.PI/180)*rotatedeg.rotatez
    allgroupref.current!.rotation.x = (Math.PI/180)*grouprotate.rotatex
    allgroupref.current!.rotation.y = (Math.PI/180)*grouprotate.rotatey
    allgroupref.current!.rotation.z = (Math.PI/180)*grouprotate.rotatez
    //todo
   
    dlightref.current.color.set(d.dc)
    sunref.current.rotation.x = (Math.PI/180)*d.drx
    sunref.current.rotation.z = (Math.PI/180)*d.drz
    spotlightref3.current.intensity=s3.inten
    spotlightref1.current.intensity=s1.inten
    spotlightref2.current.intensity=s2.inten
    spotlightref4.current.intensity=s4.inten
    alightref.current.intensity= d.al
    dlightref.current.intensity= d.dl
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
  });
  const refpoint = new THREE.Vector3(0,0,0)
  const object = new THREE.Object3D();
  object.position.set(s1.tx,s1.ty,s1.tz)
  const object2 = new THREE.Object3D();
  object2.position.set(s2.tx,s2.ty,s2.tz)
  const object3 = new THREE.Object3D();
  object3.position.set(s3.tx,s3.ty,s3.tz)
  const object4 = new THREE.Object3D();
  object4.position.set(s4.tx,s4.ty,s4.tz)
  // useHelper(spotlightref3,SpotLightHelper, 'yellow')
  return(
  <>
  <ambientLight intensity={0.5} ref={alightref} />
  <group rotation={[(Math.PI/180)*0,0,(Math.PI/180)*0]} ref={sunref}>
    <directionalLight intensity={1} ref={dlightref} position={[5,65,1]} color={"#ff0000"}/>
  </group>
  <PerspectiveCamera makeDefault={true}  ref={cameraref} />
  <group ref = {allgroupref} >
    <mesh scale={1} rotation={[(Math.PI/180)*10,(Math.PI/180)*-100,(Math.PI/180)*0]}>
        <primitive object={nodesloader.Main} />
    </mesh>
    <Synthesis savedvalue={o1}/>
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

const Synthesis = ({savedvalue}:{savedvalue:any}) =>{
//obj
    const obj5 = useGLTF("syn/synf.glb");
    const nodeobj5 = useLoader(GLTFLoader, "syn/synf.glb");
    const refsafe = useRef<any>()
    const {actions} = useAnimations(obj5.animations,refsafe)
//obj
//light
const spotlightrefo = useRef<any>()
  useEffect(()=>{
    actions.Synthesis_pCube1_Anim_1?.play()
    actions.Synthesis_polySurface47_Anim_0?.play()
  })
 
  // useHelper(spotlightrefo,SpotLightHelper,)
  return(
  <>
  <group ref={refsafe} position={[savedvalue.x,savedvalue.y,savedvalue.z]} rotation={[(Math.PI/180)*savedvalue.rx,(Math.PI/180)*savedvalue.ry,(Math.PI/180)*savedvalue.rz]} scale={savedvalue.s}  >
      <mesh >
        <primitive object={nodeobj5.nodes.Main} />
      </mesh>
      <spotLight
        ref={spotlightrefo}
        color={"#ffffff"}
        intensity={savedvalue.i}
        position={[0,savedvalue.ly,0]}  
        penumbra={savedvalue.p}
        angle={(Math.PI/180)*savedvalue.a}
        distance={savedvalue.d}
        castShadow={false} 
        target={nodeobj5.nodes.Main}
      />
  </group>
  </>
  )
}

const Build = ({savedvalue}:{savedvalue:any}) =>{

  const glb1 = useGLTF("build/buildf.glb");
  const node1 = useLoader(GLTFLoader, 'build/buildf.glb');
  const glb2 = useGLTF("build/6.glb");
  const node2 = useLoader(GLTFLoader, 'build/6.glb');
  const refobj1 = useRef<any>()
  const refobj2 = useRef<any>()
  const refgroup = useRef<any>()
  const animate = useAnimations(glb1.animations,refobj1)
  const animate2 = useAnimations(glb2.animations,refobj2)
//light
const spotlightrefo = useRef<any>()
  useEffect(()=>{
    animate.actions.Building_ArmRotor_Animate_Anim_2?.play()
    animate.actions.Building_LowerRotor_Animate_Anim_3?.play()
    animate.actions.Building_UpperRotor_Animate_Anim_1?.play()
    animate.actions.Building_Sphere_Animate_Anim_0?.play()
    animate2.actions.Building_Cylinder_Animate__2__Anim_0?.play()
  })
  const object5 = new THREE.Object3D();
  object5.position.set(savedvalue.x+0.5,savedvalue.y,savedvalue.z+1)
  return(
  <>
  <group ref={refgroup} position={[savedvalue.x,savedvalue.y,savedvalue.z]} rotation={[(Math.PI/180)*savedvalue.rx,(Math.PI/180)*savedvalue.ry,(Math.PI/180)*savedvalue.rz]} scale={savedvalue.s}>
      <mesh ref={refobj1} position={[0,-2,-1]} scale={1.5}>
        <primitive object={node1.nodes.Main} />
      </mesh>  
      <mesh ref={refobj2} scale={1} position={[-1,-22.9,13.8]} >
        <primitive object={node2.nodes.Main} />
      </mesh>
      <spotLight
        ref={spotlightrefo}
        color={"#ffffff"}
        intensity={savedvalue.i}
        position={[0,savedvalue.ly,0]}  
        penumbra={savedvalue.p}
        angle={(Math.PI/180)*savedvalue.a}
        distance={savedvalue.d}
        castShadow={false} 
        target={node1.nodes.Main}
      />
    </group>
  </>
  )
}

const Capsule = ({savedvalue}:{savedvalue:any}) =>{
//obj
    const obj5 = useGLTF("capsule/capsule.glb");
    const nodeobj5 = useLoader(GLTFLoader, "capsule/capsule.glb");
    const refsafe = useRef<any>()
    const {actions} = useAnimations(obj5.animations,refsafe)
//obj
//light
const spotlightrefo = useRef<any>()
  useEffect(()=>{
    // actions.Synthesis_pCube1_Anim_1?.play()
    // actions.Synthesis_polySurface47_Anim_0?.play()
  })
 
  // useHelper(spotlightrefo,SpotLightHelper,)
  return(
  <>
  <group ref={refsafe} position={[savedvalue.x,savedvalue.y,savedvalue.z]} rotation={[(Math.PI/180)*savedvalue.rx,(Math.PI/180)*savedvalue.ry,(Math.PI/180)*savedvalue.rz]} scale={savedvalue.s}  >
      <mesh >
        <primitive object={nodeobj5.nodes.Main} />
      </mesh>
      <spotLight
        ref={spotlightrefo}
        color={"#ffffff"}
        intensity={savedvalue.i}
        position={[0,savedvalue.ly,0]}  
        penumbra={savedvalue.p}
        angle={(Math.PI/180)*savedvalue.a}
        distance={savedvalue.d}
        castShadow={false} 
        target={nodeobj5.nodes.Main}
      />
  </group>
  </>
  )
}

const Safe = ({savedvalue}:{savedvalue:any}) =>{
  //obj
      const obj5 = useGLTF("safe/safef2.glb");
      const nodeobj5 = useLoader(GLTFLoader, "safe/safef2.glb");
      const refsafe = useRef<any>()
      const {actions} = useAnimations(obj5.animations,refsafe)
  //obj
  //light
  const spotlightrefo = useRef<any>()
    useEffect(()=>{
      actions.Safe_safe_door_Anim_0?.play()
    })
   
    // useHelper(spotlightrefo,SpotLightHelper,)
    return(
    <>
    <group ref={refsafe} position={[savedvalue.x,savedvalue.y,savedvalue.z]} rotation={[(Math.PI/180)*savedvalue.rx,(Math.PI/180)*savedvalue.ry,(Math.PI/180)*savedvalue.rz]} scale={savedvalue.s}  >
        <mesh >
          <primitive object={nodeobj5.nodes.Main} />
        </mesh>
        <spotLight
          ref={spotlightrefo}
          color={"#ffffff"}
          intensity={savedvalue.i}
          position={[0,savedvalue.ly,0]}  
          penumbra={savedvalue.p}
          angle={(Math.PI/180)*savedvalue.a}
          distance={savedvalue.d}
          castShadow={false} 
          target={nodeobj5.nodes.Main}
        />
    </group>
    </>
    )
  }
  const Egg = ({savedvalue}:{savedvalue:any}) =>{
    //obj
        const obj5 = useGLTF("egg/egg.glb");
        const nodeobj5 = useLoader(GLTFLoader, "egg/egg.glb");
        const refsafe = useRef<any>()
        const {actions} = useAnimations(obj5.animations,refsafe)
    //obj
    //light
    const spotlightrefo = useRef<any>()
      useEffect(()=>{
        actions.Sacred_Egg_Egg_low1_Anim_0?.play()
        actions.Sacred_Egg_Egg_low2_Anim_1?.play()
        actions.Sacred_Egg_Egg_low3_Anim_2?.play()
        actions.Sacred_Egg_Egg_low4_Anim_3?.play()
      })
     
      // useHelper(spotlightrefo,SpotLightHelper,)
      return(
      <>
      <group ref={refsafe} position={[savedvalue.x,savedvalue.y,savedvalue.z]} rotation={[(Math.PI/180)*savedvalue.rx,(Math.PI/180)*savedvalue.ry,(Math.PI/180)*savedvalue.rz]} scale={savedvalue.s}  >
          <mesh >
            <primitive object={nodeobj5.nodes.Main} />
          </mesh>
          <spotLight
            ref={spotlightrefo}
            color={"#ffffff"}
            intensity={savedvalue.i}
            position={[0,savedvalue.ly,0]}  
            penumbra={savedvalue.p}
            angle={(Math.PI/180)*savedvalue.a}
            distance={savedvalue.d}
            castShadow={false} 
            target={nodeobj5.nodes.Main}
          />
      </group>
      </>
      )
    }