import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Función para cargar el mapa
function World() {
  const { scene } = useGLTF('/assets/world2.glb'); // Ruta del archivo GLB
  return <primitive object={scene} scale={1} />;
}

// Función para cargar el personaje y manejar su movimiento
function Character() {
  const { scene } = useGLTF('/assets/Dayo.glb'); // Ruta del archivo GLB del personaje
  const characterRef = useRef();
  const [position, setPosition] = useState([0, 0, 0]);

  // Función para manejar el movimiento del personaje
  const handleKeyDown = (event) => {
    const speed = 0.1; // Ajusta la velocidad del movimiento
    const newPosition = [...position];

    switch (event.key) {
      case 'ArrowUp':
        newPosition[2] -= speed; // Mover hacia adelante
        break;
      case 'ArrowDown':
        newPosition[2] += speed; // Mover hacia atrás
        break;
      case 'ArrowLeft':
        newPosition[0] -= speed; // Mover hacia la izquierda
        break;
      case 'ArrowRight':
        newPosition[0] += speed; // Mover hacia la derecha
        break;
      default:
        break;
    }

    setPosition(newPosition);
  };

  // Agregar y quitar el evento de teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]); // Dependencia para actualizar la posición

  return <primitive ref={characterRef} object={scene} position={position} scale={1} />;
}

function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <OrbitControls />
      <World />
      <Character /> {/* Aquí se añade el personaje */}
    </Canvas>
  );
}

export default Scene;
