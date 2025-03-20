# Settimana 1

I test saranno a risposta aperta e multipla.

Tratteremo:
* I fondamenti dell'informatica;
* La rappresentazione dell'informazione;
* L'analisi e la sintesi delle reti logiche, sia combinatorie che sequenziali.

I testi consigliati sono questi:
* Bolchini, Brandolese, Salice, Sciuto - Reti Logiche, Apogeo (importante)
* Brookshear - Informatica, una panoramica generale, Pearson, 2012 (opzionale)
E si studierà anche dagli appunti del docente.

Il concetto di informatica è fondamentalmente legato al concetto di algoritmo.
Le istruzioni di un algoritmo devono essere:
* Esatte (non esiste sale quanto basta);
* Eseguibili in tempo finito;
* Scritte in linguaggio comprensibile.

Dei dati vedremo:
* La rappresentazione;
* Il trasporto;
* La trasformazione.

Noi scriviamo i numeri in base 10, e l'insieme delle cifre è $β = \{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\}$.


L'informatica ha due definizioni:
* Scienza dei dispositivi elettronici;
* Studio degli algoritmi che descrivono e trasformano l'informazione.

Un algoritmo ha tre caratteristiche:
* È composto da una serie di passi;
* Questi passi sono comprensibili;
* Prima o poi si arriva a un risultato.
Per esempio:
* Una ricetta;
* Un indirizzo stradale;
* Uno spartito;

Nelle scienze esatte: procedimento di calcolo per risolvere un problema.
“Algoritmo” è una parola antica, con origini in Uzbekistan nel 900 d.C.
È un metodo di elaborazione che prende un input e dà un output.

Programmare è tradurre un algoritmo in un programma comprensibile per un computer.

*Algoritmo di Euclide:*

* Input: due numeri naturali
* Output: il loro MCD
La divisione di Euclide ha due input naturali a,b e due output naturali: quoziente e resto.
Il resto è sempre compreso tra 0 e b.

Calcolando l'MCD di 20 e 24 per enumerazione (come alle elementari) otteniamo:
* $D20 = \{1, 2, 4, 5, 10, 20\}$
* $D24 = \{1, 2, 3, 4, 6, 8, 12, 24\}$
* In comune: $\{1, 2, 4\}$
* Maggiore: $4$
Ma è un processo lento.
Alle medie impariamo un algoritmo:
* $20 = 2²·5$
* $24 = 2³·3$
* Fattori comuni: $2$, minor esponente: $2$
* $2² = 4$
Ma anche questo è comunque molto inefficiente per i numeri molto grandi.

Euclide ha ideato un algoritmo che non usa la scomposizione in fattori:
* Dati i numeri naturali $a$ e $b$;
* Se $a<b$, scambiali;
* Se $a\%b=0$, il risultato è $b$;
* Altrimenti, $a$ prende il valore di $b$, $b$ prende il valore di $a\%b$ e si ricomincia.
Sappiamo se converge? Cioè, sappiamo se termina?
$0<r<b$, sempre. Ma visto che il nuovo $b$ è il vecchio $r$, $b$ diminuisce sempre, e così anche $r$. Una serie di naturali che diminuisce sempre prima o poi converge a $0$.

Bene, adesso sappiamo che dà sempre una risposta.
La risposta è giusta? Non lo sappiamo ancora. Come facciamo a scoprirlo?
Boh, non ci ho capito nulla.

# Settimana 2
Rappresentazione dell'informazione.

Le grandezze sono relative al mezzo fisico che usiamo: per adesso usiamo gli elettroni.

Rappresentazione analogica: la grandezza rappresentante varia in modo continuo.
Rappresentazione digitale: la grandezza può assumere solo un numero discreto di valori.
La rappresentazione digitale è meno fedele, ma più robusta e affidabile.
Lo è in particolare quella binaria, robusta e affidabile ma con meno potere rappresentativo.
Servono più “slot” nella memoria per avere pari stati diversi.
Se mi servono x valori diversi, mi servono n slot tale che x<2^n.

