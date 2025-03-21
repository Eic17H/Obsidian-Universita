Una domanda sarà su questo.
Acronimo dei cognomi degli inventori: Rivest, Shamir, Adleman.
Permette di usare il modulo e il toziente per avere una chiave con cui è facile criptare dei dati, ma difficile
decriptare se non si hanno altre informazioni sulla chiave.

Il mittente vuole inviare un numero $\color{#7DC8EA}x$.

Noi, il ricevente, generiamo una chiave.
Prendiamo due numeri primi molto grandi, $\color{#7DC8EA}p_1$ e $\color{#7DC8EA}p_2$.
$\color{#7DC8EA}N = p_1 × p_2$. Sono gli unici due fattori di $\color{#7DC8EA}N$.
$\color{#7DC8EA}φ(N) = (p_1-1) × (p_2-2)$. Non puoi sapere $\color{#7DC8EA}φ(N)$ se non sai $\color{#7DC8EA}p_1$ e $\color{#7DC8EA}p_2$.
Scegliamo un numero e che sia coprimo con $\color{#7DC8EA}φ(N)$.
Inviamo la chiave formata dalla coppia ordinata $\color{#7DC8EA}(N, e)$.

Il mittente calcola il messaggio criptato, $\color{#7DC8EA}y$.
$\color{#7DC8EA}y = [x^e]_N$.
Il mittente ci invia $\color{#7DC8EA}y$.

Noi riceviamo $\color{#7DC8EA}y$.
Calcoliamo $\color{#7DC8EA}d$, che è $\color{#7DC8EA}[e]_{φ(N)}^{-1}$.
Questo significa che $\color{#7DC8EA}[e×d]_{φ(N)}=[1]_{φ(N)}$, cioè $\color{#7DC8EA}e×d = 1+φ(N)×k$ per un certo $\color{#7DC8EA}k$ intero.
Per trovare $\color{#7DC8EA}x$, sappiamo che $\color{#7DC8EA}x=[y^d]_N$.
Molto controintuitivo.
$\color{#7DC8EA}y^d$ non è altro che $\color{#7DC8EA}([x^e]_N)^d$.
Quindi $\color{#7DC8EA}[y^d]_N$, portando fuori il modulo, è $\color{#7DC8EA}[(x^e)^d]_N$.
Facendo le potenze in questo ordine, gli esponenti si moltiplicano.
$\color{#7DC8EA}[x^{e×d}]_N= [x^{1+φ(N)×k}]_N$, come visto prima.
Proprietà delle potenze: $\color{#7DC8EA}n^{a+b} = n^a×n^b$.
$\color{#7DC8EA}[x^1×x^{φ(N)×k}]_N$.
Proprietà delle potenze: $\color{#7DC8EA}n^{a×b} = (n^a)^b$.
$\color{#7DC8EA}[x^1×(x^{φ(N)})^k]_N$.
Proprietà vista prima: $\color{#7DC8EA}[x^{φ(N)}]_N = [1]_N$.
$\color{#7DC8EA}[x^1×1^k]_N = [x]_N$.

Tutto insieme:
$\color{#7DC8EA}[y^d]_N = [(x^e)^d]_N = [x^{e×d}]_N = [x^{1+φ(N)×k}]_N = [x^1×x^{φ(N)×k}]_N = [x^1×(x^{φ(N)})^k]_N = [x^1×1^k]_N = [x]_N$

Sapendo solo $\color{#7DC8EA}e$ ed $\color{#7DC8EA}N$, puoi criptare un messaggio facilmente, ma non puoi decriptarlo senza $\color{#7DC8EA}φ(N)$, che non puoi calcolare senza $\color{#7DC8EA}p_1$ e $\color{#7DC8EA}p_2$, e con numeri molto grandi ci vogliono molto tempo e potenza computazionale per trovarli, anche perché sono l’unico modo per moltiplicare due numeri e ottenere $\color{#7DC8EA}N$ (oltre a $\color{#7DC8EA}N×1$).
Gli unici valori comunicati da un computer all’altro sono $\color{#7DC8EA}e$, $\color{#7DC8EA}N$ e $\color{#7DC8EA}y$.

Ripetiamo tutti i passaggi dell’RSA e poi facciamo un esempio:

Ricevente:

* Sceglie $\color{#7DC8EA}p_1$ e $\color{#7DC8EA}p_2$;
* Calcola $\color{#7DC8EA}N = p_1 × p_2$;
* Calcola $\color{#7DC8EA}φ(N) = (p_1-1) × (p_2 – 1)$;
* Sceglie $\color{#7DC8EA}e$, coprimo con $\color{#7DC8EA}φ(N)$;
* Calcola $\color{#7DC8EA}d$ = $\color{#7DC8EA}[e]_{φ(N)}^{-1}$;
* Invia la chiave $\color{#7DC8EA}(e, N)$;

Mittente:

* Riceve la chiave $\color{#7DC8EA}(e, N)$;
* Sceglie un messaggio $\color{#7DC8EA}x$;
* Calcola il messaggio criptato $\color{#7DC8EA}y = [x^e]_N$;
* Invia il messaggio criptato $\color{#7DC8EA}y$;

Ricevente:

* Riceve il messaggio criptato $\color{#7DC8EA}y$;
* Calcola il messaggio originale $\color{#7DC8EA}x = [y^d]_N$.

Un esempio:

$\color{#7DC8EA}x=3,\ p_1=7,\ p_2=5,\ N=7×5=35,\ φ(N)=(6)×(4)=24,\ e=5$.
$\color{#7DC8EA}(e, N) = (5, 24)$.
$\color{#7DC8EA}y = [3^5]_{35} = [243]_{35} == [33]_{35}$.
$\color{#7DC8EA}d = [5]_{24}^{-1} = [5]_{24}$ (per coincidenza sono uguali).
$\color{#7DC8EA}x = [y^d]_N = [33^5]_35$.

Usiamo un metodo intelligente per calcolare quel modulo.

$\color{#7DC8EA}[33]_{35} = [-2]_{35}$.
$\color{#7DC8EA}[33^5]_{35} = [-2^5]_{35} = -[32]_{35} = -[-3]_{35} = [3]_{35}$, che è il messaggio originale.