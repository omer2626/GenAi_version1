// import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { gsap } from 'gsap';
// import './Globe.css'; // Assuming you've moved the CSS to a separate file

// // Vertex shader
// const vertexShader = `
//     uniform sampler2D u_map_tex;
//     uniform float u_dot_size;
//     uniform float u_time_since_click;
//     uniform vec3 u_pointer;

//     #define PI 3.14159265359

//     varying float vOpacity;
//     varying vec2 vUv;

//     void main() {
//         vUv = uv;

//         // mask with world map
//         float visibility = step(.2, texture2D(u_map_tex, uv).r);
//         gl_PointSize = visibility * u_dot_size;

//         // make back dots semi-transparent
//         vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
//         vOpacity = (1. / length(mvPosition.xyz) - .7);
//         vOpacity = clamp(vOpacity, .03, 1.);

//         // add ripple
//         float t = u_time_since_click - .1;
//         t = max(0., t);
//         float max_amp = .15;
//         float dist = 1. - .5 * length(position - u_pointer); // 0 .. 1
//         float damping = 1. / (1. + 20. * t); // 1 .. 0
//         float delta = max_amp * damping * sin(5. * t * (1. + 2. * dist) - PI);
//         delta *= 1. - smoothstep(.8, 1., dist);
//         vec3 pos = position;
//         pos *= (1. + delta);

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
//     }
// `;

// // Fragment shader
// const fragmentShader = `
//     uniform sampler2D u_map_tex;

//     varying float vOpacity;
//     varying vec2 vUv;

//     void main() {
//         vec3 color = texture2D(u_map_tex, vUv).rgb;
//         color -= .2 * length(gl_PointCoord.xy - vec2(.5));
//         float dot = 1. - smoothstep(.38, .4, length(gl_PointCoord.xy - vec2(.5)));
//         if (dot < 0.5) discard;
//         gl_FragColor = vec4(color, dot * vOpacity);
//     }
// `;

// const Globe = () => {
//   const containerRef = useRef(null);
//   const canvas3DRef = useRef(null);
//   const canvas2DRef = useRef(null);
//   const popupRef = useRef(null);

//   const [renderer, setRenderer] = useState(null);
//   const [scene, setScene] = useState(new THREE.Scene());
//   const [camera, setCamera] = useState(null);
//   const [rayCaster, setRayCaster] = useState(new THREE.Raycaster());
//   const [controls, setControls] = useState(null);
//   const [pointer, setPointer] = useState(null);
//   const [globe, setGlobe] = useState(null);
//   const [globeMesh, setGlobeMesh] = useState(null);
//   const [mapMaterial, setMapMaterial] = useState(null);
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [pointerPos, setPointerPos] = useState(null);
//   const [clock, setClock] = useState(new THREE.Clock());
//   const [mouse, setMouse] = useState(new THREE.Vector2(-1, -1));
//   const [dragged, setDragged] = useState(false);
//   const [earthTexture, setEarthTexture] = useState(null);
//   const [popupOpenTl, setPopupOpenTl] = useState(null);
//   const [popupCloseTl, setPopupCloseTl] = useState(null);

//   useEffect(() => {
//     initScene();
//     window.addEventListener('resize', updateSize);
//     return () => {
//       window.removeEventListener('resize', updateSize);
//     };
//   }, []);

//   useEffect(() => {
//     if (renderer && scene && camera) {
//       updateSize();
//       render();
//     }
//   }, [renderer, scene, camera]);

//   const initScene = () => {
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvas3DRef.current,
//       alpha: true,
//     });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     setRenderer(renderer);

//     const camera = new THREE.OrthographicCamera(
//       -1.1,
//       1.1,
//       1.1,
//       -1.1,
//       0,
//       3
//     );
//     camera.position.z = 1.1;
//     setCamera(camera);

//     createOrbitControls(camera, renderer.domElement);

//     new THREE.TextureLoader().load(
//       'https://ksenia-k.com/img/earth-map-colored.png',
//       (mapTex) => {
//         setEarthTexture(mapTex);
//         mapTex.repeat.set(1, 1);
//         createGlobe(mapTex);
//         createPointer();
//         createPopupTimelines();
//         addCanvasEvents();
//         updateSize(); // Update the size of the renderer and camera
//         render(); // Start the rendering loop
//       }
//     );
//   };

//   const createOrbitControls = (camera, canvas) => {
//     const controls = new OrbitControls(camera, canvas);
//     controls.enablePan = false;
//     controls.enableZoom = false;
//     controls.enableDamping = true;
//     controls.minPolarAngle = 0.4 * Math.PI;
//     controls.maxPolarAngle = 0.4 * Math.PI;
//     controls.autoRotate = true;

//     let timestamp;
//     controls.addEventListener('start', () => {
//       timestamp = Date.now();
//     });
//     controls.addEventListener('end', () => {
//       setDragged(Date.now() - timestamp > 600);
//     });

//     setControls(controls);
//   };