| Siamo partiti con un metodo semplicissimo               | IIIIIIIIII | IIIII |   III   |
| ------------------------------------------------------- | :--------: | :---: | :-----: |
| **Poi l'abbiamo reso più complicato ma più efficiente** |   **X**    | **V** | **III** |
| **Fino ad arrivare al nostro sistema corrente**         |   **1**    | **8** |    <    |

Un sistema è fatto di simboli e regole.
Il nostro sistema numerico ha regole posizionali: il valore di un simbolo cambia a seconda della sua posizione.
Quando la base $B>=2$, le sue cifre vanno da $0$ a $B-1$.
Per esempio, per la base 16, $β=\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F\}$.

# Settimana 3

L'algoritmo di conversione tra basi.
Dato un numero $n$, e una base $B$;
Fai $n/B$;
Ti segni il resto;
Il risultato è il nuovo $n$;
Ricominci finché il risultato non è $0$.
I resti, in ordine inverso, sono le cifre del numero convertito.
Così come le cifre vanno da $0$ a $B-1$, anche i resti vanno da $0$ a $B-1$.

Aritmetica binaria (per gli interi positivi)
Ci sono solo due cifre, quindi cominciamo definendo le operazioni a singola cifra.

Addizione:
$0+0=0; 0+1=1; 1+0=0; 1+1=1$, riporto di 1
Notiamo che ci sono casi in cui un'operazione tra due numeri a una cifra ha un risultato che non può essere rappresentato con una cifra.
Esempio: $11001011+1101110=100111001$

Sottrazione:
$1-1=0=0-0; 1-0=1; 0-1=1$, prestito di 1
Esempio: $100111001-11001011=1101110$

Moltiplicazione
$0*0=0=1*0=0*1; 1*1=1$
E si eseguono le somme come in base 10.
Esempio: $10110*101=10110+000000+1011000=1101110$
Notiamo che, poiché le cifre sono solo 1 e 0, gli addendi possono essere solo 0 o il primo fattore trasposto.
Questo è lo stesso concetto della moltiplicazione per le potenze di B in base B:
	$(b_{n-1}·B^{n-1}+b_{n-2}·B^{n-2}+b_{n-3}·B^{n-3}+…+b_1·B+b_0)*B^k=$
	$b_{n-1}·B^{n-1+k}+b_{n-2}·B^{n-2+k}+…+b_1·B^{k+1}+b_0·B^k+0·(B^{k-1}+B^{k-2}+…+B^1+B^0)$
Che graficamente equivale alle cifre originali ($b_n…$) seguito da k zeri ($0·B^k-…$)

Divisione:
Come in base 10, mi chiedo se il divisore è contenuto nel dividendo.
In base 10, può essere contenuto sì, no o un po'.
In base 2 è contenuto o no, non ci sono altre opzioni.
$1001:11. 100:11=1R11, 11:11=1R0, 1001:11= 11$.
#FINIRE

# Settimana 4

Con $n$ bit, posso rappresentare $2n$ numeri, da $0$ a $2n-1$.
Se faccio un'operazione con un numero limitato di bit, devo stare attento a non andare oltre.
Quello si chiamerebbe overflow, si vedrà dopo.

Ci sono diversi modi per rappresentare i numeri negativi.

Modulo/segno:
Con 4 bit, uso 3 bit per il valore assoluto (modulo) e un bit per il segno.
$0000–0111$: da $+0$ a $+7$, $1000–1111$: da $-0$ a $-7$
Notiamo che ci sono due modi per rappresentare lo 0: $+0$ e $-0$.

Per fare la sottrazione, adesso posso aggiungere il negativo del secondo numero, quindi basta insegnare al computer come si fanno le addizioni.
Però adesso le addizioni si complicano.
Se i segni sono concordi, uso la vecchia logica.
Se sono discordi però, devo comunque fare una sottrazione per fare un'addizione normale.
È solo una complicazione, adesso per fare un'addizione mi serve anche altra logica per sapere quale tipo di addizione devo fare.

