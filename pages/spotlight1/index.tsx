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
import firestore from "@/firebase/ClientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs,addDoc,updateDoc, doc} from "@firebase/firestore";

 
export default function Home() {
  const [saved,setsaved] = useState<any>(null)
  const [message, setMessage] = useState("nomsg");
  const getsaved = async () => {
    const spolight1 = collection(firestore as any,'spotlight1');
    const fetchvalue= query(spolight1);
    const data = await getDocs(fetchvalue);
    const result:any = [];
    data.forEach((data) => {
    result.push(data);
    });
    // set it to state
    console.log(result)
    setsaved(result[0]._document.data.value.mapValue.fields)
  };
  
  let spotlight: { angle: any; x?: number; y?: number; z?: number; tx?: number; ty?: number; tz?: number; penum?: number; inten?: number; d?: number; } | null=null
  let colorFormats : {string :any}| null=null
  if(saved){
    spotlight = {x:parseInt(saved.posx.integerValue),y:parseInt(saved.posy.integerValue),z:parseInt(saved.posz.integerValue),tx:parseInt(saved.targetx.integerValue),ty:parseInt(saved.targety.integerValue),tz:parseInt(saved.targetz.integerValue),penum:parseFloat(saved.penumbra.stringValue),inten:parseFloat(saved.intensity.stringValue),d:parseInt(saved.distance.integerValue),angle:parseInt(saved.angle.integerValue)}
    colorFormats = {
      string: saved.color.stringValue,
    };
  }
  const update = async () => {
    console.log((spotlight!.inten)!.toFixed(2))
    try {
      updateDoc(doc(firestore,'spotlight1',"OnqT2fzVBjZM48SoxbDM"),{
        angle : spotlight!.angle,
        color : colorFormats!.string,
        distance: spotlight!.d,
        intensity: (spotlight!.inten)!.toFixed(1),
        penumbra: (spotlight!.penum)!.toFixed(1),
        posx: spotlight!.x,
        posy: spotlight!.y,
        posz: spotlight!.z,
        targetx: spotlight!.tx,
        targety: spotlight!.ty,
        targetz: spotlight!.tz,
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
      {saved!==null?
     (<div className='bg-black w-[100vw] h-[100vh]  '>
      <button onClick={()=>update()} className="w-60 h-20 bg-slate-400 bg-opacity-20 absolute bottom-[1vw] left-[1vw] z-40 rounded-xl border-4 border-teal-200">
        <p className="text-xl text-teal-200">{"SAVE"}</p>
      </button>
      {message=="nomsg"?(null):(<button onClick={()=>setMessage("nomsg")} className="w-[50vw] h-[20vw] bg-slate-400 bg-opacity-20 absolute bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%] z-40 rounded-xl border-4 border-teal-200">
        <p className="text-4xl text-teal-200">{message}</p>
      </button>)}     
      <Canvas >
        <Suspense fallback={null}>
          <Island saved={saved} spotlight={spotlight} colorFormats={colorFormats}/>
        </Suspense>
      </Canvas>
     </div>
      ):(null)}
    </>
  )
}




const Island = ({saved,spotlight,colorFormats}:{saved:any,spotlight:any,colorFormats:any}) =>{
//loader
  const nodesloader = useLoader(GLTFLoader, 'island3.glb')['nodes'];
  const glb = useGLTF("island3.glb");
//firebase
//ref
  const cameraref=useRef<any>()
  const islandref = useRef<any>()
  const objectref = useRef<any>()
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
  let objpos ={x:-2,y:24,z:6}
  let objrot ={x:3,y:-180,z:3}
  let rotatedeg={rotatex:-19,rotatey:0,rotatez:0}
  let sunrotate={rotatex:0,rotatey:0,rotatez:0}
  let islandrotate={rotatex:10,rotatey:-100,rotatez:0}
  let grouprotate={rotatex:0,rotatey:0,rotatez:0}
  
//position variable

//light
    

//control
const handleWheel = (e:any) => {
    e.preventDefault();
    if(pos.camy>100){
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
    gui.add(light,"alight").min(0).max(1).step(0.1).name("Ambient light")
    gui.add(spotlight,"x").min(parseInt(saved.posx.integerValue)-10).max(parseInt(saved.posx.integerValue)+10).step(0.5).name("spotlight-x")
    gui.add(spotlight,"y").min(80).max(120).step(1).name("spotlight-y")
    gui.add(spotlight,"z").min(-40).max(0).step(1).name("spotlight-z")
    gui.add(spotlight,"tx").min(-100).max(100).step(0.5).name("lookat-x")
    gui.add(spotlight,"ty").min(-100).max(100).step(1).name("lookat-y")
    gui.add(spotlight,"tz").min(-100).max(100).step(1).name("lookat-z")
    gui.add(spotlight,"penum").min(0).max(1).step(0.1).name("penumbra")
    gui.add(spotlight,"inten").min(0).max(10).step(0.1).name("intensity")
    gui.add(spotlight,"d").min(0).max(600).step(1).name("distance")
    gui.add(spotlight,"angle").min(0).max(90).step(1).name("angle")
    gui.addColor( colorFormats, 'string' ).name("spotlight light color");
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
    alightref.current.intensity= light.alight
    spotlightref1.current.position.copy(new THREE.Vector3(spotlight.x,spotlight.y,spotlight.z))
    object.position.set(spotlight.tx,spotlight.ty,spotlight.tz)
    objectref.current.position.copy((object.position))
    spotlightref1.current.intensity=spotlight.inten
    spotlightref1.current.distance=spotlight.d
    spotlightref1.current.penumbra=spotlight.penum
    spotlightref1.current.angle=(Math.PI/180)*spotlight.angle
    spotlightref1.current.color.set(colorFormats.string)
    
      //control
    
  });
  const refpoint = new THREE.Vector3(0,0,0)
  const object = new THREE.Object3D();
  object.position.set(0,0,0)
  useHelper(spotlightref1,SpotLightHelper, 'yellow')
  
  return(
  <>
  <ambientLight intensity={0.5} ref={alightref} />
  <group rotation={[(Math.PI/180)*0,0,(Math.PI/180)*0]} ref={sunref}>
  {/* <directionalLight intensity={1} ref={dlightref} position={[5,65,1]} color={"#ff0000"}/> */}
  <mesh  position={object.position} ref={objectref} >
      <sphereBufferGeometry args={[4, 50, 50]} wireframe={true} />
      <meshStandardMaterial  color={"#ffffff"} />
  </mesh>
  </group>
  <PerspectiveCamera makeDefault={true}  ref={cameraref} />
 
  <group ref = {allgroupref}  >
    <Build position={{x:14,y:25.8,z:8}} rotation={{x:8,y:260,z:-2}}/>
    <Safe position={{x:-13,y:18.8,z:5}} rotation={{x:10,y:31,z:3}}/>
    <Syn position={{x:25,y:16.4,z:14}} rotation={{x:16,y:43,z:-11}}/>
    <Capsule position={{x:-2,y:24,z:6}} rotation={{x:3,y:-180,z:3}}/>
  
    <mesh scale={1} ref={islandref} rotation={[(Math.PI/180)*10,(Math.PI/180)*-100,(Math.PI/180)*0]}>
        <primitive object={nodesloader.Main} />
    </mesh>
    <spotLight
          ref={spotlightref1}
          color="#FFD7D7"
          intensity={0.15}
          position={[30, 100,-20]}  
          penumbra={1}
          angle={(Math.PI/180)*40}
          distance={400}
          castShadow={false} 
          target={object}
        />
    </group> 
  </>
  )
}