//   const createGlobe = (earthTexture) => {
//     const globeGeometry = new THREE.IcosahedronGeometry(1, 22);
//     const mapMaterial = new THREE.ShaderMaterial({
//       vertexShader: vertexShader,
//       fragmentShader: fragmentShader,
//       uniforms: {
//         u_map_tex: { type: 't', value: earthTexture },
//         u_dot_size: { type: 'f', value: 0 },
//         u_pointer: { type: 'v3', value: new THREE.Vector3(0, 0, 1) },
//         u_time_since_click: { value: 0 },
//       },
//       alphaTest: false,
//       transparent: true,
//     });
//     setMapMaterial(mapMaterial);

//     const globe = new THREE.Points(globeGeometry, mapMaterial);
//     scene.add(globe);
//     setGlobe(globe);

//     const globeMesh = new THREE.Mesh(
//       globeGeometry,
//       new THREE.MeshBasicMaterial({
//         color: 0x222222,
//         transparent: true,
//         opacity: 0.05,
//       })
//     );
//     scene.add(globeMesh);
//     setGlobeMesh(globeMesh);
//   };

//   const createPointer = () => {
//     const geometry = new THREE.SphereGeometry(0.04, 16, 16);
//     const material = new THREE.MeshBasicMaterial({
//       color: 0x000000,
//       transparent: true,
//       opacity: 0,
//     });
//     const pointer = new THREE.Mesh(geometry, material);
//     scene.add(pointer);
//     setPointer(pointer);
//   };

//   const addCanvasEvents = () => {
//     containerRef.current.addEventListener('mousemove', (e) => {
//       updateMousePosition(e.clientX, e.clientY);
//     });

//     containerRef.current.addEventListener('click', (e) => {
//       if (!dragged) {
//         updateMousePosition(
//           e.targetTouches ? e.targetTouches[0].pageX : e.clientX,
//           e.targetTouches ? e.targetTouches[0].pageY : e.clientY
//         );

//         const res = checkIntersects();
//         if (res.length) {
//           const newPointerPos = res[0].face.normal.clone();
//           setPointerPos(newPointerPos);
//           pointer.position.set(
//             newPointerPos.x,
//             newPointerPos.y,
//             newPointerPos.z
//           );
//           mapMaterial.uniforms.u_pointer.value = newPointerPos;
//           popupRef.current.innerHTML = cartesianToLatLong(newPointerPos);
//           showPopupAnimation(true);
//           clock.start();
//         }
//       }
//     });
//   };

//   const updateMousePosition = (eX, eY) => {
//     const rect = containerRef.current.getBoundingClientRect();
//     mouse.x = ((eX - rect.left) / rect.width) * 2 - 1;
//     mouse.y = -(((eY - rect.top) / rect.height) * 2 - 1);
//   };

//   const checkIntersects = () => {
//     if (!globeMesh) return [];
//     rayCaster.setFromCamera(mouse, camera);
//     const intersects = rayCaster.intersectObject(globeMesh);
//     if (intersects.length) {
//       document.body.style.cursor = 'pointer';
//     } else {
//       document.body.style.cursor = 'auto';
//     }
//     return intersects;
//   };

//   const render = () => {
//     if (mapMaterial) {
//       mapMaterial.uniforms.u_time_since_click.value = clock.getElapsedTime();
//     }
//     checkIntersects();
//     if (pointer) {
//       updateOverlayGraphic();
//     }
//     controls.update();
//     renderer.render(scene, camera);
//     requestAnimationFrame(render);
//   };

//   const updateSize = () => {
//     if (!renderer) return;
//     const minSide = 0.65 * Math.min(window.innerWidth, window.innerHeight);
//     containerRef.current.style.width = `${minSide}px`;
//     containerRef.current.style.height = `${minSide}px`;
//     renderer.setSize(minSide, minSide);
//     canvas2DRef.current.width = canvas2DRef.current.height = minSide;
//     if (mapMaterial) {
//       mapMaterial.uniforms.u_dot_size.value = 0.04 * minSide;
//     }
//   };

//   const cartesianToLatLong = (pos) => {
//     const lat = 90 - (Math.acos(pos.y) * 180) / Math.PI;
//     const lng = ((270 + (Math.atan2(pos.x, pos.z) * 180) / Math.PI) % 360) - 180;
//     return `${formatCoordinate(lat, 'N', 'S')}, ${formatCoordinate(
//       lng,
//       'E',
//       'W'
//     )}`;
//   };

//   const formatCoordinate = (coordinate, positiveDirection, negativeDirection) => {
//     const direction = coordinate >= 0 ? positiveDirection : negativeDirection;
//     return `${Math.abs(coordinate).toFixed(4)}° ${direction}`;
//   };

//   const createPopupTimelines = () => {
//     const popupOpenTl = gsap.timeline({ paused: true })
//       .to(pointer.material, {
//         duration: 0.2,
//         opacity: 1,
//       }, 0)
//       .fromTo(
//         canvas2DRef.current,
//         { opacity: 0 },
//         { duration: 0.3, opacity: 1 },
//         0.15
//       )
//       .fromTo(
//         popupRef.current,
//         { opacity: 0, scale: 0.9, transformOrigin: 'center bottom' },
//         { duration: 0.1, opacity: 1, scale: 1 },
//         0.25
//       );
//     setPopupOpenTl(popupOpenTl);

