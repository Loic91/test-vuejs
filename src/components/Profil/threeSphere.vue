<template>

    <canvas id="sphere"></canvas>
    <h1>HELLO LA TEAM</h1>

    <!-- Avec "OrbitControls" -->
    <!-- "alpha" pour rendre le background autour de l'objet transparant -->
    <Renderer ref="renderer" antialias alpha resize v-bind:orbit-ctrl="{autoRotate: true, enableDamping: true, dampingFactor: 0.05 }">

        <Camera :position="{ z: 10 }" />
        <Scene>
            <PointLight v-bind:position="{ y: 150, z: 150 }" />
            <!-- <Box ref="box" v-on:pointerOver="boxOver" v-on:click="boxClick" v-bind:rotation="{ y: Math.PI / 4, z: Math.PI / 4 }" v-bind:width="2" v-bind:height="2" v-bind:depth="10">
                <LambertMaterial :color="boxColor" />
            </Box> -->
            <Sphere ref="sphere" v-on:pointerOver="boxOver" v-on:click="boxClick" v-bind:rotation="{ y: Math.PI / 14, z: Math.PI / 14 }" v-bind:radius="3" v-bind:widthSegments="64" v-bind:heightSegments="32">
                <PhongMaterial v-bind:color="boxColorSphere" />
            </Sphere>
        </Scene>
    </Renderer>
    
</template>

<script>
// import { Color, InstancedBufferAttribute , MathUtils, Object3D, Vector3 } from 'three';
import { Box, Sphere, Camera, PhongMaterial, ToonMaterial, LambertMaterial, PointLight, Renderer, Scene } from 'troisjs';
// "chroma-js" est une petite bibliothèque JavaScript sans dépendance ( 13,5 Ko ) pour toutes sortes de conversions de couleurs et d'échelles de couleurs
// import chroma from 'chroma-js';


export default {
    name: 'threeSphere',

    components: { Box, Sphere, Camera,PhongMaterial, ToonMaterial, LambertMaterial, PointLight, Renderer, Scene },

    data() {
        return {
            boxColor: '#ffffff',
            boxColorSphere: 'red',
        };
    },
    methods: {
        boxOver({ over }) {
        this.boxColor = over ? '#ff0000' : '#ffffff';
        },
        boxClick(e) {
        alert('Click');
            console.log(e);
        },
    },
}
</script>

<style>
    canvas {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }
</style>