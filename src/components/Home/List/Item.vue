<!-- *** C'est un "sous composant" de notre composant "List" -->

<template>
    <!-- Notre item -->
    <!-- <div class="item">mon item</div> -->
    <!-- A lieu de nommer chacun de nos "Item" à la main, on ajoute la propriété "name" et on va l'interpoler -->
    <!-- En ajoutant "v-if" on lui dit qu'elle peut afficher "item" que si "showItem" est égal à "true" -->
    <div v-if="showItem" v-on:click="hideItem()" class="item">{{ name }}</div>
</template>

<script>
export default {
    // Propriétés
    props: {
        // On assigne un texte par défault à tous les "Item" auquels on aura pas passé de "name"
        name: {
            default: 'Valeur par default'
        }
    },
    // On crée la propre "data" de "Item" qui va nous permettre de cacher les éléments
    // C'est une fobction qui retourne un objet
    data: () => {
        return {
            showItem: true
        }
    },
    // On veut que, au clique, le nom disparaisse - On crée une "méthode" dans laquelle on déclare notre fonction
    // !!! NE PAS D'AJOUTER LA FONCTION DANS LA DIV
    methods: {
        hideItem() {
            console.log(('hideItem'))
            // on déclare dan snotre méthode que "showItem" est égal à "false"
            this.showItem = false
        }
    }
}
</script>

<style>
.item {
    background-color: #fff;
    margin-top: 10px;
    padding: 15px 0;
    transition: 0.2s;
    cursor: pointer;
}
.item:hover {
    background-color: rgb(32, 123, 241);
    color: white;
}
.item:active {
    transition: 0.1s;
    transform: scale(0.9);
}
</style>