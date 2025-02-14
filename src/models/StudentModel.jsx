import { useAnimations, useGLTF, useProgress } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Loading from '../components/Loading';

export const StudentModelContent = ({ isActive, onLoaded }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF('final.glb');
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    const animationName = "Armature|mixamo.com|Layer0";
    if (actions && actions[animationName]) {
      if (isActive) {
        actions[animationName].play();
      } else {
        actions[animationName].stop();
      }
    }
  }, [isActive, actions]);

  useEffect(() => {
    if (scene) {
      onLoaded();
    }
  }, [scene, onLoaded]);

  return <primitive object={scene} ref={ref} position={[1, -11, -5]} scale={9} />;
};

const StudentModel = ({ isActive }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Loading/>}
      <Canvas style={{ height: '100vh', width:'40%'}}>
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <StudentModelContent isActive={isActive} onLoaded={() => setIsLoaded(true)} />
      </Canvas>
    </>
  );
};

export default StudentModel;