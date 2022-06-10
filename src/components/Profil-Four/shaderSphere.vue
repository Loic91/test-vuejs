<template>

    <Scene />
    <Uniforms />
</template>

<script>
// On importe notre sous composant "Item.vue"
import Scene from './Scene.vue'
import Uniforms from './Uniforms.vue'

export default {
    name: 'shaderSphere',
    // On doit déclarer le composant qui est utilisé
    // "components" est un objet dans lequel on peut lui mettre plusieurs compoents
    components: {
        Scene,
        Uniforms
    },

    
}


</script>

<style>

</style>