<template>
    <Renderer ref="renderer" antialias alpha v-bind:orbit-ctrl="{ enableZoom: false, enableRotate: false, enableDamping: true, target }" resize shadow>
        <Camera v-bind:position="{ x: 500, y: 400, z: 500 }" />
        <!-- <Scene ref="scene" background="#a0a0a0"> -->
            <Scene ref="scene">
            <HemisphereLight />

            <!-- <DirectionalLight
                :position="{ x: 0, y: 200, z: 100 }"
                cast-shadow :shadow-camera="{ top: 180, bottom: -120, left: -120, right: 120 }"
            /> -->

            <AmbientLight />
            <PointLight
                color="white"
                v-bind:position="{ x: 100, y: 1000, z: 400 }"
                v-bind:intensity="50"
            />

            <!-- <Plane :width="2000" :height="2000" :rotation="{ x: -Math.PI / 2 }" receive-shadow>
                <PhongMaterial color="#999999" :props="{ depthWrite: false }" />
            </Plane> -->

            <FbxModel src="/models/car/source/car.fbx" v-on:load="onLoad" />
        </Scene>
    </Renderer>
</template>

<script>
// Model from mixamo.com
import { AnimationMixer, Clock, Fog, GridHelper, Vector3 } from 'three';
import {
    AmbientLight,
    PointLight,
    Camera,
    DirectionalLight,
    FbxModel,
    HemisphereLight,
    Renderer,
    PhongMaterial,
    Plane,
    Scene,
} from 'troisjs';

export default {
    name: "Starwars",

    components: {
        AmbientLight,
        PointLight,
        Camera,
        DirectionalLight,
        FbxModel,
        HemisphereLight,
        Renderer,
        PhongMaterial,
        Plane,
        Scene,
    },
    data() {
        return {
        target: new Vector3(0, 100, 0),
        };
    },
    mounted() {
        const scene = this.$refs.scene.scene;
        scene.fog = new Fog(0xa0a0a0, 200, 1000);

        // const grid = new GridHelper(2000, 20, 0x000000, 0x000000);
        // grid.material.opacity = 0.5;
        // grid.material.transparent = true;
        // this.$refs.scene.add(grid);
    },
    methods: {
        onLoad(object) {
        this.mixer = new AnimationMixer(object);
        const action = this.mixer.clipAction(object.animations[0]);
        action.play();
        object.traverse(function (child) {
            if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            }
        });
        this.clock = new Clock();
        this.$refs.renderer.onBeforeRender(this.updateMixer);
        },
        updateMixer() {
        this.mixer.update(this.clock.getDelta());
        },
    },
};
</script>

<style>
    canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>