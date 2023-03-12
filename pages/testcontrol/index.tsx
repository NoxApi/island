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
  const [ destination,setdestination ] = useState(() => new THREE.Vector3(5,20,80))
  const [items,setitems] = useState(0)
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
     <div className='bg-black w-[100vw] h-[100vh] max-h-[120vw] cursor-grab active:cursor-grabbing '>
      
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
          <Island s1={spotlight} s2={spotlight2} s3={spotlight3} s4={spotlight4} d={d} o1={o1} o2={o2} o3={o3} o4={o4} o5={o5} setdestination={setdestination} destination={destination} setitems={setitems} items={items} />         
          <Synthesis savedvalue={o1} i={items}/>
          <Build savedvalue={o2} i={items}/>
          <Capsule savedvalue={o3} i={items}/>
          <Safe savedvalue={o4} i={items}/>
          <Egg savedvalue={o5} i={items}/>
        </Suspense>
      </Canvas>):(null)}
     </div>
    </>
  )
}

const Island = ({s1,s2,s3,s4,d,o1,o2,o3,o4,o5,destination,setdestination,setitems,items}:{s1:any,s2:any,s3:any,s4:any,d:any,o1:any,o2:any,o3:any,o4:any,o5:any,destination:any,setdestination:any,setitems:any,items:any}) =>{
  //loader
    const nodesloader = useLoader(GLTFLoader, 'island3.glb')['nodes'];
    const glb = useGLTF("island3.glb");
  
  //objref
    const cameraref=useRef<any>()
    const islandref = useRef<any>()  
    const allgroupref = useRef<any>()
  //lightref
  const alightref = useRef<any>()
    const dlightref = useRef<any>()
    const sunref = useRef<any>()
    const spotlightref1 = useRef<any>()
    const spotlightref2 = useRef<any>()
    const spotlightref3 = useRef<any>()
    const spotlightref4 = useRef<any>()
    
  //targetobj for spotlight
    const object = new THREE.Object3D();
    object.position.set(s1.tx,s1.ty,s1.tz)
    const object2 = new THREE.Object3D();
    object2.position.set(s2.tx,s2.ty,s2.tz)
    const object3 = new THREE.Object3D();
    object3.position.set(s3.tx,s3.ty,s3.tz)
    const object4 = new THREE.Object3D();
    object4.position.set(s4.tx,s4.ty,s4.tz)
  //position variable
  let pos ={camx:6,camy:60,camz:100}
  let rotatedeg={rotatex:-19,rotatey:0,rotatez:0}
  let grouprotate={rotatex:0,rotatey:0,rotatez:0}
  let alllight={s1:true}

//control
const handleWheel = (e:any) => {
    e.preventDefault();
    if(pos.camy>50){
      if (e.deltaY<0){
    pos.camz += e.deltaY / 100;
    pos.camy += e.deltaY / 200;
      }
    }
    else if(pos.camy<35||pos.camz<45){
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
    if (pos.camx<-20){
      if (dx<0)
      pos.camx += -dx
    }
    else if (pos.camx>35){
      if (dx>0)
      pos.camx += -dx
    }
    else{
      pos.camx += -dx
    }
    
    if (pos.camz<45){
      if (dy<0)
      pos.camz += -dy
    }
    else if (pos.camz>75){
      if (dy>0)
      pos.camz += -dy
    }
    else{
      pos.camz += -dy
    }
  }  
  useEffect(()=>{
    //log
  //  console.log(actions)
  //  console.log(node2)
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
//cam move function
const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(0,20,60))
const set0 = () =>{
  setiscammove(false)
  setdestination(() => new THREE.Vector3(6,60,100))
  setitems(0)
}
const movetosyn= () =>{
  setiscammove(true)
  setdestination(() => new THREE.Vector3(o1.x+8,o1.y+10,o1.z+30))
  setitems(1)
}
const movetobuild= () =>{
  setiscammove(true)
  setdestination(() => new THREE.Vector3(o2.x+8,o2.y+10,o2.z+30))
  setitems(2)
}
const movetoegg= () =>{
  setiscammove(true)
  setdestination(() => new THREE.Vector3(o5.x+8,o5.y+10,o5.z+30))
  setitems(5)
}
const movetosafe= () =>{
  setiscammove(true)
  setdestination(() => new THREE.Vector3(o4.x+8,o4.y+10,o4.z+30))
  setitems(4)
}
const movetocapsule= () =>{
  setiscammove(true)
  setdestination(() => new THREE.Vector3(o3.x+8,o3.y+10,o3.z+30))
  setitems(3)
}
//cammove prevent
const [ iscammove,setiscammove] = useState(false)
//gui
const gui = new Gui.GUI()
gui.add( alllight, 's1' ).name("Sync Light");  // Checkbox


  useFrame((state, delta) => {
    if(iscammove==false){
      const currentposition = new THREE.Vector3(pos.camx,pos.camy,pos.camz)
      smoothedCameraPosition.lerp(currentposition, 0.06)
      cameraref.current.position.copy(smoothedCameraPosition)}
    if(iscammove==true){
    smoothedCameraPosition.lerp(destination, 0.06)
    cameraref.current.position.copy(smoothedCameraPosition)
    }
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
    if(!(alllight.s1&&items==0)){
        spotlightref3.current.intensity=0
        spotlightref1.current.intensity=0
        spotlightref2.current.intensity=0
        spotlightref4.current.intensity=0
        dlightref.current.color.set('#ffffff')
        dlightref.current.intensity=0
        alightref.current.intensity=0
    }
    
  });
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
        <group>
          <mesh  position={[o3.x,o3.y+10,o3.z]}   >    
            <Html center={true} distanceFactor={70} >
              <div className='flex'>
              {items==0?(<button onClick={()=>movetocapsule()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
                  <a className='text-white text-2xl'>3</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={[o3.x+16,o3.y+5,o3.z]}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col transition-opacity duration-500 ${items==3?("opacity-1"):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                  <div className='flex justify-end'>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[20px] h-[20px]  border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mb-[2px]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[80px] h-[120px] bg-black bg-opacity-90 rounded-[10px] border-[1px] border-yellow-400 flex flex-col justify-start py-[10px] items-center '>
                    <p className='text-[8px] text-yellow-500 '>CAPSULE</p>
                    <div className='bg-yellow-500 h-[1px] w-[80%] mt-2'></div>
                    <p className='text-red-600 text-left text-[4px] px-[5px] mt-2 indent-[10px]'>{"Basicly it's fucking lottery that most poeple buy and prey to get something more value than the price of capsule it self but as you all know the percentage is fucking low. So if you want anything buy it on marketplace you stupid price of shit dont buy fucking capsule you coward. lorem ipsum... "}</p>
                  </div>
                </div>
              </div>
            </Html>      
          </mesh> 
      </group>

      <group>
          <mesh  position={[o2.x,o2.y+6,o2.z]}   >    
            <Html center={true} distanceFactor={70} >
              <div className='flex'>
              {items==0?(<button onClick={()=>movetobuild()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
                  <a className='text-white text-2xl'>2</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={[o2.x+14,o2.y+3,o2.z]}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col transition-opacity duration-500 ${items==2?("opacity-1"):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                  <div className='flex justify-end'>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[20px] h-[20px]  border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mb-[2px]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[80px] h-[120px] bg-black bg-opacity-90 rounded-[10px] border-[1px] border-yellow-400 flex flex-col justify-start py-[10px] items-center '>
                    <p className='text-[8px] text-yellow-500 '>BUILD CHALLENGE</p>
                    <div className='bg-yellow-500 h-[1px] w-[80%] mt-2'></div>
                    <p className='text-red-600 text-left text-[4px] px-[5px] mt-2 indent-[10px]'>{"you can use your 10 unuse hero or skin to sacrifice and become something more value (if you lucky) but most of the time trust me you will get something useless or even fail and get nothing. So if you dont want that hero or skin and you coward to gamble just sell it your numpnut. lorem ipsum... "}</p>
                  </div>
                </div>
              </div>
            </Html>      
          </mesh> 
      </group>

      <group>
          <mesh  position={[o1.x,o1.y+6,o1.z]}   >    
            <Html center={true} distanceFactor={70} >
              <div className='flex '>
              {items==0?(<button onClick={()=>movetosyn()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%] z-20'>
                  <a className='text-white text-2xl z-90'>1</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={[o1.x+16,o1.y+3,o1.z]}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col transition-opacity duration-500 ${items==1?("opacity-1"):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                  <div className='flex justify-end'>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[20px] h-[20px]  border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mb-[2px]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[80px] h-[120px] bg-black bg-opacity-90 rounded-[10px] border-[1px] border-yellow-400 flex flex-col justify-start py-[10px] items-center '>
                    <p className='text-[8px] text-yellow-500 '>SYNTHESIS</p>
                    <div className='bg-yellow-500 h-[1px] w-[80%] mt-2'></div>
                    <p className='text-red-600 text-left text-[4px] px-[5px] mt-2 indent-[10px]'>{"Our game had rune so you can use that same rune to systhesis and get better version of that rune back it no risk but yea you have to spend a lot of money to buy a lot of rune if you wanna be completitive so stop crying and get rich. Lorem ipsum...."}</p>
                  </div>
                </div>
              </div>
            </Html>      
          </mesh> 
      </group>

      <group>
          <mesh  position={[o4.x,o4.y+7.5,o4.z]}   >    
            <Html center={true} distanceFactor={70} >
              <div className='flex'>
              {items==0?(<button onClick={()=>movetosafe()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
                  <a className='text-white text-2xl'>4</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={[o4.x+16,o4.y+3,o4.z]}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col transition-opacity duration-500 ${items==4?("opacity-1"):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                  <div className='flex justify-end'>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[20px] h-[20px]  border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mb-[2px]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[80px] h-[120px] bg-black bg-opacity-90 rounded-[10px] border-[1px] border-yellow-400 flex flex-col justify-start py-[10px] items-center '>
                    <p className='text-[8px] text-yellow-500 '>EVERMOON SAFE</p>
                    <div className='bg-yellow-500 h-[1px] w-[80%] mt-2'></div>
                    <p className='text-red-600 text-left text-[4px] px-[5px] mt-2 indent-[10px]'>{"safe that contain evermoon token and so much much much much much much much much much much much much much much much much much much much much much much much much  much much much much much much much much much much much much much much much much much much much much much much much much  more "}</p>
                  </div>
                </div>
              </div>
            </Html>      
          </mesh> 
      </group>
      
    </group>

    <group>
          <mesh  position={[o5.x-1,o5.y+6.5,o5.z]}   >    
            <Html center={true} distanceFactor={70} >
              <div className='flex'>
              {items==0?(<button onClick={()=>movetoegg()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
                  <a className='text-white text-2xl'>5</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={[o5.x+14,o5.y+3,o5.z]}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col transition-opacity duration-500 ${items==5?("opacity-1"):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                  <div className='flex justify-end '>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[20px] h-[20px]  border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mb-[2px]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[80px] h-[120px] bg-black bg-opacity-90 rounded-[10px] border-[1px] border-yellow-400 flex flex-col justify-start py-[10px] items-center '>
                    <p className='text-[8px] text-yellow-500 '>SACRED BEAST</p>
                    <div className='bg-yellow-500 h-[1px] w-[80%] mt-2'></div>
                    <p className='text-red-600 text-left text-[4px] px-[5px] mt-2 indent-[10px]'>{"If you have money buy it, feed it, hatch it and you will recieve some random shit I mean sacred beast that will follow you around forever untill the end of time lorem ipsum..."}</p>
                  </div>
                </div>
              </div>
            </Html>      
          </mesh> 
      </group>
      
    
    </>
  )
}

const Synthesis = ({savedvalue,i}:{savedvalue:any,i:any}) =>{
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
    useFrame((state, delta) => {
      if(i==0||i==1){
        spotlightrefo.current.intensity=savedvalue.i  
      }
      else{        
        spotlightrefo.current.intensity=0 
      }
    }
    ) 
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
  
  const Build = ({savedvalue,i}:{savedvalue:any,i:any}) =>{
  
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
    useFrame((state, delta) => {
      if(i==0||i==2){
        spotlightrefo.current.intensity=savedvalue.i  
      }
      else{        
        spotlightrefo.current.intensity=0 
      }
    }
    )
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
  
  const Capsule = ({savedvalue,i}:{savedvalue:any,i:any}) =>{
  //obj
      const obj5 = useGLTF("capsule/capf.glb");
      const nodeobj5 = useLoader(GLTFLoader, "capsule/capf.glb");
      const refsafe = useRef<any>()
      const {actions} = useAnimations(obj5.animations,refsafe)
  //obj
  //light
  const spotlightrefo = useRef<any>()
    useEffect(()=>{
    })
    useFrame((state, delta) => {
      if(i==0||i==3){
        spotlightrefo.current.intensity=savedvalue.i  
      }
      else{        
        spotlightrefo.current.intensity=0 
      }
    }
    )
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
  
  const Safe = ({savedvalue,i}:{savedvalue:any,i:any}) =>{
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
      useFrame((state, delta) => {
        if(i==0||i==4){
          spotlightrefo.current.intensity=savedvalue.i  
        }
        else{        
          spotlightrefo.current.intensity=0 
        }
      }
      )
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
    const Egg = ({savedvalue,i}:{savedvalue:any,i:any}) =>{
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
        useFrame((state, delta) => {
          if(i==0||i==5){
            spotlightrefo.current.intensity=savedvalue.i  
          }
          else{        
            spotlightrefo.current.intensity=0 
          }
        }
        )
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