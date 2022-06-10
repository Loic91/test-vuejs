<template>
    <div id="container"></div>
</template>

<script>
import * as Three from "three"

export default {
    create() {
        return {
        camera: null,
        scene: null,
        renderer: null,
        mesh: null
        };
    },

    methods: {
        init: function() {
            let container = document.getElementById("container");

            this.camera = new Three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
            // this.camera.position.x = 5.0
            // this.camera.position.y = 5.0
            this.camera.position.z = 40

            this.scene = new Three.Scene();

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

            // let geometry = new Three.BoxGeometry(0.3, 0.3, 0.3);
            // var material = new Three.MeshBasicMaterial( { color: 0xffff00 } );
            // this.mesh = new Three.Mesh(geometry, material);
            // this.scene.add(this.mesh);

            // const geometry = new Three.SphereGeometry( 15, 32, 16 )
            const geometry = new Three.TorusGeometry(10, 3, 30, 100)

            // const material = new Three.MeshPhongMaterial({ color: 0xffff00 })
            const material = new Three.ShaderMaterial({
                // uniforms: {
                //      time: { value: 1.0 },
                //      uTexture: { value: new Three.TextureLoader().load(water) },
                //      resolution: { value: new Three.Vector2() }
                // },
                // Ici nous connectons nos deux variables à "RawShaderMaterial"
                vertexShader: 
                `
                varying vec2 vUv; 

                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    vUv = uv;
                }
                `,

                fragmentShader: 
                `
                varying vec2 vUv; 
                #define PI 3.1415926535897932384626433832795;


                // FONCTION NOISE
                vec4 permute(vec4 x) {
                    return mod(((x*34.0)+1.0)*x, 289.0);
                }
                vec2 fade(vec2 t) {
                    return t*t*t*(t*(t*6.0-15.0)+10.0);
                }
                float cnoise(vec2 P) {
                    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
                    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
                    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
                    vec4 ix = Pi.xzxz;
                    vec4 iy = Pi.yyww;
                    vec4 fx = Pf.xzxz;
                    vec4 fy = Pf.yyww;
                    vec4 i = permute(permute(ix) + iy);
                    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
                    vec4 gy = abs(gx) - 0.5;
                    vec4 tx = floor(gx + 0.5);
                    gx = gx - tx;
                    vec2 g00 = vec2(gx.x,gy.x);
                    vec2 g10 = vec2(gx.y,gy.y);
                    vec2 g01 = vec2(gx.z,gy.z);
                    vec2 g11 = vec2(gx.w,gy.w);
                    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
                    g00 *= norm.x;
                    g01 *= norm.y;
                    g10 *= norm.z;
                    g11 *= norm.w;
                    float n00 = dot(g00, vec2(fx.x, fy.x));
                    float n10 = dot(g10, vec2(fx.y, fy.y));
                    float n01 = dot(g01, vec2(fx.z, fy.z));
                    float n11 = dot(g11, vec2(fx.w, fy.w));
                    vec2 fade_xy = fade(Pf.xy);
                    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
                    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
                    return 2.3 * n_xy;
                }



                void main() {
                    // gl_FragColor = vec4(vUv, 1.0, 1.0);

                    // LA NOUS COMBINONS LE "sin()" et "step()"
                    float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));
                    //ON CREE LA PREMIERE COULEUR
                    vec3 blackColor = vec3(0.0);

                    // ON FORME LA DEUXIEME COULEUR
                    vec3 uvColor = vec3(vUv, 1.0);

                    // ON OBTIENT UN MELANGE ENTRE LES DEUX COULEURS SELON "strength"
                    vec3 mixedColor = mix(blackColor, uvColor, strength);

                    // ET NOUS UTILISONS CE MIX DANS LE gl_FragColor SANS CHANGER L'alpha 
                    gl_FragColor = vec4(mixedColor, 1.0);
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

            this.renderer.setSize(container.clientWidth, container.clientHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            container.appendChild(this.renderer.domElement);
        },

        animate: function() {
            requestAnimationFrame(this.animate);
            this.mesh.rotation.x += 0.002;
            this.mesh.rotation.y += 0.002;
            this.renderer.render(this.scene, this.camera);
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