C'è un altro metodo di rappresentazione, quella in complemento.
Partiamo dalla base 10, e facciamo il cosiddetto complemento a 9.
Prendiamo ogni singola cifra e la sottraiamo da $9$.
$0123456789$ -> $9876543210$, $41$->$58$, $123$->$876$.
Visto che non c'è riporto, è come fare $99-41=58$, $999-123=876$.
Il complemento a 10 è il complemento a 9, con un'aggiunta di $+1$.
$41$->$59$, $123$->$877$.
Notiamo che, $41+59=100$, $123+877=1000$.
Il complemento a 10 di un numero $N$ con $n$ cifre sarà uguale a $10n-N$.
Il complemento a $B$ di $N$ si indica con $CB(N)$.

Usiamo il complemento a 10 per fare una sottrazione:
$72-41=31$;
$72+C10(41) = 72+59 = 131; 131-100 = 31$.
Funziona.
Perché funziona?
Il complemento di $x$ è $10k-x$. Perciò $y+C10(x)=y+10k-x=y-x+10k$.
Quindi basta togliere $10k$ per avere $y-x$.

[e poi ho saltato una lezione]
# Settimana 5

Overflow.
Usiamo 3 bit per fare $4+5=9$.

|       |   $1$   | $0$ | $0$ | $+$ |
| :---: | :-----: | :-: | :-: | :-: |
|       |   $1$   | $0$ | $1$ | $=$ |
| $(1)$ |   $0$   | $0$ | $1$ |     |
|       | $4+5=1$ |  <  |  <  |     |

Ma è sbagliato.
Questo è perché 9 va oltre 3 bit.
Questo fenomeno si chiama overflow.
Devo usare parole con abbastanza bit per rappresentare anche il risultato.

Facciamolo con 4 bit ma con segno:

|       | $0$ |      $1$       | $1$ | $1$ | $+$ |
| :---: | :-: | :------------: | :-: | :-: | :-: |
|       | $0$ |      $1$       | $1$ | $0$ | $=$ |
| $(1)$ | $1$ |      $1$       | $0$ | $1$ |     |
|       |     | $+7 + +6 = -5$ |  <  |  <  |     |

|       | $1$ |      $1$       | $1$ | $1$ | $+$ |
| :---: | :-: | :------------: | :-: | :-: | :-: |
|       | $1$ |      $1$       | $1$ | $0$ | $=$ |
| $(1)$ | $0$ |      $1$       | $0$ | $1$ |     |
|       |     | $-7 + -6 = +5$ |  <  |  <  |     |

Addirittura sommando due numeri concordi otteniamo un cambio di segno.
In realtà questa assurdità ci aiuta a notare che c'è stato un overflow.

Numeri frazionari.
Noi facciamo così: $0,35610 = 3·10-1+5·10-2+6·10-3$.
È come le cifre normali, ma gli esponenti sono al contrario.
Applicando la stessa logica alla base 2: $0,101_2 = 2-1+2-3 = \frac{1}{2} + \frac{1}{8}$.
Chiaramente, non tutti i numeri razionali hanno poche cifre in binario, quindi spesso dovremo approssimare.
Molti numeri con un numero finito di cifre in base 10 ne hanno infinite in base 2, così come ⅓, che in base 3 ha due cifre ($0,1_3$), ne ha infinite in base 10.
$0,2_{10}$ in base 2 è $0,001100110011…$, è periodico.
Vedremo l'algoritmo di conversione nella prossima lezione.

# Settimana 6

Convertire da un numero razionale binario a uno decimale è facile.
Per fare l'opposto c'è un algoritmo.

$\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + ···$, se è una serie finita, sarà sempre minore di $1$.
Può essere maggiore di $1$ solo se è $1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + ···$, cioè se la cifra delle unità in binario è $1$ e non $0$.
Ed è proprio la successione di cifre che cerchiamo.
Quindi possiamo controllare la cifra delle unità, poi cambiare qual è quella delle unità.
L'algoritmo che segue da questa logica è:
* Considero solo la parte decimale;
* Moltiplico per 2;
* Se è maggiore di 1, la cifra è 1, altrimenti è 0;
* Ricomincio finché il numero non è 0.
Appunto, non tutti terminano.
$0,78125_{10} = 0,1101_2; 0,9_{10} = 0,1(1100)_2$.

Ho comunque un numero limitato di bit.
Dovrei decidere dov'è la virgola. Questa è la rappresentazione a virgola fissa (fixed point).
Con 12 bit, di cui 4 dopo la virgola, rappresento $72,6$:
$72 = 64+8 = 1001000$;
$0,6 = 0,(1001)$;
$72,6 = 01001000,1001 = 72,5625$.

