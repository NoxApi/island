import { useThree, useFrame,Canvas,useLoader } from "react-three-fiber";
import { Vector3, Euler,Camera, HemisphereLight, PointLightHelper,SpotLight, SpotLightHelper, RectAreaLight, Vector} from "three";
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
import { Build } from '@/components/building';
import { Safe } from '@/components/safe';
import { Syn } from '@/components/syn';
import { Capsule } from "@/components/capsule";
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
  const [message, setMessage] = useState("nomsg");
  const getsaved = async () => {
    setsaved(null)
    const spolight1 = collection(firestore as any,'spotlight1');
    const Collection= query(spolight1);
    const data = await getDocs(Collection);
    const result:any = [];
    data.forEach((data) => {
    result.push(data);
    });
    // set it to state
    setsaved2(result[1]._document.data.value.mapValue.fields)
    setsaved3(result[2]._document.data.value.mapValue.fields)
    setsaved4(result[3]._document.data.value.mapValue.fields)
    setsaved(result[0]._document.data.value.mapValue.fields)
    setsaved5(result[4]._document.data.value.mapValue.fields)
  };
  let spotlight: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let spotlight2: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let spotlight3: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let spotlight4: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; c?: any; } | null=null
  let d: { al: any; dc?: any; dl?: number; drx?: number; drz?: number;} | null=null  
  if(saved){
    console.log(saved2)
    spotlight = {x:parseFloat(saved.posx.stringValue),y:parseFloat(saved.posy.stringValue),z:parseFloat(saved.posz.stringValue),tx:parseFloat(saved.targetx.stringValue),ty:parseFloat(saved.targety.stringValue),tz:parseFloat(saved.targetz.stringValue),penum:parseFloat(saved.penumbra.stringValue),inten:parseFloat(saved.intensity.stringValue),d:parseFloat(saved.distance.stringValue),angle:parseFloat(saved.angle.stringValue),c:saved.color.stringValue}
    spotlight2 = {x:parseFloat(saved2.posx.stringValue),y:parseFloat(saved2.posy.stringValue),z:parseFloat(saved2.posz.stringValue),tx:parseFloat(saved2.targetx.stringValue),ty:parseFloat(saved2.targety.stringValue),tz:parseFloat(saved2.targetz.stringValue),penum:parseFloat(saved2.penumbra.stringValue),inten:parseFloat(saved2.intensity.stringValue),d:parseFloat(saved2.distance.stringValue),angle:parseFloat(saved2.angle.stringValue),c:saved2.color.stringValue}
    spotlight3 = {x:parseFloat(saved3.posx.stringValue),y:parseFloat(saved3.posy.stringValue),z:parseFloat(saved3.posz.stringValue),tx:parseFloat(saved3.targetx.stringValue),ty:parseFloat(saved3.targety.stringValue),tz:parseFloat(saved3.targetz.stringValue),penum:parseFloat(saved3.penumbra.stringValue),inten:parseFloat(saved3.intensity.stringValue),d:parseFloat(saved3.distance.stringValue),angle:parseFloat(saved3.angle.stringValue),c:saved3.color.stringValue}
    spotlight4 = {x:parseFloat(saved4.posx.stringValue),y:parseFloat(saved4.posy.stringValue),z:parseFloat(saved4.posz.stringValue),tx:parseFloat(saved4.targetx.stringValue),ty:parseFloat(saved4.targety.stringValue),tz:parseFloat(saved4.targetz.stringValue),penum:parseFloat(saved4.penumbra.stringValue),inten:parseFloat(saved4.intensity.stringValue),d:parseFloat(saved4.distance.stringValue),angle:parseFloat(saved4.angle.stringValue),c:saved4.color.stringValue}
    d = {al:parseFloat(saved5.al.stringValue),dc:saved5.dc.stringValue,dl:parseFloat(saved5.dl.stringValue),drx:parseFloat(saved5.drx.stringValue),drz:parseFloat(saved5.drz.stringValue)}
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
      <LinkNewTab href="/spotlight1">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20   rounded-xl border-2 border-teal-200">
          <p className="text-sm text-teal-200">{"Light1(back)"}</p>
        </button>
      </LinkNewTab>
      <LinkNewTab href="/spotlight2">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 ml-1">
          <p className="text-sm text-teal-200">{"Light2(right)"}</p>
        </button>
      </LinkNewTab>
      <LinkNewTab href="/spotlight3">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 ml-1">
          <p className="text-sm text-teal-200">{"Light3(left)"}</p>
        </button>
      </LinkNewTab>
      <LinkNewTab href="/spotlight4">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 ml-1">
          <p className="text-sm text-teal-200">{"Light4(front)"}</p>
        </button>
      </LinkNewTab>
      <LinkNewTab href="/directlight">
        <button onClick={()=>null} className=" w-28 h-10 bg-slate-400 bg-opacity-20  z-40 rounded-xl border-2 border-teal-200 ml-1">
          <p className="text-sm text-teal-200">{"Direct&Ambient"}</p>
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
   
      <Canvas >
        <Suspense fallback={null}>
          {saved?(<Island s1={spotlight} s2={spotlight2} s3={spotlight3} s4={spotlight4} d={d}/>):(null)}
        </Suspense>
      </Canvas>
     </div>
    </>
  )
}
const Island = ({s1,s2,s3,s4,d}:{s1:any,s2:any,s3:any,s4:any,d:any}) =>{
//loader
  const nodesloader = useLoader(GLTFLoader, 'island3.glb')['nodes'];
  const glb = useGLTF("island3.glb");
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
  let alllight={s1:true,s2:true,s3:true,s4:true,d:true,a:true,}
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
    gui.add( alllight, 's1' ).name("Light1(back)");  // Checkbox
    gui.add( alllight, 's2' ).name("Light2(right)");  // Checkbox
    gui.add( alllight, 's3' ).name("Light3(left)");  // Checkbox
    gui.add( alllight, 's4' ).name("Light4(front)");  // Checkbox
    gui.add( alllight, 'd' ).name("Directlight)");  // Checkbox
    gui.add( alllight, 'a' ).name("Ambientlight");  // Checkbox
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
    if(!(alllight.s1&&alllight.s2&&alllight.s3&&alllight.s4&&alllight.d&&alllight.a)){
      if(alllight.s1==false)
        spotlightref3.current.intensity=0
      if(alllight.s2==false)
        spotlightref1.current.intensity=0
      if(alllight.s3==false)
        spotlightref2.current.intensity=0
      if(alllight.s4==false)
        spotlightref4.current.intensity=0
        if(alllight.d==false)
        dlightref.current.intensity=0
        if(alllight.a==false)
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
  console.log(s3)
  // useHelper(spotlightref3,SpotLightHelper, 'yellow')
  return(
  <>
  <ambientLight intensity={0.5} ref={alightref} />
  <group rotation={[(Math.PI/180)*0,0,(Math.PI/180)*0]} ref={sunref}>
  <directionalLight intensity={1} ref={dlightref} position={[5,65,1]} color={"#ff0000"}/>
  {/* <mesh  position={[5,65,1]}>
      <sphereBufferGeometry args={[4, 50, 50]} wireframe={true} />
      <meshStandardMaterial  color={"#ff0000"} />
  </mesh> */}
  </group>
  <PerspectiveCamera makeDefault={true}  ref={cameraref} />
 
  <group ref = {allgroupref} >
  <Build position={{x:14,y:25.8,z:8}} rotation={{x:8,y:260,z:-2}}/>
  <Safe position={{x:-13,y:18.8,z:5}} rotation={{x:10,y:31,z:3}}/>
  <Syn position={{x:25,y:16.4,z:14}} rotation={{x:16,y:43,z:-11}}/>
  <Capsule position={{x:-2,y:24,z:6}} rotation={{x:3,y:-180,z:3}}/>
 
  <mesh scale={1} rotation={[(Math.PI/180)*10,(Math.PI/180)*-100,(Math.PI/180)*0]}>
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
