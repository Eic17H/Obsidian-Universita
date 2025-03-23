Git, essenzialmente, serve a creare backup con cronologia, e poter fondere due versioni contrastanti dello stesso file. È ottimizzato per i file di testo, ed è utile per progetti in cui più persone contribuiscono alla stessa codebase.

Una cartella di git è detta *repository*. Le singole modifiche (Ctrl+S) non sono tracciate, si tiene conto solo di momenti scelti dall'utente. Per fissare il progetto in un momento (aggiungere un punto nella cronologia), si fa una *commit*. Le commit restano sul tuo computer finché non le invii al server con una *push*. Per scaricare una lista di commit che ti sei perso, fai *fetch*, e per scaricare i contenuti di quelle commit fai una *pull*. *Sync* è fetch+pull+push.

Se io nella mia commit modifico la riga 73, e tu, prima di scaricare le mie modifiche, modifichi la riga 52, in un sistema normale tu staresti sovrascrivendo la mia modifica alla riga 73 con la versione antecedente alla mia modifica. Con git, invece, si creano due ramificazioni, *branch*, della repository, essenzialmente due timeline alternative. Se le due modifiche non si sovrappongono, come in questo caso, avviene una *merge* delle due branch, e si ottiene una singola branch che ha sia le mie modifiche che le tue.

Se io ho la mia repository, e tu vuoi farne una tua versione, puoi fare una *fork*. Così, lavoriamo in due versioni separate della repository, ma se io faccio modifiche, tu puoi decidere di aggiungerle alla tua versione. Se vuoi propormi di aggiungere le tue modifiche alla mia versione (quella principale), puoi fare una *pull request*.

Git è una tecnologia, ci sono vari servizi che permettono di usarla in cloud, per esempio [GitHub](https://github.com).
Si può anche tenere una repository solo in locale usando git puro.

Quando scarichi una repository in locale sul tuo computer, si dice che la cloni (*clone*).
Git in locale si può usare da linea di comando, da GitHub Desktop, o con un'estensione di VSCode.
Da mobile, c'è anche un plugin di Obsidian che lo integra ma non funziona benissimo.

In questo corso ci sono alcuni progetti di gruppo per cui è molto utile.