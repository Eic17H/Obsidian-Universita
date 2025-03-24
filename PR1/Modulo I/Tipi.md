## Settimana 9
(ho saltato 3 lezioni)
Tipi equivalenti, tipi compatibili, operandi.

Il nome del tipo può cambiare da un linguaggio a un altro.
Quasi sempre, ci sono almeno quattro tipi di tipi differenti tipi:
Booleani;
Interi;
Reali;
Caratteri.

Booleani:
Il tipo booleano è un tipo discreto (enumerabile), con solo due valori possibili, vero e falso.
Per rappresentare un booleano basterebbe un solo bit, ma per come sono fatti i computer è difficile usare un solo bit in un byte, quindi si usa comunque un byte intero.
Il C è strano, di base non ha un tipo booleano (c’è dal C99, ma molti non lo usano).
Tra l’altro, avete notato che il tipo booleano in C è diverso dagli altri? È _Bool.
Non c’è nessun altro tipo in C che comincia con un underscore e una maiuscola.
Avete visto _Int o _Float? No!
Il motivo è che prima dell’introduzione del tipo booleano nativo, molti avevano definito il proprio tipo booleano, usando typedef… Però non abbiamo ancora fatto typedef, quindi facciamo finta che si usi define.
Molti avevano nel loro codice qualcosa di simile a #define boolean int, per fare cose come boolean flag; e fingere di avere un tipo booleano.
Per evitare conflitti, per mantenere l’importantissima backwards compatibility, lo standard C non poteva usare boolean o bool, quindi è stato scelto qualcosa che sicuramente non ha mai usato nessuno.

Caratteri:
I computer sono number-cruncher, non hanno lettere.
Noi mappiamo le lettere sui numeri, secondo una codifica.
La codifica più diffusa è ASCII, di ANSI, poi adottata da ISO.
ASCII aveva rimpiazzato la codifica EDCDC di IBM.
ASCII nasce sostanzialmente con UNIX (che nasce da MULTICS, con CS finale tra l’altro).
ASCII lavora su 7 bit, perché bastavano 128 caratteri.
Non ci sono lettere accentate, ma agli americani non servono, a loro bastano 128 caratteri.
I computer lavorano comunque su byte interi, quindi mappando caratteri ASCII su byte, un bit di ogni byte era sprecato.
La soluzione fu di usare quell’ottavo byte nella codifica ASCII estesa, che raddoppiava il numero di caratteri disponibili.
Questi 128 caratteri aggiuntivi non erano determinati da un’unica codifica, ma ogni paese assegnava 128 caratteri di cui aveva bisogno. L’estensione, la seconda pagina usata nella maggior parte dell’Europa si chiama Latin-1.
C usa l’ASCII esteso, solitamente con Latin-1.
In N, ogni numero ha un precedente e un successivo.
R è infinitamente denso, quindi questi concetti non esistono.

C ti permette di usare numeri senza segno, che hanno un valore massimo doppio rispetto al valore massimo dei numeri normali.
Un altro insieme numerico che può servire è quello dei numeri complessi; l’unico linguaggio mainstream che li supporta nativamente è Fortran, che si usa molto in ambiti scientifici.
Ci sono anche linguaggi che aumentano la precisione quando serve (precisione arbitraria).

Una volta che hai deciso quanti bit usare per una variabile, c’è un numero finito di possibili valori rappresentabili.

Ci sono 8 tipi per i valori interi in C. [vedi slide]
unsigned e unsigned int sono lo stesso tipo.
Questi tipi sono fossili di un’epoca in cui bisognava ottimizzare l’utilizzo della memoria.
Adesso abbiamo a disposizione memoria per memorizzare miliardi di numeri.
Ai tempi, appena qualche centinaio.

[metti disegno]

Il compilatore può decidere quanti bit allocare a una variabile. È un problema?
Sì, in realtà.
C’è prassi, ma non c’è obbligo. [vedi slide]

“A noi del sistema di tipi non ce ne frega niente” (o qualcosa del genere)
-Ritchie


In C, i caratteri sono ancora una volta degli interi.
Quindi si possono mescolare con gli interi. Terrificante.
‘a’ ha valore 97, quindi è il 98esimo carattere [ignora slide]

Per i reali all’inizio si è cominciato dalla fixed point, che ha fatto schifo.
Come visto in FDI, si è presto passati alla floating point.
I reali in C sono float e double.

123 è decimale, 0123 è ottale, 0x123 è esadecimale.
Perché proprio ottale ed esadecimale?
Quante cifre binarie è una cifra decimale? Boh, 4 o 5 fai.
Quante cifre esadecimale o ottali? Precisamente 4 e 3. Utile.

Quando a=expr, ci sono dei controlli.
Nei linguaggi tipati staticamente, a ed expr devono essere dello stesso tipo.
Se non lo sono, si casta, già visto.
10+4.5 non va bene, devo fare (float) 10+4.5.
Ma. Se. Se. Se. Se. Se. Se.
Se. Il sistema dei tipi del mio linguaggio mi dice che sono tipi compatibili, posso farlo senza cast espliciti.
Regola di compatibilità del sistema dei tipi del C:
	Posso sommare una quantità intera e una reale.
		Prima devo convertire l’intero in reale.
