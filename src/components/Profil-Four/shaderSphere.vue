<template>
    <h1>HELLO THREE</h1>

    <Scene />
    <Text />
</template>

<script>
// On importe notre sous composant "Item.vue"
import Scene from './Scene.vue'
import Text from './Text.vue'

export default {
    name: 'shaderSphere',
    // On doit déclarer le composant qui est utilisé
    // "components" est un objet dans lequel on peut lui mettre plusieurs compoents
    components: {
        Scene,
        Text
    },

    
}


</script>

<style>

</style>