import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const WaveEffect = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const materialRef = useRef(null);
  const transitionFrameId = useRef(null);
  const isDarkModeRef = useRef(isDarkMode);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      u_colorInvert: { value: isDarkMode ? 0 : 1 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform float u_colorInvert;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(3100.98,108.233))) * 1.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);

          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));

          vec2 u = f * f * (3.0 - 2.0 * f);

          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution;

          float noiseIntensity = mix(0.01, 0.005, u_colorInvert);
          float noiseScale = 3.5;

          vec2 noiseOffset = vec2(
            noise(st * noiseScale + u_time * 0.1) * noiseIntensity,
            noise(st * noiseScale + u_time * 0.15 + 10.0) * noiseIntensity
          );

          vec2 smudgedCoords = st + noiseOffset;

          float wave1 = sin((smudgedCoords.x * (2.5 + sin(u_time * 0.15) * 1.2) + u_time * 0.6) + random(smudgedCoords) * 3.14) * 
                        cos((smudgedCoords.y * (12.0 + cos(u_time * 0.2) * 1.3) - u_time * 0.5) + random(smudgedCoords) * 3.14) * 0.9;

          float wave2 = sin((smudgedCoords.x * (10.0 + cos(u_time * 0.12) * 1.5) - u_time * 0.9) + random(smudgedCoords) * 3.14) * 
                        cos((smudgedCoords.y * (16.0 + sin(u_time * 0.1) * 1.6) + u_time * 0.8) + random(smudgedCoords) * 3.14) * 0.7;

          float wave3 = sin((smudgedCoords.x * (8.0 + sin(u_time * 0.1) * 2.0) + u_time * 5.2) + random(smudgedCoords) * 3.14) * 
                        cos((smudgedCoords.y * (5.0 + cos(u_time * 0.12) * 1.8) - u_time * 1.3) + random(smudgedCoords) * 3.14) * 0.5;

          float wave = wave1 + wave2 * 0.8 + wave3 * 0.6;
          float intensity = smoothstep(0.3, 0.4, abs(wave));

          vec3 darkColor = vec3(0.12, 0.12, 0.12);
          vec3 lightColor = mix(vec3(0.83, 0.82, 0.81), vec3(0.88, 0.87, 0.86), intensity);

          float intensityModifier = mix(1.0, 0.5, u_colorInvert);
          float blendFactor = mix(0.5, 0.001, u_colorInvert);
          vec3 baseColor = mix(darkColor, lightColor, u_colorInvert);
          vec3 finalColor = mix(baseColor, vec3(0.0), intensity * blendFactor * intensityModifier);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true,
    });

    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let lastTime = 0;
    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      uniforms.u_time.value = time * 0.0008;
      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      uniforms.u_resolution.value.set(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId.current);
      cancelAnimationFrame(transitionFrameId.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      isDarkModeRef.current = isDarkMode;

      const startValue = materialRef.current.uniforms.u_colorInvert.value;
      const endValue = isDarkMode ? 0 : 1;
      const duration = 1000;
      const startTime = performance.now();

      const animateTransition = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        materialRef.current.uniforms.u_colorInvert.value = THREE.MathUtils.lerp(
          startValue,
          endValue,
          progress
        );

        if (progress < 1) {
          transitionFrameId.current = requestAnimationFrame(animateTransition);
        }
      };

      transitionFrameId.current = requestAnimationFrame(animateTransition);
    }
  }, [isDarkMode]);

  return (
    <div className="background">
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default WaveEffect;
