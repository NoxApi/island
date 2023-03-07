import Head from 'next/head'
import mesh from "react-three-fiber"
import styles from '@/styles/Home.module.css'
import { Canvas } from 'react-three-fiber'
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useLoader,useThree } from "@react-three/fiber";
import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, Html, OrbitControls, TransformControls, useAnimations, useHelper } from "@react-three/drei";
import { useFBX,useGLTF } from '@react-three/drei';
import * as THREE from "three";
import { a } from "@react-spring/three";
import { AmbientLight, SpotLightHelper, Vector3 } from 'three';

export const Syn = ({
        position,
        rotation,
      }:{
        position:any,
        rotation:any,   
 }) =>{
    const glb = useGLTF("syn/syn1.glb");
    const node = useLoader(GLTFLoader, 'syn/syn1.glb');
    const ref = useRef<any>()
    const spotlightref1 = useRef<any>()
    const {actions} = useAnimations(glb.animations,ref)
    // const mixer = new THREE.AnimationMixer(glb)
    // void mixer.clipAction(glb.animations[0]).play();
    useFrame((state, delta) => {
    });
    useEffect(()=>{
        actions.Synthesis_pCube1_Anim_1?.play()
        actions.Synthesis_polySurface47_Anim_0?.play()
    })
    // useHelper(spotlightref1, SpotLightHelper, 'red')
    return(
    <>
    <group ref={ref} position={[position.x,position.y,position.z]} rotation={[(Math.PI/180)*rotation.x,(Math.PI/180)*rotation.y,(Math.PI/180)*rotation.z]}  >
    {/* <spotLight
        ref={spotlightref1}
        color="white"
        intensity={4}//4
        position={[0, 18,0]}  
        penumbra={1}
        angle={(Math.PI/180)*34}
        distance={35}
        castShadow={false} 
        target={node.nodes.Main}   
      /> */}
      <mesh scale={1.5}>
        <primitive object={node.nodes.Main} />
      </mesh>
    </group>
    
    </>
    )
}