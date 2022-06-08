<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>This is an about page</h1>

    <button v-on:click="goHome()">Go Home</button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      // On veut rediriger le bouton vers la page d'accueil - On utilise une clé qui va permettre d'intéragir avec notre Router
      // On utilise le "this" pour faire référence à notre application
      // Et on utilise la clé "$router" et on lui dit vers quel URL on veut aller grâce à lal fonction "push()"
      console.log("home", this.$router)
      this.$router.push('/')
    }
  }
}
</script>
