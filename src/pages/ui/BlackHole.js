// import * as THREE from 'three';

// const vertexShader = `
//   varying vec2 vUv;
//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `;

// const fragmentShader = `
//   uniform float iTime;
//   uniform vec2 iResolution;
//   uniform vec2 iMouse;
  
//   varying vec2 vUv;

//   // RENDERING CONSTANTS
//   // Increased steps to allow for higher precision matching
//   #define MAX_STEPS 1000
//   #define MAX_DIST 100.0
//   #define SURF_DIST 0.05
  
//   // BLACK HOLE PHYSICS CONSTANTS
//   #define BH_RADIUS 2.3
//   #define DISK_INNER 4.0
//   #define DISK_OUTER 20.0
//   #define DISK_HEIGHT 0.25
//   #define CAM_DIST 50
  
//   // MATH UTILS
//   mat2 rot(float a) {
//       float s = sin(a), c = cos(a);
//       return mat2(c, -s, s, c);
//   }

//   // NOISE FUNCTIONS (Gas Texture)
//   float hash(vec2 p) {
//       p = fract(p * vec2(123.34, 456.21));
//       p += dot(p, p + 45.32);
//       return fract(p.x * p.y);
//   }

//   float noise(vec2 p) {
//       vec2 i = floor(p);
//       vec2 f = fract(p);
//       f = f * f * (3.0 - 2.0 * f);
//       float a = hash(i);
//       float b = hash(i + vec2(1.0, 0.0));
//       float c = hash(i + vec2(0.0, 1.0));
//       float d = hash(i + vec2(1.0, 1.0));
//       return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
//   }

//   float flowFbm(vec2 p) {
//     float sum = 0.0;
//     float amp = 0.5;
//     float freq = 1.0;
//     p += vec2(10.0, 10.0);
//     for(int i = 0; i < 5; i++) {
//         float n = noise(p * freq);
//         sum += n * amp;
//         p += vec2(n * 0.4, n * 0.4); 
//         p += vec2(15.2, 5.3); 
//         amp *= 0.5;
//         freq *= 2.0;
//     }
//     return sum;
//   }

//   // --- HIGH QUALITY GRADIENT NOISE ---
  
//   vec2 hash2(vec2 p) {
//       p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
//       return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
//   }

//   float gnoise(vec2 p) {
//       vec2 i = floor(p);
//       vec2 f = fract(p);
      
//       // Quintic interpolation (smoother than cubic)
//       vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

//       return mix(mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
//                      dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
//                  mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
//                      dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
//   }

//   // --- FLUID FBM ---
//   // Uses Gradient Noise for a wispy, gas-like look.
//   // We removed all cumulative shifts to 'p' that caused spreading.
  
//   float fbm(vec2 p) {
//       float sum = 0.0;
//       float amp = 0.5;
//       float freq = 1.0;
      
//       for(int i = 0; i < 5; i++) {
//           sum += gnoise(p * freq) * amp;
          
//           // Rotate the noise layers slightly to create "swirl" without radial drift
//           // This rotation is safe because it happens inside the octave, not to the root P
//           vec2 shift = vec2(100.0, 100.0);
//           p = p + shift; 
          
//           amp *= 0.5;
//           freq *= 2.0;
//       }
//       return sum;
//   }

//   // --- DOMAIN WARPING (SMOKE EFFECT) ---
//   float gasNoise(vec2 p) {
//       // 1. Get base noise field
//       vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));
      
//       // 2. Wrap it (The -0.5 is CRITICAL to prevent spreading)
//       // This centers the distortion so it wobbles in place.
//       vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2)), fbm(p + 4.0 * q + vec2(8.3, 2.8))) - 0.5;
      
//       // 3. Final sample
//       // We reduce the warp strength (from 4.0 to 1.0) to keep it controlled
//       return fbm(p + 1.5 * r);
//   }


//   void main() {
//       // Normalize UV
//       vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
      
//       // -- CAMERA SETUP --
//       // Placed far back for "Mid-Sized" appearance
//       vec3 ro = vec3(0.0, 2.0, -CAM_DIST); 
      
