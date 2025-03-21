<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Header from '../components/Header.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main>
    <body>
      <Header/>
        <h1>Cosa è Cineva?</h1>
        <h3>Informazioni sul sito</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <b>incididunt</b> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud <b>exercitation</b> ullamco laboris nisi ut aliquip ex ea commodo consequat. <i>Duis aute irure</i> dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        <hr/>
        <h3>A chi è rivolto il sito?</h3>
        <p>A te, sì, proprio a te, che sei veramente giovane, che vuoi un sito di <b><i>nuova</i></b> generazione!</p>
    </body>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