Come si rappresentano i numeri negativi a virgola fissa?
Dipende, non ce lo dice.
Torniamo ai positivi.

Con questo sistema, la precisione è di, per esempio, $0,25$, usando due bit dopo la virgola.
E questa precisione è costante per tutti i numeri.
Però, $0,25$ è troppo impreciso per i numeri piccoli, e troppo preciso per quelli grandi.
La soluzione è la rappresentazione in virgola mobile, che vedremo più avanti.

[E poi abbiamo fatto esercizi di conversione di interi discordi, somma, differenza e overflow]

Virgola mobile.

Coi numeri normali, non scriviamo $1250000000$ e $0,0000125$, scriviamo $125·10^7$ e $125·10^{-7}$.
Un qualsiasi numero è $±x_{n-1}···x_1x_0,y_{-1}y_{-2}···y_{-m}·B^{±···a_1a_0}$, segno, mantissa ed esponente intero.
Lo stesso vale per la codifica digitale dei numeri.
Vogliamo che la codifica sia univoca. Renderla univoca è il processo di normalizzazione.
Si normalizza la mantissa. Per esempio a $125·10^{-7}$ si preferisce $0,125·10^{-4}$.
Un altro elemento è la polarizzazione dell'esponente. Vedi le slide.

Ragioniamo prima in base 10. Usando 2 cifre per l'esponente andiamo da 00 a 99.
Per andare in negativo, diciamo che “00” significa $-50$ e “99” significa $+49$.
Avviciniamoci alla verità in binario.
1 bit per il segno, 7 bit per l'esponente, 24 bit per la mantissa, 32 bit in totale.
Essenzialmente:
Rappresenti in virgola fissa;
Lo rappresenti in notazione esponenziale normalizzata: $0,100110…·2^x$;
All'esponente aggiungiamo (decodifica) o sottraiamo (codifica) 64 (in questo caso).
Ci sono due casi in cui ci sono problemi:
Non bastano i bit della mantissa: anziché float uso double;
Non bastano i bit dell'esponente: overflow.
Coi numeri grandi è un problema. Coi numeri piccoli, $1·2^{-65}$, che va in underflow, è quasi $0$.

La mantissa comincerà sempre con “0,1”. Lo stesso non è vero nelle altre basi.
Questo ci dà un vantaggio: visto che è ridondante, possiamo ometterlo e sarà sempre sottinteso, così risparmiamo due bit di spazio e possiamo essere più precisi.

Per l'esponente si usano i numeri da $000…01$ a $111…10$, quindi gli estremi no.
Il modulo più piccolo che si può rappresentare è $1·2^{minimo}$.
Visto che diamo per scontato che cominci con “0,1”, non possiamo rappresentare 0.
Quindi si riserva un numero fatto completamente di “00000000” per il valore 0.
Settimana 7

Vedi le slide
Abbiamo fatto esercizi di conversione da base 10 a virgola mobile, in 12, 32 e 64 bit.
È importante memorizzare come questi tre formati dividono i bit tra esponente e mantissa.

Per la somma, se devi sacrificare (arrotondare) un bit, sacrifica quello meno significativo.
Non cambia molto tra $0,2718281828459045$ e $0,271828182845904$.
Se serve, cambia anche l'esponente.
E vedi le slide.

Per il prodotto invece:
Ok le mantisse le moltiplico.
Se sommo direttamente gli esponenti ho $E_1+k+E_2+k$ (k è il 64 di prima), ma voglio $E_1+E_2+k$.
Devo stare attento a questa cosa.
Lo stesso vale per la divisione.


Lezione dopo:
Possiamo definire $f(x)'$ dalle tabelle di verità.
È più comoda la formula. E le formule si possono semplificare.
Forme canoniche (vedi slide), le definizioni non mi dicono nulla.
[è un pezzo senza contesto, ma si riferisce alle mappe di karnaugh]
[non avevo voglia di prendere appunti]
[non capisco bene come vadano le settimane, sto trascrivendo a febbraio]

# Settimana 10

