<template>
    <!-- Composant List -->
    <div class="list">
        <h3>LISTE</h3>
        <!-- On déclare notre composant "Item"-->
        <!-- Et on utilise une boucle pour afficher les "items" -->
        <!-- On "boucle" sur "item" "dans" "items" -->
        <!-- On lui dit que nous avons une "clé" qui se nomme "index" -->
        <!-- Et on lui dit que le "name" est égale à "item.name" -->
        <!-- A SAVOIR : En Vue.js, lorsqu'on utilise une boucle (une itération) on doit dire qu'on utilise une "clé" (notre clé est "index") avec "v-bind" -->
        <Item v-for="(item, index) in items" v-bind:name="item.name" v-bind:key="index" />
    </div>
</template>

<script>
// On importe notre sous composant "Item.vue"
import Item from './Item.vue'
export default {
    // On doit déclarer le composant qui est utilisé
    // "components" est un objet dans lequel on peut lui mettre plusieurs compoents
    components: { Item },
    // "data" est une fonction dans laquelle on retourne ce que l'on veut
    // Dans notre cas on veut y mettre nos "items" sous forme de tableau de plusieurs objet qui comprendront une clé "name" avec le nom de nos items
    data: () => {
        return {
            items: [
                { name: 'item1' },
                { name: 'item2' },
                { name: 'item3' },
                { name: 'item4' },
                { name: 'item5' },
            ]
        }
    }
}

</script>

<style>
.list {
    max-width: 40%;
    margin: 0 auto;
    background-color: rgb(211, 205, 205);
    padding: 30px;
}
</style>