Regola di inferenza del sistema dei tipi del C:
	Se sommo un intero e un reale, devo usare l’addizione reale.
Int, char e bool sono compatibili perché sono lo stesso tipo.
Non c’è da fare nessuna cazzo di conversione, e sostanzialmente non c’è da fare nessuna inferenza.
[vedi slide su sh=lo]
Il problema è che tutto questo è legale nel sistema dei tipi.
La soluzione sarebbe evitare che si possa compilare, ma perderesti libertà.
Le regole di compilazione aiutano, ma hanno un costo, e possono generare errori che talvolta sono difficili da notare.



Equivalenza, compatibilità e inferenza sono regole che completano la grammatica: la grammatica, purtroppo, da sola non basta.

Più un sistema di tipi è debolmente tirato, più c’è compatibilità tra tipi.
Ciò nasce da Caml, che non è tipata, cioè usa solo i tipi dell’hardware.
Quando si introduce un sistema di tipi in C, ci si rifà al non-sistema di tipi di Caml.
In OOP, i tipi sono eliminati e rimpiazzati dalle classi.
Quando si crea un sistema di tipi, si hanno due opzioni:
Non estensibile: usi solo i tipi predefiniti;
Estensibile: puoi creare nuovi tipi.
In C, typedef permette di creare nuovi tipi equivalenti ai vecchi tipi.
A che serve? A livelli semplici, per puri motivi linguistici.
typedef char Char e voi mi direte: “Cosa me ne faccio di tutto questo?”
Per convenzione, per prassi, i nuovi tipi si definiscono con la maiuscola.
Cosa succede? All’interno della mia tavola dei simboli, viene inserito Char con valore char.
Tavola dei simboli: simboli non definiti dal linguaggio.
Da questo momento in poi, Char è utilizzabile come tipo predefinito del linguaggio.
NON C’È DISTINZIONE TRA NUOVI TIPI E TIPI PREDEFINITI DEL LINGUAGGIO.

La differenza tra #define e typedef è sottile ma sostanziale.
#define avviene un passo prima della compilazione.
C’è un modo per far eseguire solo il preprocessing sul tuo codice. Le macro vengono sostituite, gli “#include” vengono sostituiti dal codice di ciò che viene incluso, e viene visualizzato il codice così come sarà ricevuto dal compilatore.
Euro bill=20Euro e float bill=20.0 hanno lo stesso identico contenuto semantico.
La differenza è prettamente linguistica, perché i tipi Euro e float sono equivalenti.
I tipi equivalenti sono anche meglio dei tipi compatibili: non devi neanche fare conversioni.
Quando due tipi sono compatibili, ci sono due tipi di conversioni possibili:
Implicite: type coercion;
Esplicite: casting.

Definire tipi è utile quando definisci qualcosa che non esiste.

Comunque un’enum in C è essenzialmente una macro di interi.
Questo approccio lazy del C ha fatto risparmiare nello scrivere il compilatore.

Il C originale era molto weakly typed. Con le revisioni, con gli standard, come C89, si è rafforzato, ma è ancora molto weak.

All’interno del file, la posizione migliore per un typedef è prima del main().
L’ultimo argomento dei tipi è molto interessante, anche se non sembra molto collegato: array e matrici.
Fa comodo avere coerenza strutturale.
Se la locazione in memoria x è Gennaio, ha senso dare x+1 a Febbraio e così via.
E quindi ci sarà da qualche parte Dicembre a x+11. Che bello.
Passiamo dalle locazioni di memoria (realtà) alle variabili (astrazione).
Se voglio astrarre questo modello, posso avere int janincome, febincome,…
Ma così avrò qualcosa del genere:
locazione di memoria
546
227
938
389
mese
gennaio
febbraio
aprile
marzo

12 diversi indirizzi da memorizzare. Preferisco memorizzare solo 546, e poi ricavare gli altri.
Dichiaro invece int income[12].
Le la variabile di Dicembre sarà a income[11], cioè all’indirizzo 546+11.
Le parentesi quadre sono uno strano operatore circonfisso, l’operatore di indicizzazione, che permette di specificare l’offset da aggiungere all’indirizzo della prima variabile.
Si tratta di offset, non di posizione, quindi la prima variabile ha offset/indirizzo 0, non 1.
Questo ha senso per il compilatore, ma è pessimo per il programmatore.
A sproposito, Scateni consiglia vivamente di lasciare da parte l’under_score.
a[1] === a[1.5], l’indice viene arrotondato per difetto.
int a[100] = {0} inizializza tutto a 0, e l’array si prende 100 locazioni di memoria, che senza l’inizializzazione sarebbero piene di datori casuali.

Quando scrivo a[100], dove viene memorizzato quel “100”? Nella tavola dei simboli!
Ma in effetti forse no sai? Ho sempre dato per scontato che lo fosse ma in effetti non serve a niente.
Ci informeremo.
[non ci siamo informati]

Quando dichiari a[3][4], 4 è l’indice interno e 3 è l’indice esterno:
{

{▭, ▭, ▭, ▭},
{▭, ▭, ▭, ▭},
{▭, ▭, ▭, ▭}
}