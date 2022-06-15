<template>
    <div id="container"></div>
</template>

<script>
import * as Three from "three"
import water from './water.jpg'

export default {
    create() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            mesh: null
        }
    },

    methods: {
        init: function () {
            this.time = 0 

            let container = document.getElementById("container")

            this.camera = new Three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
            // this.camera.position.x = 5.0
            // this.camera.position.y = 5.0
            this.camera.position.z = 40

            this.scene = new Three.Scene()

            // ====== Lumière
            // "AmbientLight" applique un éclairage omnidirectionnel sur toutes les géométries de la scène.
            // Le premier paramètre est la couleur (Color) et le deuxième est l'intensité (intensity)
            const ambientLight = new Three.AmbientLight(0xffffff, 0.5)
            this.scene.add(ambientLight)

            // "DirectionalLight" aura un effet semblable au soleil avce les rayons qui se déplacent en paralèlle.
            // Le premier paramètre est la couleur et le deuxième est l'intensité
            const directionalLight = new Three.DirectionalLight(0x00fffc, 0.3)
            this.scene.add(directionalLight)
            // Par défaut, la lumière semble venir d'en haut. Pour changer cela, on doit déplacer toute la lumière en utilsant la propriété "position" pour pour un objet normal
            directionalLight.position.set(1, 0.25, 0)

            // "PointLight" est presque comme un briquet. la source lumineuse est infiniment petite et la lumière se diffuse uniformément dans toutes les directions.
            // Par défaut, l'intensité lumineuse ne s'estompe pas, mais on peut contrôler la distance de fondu et la vitesse à laquelle il s'estompe avec les propriétés "distance" et "decay".
            // On peut les définir dans les paramètres de la classe comme troisième et quatrième paramètre
            const pointLight = new Three.PointLight(0xff9000, 0.5, 10, 2)
            this.scene.add(pointLight)
            // On peut le déplacer comme n'importe quel objet : 
            pointLight.position.set(1, -0.5, 1)

            // "SpotLight" fonctionne comme une lampe de poche. C'est un cône de lumière partant d'un point et orienté dans une direction.
            // La liste de ses paramètre : 
            // - color : la couleur
            // - intensity : la force
            // - distance : la distance à laquelle l'intensité tombe à 0
            // - angle : la taille du faisceau
            // - penumbra : la diffusion du contour du faisceau
            // - decay : à quelle vitesse la lumière diminue
            const spotLight = new Three.SpotLight(0x78ff00, 0.5, 10 ,Math.PI * 0.1, 0.25, 1)
            spotLight.position.set(0, 2, 3)
            this.scene.add(spotLight)
            // On peut changer la position de "SpotLight" en utilsant la propriété "target"
            spotLight.target.position.x = -0.75
            this.scene.add(spotLight.target)
            // ===========

            this.time = 0 

            // let geometry = new Three.BoxGeometry(0.3, 0.3, 0.3);
            // var material = new Three.MeshBasicMaterial( { color: 0xffff00 } );
            // this.mesh = new Three.Mesh(geometry, material);
            // this.scene.add(this.mesh);

            const geometry = new Three.SphereGeometry( 15, 32, 16 )
            // const geometry = new Three.TorusGeometry(10, 3, 30, 100)

            // const material = new Three.MeshPhongMaterial({ color: 0xffff00 })
            const material = new Three.ShaderMaterial({
                uniforms: {
                    time: { value: 1.0 },
                    uTexture: { value: new Three.TextureLoader().load(water) },
                    resolution: { value: new Three.Vector2() }
                },
                
                // Ici nous connectons nos deux variables à "RawShaderMaterial"
                vertexShader: 
                `
                uniform float time;
                varying float pulse;

                //"UV" EST UN SYSTEME DE COORDONNEES QUE L'ON ASSIGNE A UN OBJET OU UN ESPACE VIDE - GENERALEMENT ON L'UTILISE POUR Y METTRE UNE TEXTURE
                varying vec2 vUv;
                varying vec3 vNormal;


                // **** NOISE ****
                //  https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
                //	Simplex 4D Noise 
                //	by Ian McEwan, Ashima Arts
                //  On utilise ce bruit pour nous permettre de réaliser une distorsion intéressante
                vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
                float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
                vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
                float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

                vec4 grad4(float j, vec4 ip){
                const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
                vec4 p,s;

                p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
                p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
                s = vec4(lessThan(p, vec4(0.0)));
                p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; 

                return p;
                }

                float snoise(vec4 v){
                const vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4
                                        0.309016994374947451); // (sqrt(5) - 1)/4   F4
                // First corner
                vec4 i  = floor(v + dot(v, C.yyyy) );
                vec4 x0 = v -   i + dot(i, C.xxxx);

                // Other corners

                // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
                vec4 i0;

                vec3 isX = step( x0.yzw, x0.xxx );
                vec3 isYZ = step( x0.zww, x0.yyz );
                //  i0.x = dot( isX, vec3( 1.0 ) );
                i0.x = isX.x + isX.y + isX.z;
                i0.yzw = 1.0 - isX;

                //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
                i0.y += isYZ.x + isYZ.y;
                i0.zw += 1.0 - isYZ.xy;

                i0.z += isYZ.z;
                i0.w += 1.0 - isYZ.z;

                // i0 now contains the unique values 0,1,2,3 in each channel
                vec4 i3 = clamp( i0, 0.0, 1.0 );
                vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
                vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

                //  x0 = x0 - 0.0 + 0.0 * C 
                vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
                vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
                vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
                vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

                // Permutations
                i = mod(i, 289.0); 
                float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
                vec4 j1 = permute( permute( permute( permute (
                            i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
                        + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
                        + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
                        + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
                // Gradients
                // ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
                // 7*7*6 = 294, which is close to the ring size 17*17 = 289.

                vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

                vec4 p0 = grad4(j0,   ip);
                vec4 p1 = grad4(j1.x, ip);
                vec4 p2 = grad4(j1.y, ip);
                vec4 p3 = grad4(j1.z, ip);
                vec4 p4 = grad4(j1.w, ip);

                // Normalise gradients
                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;
                p4 *= taylorInvSqrt(dot(p4,p4));

                // Mix contributions from the five corners
                vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
                vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
                m0 = m0 * m0;
                m1 = m1 * m1;
                return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
                            + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;

                }

                // ********************************

                void main() {
                    vUv = uv;

                    vNormal = normal;

                    vec3 newPosition = position;
                    //newPosition.y *= 2.0;
                    //newPosition.z = 0.5 * sin(newPosition.x * 30.0 + time);
                    //newPosition.z = 0.05 * sin(length(position) * 30.0 + time);

                    //ON CREE UNE FONCTION QUI CONTIENT LES COORDONNEES DU BRUIT
                    float noise = snoise(vec4(normal * 40.0, time * 0.1));

                    newPosition = newPosition + 0.1 * normal * snoise(vec4(normal * 10.0, time * 0.1)); //on utilise le bruit (noise)
                    // newPosition = newPosition + 0.4 * normal * noise;

                    //pulse = 20.0 * newPosition.z;
                    pulse = noise;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
                }
                `,

                fragmentShader: 
                `
                uniform float time;
                //ON IMPORTE LA TEXTURE DE L'IMAGE
                uniform sampler2D uTexture;
                varying float pulse;
                //ON APPELLE LA VARIABLE "vUv" POUR AJOUTER UNE TEXTURE PAR DESSUS
                varying vec2 vUv;

                varying vec3 vNormal;

                void main() {
                    //Pour utiliser la texture, on a besoin d'une fonction de texture
                    //vec4 myimage = texture( uTexture, vUv );
                    vec4 myimage = texture( uTexture, vUv + 0.01 * sin(vUv * 20.0 + time)); //on ajoute un effet de distorsion grâce à "sin" et "time"

                    float sinePulse = ( 1.0 + sin(vUv.x * 50.0 + time )) * 0.5; //on réalise des vagues
                    //gl_FragColor = vec4( vColor * color, opacity );
                    //gl_FragColor = vec4( 1.0, pulse, 0.0, 1.0 );
                    //gl_FragColor = vec4( vUv, 0.0, 1.0 );
                    //gl_FragColor = vec4( sinePulse, 0.0, 0.0, 1.0 ); //on utilise la distorsion réalisée avec  sinePulse
                    //gl_FragColor = myimage; //on affiche l'image
                    //gl_FragColor = vec4( vNormal, 1.0 );
                    //gl_FragColor = vec4( 0.5 * (pulse + 1.0), 0.0, 0.0, 1.0 );
                    gl_FragColor = vec4( pulse, 0.0, 0.0, 1.0 );
                }

                `,
                side: Three.DoubleSide,
            })
            
            this.mesh = new Three.Mesh( geometry, material )
            this.scene.add( this.mesh )

            this.renderer = new Three.WebGLRenderer({
                antialias: true,
                alpha: true
            })

            this.renderer.setSize(container.clientWidth, container.clientHeight)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            container.appendChild(this.renderer.domElement)
        },

        animate: function () {
            requestAnimationFrame(this.animate)
            this.mesh.rotation.x += 0.002
            this.mesh.rotation.y += 0.002
            this.renderer.render(this.scene, this.camera)
        }
    },

    mounted() {
        this.init();
        this.animate();
    }
}
</script>

<style>
  #container {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
</style>