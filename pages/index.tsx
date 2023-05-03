import { useThree, useFrame,Canvas,useLoader } from "@react-three/fiber";
import { Vector3, Euler,Camera, HemisphereLight, PointLightHelper,SpotLight, SpotLightHelper, RectAreaLight, Vector, AmbientLight} from "three";
import { useEffect, useRef ,useState,Suspense,useMemo} from "react";
import Head from 'next/head'
import mesh from "react-three-fiber"
import styles from '@/styles/Home.module.css'
import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls, useAnimations,Html, Stats, TransformControls,PerspectiveCamera, PivotControls, useHelper, Point,Sparkles } from "@react-three/drei";
import { useFBX,useGLTF,Sky } from '@react-three/drei';
import * as THREE from "three";
import * as Gui from "lil-gui";
import LinkNewTab from "@/components/generals/LinkNewTab";
import firestore from "@/firebase/ClientApp";
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs,addDoc,updateDoc, doc} from "@firebase/firestore";
import Image from "next/image";
import  {Perf} from "r3f-perf"
import i1 from "../public/icon/i1.png"
import i2 from "../public/icon/i2.png"
import i3 from "../public/icon/i3.png"
import i4 from "../public/icon/i4.png"
import React from "react";


export default function Home() {
  const [ destination,setdestination ] = useState(() => new THREE.Vector3(6,45,40))
  const [items,setitems] = useState(0)
  const [isportrait,setisportrait] = useState(false)
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
  const neverchange = 0
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
  //firefly
  const Firefly = useMemo(() => {
    console.log("rerender")
    return(
      <>
        <Sparkles scale={[40,40,40]} count={30} speed={1.5} size={120} position={[5,25,5]} color={"gold"} opacity={0.8} noise={[40,40,40]} />         
      </>
    )},[neverchange]);
  
  useEffect(()=>{ 
      getsaved()
      if (window.innerHeight>=window.innerWidth){
        setisportrait(true)
      }
    },[])
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     <div className={`transition-all duration-[1000ms] bg-black w-[100vw] h-[100vh] ${items==0?("max-h-[140vw]"):("max-h-[140vw]")}  cursor-grab active:cursor-grabbing `}>
      
      <div className="absolute top-[1vw] left-[1vw] flex z-40  ">
      </div>
   
      {(saved&&savedo1)?(<Canvas dpr={[0,1.5]}> 
        <Perf position="bottom-left"/>  
        <Suspense fallback={null}>
          {Firefly}
          <Synthesis savedvalue={o1} i={items}/>
          <Build savedvalue={o2} i={items}/>
          <Capsule savedvalue={o3} i={items}/>
          <Safe savedvalue={o4} i={items}/>
          <Egg savedvalue={o5} i={items}/>
          <Island s1={spotlight} s2={spotlight2} s3={spotlight3} s4={spotlight4} d={d} o1={o1} o2={o2} o3={o3} o4={o4} o5={o5} setdestination={setdestination} destination={destination} setitems={setitems} items={items} isP={isportrait} />
        </Suspense>
      </Canvas>):(null)}
     </div>
    </>
  )
}

