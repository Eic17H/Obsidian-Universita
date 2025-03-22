## Creazione di una classe in Java

Creiamo il file `Monitor.java`.
Stiamo creando la classe `Monitor`, che essendo una classe va con la maiuscola.
GEdit ha anche la syntax highlighting per il Java.
Scriviamo: `class Monitor {}`.
Così è già una classe completa ma vuota.
Esiste anche `public class`, per ora lasciamo perdere.
Per salvare, Ctrl+S.
Controlliamo di aver salvato con `cat Monitor.java`.
(Si suppone si sia seguito [[Terminale di Linux - cheatsheet|SO]] prima di PR2).

Proviamo a fare `javac Monitor.java`, ci crea `Monitor.class`, lì c'è il bytecode.
* Non c'è molto dentro, modella una `classe Monitor` in cui non c'è nessun attributo e nessun metodo.
* Modifichiamo la classe Monitor aggiungendo degli attributi: risoluzione, colore etc.
* Dopo un attributo, il punto e virgola, `;`. I blocchi di codice sono racchiusi tra `{}`. Lo sappiamo già dal C.
* Si consiglia di tabulare (premere tab) per organizzare il codice.
  * GEdit di default ha tab di larghezza 8, meglio 4: `Preferences/Editor/Tab width:`
  * Di default, mette caratteri tab, e questa impostazione cambia il modo in cui sono visualizzati
  * Se metti che invece mette tot spazi, mette tot spazi e quelli già messi non cambiano con l'impostazione
* Messi gli attributi, come `int risoluzione` e `String colore`, vediamo che `int` è colorato, invece `String` no, infatti `String` è una classe, mentre `int` è una keyword.
* Fatto questo, `javac` di nuovo, vediamo che il file `.class` adesso è più grande
* Se sbagli qualcosa, `javac` dà errore al momento della compilazione e ti dice dove hai sbagliato, e magari ti dice anche come risolverlo.
  * Non è sempre la soluzione però, non seguire ciecamente quello che consiglia
