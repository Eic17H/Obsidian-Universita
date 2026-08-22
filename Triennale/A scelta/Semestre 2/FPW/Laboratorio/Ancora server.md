---
cssclasses:
  - fpw
---
Adesso facciamo sì che il contenuto degli elementi html sia preso dal database.
Su `vite.config.js` aggiungiamo un oggetto `server` di fianco a `plugins` e `resolve`:
```
server: {
    host: 'localhost',
    port: 5173,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: false,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  },
```

Modifichiamo anche `HomeView.vue`, aggiungendo del codice:
```
<script>
import ReviewCard from '../components/ReviewCard.vue'
export default {
    components: {
        ReviewCard
    },
    data(){
        return {
            titolo: "Titolox",
            commento: "Commentox",
            voto: 5,
            num_like: 254,
            num_dislike: 1023
        }
    }
}
</script>
```

Nel template aggiungiamo le v-bind alle review card:
```
<ReviewCard :titolo="titolo" :commento="commento" :voto="voto" :num_like="num_like" :num_dislike="num_dislike"></ReviewCard>
```

E aggiungiamo uno script alla review card:
```
<script>
    export default {
        props: {
            titolo: {
                type: String,
                required: true
            },
            commento: {
                type: String,
                required: true
            },
            voto: {
                type: Number,
                required: true
            },
            num_like: {
                type: Number,
                required: true
            },
            num_dislike: {
                type: Number,
                required: true
            },
        }
    }
</script>
```

Poi aggiorniamo le queries