//       // -- MINIMAL INTERACTION -- SENSITIVITY CONTROLS:
//       float xSensitivity = 0.8; // Left/Right
//       float ySensitivity = 0.3; // Up/Down

//       // Calculate Rotation based on mouse position (centered)
//       float mX = (iMouse.x / iResolution.x - 0.5) * xSensitivity; 
//       float mY = ((iMouse.y / iResolution.y) - 0.5) * ySensitivity;
      
//       // Apply rotation
//       ro.yz *= rot(mY + 0.1); // +0.1 tilts camera slightly up to see the disk top
//       ro.xz *= rot(mX);       // Rotates left/right

//       vec3 ta = vec3(0.0, 0.0, 0.0);
//       vec3 w = normalize(ta - ro);
//       vec3 u = normalize(cross(w, vec3(0.0, 1.0, 0.0)));
//       vec3 v = cross(u, w);
//       vec3 rd = normalize(u * uv.x + v * uv.y + w * 1.8);

//       // ACCUMULATION
//       vec3 col = vec3(0.0);
//       vec3 diskCol = vec3(0.0);
      
//       vec3 p = ro;
//       vec3 dir = rd;
      
//       float totDist = 0.0;
//       bool hitBH = false;

//       // -- RAY MARCHING LOOP --
//       for(int i = 0; i < MAX_STEPS; i++) {
//           float distToCenter = length(p);
          
//           // 1. GRAVITATIONAL LENSING
//           // Tweaked constants: Higher numerator (0.6) and lower epsilon (0.02)
//           // creates sharper bending near the event horizon.
//           float gravity = 0.6 / (distToCenter * distToCenter + 0.02);
//           vec3 toCenter = normalize(-p);
//           dir = normalize(dir + toCenter * gravity);

//           // 2. ACCRETION DISK VOLUMETRICS
//           if(abs(p.y) < DISK_HEIGHT * 4.0) {
//               float r = length(p.xz) + 1.0;
              
//               if(r > DISK_INNER && r < DISK_OUTER) {
//                   float angle = atan(p.z, p.x);
//                   float speed = 1.5 / sqrt(r); 
                  
//                   // Gas texture
//                   // float gas = flowFbm(vec2(r * 1.5, angle * 2.0 - iTime * speed));
//                   float time = iTime * speed;
//                   float gas = fbm(vec2(r * 1.5, angle * 2.0 - iTime * speed)) + gasNoise(vec2(r * 2.0, angle * 3.0 - time));
//                   gas = gas * 0.5 + 0.5; 
//                   gas = pow(gas, 2.0) + 0.6 * flowFbm(vec2(r * 1.5, angle * 2.0 - iTime * speed));

//                   // Masking
//                   float density = smoothstep(DISK_INNER, DISK_INNER + 1.0, r) * smoothstep(DISK_OUTER, DISK_OUTER - 4.0, r);
//                   density *= smoothstep(DISK_HEIGHT * 2.0, 0.0, abs(p.y)); 
                  
//                   // 3. RELATIVISTIC DOPPLER SHIFT
//                   vec3 vel = normalize(vec3(-p.z, 0.0, p.x));
//                   float doppler = dot(dir, vel); 
                  
//                   // Colors: Bright Yellow/White (Approaching) -> Deep Red (Receding)
//                   vec3 hotColor = vec3(1.0, 0.9, 0.7) * 5.0; 
//                   vec3 coolColor = vec3(1.0, 0.9, 0.7) * 1.2; 
//                   vec3 localCol = mix(coolColor, hotColor, (doppler + 1.0) * 0.5);
                  
//                   // Intensity accumulation
//                   float intensity = gas * density * 0.12;
//                   diskCol += localCol * intensity;
//               }
//           }

//           // Step Ray
//           // Decreased step size factor (0.03) ensures the ray doesn't skip over the thin Einstein ring
//           float stepSize = max(0.02, distToCenter * 0.03); 
//           p += dir * stepSize;
//           totDist += stepSize;
          
//           if(distToCenter < BH_RADIUS) {
//               hitBH = true;
//               break; 
//           }
//           if(totDist > MAX_DIST) break;
//       }