Condizioni di indifferenza (mappe di Karnaugh).
Certe volte una funzione ha degli input che non compariranno mai, e che quindi non ha degli output corrispondenti. Quando semplifichi la formula, puoi far finta che ciascuno di quegli output a cui sei indifferente sia 1 o 0 a seconda di quale ti permette di semplificarla di più.

L'esempio usato era la codifica BCD, binary coded decimal, che mappa a ogni cifra decimale quattro cifre binarie. Ci sono 10 cifre decimali ma 16 combinazioni di quattro bit, quindi 4 combinazioni sono inutili e posso manipolarle per rendere le loro caselle più simili a quelle adiacenti nella mappa di Karnaugh.
[ovviamente vedi le mappe di Karnaugh dalle slide o da internet]

I sottocubi, il modo in cui si raggruppano le caselle dell'output, devono avere lati la cui lunghezza sia sempre una potenza di 2 (sono dati da moltiplicazioni di input binari, e visto che ogni input è un bit, aggiungere bit raddoppia le combinazioni considerate).

Per le forme normali vedi le slide, non ho appunti, ma si capisce dalle slide.

Tutte le porte logiche si possono definire in funzione di NAND.
(non ci provare a mano, non ne vale la pena, prendilo per vero).

Nella conversione da circuiti a formule, una quantità non trascurabile di studenti non mette le parentesi quando un termine di un prodotto è una somma.

Supponiamo per assurdo che io abbia capito, bisogna usare le proprietà dell'algebra booleana (termini neutri, De Morgan, etc) per far ottenere una formula equivalente in forma normale (solo prodotti di somme o solo somme di prodotti) a partire da una mappa di Karnaugh, e poi semplificare gli elementi ridondanti.
Capire quali elementi sono ridondanti è più facile facendo un'altra mappa di Karnaugh.
Per esempio, in $x'y+xz+yz$, $yz$ è ridondante, e si nota dal completo overlap con parte degli altri due termini in una mappa di Karnaugh.
Ci sono anche metodi algebrici per dedurlo. Ecco due metodi:
Poniamo $yz=vero$, quindi $y=z=1$. Il resto dell'espressione diventa $x'1+x1=x+x'=1$. Anche il resto dell'espressione è sempre vero quando $yz$ è vero, quindi $yz$ è una sorta di sottoinsieme (non credo sia il termine giusto) del resto, quindi si può omettere.
Moltiplichiamo $yz$ per $1$. $x+x'=1$, quindi possiamo fare $yz(x+x')=xyz+x'yz$. Lo mettiamo nell'espressione e otteniamo $x'y+x'yz+xz+xyz$. Se raccogliamo per $x'y$ e $xz$ otteniamo $x'y(z+1)+xz(y+1)$. $Qualsiasi\ numero +1$ fa $1$, quindi possiamo semplificare le parti tra parentesi e otteniamo $x'y+xz$.

# Settimana 11

Funzioni di eccitazione dei flip-flop.
Non ci ho capito molto.
Capire come si evolverà lo stato successivo.

Mappa di karnaugh dove hai come input i due input del circuito (raggruppati insieme) e l'output del passo precedente.
Essenzialmente si tratta di capire quali input faranno restare l'output uguale quando è $0$, quali lo faranno cambiare quando è $0$, quali lo faranno restare uguale quando è $1$, e quali lo faranno cambiare quando è $1$.
In realtà c'è altro ma lo guarderò da youtube.
# Ultima settimana

Esercizi sulla conversione da circuito a espressione.
Rivedere gli operatori e le semplificazioni.
E De Morgan.

Ci sono più tipi di flip-flop.
Rivedere i circuiti.
La funzione di un flip-flop è $1$ quando il valore della $y$ deve cambiare, in funzione di $x$.
Nei **JK**:
**J**: dice il comportamento quando $y=0$, è indifferente se $y=1$;
**K**: dice il comportamento quando $y=1$, è indifferente se $y=0$;
Da quello che ho capito da youtube, il **JK** ha una parte in più rispetto all'**SR**, quindi l'**SR** ha input invalidi mentre il **JK** no.

Corso finito. Ho saltato alcune lezioni. Integrare con slide e youtube.
how floating point works