const Island = ({s1,s2,s3,s4,d,o1,o2,o3,o4,o5,destination,setdestination,setitems,items,isP}:{s1:any,s2:any,s3:any,s4:any,d:any,o1:any,o2:any,o3:any,o4:any,o5:any,destination:any,setdestination:any,setitems:any,items:any,isP:boolean}) =>{
  //loader
  
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
  let pos ={camx:6,camy:45,camz:75}
  let rotatedeg={rotatex:-19,rotatey:0,rotatez:0}
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
const [ smoothedCameraPosition ] = useState(() => new THREE.Vector3(6,45,0))
const set0 = () =>{
  setiscammove(false)
  setitems(0)
}
const movetosyn= () =>{
  setiscammove(true)
  if (isP==true)
    setdestination(() => new THREE.Vector3(o1.x,o1.y+6.5,o1.z+35))
  else
    setdestination(() => new THREE.Vector3(o1.x+8,o1.y+10,o1.z+30))
  setitems(1)
}
const movetobuild= () =>{
  setiscammove(true)
  if (isP==true)
  setdestination(() => new THREE.Vector3(o2.x,o2.y+6.5,o2.z+35))
else
  setdestination(() => new THREE.Vector3(o2.x+8,o2.y+10,o2.z+30))
  setitems(2)
}
const movetoegg= () =>{
  setiscammove(true)
  if (isP==true)
  setdestination(() => new THREE.Vector3(o5.x,o5.y+6.5,o5.z+35))
else
  setdestination(() => new THREE.Vector3(o5.x+8,o5.y+10,o5.z+30))
  setitems(5)
}
const movetosafe= () =>{
  setiscammove(true)
  if (isP==true)
  setdestination(() => new THREE.Vector3(o4.x,o4.y+6.5,o4.z+35))
else
  setdestination(() => new THREE.Vector3(o4.x+8,o4.y+10,o4.z+30))
  setitems(4)
}
const movetocapsule= () =>{
  setiscammove(true)
  if (isP==true)
  setdestination(() => new THREE.Vector3(o3.x,o3.y+6.5,o3.z+35))
else
  setdestination(() => new THREE.Vector3(o3.x+8,o3.y+10,o3.z+30))
  setitems(3)
}
//cammove prevent
const [ iscammove,setiscammove] = useState(false)
//FPS/Delta time
const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    // Use requestAnimationFrame to only update the box's position on the next frame refresh
    requestAnimationFrame(() => {
        if(iscammove==false){
          const currentposition = new THREE.Vector3(pos.camx,pos.camy,pos.camz)
          smoothedCameraPosition.lerp(currentposition, delta*6)
          cameraref.current.position.copy(smoothedCameraPosition)}
        if(iscammove==true){
        smoothedCameraPosition.lerp(destination, delta*6)
        cameraref.current.position.copy(smoothedCameraPosition)
        }
        cameraref.current.rotation.x = (Math.PI/180)*rotatedeg.rotatex
        //todo   
        dlightref.current.color.set(d.dc)
    })
  });
  return(
    <>
    <ambientLight intensity={d.al} ref={alightref} />
    <group rotation={[(Math.PI/180)*0,0,(Math.PI/180)*0]} ref={sunref}>
      <directionalLight intensity={d.dl} ref={dlightref} position={[5,65,1]} color={"#ff0000"}/>
    </group>
    <PerspectiveCamera makeDefault={true}  ref={cameraref} position={[pos.camx,pos.camy,pos.camz]}/>

    <group receiveShadow={false} ref = {allgroupref} >
      <Island3d/>
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
          <mesh  position={[o3.x-0.5,o3.y+6,o3.z]}   >    
            <Html center={true} distanceFactor={isP?(50):(70)} >
              <div className='flex'>
              {items==0?(<button onClick={()=>movetocapsule()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
                  <a className='text-white text-2xl'>3</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={isP?([o3.x+0.5,o3.y-14,o3.z]):([o3.x+16,o3.y+5,o3.z])}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col  ${items==3?("opacity-1 "):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                <div className='flex justify-end '>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-80 backdrop-blur mr-[-18px] transition-all hover:bg-opacity-100 hover:border-[#F1E3B5] hover:text-[#F1E3B5] w-[20px] h-[20px] lgm:w-[4vw] lgm:h-[4vw] border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mt-[0]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[120px] h-auto blurdes bg-black bg-opacity-60 rounded-[1px] lgm:w-[20vw]  border-t-[1px] border-[#F1E3B5] flex flex-col justify-start py-[5px] px-[5px] items-center '>
                    <p className='text-[10px] text-[#F1E3B5] leading-3 lgm:text-[2vw] text-left w-full'>SACRED BEAST</p>
                    <p className='text-[6px] smm:leading-[1.2vw] text-[#00DDFF] lgm:text-[1.5vw] text-left w-full'>{"Unlimited Supply"}</p>
                    <p className='text-[6px]  smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw] lgm:text-[1vw] text-left w-full font-light '>{"Play And Earn"}</p>
                    <div className="flex w-full pl-1 mt-[3px] lgm:mt-[1vw] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i1} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Synthesis"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i2} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Building Challenge"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i3} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Tournament Fee"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i4} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Event Fee"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Html>      
          </mesh> 
      </group>

      <group>
          <mesh  position={[o2.x,o2.y+7,o2.z]}   >    
            <Html center={true} distanceFactor={isP?(50):(70)} >
              <div className='flex'>
              {items==0?(<button onClick={()=>movetobuild()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
                  <a className='text-white text-2xl'>2</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={isP?([o2.x+0.5,o2.y-14,o2.z]):([o2.x+14,o2.y+3,o2.z])}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col  ${items==2?("opacity-1 "):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                <div className='flex justify-end '>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-80 backdrop-blur mr-[-18px] transition-all hover:bg-opacity-100 hover:border-[#F1E3B5] hover:text-[#F1E3B5] w-[20px] h-[20px] lgm:w-[4vw] lgm:h-[4vw] border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mt-[0]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[120px] h-auto blurdes bg-black bg-opacity-60 rounded-[1px] lgm:w-[20vw]  border-t-[1px] border-[#F1E3B5] flex flex-col justify-start py-[5px] px-[5px] items-center '>
                    <p className='text-[10px] text-[#F1E3B5] leading-3 lgm:text-[2vw] text-left w-full'>SACRED BEAST</p>
                    <p className='text-[6px] smm:leading-[1.2vw] text-[#00DDFF] lgm:text-[1.5vw] text-left w-full'>{"Unlimited Supply"}</p>
                    <p className='text-[6px]  smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw] lgm:text-[1vw] text-left w-full font-light '>{"Play And Earn"}</p>
                    <div className="flex w-full pl-1 mt-[3px] lgm:mt-[1vw] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i1} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Synthesis"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i2} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Building Challenge"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i3} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Tournament Fee"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i4} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Event Fee"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Html>      
          </mesh> 
      </group>

      <group>
          <mesh  position={[o1.x,o1.y+6,o1.z]}   >    
            <Html center={true} distanceFactor={isP?(50):(70)} >
              <div className='flex '>
              {items==0?(<button onClick={()=>movetosyn()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%] z-20'>
                  <a className='text-white text-2xl z-90'>1</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={isP?([o1.x+0.5,o1.y-14,o1.z]):([o1.x+16,o1.y+3,o1.z])}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col  ${items==1?("opacity-1 "):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                <div className='flex justify-end '>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-80 backdrop-blur mr-[-18px] transition-all hover:bg-opacity-100 hover:border-[#F1E3B5] hover:text-[#F1E3B5] w-[20px] h-[20px] lgm:w-[4vw] lgm:h-[4vw] border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mt-[0]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[120px] h-auto blurdes bg-black bg-opacity-60 rounded-[1px] lgm:w-[20vw]  border-t-[1px] border-[#F1E3B5] flex flex-col justify-start py-[5px] px-[5px] items-center '>
                    <p className='text-[10px] text-[#F1E3B5] leading-3 lgm:text-[2vw] text-left w-full'>SACRED BEAST</p>
                    <p className='text-[6px] smm:leading-[1.2vw] text-[#00DDFF] lgm:text-[1.5vw] text-left w-full'>{"Unlimited Supply"}</p>
                    <p className='text-[6px]  smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw] lgm:text-[1vw] text-left w-full font-light '>{"Play And Earn"}</p>
                    <div className="flex w-full pl-1 mt-[3px] lgm:mt-[1vw] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i1} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Synthesis"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i2} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Building Challenge"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i3} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Tournament Fee"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i4} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Event Fee"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Html>      
          </mesh> 
      </group>

      <group>
          <mesh  position={[o4.x,o4.y+8,o4.z]}   >    
            <Html center={true} distanceFactor={isP?(50):(70)} >
              <div className='flex'>
              {items==0?(<button onClick={()=>movetosafe()} className='bg-[#000000] bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
                  <a className='text-white text-2xl'>4</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={isP?([o4.x+0.5,o4.y-14,o4.z]):([o4.x+16,o4.y+3,o4.z])}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col  ${items==4?("opacity-1 "):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                  <div className='flex justify-end '>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-80 backdrop-blur mr-[-18px] transition-all hover:bg-opacity-100 hover:border-[#F1E3B5] hover:text-[#F1E3B5] w-[20px] h-[20px] lgm:w-[4vw] lgm:h-[4vw] border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mt-[0]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[120px] h-auto blurdes bg-black bg-opacity-60 rounded-[1px] lgm:w-[20vw]  border-t-[1px] border-[#F1E3B5] flex flex-col justify-start py-[5px] px-[5px] items-center '>
                    <p className='text-[10px] text-[#F1E3B5] leading-3 lgm:text-[2vw] text-left w-full'>SACRED BEAST</p>
                    <p className='text-[6px] smm:leading-[1.2vw] text-[#00DDFF] lgm:text-[1.5vw] text-left w-full'>{"Unlimited Supply"}</p>
                    <p className='text-[6px]  smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw] lgm:text-[1vw] text-left w-full font-light '>{"Play And Earn"}</p>
                    <div className="flex w-full pl-1 mt-[3px] lgm:mt-[1vw] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i1} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Synthesis"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i2} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Building Challenge"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i3} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Tournament Fee"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i4} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Event Fee"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Html>      
          </mesh> 
      </group>
      
    </group>

    <group>
          <mesh  position={[o5.x+0.5,o5.y+5.5,o5.z]}   >    
            <Html center={true} distanceFactor={isP?(50):(70)} >
              <div className='flex'>
              {items==0?(<button onClick={()=>movetoegg()} className='bg-[#000000]  bg-opacity-50 transition-all hover:bg-opacity-100 hover:border-yellow-400 hover:text-yellow-400 w-[40px] h-[40px]  border-2 rounded-[50%]'>
                  <a className='text-white text-2xl'>5</a>
                </button>):(null)}  
                </div>
            </Html>      
          </mesh> 
          <mesh  position={isP?([o5.x+0.5,o5.y-14,o5.z]):([o5.x+14,o5.y+3,o5.z])}   >    
            <Html center={true} distanceFactor={100} >
              <div className='flex cursor-default'>
                <div className={`flex flex-col ${items==5?("opacity-1 "):("opacity-0 w-0 h-0 overflow-hidden")}`}>
                  <div className='flex justify-end '>
                    <button onClick={()=>set0()} className='bg-[#000000] bg-opacity-80  mr-[-18px] transition-all hover:bg-opacity-100 hover:border-[#F1E3B5] hover:text-[#F1E3B5] w-[20px] h-[20px] lgm:w-[4vw] lgm:h-[4vw] border-[1px] rounded-[50%] flex justify-center items-center'>
                      <a className='text-white text-[10px] text-center mt-[0]'>x</a>
                    </button>
                  </div>
                  <div className=' w-[120px] h-auto blurdes bg-black bg-opacity-60 rounded-[1px] lgm:w-[20vw]  border-t-[1px] border-[#F1E3B5] flex flex-col justify-start py-[5px] px-[5px] items-center '>
                    <p className='text-[10px] text-[#F1E3B5] leading-3 lgm:text-[2vw] text-left w-full'>SACRED BEAST</p>
                    <p className='text-[6px] smm:leading-[1.2vw] text-[#00DDFF] lgm:text-[1.5vw] text-left w-full'>{"Unlimited Supply"}</p>
                    <p className='text-[6px]  smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw] lgm:text-[1vw] text-left w-full font-light '>{"Play And Earn"}</p>
                    <div className="flex w-full pl-1 mt-[3px] lgm:mt-[1vw] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i1} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Synthesis"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i2} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Building Challenge"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i3} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Tournament Fee"}</p>
                    </div>
                    <div className="flex w-full pl-1 mt-[0.3px] items-center">
                      <svg className="lgm:w-[1vw] lgm:h-[1vw]" width="5" height="5" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_580_68548)">
                          <mask id="mask0_580_68548" maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="8">
                            <rect width="8" height="8" fill="#D9D9D9"/>
                          </mask>
                          <g mask="url(#mask0_580_68548)">
                            <path d="M0.666748 3.99935L4.00008 0.666016L7.33342 3.99935L4.00008 7.33268L0.666748 3.99935Z" fill="#F1E3B5"/>
                          </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_580_68548">
                        <rect width="8" height="8" fill="white"/>
                        </clipPath>
                        </defs>
                      </svg>
                      <Image src={i4} alt="" className="w-3 h-3 ml-1 lgm:w-[2vw] lgm:h-[2vw]"/>
                      <p className="ml-1 text-[6px] lgm:text-[1vw] smm:leading-[1.2vw] text-white mt-[3px] lgm:mt-[1vw]">{"Event Fee"}</p>
                    </div>
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
    }
    ) 
    return(
    <>
    <group ref={refsafe} position={[savedvalue.x,savedvalue.y,savedvalue.z]} rotation={[(Math.PI/180)*savedvalue.rx,(Math.PI/180)*savedvalue.ry,(Math.PI/180)*savedvalue.rz]} scale={savedvalue.s}  >
        <mesh >
          <primitive object={nodeobj5.nodes.Main} />
        </mesh>
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
      </group>
    </>
    )
  }
  
  const Capsule = ({savedvalue,i}:{savedvalue:any,i:any}) =>{
  //obj
      const obj5 = useGLTF("capsule/capsule.glb");
      const nodeobj5 = useLoader(GLTFLoader, "capsule/capsule.glb");
      const refsafe = useRef<any>()
      const {actions} = useAnimations(obj5.animations,refsafe)
  //obj
  //light
  const spotlightrefo = useRef<any>()
    useEffect(()=>{
    })
    useFrame((state, delta) => {
    }
    )
    return(
    <>
    <group ref={refsafe} position={[savedvalue.x,savedvalue.y,savedvalue.z]} rotation={[(Math.PI/180)*savedvalue.rx,(Math.PI/180)*savedvalue.ry,(Math.PI/180)*savedvalue.rz]} scale={savedvalue.s}  >
        <mesh >
          <primitive object={nodeobj5.nodes.Main} />
        </mesh>
    </group>
    </>
    )
  }
  
  const Safe = ({savedvalue,i}:{savedvalue:any,i:any}) =>{
    //obj
        const obj5 = useGLTF("safe/safef2.glb");
        const nodeobj5 = useLoader(GLTFLoader, "safe/safef2.glb");
        const refsafe = useRef<any>()
        const refegg= useRef<any>()
        const {actions} = useAnimations(obj5.animations,refsafe)
    //obj
    //light
    const spotlightrefo = useRef<any>()
      useEffect(()=>{
        actions.Safe_safe_door_Anim_0?.play()
      })
     
      useFrame((state, delta) => {
      }
      )
      return(
      <>
      <group ref={refsafe} position={[savedvalue.x,savedvalue.y,savedvalue.z]} rotation={[(Math.PI/180)*savedvalue.rx,(Math.PI/180)*savedvalue.ry,(Math.PI/180)*savedvalue.rz]} scale={savedvalue.s}  >
          <mesh castShadow={false} >
            <primitive object={nodeobj5.nodes.Main} />
          </mesh>
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
          actions.Sacred_Egg_UseSacred_Anim_Mesh_1_Anim_0?.play()
          actions.Sacred_Egg_UseSacred_Anim_Mesh_2_Anim_1?.play()
          actions.Sacred_Egg_UseSacred_Anim_Mesh_Anim_2?.play()
          actions.Sacred_Egg_UseSacred_Anim_SacredEgg_Anim1_Anim_3?.play()
        })
        useFrame((state, delta) => {
        }
        )
        return(
        <>
        <group ref={refsafe} position={[savedvalue.x,savedvalue.y,savedvalue.z]} rotation={[(Math.PI/180)*savedvalue.rx,(Math.PI/180)*savedvalue.ry,(Math.PI/180)*savedvalue.rz]} scale={savedvalue.s}  >
            <mesh scale={savedvalue.s} >
              <primitive object={nodeobj5.nodes.Main}  />
            </mesh>
        </group>
        </>
        )
      }
const Island3d = ()=>{
    const Staticobject = useMemo(()=>{
      const nodesloader = useLoader(GLTFLoader, 'island4.glb')['nodes'];
      const glb = useGLTF("island4.glb");
        return(
            <mesh scale={1} rotation={[(Math.PI/180)*10,(Math.PI/180)*-100,(Math.PI/180)*0]} position={[0,0,0]}>
              <primitive object={nodesloader.Main} />
            </mesh>
        )
    },[])
    return(
    Staticobject
    )
  }