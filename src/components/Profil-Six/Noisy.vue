<template>
  <Renderer ref="renderer" alpha antialias resize v-bind:orbit-ctrl="{ enableDamping: true, dampingFactor: 0.05 }">
    <Camera v-bind:position="{ x: -0, y: -100, z: 30 }" />
    <Scene>
    <!-- <Scene background="#ffffff"></Scene> -->

        <!-- "PointLight" est presque comme un briquet. la source lumineuse est infiniment petite et la lumière se diffuse uniformément dans toutes les directions. -->
        <PointLight ref="light1" color="#0E09DC" v-bind:intensity="1500.85" v-bind:position="{ x: 0, y: 0, z: 50 }" />
        <PointLight ref="light2" color="#1CD1E1" v-bind:intensity="1500.85" v-bind:position="{ x: 0, y: 0, z: 50 }" />
        <PointLight ref="light3" color="#18C02C" v-bind:intensity="1500.85" v-bind:position="{ x: 0, y: 0, z: 50 }" />
        <PointLight ref="light4" color="#ee3bcf" v-bind:intensity="1500.85" v-bind:position="{ x: 0, y: 0, z: 50 }" />

        <!-- <NoisyText
            text="TroisJS"
            font-src="helvetiker_regular.typeface.json"
            align="center"
            :size="10"
            :height="2"
            :noise-coef="0.03"
            :z-coef="5"
            :position="{ x: 0, y: 0, z: 30 }"
            :rotation="{ x: Math.PI / 2, y: 0, z: 0 }"
        >
            <PhysicalMaterial />
        </NoisyText> -->

        <!-- <NoisyPlane
            :width="200" :width-segments="100"
            :height="200" :height-segments="100"
            :time-coef="0.0003"
            :noise-coef="5"
            :displacement-scale="15"
            :delta-coef="1 / 200"
            :position="{ x: 0, y: 0, z: 0 }"
        >
            <PhysicalMaterial />
        </NoisyPlane> -->

        <!-- <NoisySphere
            v-bind:radius="10"
            v-bind:time-coef="0.0003"
            v-bind:noise-coef="0.07"
            v-bind:disp-coef="2"
            v-bind:position="{ x: 0, y: 0, z: 30 }"
        >
            <PhysicalMaterial flat-shading />
        </NoisySphere> -->

        <RefractionMesh ref="mesh" v-bind:position="{ x: 0, y: -20, z: 20 }" auto-update>
            <TorusGeometry v-bind:radius="18" v-bind:tube="3" v-bind:radial-segments="8" v-bind:tubular-segments="3" /> 
            <!-- <SphereGeometry v-bind:radius="21" v-bind:widthSegment="3" v-bind:heightSegment="5"  /> -->
            <StandardMaterial color="red" v-bind:props="{ metalness: 1, roughness: 0, flatShading: true }" />
        </RefractionMesh>

    </Scene>
  </Renderer>
</template>

<script>

import {
    Camera,
    PhysicalMaterial,
    PointLight,
    Renderer,
    Scene,
    StandardMaterial,
    TorusGeometry,
    SphereGeometry,
} from 'troisjs';

import RefractionMesh from 'troisjs/src/components/meshes/RefractionMesh.js';
import NoisyPlane from 'troisjs/src/components/noisy/NoisyPlane.js';
import NoisySphere from 'troisjs/src/components/noisy/NoisySphere.js';
import NoisyText from 'troisjs/src/components/noisy/NoisyText.js';

export default {
    name: "Noisy",

    components: {
        Camera,
        NoisyPlane,
        NoisySphere,
        NoisyText,
        PhysicalMaterial,
        PointLight,
        RefractionMesh,
        Renderer,
        Scene,
        StandardMaterial,
        TorusGeometry,
        SphereGeometry,
    },
    mounted() {
        const renderer = this.$refs.renderer;
        const light1 = this.$refs.light1.light;
        const light2 = this.$refs.light2.light;
        const light3 = this.$refs.light3.light;
        const light4 = this.$refs.light4.light;
        const mesh = this.$refs.mesh.mesh;
        
        renderer.onBeforeRender(() => {
            const time = Date.now() * 0.001;
            const d = 100;
            light1.position.x = Math.sin(time * 0.1) * d;
            light1.position.y = Math.cos(time * 0.2) * d;
            light2.position.x = Math.cos(time * 0.3) * d;
            light2.position.y = Math.sin(time * 0.4) * d;
            light3.position.x = Math.sin(time * 0.5) * d;
            light3.position.y = Math.sin(time * 0.6) * d;
            light4.position.x = Math.sin(time * 0.7) * d;
            light4.position.y = Math.cos(time * 0.8) * d;
            mesh.rotation.x += 0.02; mesh.rotation.y += 0.01;
        });
    },
};
</script>

<style>
    canvas {
        position: absolute;
        left: 0;
        top: 20%;
        z-index: -1;
    }
</style>