* Prima di ricompilare dopo aver corretto un errore, salva.
  * Se ci sono modifiche non salvate, GEdit ti mette un asterisco prima del nome del file
  * Sembra una fesseria. Quanti minuti preziosi (mezz'ore (ore)) si perdono per problemi del genere? Magari all'esame? Magari tutto l'esame?
  * Certe volte si vedono cose senza senso, "eh ma se no non compilava", sei cosciente del fatto che non ha senso, non fidarti ciecamente
  * Se ti manca un `;`, una soluzione è cancellare l'intero file perché non dia errore, non è la soluzione
  * Quando c'è un problema, ragiona e fai ciò che ha senso, non necessariamente quello che ti dice il compilatore

* Se eseguo questo file `.class`? Si fa semplicemente `java Monitor` senza l'estensione
  * In Ubuntu ci sono le estensioni dei file, in Java ci sono classi, non file, non hanno estensioni
* Questa classe non ha un `main()`, quindi ti dà errore (vedi credo PR1, manca un punto di entrata).
* Ti dice come introdurre il main
* Fidiamoci ciecamente per questa volta, facciamo copia e incolla dal suo consiglio
* `GEdit Programma.java`, che faccio? Ci sono solo classi, scriviamo "class Programma"
* Ci mettiamo dentro il metodo `public static void main(String[] args)`. Ignora `public` e `static`
* Per ora non ci serve un costruttore
* Se compiliamo `Programma.java`, compila ma non fa niente
* Stampiamo: `System.out.println("esecuzione del mio primo programma Java");`
* Compiliamo ed eseguiamo: `javac Programma.java`, `java Programma`
* Creiamo una stringa: `String s = new String("ciao");`
* Stampiamola: `System.out.println(s);`
* Una stringa è un oggetto
* Quindi creiamo un monitor allo stesso modo
* Le variabili (oggetti) iniziano con la minuscola
* Lì con `String()` abbiamo chiamato un costruttore con certi parametri
* Creiamo un monitor senza parametri, ma non abbiamo fatto un costruttore, ma non ci dà errore
  * Esiste impicitamente un costruttore senza parametri
* Diciamo che s contiene `"nero"` e la mettiamo come `colore`, la mettiamo come parametro, errore, perché non c'è un costruttore con parametri
* Ci dice: `richiesto nessun argomento, trovati int int String`
  * I parametri effettivi sono 3, i parametri formali sono 0

* Facciamo un costruttore
* Monitor(...) vedi nel #file
* Per riferirci, nel costruttore, agli attributi dell'oggetto creando, scriviamo `this.attributo`
* Adesso `Programma` compila
* Se proviamo a stampare un monitor, non c'è un metodo `print()` il cui attributo è di classe `Monitor`, quindi dà errore
* Per riferirti a un attributo, fai `oggetto.attributo`
* `String + int = String`. Per esempio `"io" + 1 = "io1"`
* `print()` non va a capo, `println()` va a capo. Possiamo anche andare a capo a mano

* Quanto spazio occupa un oggetto di classe `Monitor`? Due interi + una stringa. Di preciso adesso non lo sappiamo. Diciamo 12 byte se è nero
* Creare un oggetto è come fare una `malloc()`

## Utilizzo di una classe in Java

* Usiamo gli oggetti per modellare la realtà
* Numeri di conto. Classe `ContoCorrente`. Attributi `String numeroDiConto`, `int saldo`.
* Il NDC va unico, quando lo crei controlla se ce n'è uno uguale.
* Metodi per il CC.
* Classe `Cliente`: `nome`, `cognome`, `contoCorrente`. metodi per vedere `nome`, `cognome` e `CC`.
* Le cose `static` si vedono dappertutto a prescindere ma lasciamo stare chiusa parentesi appena aperta.
* È possibile avere come attributi una classe, per esempio un cliente ha un CC come attributo.
* Perché ho fatto la classe `Cliente` e non `Persona?` Che differenza fa?
  * Nessuna a livello di programmazione, ma un po' a livello di significato.
    * Il nome indica a noi umani, non al computer, che il contesto è solo persone che hanno un conto corrente.

* Tutti i tipi primitivi hanno anche una classe *wrapper* corrispondente.
* Puoi concatenare una stringa e un tipo primitivo o una String con un `+`
* Chiamare un costruttore tra gli attributi non si fa quasi mai.

* Ogni classe deve avere il suo scopo. Il main lo mettiamo in una classe a parte.

* Per l'output, altri linguaggi hanno funzioni o keyword. In Java c'è la classe `System`. Si fa `System.out.println()`. `println()` è un metodo statico, cioè non viene chiamato tramite un oggetto, ma direttamente dalla classe.

Per compilare un progetto con più file, o facciamo `javac quellocheciserve.java` e capisce da solo le dipendenze, o facciamo `javac *.java` e compila tutto ciò che trova.

* Ricordiamo che se un metodo ha un parametro `cosa` e la classe ha un attributo `cosa`, dentro il metodo scriviamo `this.cosa` per riferirci all'attributo, il parametro invece è semplicemente `cosa`. A dire il vero, dargli lo stesso nome è convenzione, soprattutto nei costruttori, come abbiamo già visto. È buona pratica mettere `this.` anche se non c'è confusione con un parametro.

* Ci sono due tipi di costruttori: con e senza parametri.
* Ricordiamo che tipo `void visualizzaRoba(int numerox)` si dice firma del metodo.

* Nota che una classe non può funzionare senza un costruttore.
* Prima abbiamo provato e ha funzionato, diciamo, perché?
* Java mette a disposizione un costruttore di default. Tutte le classi ereditano da una classe che si chiama `Object`.
  * `Object` mette a disposizione un costruttore default a tutti gli oggetti.
* Questo costruttore smette di esistere appena definisci un costruttore vero e proprio per la classe.
