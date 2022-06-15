<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/profil">Profil</router-link> |
    <router-link to="/profil2">Profil-Two</router-link> |
    <router-link to="/profil3">Profil-Three</router-link> |
    <router-link to="/profil4">Profil-Four</router-link> |
    <router-link to="/profil5">Profil-Five</router-link> |
    <router-link to="/profil6">Profil-Six</router-link> |
    <router-link to="/profil7">Profil-Seven</router-link> |
    <router-link to="/profil8">Profil-Eight</router-link> |
    <router-link to="/profil9">Profil-Nine</router-link> |
    <router-link to="/profil10">Profil-Ten</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
body {
  background-color: lightblue;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
