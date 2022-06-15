<template>
    <Renderer ref="renderer" antialias resize v-bind:orbit-ctrl="{ enableDamping: true, dampingFactor: 0.05 }" pointer shadow>
        <Camera v-bind:position="{ z: 20 }" />
        <Scene>
            <AmbientLight color="#808080" />
            <PointLight ref="light" cast-shadow v-bind:shadow-map-size="{ width: 1024, height: 1024 }" />

            <!-- * Utiliser "InstancedMesh" si vous on doit rendre un grand nombre d'objets avec la même géométrie et le même matériau mais avec des transformations de monde différentes. L'utilisation d'InstancedMesh aidera à réduire le nombre d'appels de dessin et ainsi à améliorer les performances globales de rendu de l'application -->
            <!-- * La valeur "count" passée au constructeur représente le nombre maximum d'instances de ce maillage -->
            <InstancedMesh ref="imesh" v-bind:count="NUM_INSTANCES" cast-shadow receive-shadow>
                <!-- <BoxGeometry :size="SIZE" /> -->
                <OctahedronGeometry v-bind:size="SIZE" />
                <!-- <PhongMaterial color="#9C1E15" /> -->
                <!-- <PhongMaterial color="#534D4C" /> -->
                <PhongMaterial color="#031762" />
            </InstancedMesh>

            <Plane v-bind:width="W*2" v-bind:height="H*2" v-bind:position="{ z: -10 - SIZE }" receive-shadow>
                <!-- <PhongMaterial color="#9C1E15" /> -->
                <!-- <PhongMaterial color="#534D4C" /> -->
                <PhongMaterial color="#031762" />
            </Plane>
        </Scene>
    </Renderer>
</template>

<script>
import { Object3D } from 'three';
import {
    AmbientLight,
    BoxGeometry,
    OctahedronGeometry,
    Camera,
    InstancedMesh,
    PhongMaterial,
    Plane,
    PointLight,
    Renderer,
    Scene,
} from 'troisjs';

// simplex-noise.js est une implémentation de bruit en Javascript. Il est autonome (sans dépendance), relativement petit et assez rapide
import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise()

export default {
    name: "Shadows",

    components: {
        AmbientLight,
        BoxGeometry,
        OctahedronGeometry,
        Camera,
        InstancedMesh,
        PhongMaterial,
        Plane,
        PointLight,
        Renderer,
        Scene,
    },
    setup() {
        const SIZE = 1.5, NX = 20, NY = 20, PADDING = 1;
        const SIZEP = SIZE + PADDING;
        const W = NX * SIZEP - PADDING;
        const H = NY * SIZEP - PADDING;

        return {
            SIZE, NX, NY, PADDING,
            SIZEP, W, H,
            NUM_INSTANCES: NX * NY,
        }
    },
    data() {
        return {
        };
    },
    mounted() {
        this.renderer = this.$refs.renderer;
        this.pointer = this.renderer.three.pointer;
        this.imesh = this.$refs.imesh.mesh;
        this.light = this.$refs.light.light;
        this.dummy = new Object3D();
        this.renderer.onBeforeRender(this.animate);
    },
    methods: {
        animate() {
            this.light.position.x = this.pointer.positionV3.x;
            this.light.position.y = this.pointer.positionV3.y;
            this.updateInstanceMatrix();
        },
        updateInstanceMatrix() {
            const x0 = -this.W / 2 + this.PADDING;
            const y0 = -this.H / 2 + this.PADDING;
            const time = Date.now() * 0.0001;
            const mx = this.pointer.positionN.x * 0.1;
            const my = this.pointer.positionN.y * 0.1;
            const noise = 0.005;
            let x, y, nx, ny, rx, ry;

            for (let i = 0; i < this.NX; i++) {
                for (let j = 0; j < this.NY; j++) {
                x = x0 + i * this.SIZEP;
                y = y0 + j * this.SIZEP;
                nx = x * noise + mx;
                ny = y * noise + my;
                rx = simplex.noise3D(nx, ny, time) * Math.PI;
                ry = simplex.noise3D(ny, nx, time) * Math.PI;
                this.dummy.position.set(x, y, -10);
                this.dummy.rotation.set(rx, ry, 0);
                this.dummy.updateMatrix();
                this.imesh.setMatrixAt(i * this.NY + j, this.dummy.matrix);
                }
            }
            this.imesh.instanceMatrix.needsUpdate = true;
        },
    },
}

</script>

<style>
    canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>