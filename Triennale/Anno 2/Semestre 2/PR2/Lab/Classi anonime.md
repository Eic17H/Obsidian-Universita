---
cssclasses: pr2
---
# Classi anonime

Se c'è una classe che devi usare solo una volta, è scomodo dover fare un intero file per questa classe. Se di queste classe a utilizzo singolo ce ne sono 500, sono tanti file, e usare GitHub diventa lentissimo. Quindi usiamo le *classi anonime*, cioè creiamo una classe a cui non diamo un nome, e contemporaneamente istanziamo un singolo oggetto di quella classe, e subito dopo la classe smette di esistere. Una dichiarazione di classe anonima conta come una riga, quindi alla fine ci va il punto e virgola.

Le classi anonime possono estendere un'altra classe o implementare un'interfaccia.

Vedi le slide è troppo veloce. Final etc.

In IUM, si implementano delle interfacce grafiche. Un tempo per farlo su Android si usava Java (adesso Kotlin). Le GUI sono implementate come *eventi*, e, per esempio, ogni bottone ha bisogno della propria classe. Se hai 800 bottoni, anziché fare 800 classi in 800 file diversi, usi le classi anonime.