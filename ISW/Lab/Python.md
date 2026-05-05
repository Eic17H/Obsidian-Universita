In queste lezioni facciamo Python. Prima facciamo le basi, poi vedremo i framework necessari per il progetto. Python è molto più semplice e intuitivo dei linguaggi a cui siamo abituati.

# Caratteristiche

Python è un linguaggio interpretato, quindi dà errori a runtime. Tecnicamente, è compilato in bytecode, ma nel pratico è interpretato.

Si può usare con diversi paradigmi, di base è a oggetti: c'è una superclasse Object e tutte le altre classi ereditano da essa, tutto è un oggetto. Ci sono strutture dati built-in che conosciamo.

Case sensitive, gli identificatori possono contenere numeri, lettere e simboli. Meglio cominciarli con le lettere, per esempio il `_` ha un significato specifico all'inizio di un identificatore. Non si usa il `;`, ma l'andata a capo. Non si usa il `{}` ma la tabulazione. Quindi andando a capo senza tabulare, possiamo continuare una "riga di codice" nella prossima riga di testo usando `\`. I commenti si fanno con `#`.

Ha un sistema di garbage collection, non serve il `free()`. Il binding è fatto a runtime, a causa del polimorfismo e dell'overriding, quindi possono essere modificate a runtime.

Come IDE si possono usare PySharp e VSCode. Il progetto verrà spiegato con PySharp, con VSCode le cartelle si gestiscono in modo un po' diverso.

* [[ISW/Lab/Branching|Branching]]
* [[ISW/Lab/Funzioni|Funzioni]]
* [[ISW/Lab/Strutture dati|Strutture dati]]
* [[Oggetti]]
## Output su terminale

Lo strumento principale di debugging. Si fa con `print()`.

Per il resto, vedi le #slide