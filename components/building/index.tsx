import Head from 'next/head'
import mesh from "react-three-fiber"
import styles from '@/styles/Home.module.css'
import { Canvas } from 'react-three-fiber'
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useLoader,useThree } from "@react-three/fiber";
import { FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, Html, OrbitControls, TransformControls, useAnimations } from "@react-three/drei";
import { useFBX,useGLTF } from '@react-three/drei';
import * as THREE from "three";
import { a } from "@react-spring/three";
import { AmbientLight, Vector3 } from 'three';

export const Build = ({
        position,
        rotation,
      }:{
        position:any,
        rotation:any,   
 }) =>{
  const glb1 = useGLTF("build/1.glb");
  const node1 = useLoader(GLTFLoader, 'build/1.glb');
  const glb2 = useGLTF("build/2.glb");
  const node2 = useLoader(GLTFLoader, 'build/2.glb');
  const glb3 = useGLTF("build/3.glb");
  const node3 = useLoader(GLTFLoader, 'build/3.glb');
  const glb4 = useGLTF("build/4.glb");
  const node4 = useLoader(GLTFLoader, 'build/4.glb');
  const glb5 = useGLTF("build/5.glb");
  const node5 = useLoader(GLTFLoader, 'build/5.glb');
  const glb6 = useGLTF("build/6.glb");
  const node6 = useLoader(GLTFLoader, 'build/6.glb');
  const ref1 = useRef<any>()
  const ref2 = useRef<any>()
  const ref3 = useRef<any>()
  const ref4 = useRef<any>()
  const ref5 = useRef<any>()
  const ref6 = useRef<any>()
    const animate2 = useAnimations(glb2.animations,ref2)
    const animate3 = useAnimations(glb3.animations,ref3)
    const animate4 = useAnimations(glb4.animations,ref4)
    const animate5 = useAnimations(glb5.animations,ref5)
    const animate6 = useAnimations(glb6.animations,ref6)
    // const mixer = new THREE.AnimationMixer(glb)
    // void mixer.clipAction(glb.animations[0]).play();
    useFrame((state, delta) => {
      // mixer.update(delta);
    });
    useEffect(()=>{
      // console.log(glb2)
      animate2.actions.Building_ArmRotor_Animate_Anim_0?.play()
      animate3.actions.Building_LowerRotor_Animate_Anim_0?.play()
      animate4.actions.Building_UpperRotor_Animate_Anim_0?.play()
      animate5.actions.Building_Sphere_Animate_Anim_0?.play()
      animate6.actions.Building_Cylinder_Animate__2__Anim_0?.play()
      
      
    })
    return(
    <>
   
    <group ref={ref1} position={[position.x,position.y,position.z]} rotation={[(Math.PI/180)*rotation.x,(Math.PI/180)*rotation.y,(Math.PI/180)*rotation.z]} >
    <group position={[0,-24.2,12]}>
      <mesh >
        <primitive object={node1.nodes.Main} />
      </mesh>
      <mesh ref={ref2}>
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
      </mesh>
      <mesh ref={ref6}>
        <primitive object={node6.nodes.Main} />
      </mesh>
      </group>
    </group>
    {/* <TransformControls ref={ref1}/> */}
    </>
    )
  }