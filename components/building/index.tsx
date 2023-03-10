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
import { AmbientLight, Vector3,PointLight,SpotLight, SpotLightHelper } from 'three';

export const Build = ({
        position,
        rotation,
      }:{
        position:any,
        rotation:any,   
 }) =>{
  const pointLight = new PointLight(0xffffff,0.1);
  const glb1 = useGLTF("build/buildf.glb");
  const node1 = useLoader(GLTFLoader, 'build/buildf.glb');
  // const glb1 = useGLTF("build/1.glb");
  // const node1 = useLoader(GLTFLoader, 'build/1.glb');
  // const glb2 = useGLTF("build/2.glb");
  // const node2 = useLoader(GLTFLoader, 'build/2.glb');
  // const glb3 = useGLTF("build/3.glb");
  // const node3 = useLoader(GLTFLoader, 'build/3.glb');
  // const glb4 = useGLTF("build/4.glb");
  // const node4 = useLoader(GLTFLoader, 'build/4.glb');
  // const glb5 = useGLTF("build/5.glb");
  // const node5 = useLoader(GLTFLoader, 'build/5.glb');
  const glb6 = useGLTF("build/6.glb");
  const node6 = useLoader(GLTFLoader, 'build/6.glb');
  const refgroup = useRef<any>()
  const reflight = useRef<any>()
  const ref1 = useRef<any>()
  const ref2 = useRef<any>()
  const ref3 = useRef<any>()
  const ref4 = useRef<any>()
  const ref5 = useRef<any>()
  const ref6 = useRef<any>()
  const spotlightref1 = useRef<any>()
  const animate = useAnimations(glb1.animations,ref1)
    // const animate2 = useAnimations(glb2.animations,ref2)
    // const animate3 = useAnimations(glb3.animations,ref3)
    // const animate4 = useAnimations(glb4.animations,ref4)
    // const animate5 = useAnimations(glb5.animations,ref5)
    const animate6 = useAnimations(glb6.animations,ref6)
    // const mixer = new THREE.AnimationMixer(glb)
    // void mixer.clipAction(glb.animations[0]).play();
    useFrame((state, delta) => {
      // ref1.current.emissive.setScalar(0.4);
      // reflight.current.position.copy(refgroup)
    });
    useEffect(()=>{
      console.log(animate)
      animate.actions.Building_ArmRotor_Animate_Anim_2?.play()
      animate.actions.Building_LowerRotor_Animate_Anim_3?.play()
      animate.actions.Building_UpperRotor_Animate_Anim_1?.play()
      animate.actions.Building_Sphere_Animate_Anim_0?.play()
      animate6.actions.Building_Cylinder_Animate__2__Anim_0?.play()
      
    })
    // useHelper(spotlightref1, SpotLightHelper, 'yellow')
    return(
    <> 
    <group ref={refgroup} position={[position.x,position.y,position.z]} rotation={[(Math.PI/180)*rotation.x,(Math.PI/180)*rotation.y,(Math.PI/180)*rotation.z]} >
    {/* <spotLight
        ref={spotlightref1}
        color="white"
        intensity={0}
        position={[0, 10,0]}  
        penumbra={0}
        angle={(Math.PI/180)*40}
        distance={40}
        castShadow={false} 
        target={node2.nodes.Main}   
      /> */}
      <mesh ref={ref1} position={[0,-2,-1]} scale={1.4}>
        <primitive object={node1.nodes.Main} />
      </mesh>
    <group position={[-1,-25,13.6] }> 
      
      {/* <mesh ref={ref2}>
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
      </mesh> */}
      <mesh ref={ref6} >
        <primitive object={node6.nodes.Main} />
      </mesh>
      </group>
    </group>
    {/* <TransformControls ref={ref1}/> */}
    </>
    )
  }