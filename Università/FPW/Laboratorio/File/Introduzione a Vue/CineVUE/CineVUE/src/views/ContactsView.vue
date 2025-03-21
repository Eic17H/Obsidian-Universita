<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Header from '../components/Header.vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <body>
        <Header/>
        <p>Se avete bisogno di qualunque tipo di assiestenza potete contattarci ai seguenti indirizzi:</p>
        <p><b>Segnelazione utente:</b> <i>segnalazione.utentiburdi@cineva.it</i></p>
        <p><b>Richiesta nuova password:</b> <i>sono.sconato@cineva.it</i></p>
        
        <hr/>
        <h3>Indirizzo fisico:</h3>
        <p><i>Laboratorio T</i>
        <br>Palazzo delle Scienze
        <br>Via Ospedale 72, 09124, Cagliari CA</p>
    </body>
</template>