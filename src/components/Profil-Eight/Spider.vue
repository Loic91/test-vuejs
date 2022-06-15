<template>
    <div class="container">
        <Renderer ref="renderer" resize="window" antialias alpha v-bind:orbit-ctrl="{ enableZoom: false, enableRotate: false, enableDamping: true, dampingFactor: 0.05 }">
            <Camera v-bind:position="{ z: 4 }" />
            <Scene>
                <AmbientLight />
                <PointLight
                    color="white"
                    v-bind:position="{ x: 100, y: 1000, z: 400 }"
                    v-bind:intensity="50"
                />
                <GltfModel
                    src="/models/spider/spiderman.gltf"
                    @load="onReady"
                    @progress="onProgress"
                    @error="onError"
                />
            </Scene>
        </Renderer>
    </div>
</template>

<script>
import 'regenerator-runtime/runtime'
import { Camera, Renderer, Scene, PointLight, AmbientLight, GltfModel } from 'troisjs';

export default {
    name: "Spider",

    components: {
        Camera, Renderer, Scene, PointLight, AmbientLight, GltfModel
    },

    setup() {
        function onReady(e) {
            console.log('Render is Ready', e)
        }

        return {
            onReady
        }
    }
}
</script>

<style>
    .container {
        position: absolute;
        left: 20%;
        top: 20%;
        z-index: -1;
    }
</style>