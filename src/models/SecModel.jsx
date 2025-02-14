import { useGLTF, useAnimations } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'

export const Earth = ({ hoverScale, hoverSpeed }) => {
    const ref = useRef();
    const { scene, animations } = useGLTF('earth.glb');
    const { actions } = useAnimations(animations, ref);

    const [isHovered, setIsHovered] = useState(false);
    const defaultScale = 1.8;
    const defaultSpeed = 0.001;

    // Play the animation if it exists
    useEffect(() => {
        if (actions && actions['Animaci��n']) {
            actions['Animaci��n'].play();
        }
    }, [actions]);

    // Rotate the Earth on each frame
    useFrame(() => {
        if (ref.current) {
            const rotationSpeed = isHovered ? hoverSpeed : defaultSpeed;
            ref.current.rotation.y += rotationSpeed;
        }
    });

    return (
        <primitive
            object={scene}
            ref={ref}
            position={[0, 0, 0]}
            scale={isHovered ? defaultScale + hoverScale : defaultScale}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        />
    );
};

const SecModel = () => {
    return (
        <Canvas>
            <ambientLight intensity={3} />
            <Earth hoverScale={0.15} hoverSpeed={0.008} />
        </Canvas>
    );
};

export default SecModel;