//       float alpha = 1.0;
//       if(!hitBH) {
//         col = vec3(0.0);
//         // Only the accretion disk is visible. If diskCol is black, make pixel transparent
//         float brightness = dot(diskCol, vec3(0.33, 0.33, 0.33));
//         // Smoothly fade alpha based on brightness + glow. This allows the "glow" to sit on top of your CSS background
//         alpha = smoothstep(0.0, 0.1, brightness + length(col));
//       } else {
//         col = vec3(0.0); // Event Horizon is black
//         alpha = 1.0;
//       }

//       col += diskCol;
//       // Bloom / Atmosphere
//       float glowRadius = length(uv);
//       float outerGlow = exp(-glowRadius * 3.5) * 0.8; 
//       vec3 glowColor = vec3(1.0, 0.6, 0.2); 
//       col += outerGlow * glowColor;

//       alpha += outerGlow; 

//       // Inner Photon Ring
//       col += vec3(1.0, 0.8, 0.5) * (0.001 / abs(length(uv) - 0.225));

//       // Outer Photon Ring
//       col += vec3(1.0, 0.8, 0.5) * (0.01 / abs(length(uv) - 0.265));

//       // HDR Tone Mapping & Grading
//       col = 1.0 - exp(-col * 1.5);
//       col *= vec3(1.1, 1.05, 1.0);

//       gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));

//   }
// `;

// export function initBlackHole(canvas) {
//   const scene = new THREE.Scene();
//   const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
//   const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
//   const dpr = Math.min(window.devicePixelRatio, 2);
//   renderer.setPixelRatio(dpr);

//   const geometry = new THREE.PlaneGeometry(2, 2);
  
//   const initialMouse = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

//   const startWidth = canvas.clientWidth || window.innerWidth;
//   const startHeight = canvas.clientHeight || window.innerHeight;

//   const uniforms = {
//     iTime: { value: 0 },
//     iResolution: { value: new THREE.Vector2(startWidth * dpr, startHeight * dpr) },
//     iMouse: { value: initialMouse },
//   };

//   const material = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms,
//   });

//   const mesh = new THREE.Mesh(geometry, material);
//   scene.add(mesh);

//   const resize = () => {
//     const width = canvas.clientWidth;
//     const height = canvas.clientHeight;
    
//     if (width === 0 || height === 0) return;

//     if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
//         renderer.setSize(width, height, false);
//         uniforms.iResolution.value.set(width * dpr, height * dpr);
//     }
//   };

//   const observer = new ResizeObserver(resize);
//   observer.observe(canvas);

//   const onMouseMove = (e) => {
//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     uniforms.iMouse.value.set(x, y);
//   };
//   window.addEventListener('mousemove', onMouseMove);

//   resize();
//   setTimeout(resize, 100); 

//   let animationId;
//   const animate = (time) => {
//     uniforms.iTime.value = time * 0.001; 
//     renderer.render(scene, camera);
//     animationId = requestAnimationFrame(animate);
//   };

//   animate(0);

//   return () => {
//     observer.disconnect();
//     window.removeEventListener('mousemove', onMouseMove);
//     cancelAnimationFrame(animationId);
//     renderer.dispose();
//     geometry.dispose();
//     material.dispose();
//   };
// }







