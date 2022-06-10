<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- On déclare "HelloWorld" -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- On déclare "List" -->
    <List />
    <!-- On déclare "Smooth" -->
    <Smooth />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/Home/HelloWorld.vue'
import List from '@/components/Home/List/List.vue'
import Smooth from '@/components/Utils/Smooth.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    List,
    Smooth,
  }
}
</script>
