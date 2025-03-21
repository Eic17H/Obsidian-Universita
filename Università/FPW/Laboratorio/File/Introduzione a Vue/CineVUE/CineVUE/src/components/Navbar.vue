<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
        <nav>
            <ul>
              <li><RouterLink to="/">Home</RouterLink></li>
              <li><RouterLink to="/about">Informazioni</RouterLink></li>
              <li><RouterLink to="/contacts">Contatti</RouterLink></li>
              <li><RouterLink to="/news">Novità</RouterLink></li>
              <li><RouterLink to="/who">Chi siamo</RouterLink></li>
            </ul>
        </nav>
</template>