import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;
  
  varying vec2 vUv;

  // RENDERING CONSTANTS
  // Increased steps to allow for higher precision matching
  #define MAX_STEPS 1000
  #define MAX_DIST 100.0
  #define SURF_DIST 0.05
  
  // BLACK HOLE PHYSICS CONSTANTS
  #define BH_RADIUS 2.3
  #define DISK_INNER 4.0
  #define DISK_OUTER 20.0
  #define DISK_HEIGHT 0.25
  #define CAM_DIST 50
  
  // MATH UTILS
  mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
  }

  // NOISE FUNCTIONS (Gas Texture)
  float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
  }

  float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float flowFbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    p += vec2(10.0, 10.0);
    for(int i = 0; i < 5; i++) {
        float n = noise(p * freq);
        sum += n * amp;
        p += vec2(n * 0.4, n * 0.4); 
        p += vec2(15.2, 5.3); 
        amp *= 0.5;
        freq *= 2.0;
    }
    return sum;
  }

  // --- HIGH QUALITY GRADIENT NOISE ---
  
  // FIX: Replaced sin-based hash with fract-based hash to prevent precision loss (stopping) over time
  vec2 hash2(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.xx+p3.yz)*p3.zy) * 2.0 - 1.0;
  }

  float gnoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      
      // Quintic interpolation (smoother than cubic)
      vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

      return mix(mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                     dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                 mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                     dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  // --- FLUID FBM ---
  // Uses Gradient Noise for a wispy, gas-like look.
  // We removed all cumulative shifts to 'p' that caused spreading.
  
  float fbm(vec2 p) {
      float sum = 0.0;
      float amp = 0.5;
      float freq = 1.0;
      
      for(int i = 0; i < 5; i++) {
          sum += gnoise(p * freq) * amp;
          
          // Rotate the noise layers slightly to create "swirl" without radial drift
          // This rotation is safe because it happens inside the octave, not to the root P
          vec2 shift = vec2(100.0, 100.0);
          p = p + shift; 
          
          amp *= 0.5;
          freq *= 2.0;
      }
      return sum;
  }

  // --- DOMAIN WARPING (SMOKE EFFECT) ---
  float gasNoise(vec2 p) {
      // 1. Get base noise field
      vec2 q = vec2(fbm(p), fbm(p + vec2(5.2, 1.3)));
      
      // 2. Wrap it (The -0.5 is CRITICAL to prevent spreading)
      // This centers the distortion so it wobbles in place.
      vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2)), fbm(p + 4.0 * q + vec2(8.3, 2.8))) - 0.5;
      
      // 3. Final sample
      // We reduce the warp strength (from 4.0 to 1.0) to keep it controlled
      return fbm(p + 1.5 * r);
  }


  void main() {
      // Normalize UV
      vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
      
      // -- CAMERA SETUP --
      // Placed far back for "Mid-Sized" appearance
      vec3 ro = vec3(0.0, 2.0, -CAM_DIST); 
      
      // -- MINIMAL INTERACTION -- SENSITIVITY CONTROLS:
      float xSensitivity = 0.8; // Left/Right
      float ySensitivity = 0.3; // Up/Down

      // Calculate Rotation based on mouse position (centered)
      float mX = (iMouse.x / iResolution.x - 0.5) * xSensitivity; 
      float mY = ((iMouse.y / iResolution.y) - 0.5) * ySensitivity;
      
      // Apply rotation
      ro.yz *= rot(mY + 0.1); // +0.1 tilts camera slightly up to see the disk top
      ro.xz *= rot(mX);       // Rotates left/right

      vec3 ta = vec3(0.0, 0.0, 0.0);
      vec3 w = normalize(ta - ro);
      vec3 u = normalize(cross(w, vec3(0.0, 1.0, 0.0)));
      vec3 v = cross(u, w);
      vec3 rd = normalize(u * uv.x + v * uv.y + w * 1.8);

      // ACCUMULATION
      vec3 col = vec3(0.0);
      vec3 diskCol = vec3(0.0);
      
      vec3 p = ro;
      vec3 dir = rd;
      
      float totDist = 0.0;
      bool hitBH = false;

      // -- RAY MARCHING LOOP --
      for(int i = 0; i < MAX_STEPS; i++) {
          float distToCenter = length(p);
          
          // 1. GRAVITATIONAL LENSING
          // Tweaked constants: Higher numerator (0.6) and lower epsilon (0.02)
          // creates sharper bending near the event horizon.
          float gravity = 0.6 / (distToCenter * distToCenter + 0.02);
          vec3 toCenter = normalize(-p);
          dir = normalize(dir + toCenter * gravity);

          // 2. ACCRETION DISK VOLUMETRICS
          if(abs(p.y) < DISK_HEIGHT * 4.0) {
              float r = length(p.xz) + 1.0;
              
              if(r > DISK_INNER && r < DISK_OUTER) {
                  float angle = atan(p.z, p.x);
                  float speed = 1.5 / sqrt(r); 
                  
                  // Gas texture
                  // float gas = flowFbm(vec2(r * 1.5, angle * 2.0 - iTime * speed));
                  float time = iTime * speed;
                  float gas = fbm(vec2(r * 1.5, angle * 2.0 - iTime * speed)) + gasNoise(vec2(r * 2.0, angle * 3.0 - time));
                  gas = gas * 0.5 + 0.5; 
                  gas = pow(gas, 2.0) + 0.6 * flowFbm(vec2(r * 1.5, angle * 2.0 - iTime * speed));

                  // Masking
                  float density = smoothstep(DISK_INNER, DISK_INNER + 1.0, r) * smoothstep(DISK_OUTER, DISK_OUTER - 4.0, r);
                  density *= smoothstep(DISK_HEIGHT * 2.0, 0.0, abs(p.y)); 
                  
                  // 3. RELATIVISTIC DOPPLER SHIFT
                  vec3 vel = normalize(vec3(-p.z, 0.0, p.x));
                  float doppler = dot(dir, vel); 
                  
                  // Colors: Bright Yellow/White (Approaching) -> Deep Red (Receding)
                  vec3 hotColor = vec3(1.0, 0.9, 0.7) * 5.0; 
                  vec3 coolColor = vec3(1.0, 0.9, 0.7) * 1.2; 
                  vec3 localCol = mix(coolColor, hotColor, (doppler + 1.0) * 0.5);
                  
                  // Intensity accumulation
                  float intensity = gas * density * 0.12;
                  diskCol += localCol * intensity;
              }
          }

          // Step Ray
          // Decreased step size factor (0.03) ensures the ray doesn't skip over the thin Einstein ring
          float stepSize = max(0.02, distToCenter * 0.03); 
          p += dir * stepSize;
          totDist += stepSize;
          
          if(distToCenter < BH_RADIUS) {
              hitBH = true;
              break; 
          }
          if(totDist > MAX_DIST) break;
      }

      float alpha = 1.0;
      if(!hitBH) {
        col = vec3(0.0);
        // Only the accretion disk is visible. If diskCol is black, make pixel transparent
        float brightness = dot(diskCol, vec3(0.33, 0.33, 0.33));
        // Smoothly fade alpha based on brightness + glow. This allows the "glow" to sit on top of your CSS background
        alpha = smoothstep(0.0, 0.1, brightness + length(col));
      } else {
        col = vec3(0.0); // Event Horizon is black
        alpha = 1.0;
      }

      col += diskCol;
      // Bloom / Atmosphere
      float glowRadius = length(uv);
      float outerGlow = exp(-glowRadius * 3.5) * 0.8; 
      vec3 glowColor = vec3(1.0, 0.6, 0.2); 
      col += outerGlow * glowColor;

      alpha += outerGlow; 

      // Inner Photon Ring
      col += vec3(1.0, 0.8, 0.5) * (0.001 / abs(length(uv) - 0.225));

      // Outer Photon Ring
      col += vec3(1.0, 0.8, 0.5) * (0.01 / abs(length(uv) - 0.265));

      // HDR Tone Mapping & Grading
      col = 1.0 - exp(-col * 1.5);
      col *= vec3(1.1, 1.05, 1.0);

      gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));

  }
`;

export function initBlackHole(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  const dpr = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(dpr);

  const geometry = new THREE.PlaneGeometry(2, 2);
  
  const initialMouse = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

  const startWidth = canvas.clientWidth || window.innerWidth;
  const startHeight = canvas.clientHeight || window.innerHeight;

  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(startWidth * dpr, startHeight * dpr) },
    iMouse: { value: initialMouse },
  };

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    if (width === 0 || height === 0) return;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        renderer.setSize(width, height, false);
        uniforms.iResolution.value.set(width * dpr, height * dpr);
    }
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  const onMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    uniforms.iMouse.value.set(x, y);
  };
  window.addEventListener('mousemove', onMouseMove);

  resize();
  setTimeout(resize, 100); 

  let animationId;
  const animate = (time) => {
    uniforms.iTime.value = time * 0.001; 
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  };

  animate(0);

  return () => {
    observer.disconnect();
    window.removeEventListener('mousemove', onMouseMove);
    cancelAnimationFrame(animationId);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
  };
}