//     const popupCloseTl = gsap.timeline({ paused: true })
//       .to(pointer.material, { duration: 0.3, opacity: 0.2 }, 0)
//       .to(canvas2DRef.current, { duration: 0.3, opacity: 0 }, 0)
//       .to(popupRef.current, {
//         duration: 0.3,
//         opacity: 0,
//         scale: 0.9,
//         transformOrigin: 'center bottom',
//       }, 0);
//     setPopupCloseTl(popupCloseTl);
//   };

//   const showPopupAnimation = (lifted) => {
//     if (lifted) {
//       let positionLifted = pointer.position.clone();
//       positionLifted.multiplyScalar(1.3);
//       gsap.from(pointer.position, {
//         duration: 0.25,
//         x: positionLifted.x,
//         y: positionLifted.y,
//         z: positionLifted.z,
//         ease: 'power3.out',
//       });
//     }
//     popupCloseTl.pause(0);
//     popupOpenTl.play(0);
//   };

//   const updateOverlayGraphic = () => {
//     const overlayCtx = canvas2DRef.current.getContext('2d');
//     let activePointPosition = pointer.position.clone();
//     activePointPosition.applyMatrix4(globe.matrixWorld);
//     const activePointPositionProjected = activePointPosition.clone();
//     activePointPositionProjected.project(camera);
//     const coordinates2D = [
//       (activePointPositionProjected.x + 1) * containerRef.current.offsetWidth * 0.5,
//       (1 - activePointPositionProjected.y) * containerRef.current.offsetHeight * 0.5,
//     ];

//     const matrixWorldInverse = controls.object.matrixWorldInverse;
//     activePointPosition.applyMatrix4(matrixWorldInverse);

//     if (activePointPosition.z > -1) {
//       if (!popupVisible) {
//         setPopupVisible(true);
//         showPopupAnimation(false);
//       }

//       let popupX = coordinates2D[0];
//       popupX -= activePointPositionProjected.x * containerRef.current.offsetWidth * 0.3;

//       let popupY = coordinates2D[1];
//       const upDown = activePointPositionProjected.y > 0.6;
//       popupY += upDown ? 20 : -20;

//       gsap.set(popupRef.current, {
//         x: popupX,
//         y: popupY,
//         xPercent: -35,
//         yPercent: upDown ? 0 : -100,
//       });

//       popupY += upDown ? -5 : 5;
//       const curveMidX = popupX + activePointPositionProjected.x * 100;
//       const curveMidY = popupY + (upDown ? -0.5 : 0.1) * coordinates2D[1];

//       drawPopupConnector(overlayCtx, coordinates2D[0], coordinates2D[1], curveMidX, curveMidY, popupX, popupY);

//     } else {
//       if (popupVisible) {
//         popupOpenTl.pause(0);
//         popupCloseTl.play(0);
//       }
//       setPopupVisible(false);
//     }
//   };

//   const drawPopupConnector = (ctx, startX, startY, midX, midY, endX, endY) => {
//     ctx.strokeStyle = '#000000';
//     ctx.lineWidth = 3;
//     ctx.lineCap = 'round';
//     ctx.clearRect(0, 0, containerRef.current.offsetWidth, containerRef.current.offsetHeight);
//     ctx.beginPath();
//     ctx.moveTo(startX, startY);
//     ctx.quadraticCurveTo(midX, midY, endX, endY);
//     ctx.stroke();
//   };

//   return (
//     <div className='page'>
//       {/* <div className='title'>Click to add a pointer</div> */}
//       <div className='globe-wrapper' ref={containerRef}>
//         <canvas id='globe-3d' ref={canvas3DRef}></canvas>
//         <canvas id='globe-2d-overlay' ref={canvas2DRef}></canvas>
//         <div id='globe-popup-overlay'>
//           <div className='globe-popup' ref={popupRef}></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Globe;

import React from "react";
// import '../../public/'

const Globe = () => {
  return (
    <iframe
      src={`../../public/three/index.html`}
      title="Three.js Globe"
      width="100%"
      height="100%"
      style={{ border: "none", overflow: "hidden" }}
    ></iframe>
  );
};

export default Globe;

// import React, { useState, useEffect } from 'react';

// const Globe = () => {
//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
//     fetch('../../public/three/index.html')
//       .then((response) => response.text())
//       .then((data) => {
//         setHtmlContent(data);
//         executeScripts(data);
//       });
//   }, []);

//   const executeScripts = (html) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     const scripts = doc.querySelectorAll('script');
//     scripts.forEach((script) => {
//       const newScript = document.createElement('script');
//       newScript.text = script.text;
//       document.body.appendChild(newScript);
//       document.body.removeChild(newScript);
//     });
//   };

//   return (
//     <div
//       className="globe-container"
//       dangerouslySetInnerHTML={{ __html: htmlContent }}
//     ></div>
//   );
// };

// export default Globe;

