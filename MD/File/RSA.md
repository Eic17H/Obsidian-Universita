Una domanda sarà su questo.
Acronimo dei cognomi degli inventori: Rivest, Shamir, Adleman.
Permette di usare il modulo e il toziente per avere una chiave con cui è facile criptare dei dati, ma difficile
decriptare se non si hanno altre informazioni sulla chiave.

Il mittente vuole inviare un numero $x$.

Noi, il ricevente, generiamo una chiave.
Prendiamo due numeri primi molto grandi, $p_1$ e $p_2$.
$N = p_1 × p_2$. Sono gli unici due fattori di $N$.
$φ(N) = (p_1-1) × (p_2-2)$. Non puoi sapere $φ(N)$ se non sai $p_1$ e $p_2$.
Scegliamo un numero e che sia coprimo con $φ(N)$.
Inviamo la chiave formata dalla coppia ordinata $(N, e)$.

Il mittente calcola il messaggio criptato, $y$.
$y = [x^e]_N$.
Il mittente ci invia $y$.

Noi riceviamo $y$.
Calcoliamo $d$, che è $[e]_{φ(N)}^{-1}$.
Questo significa che $[e×d]_{φ(N)}=[1]_{φ(N)}$, cioè $e×d = 1+φ(N)×k$ per un certo $k$ intero.
Per trovare $x$, sappiamo che $x=[y^d]_N$.
Molto controintuitivo.
$y^d$ non è altro che $([x^e]_N)^d$.
Quindi $[y^d]_N$, portando fuori il modulo, è $[(x^e)^d]_N$.
Facendo le potenze in questo ordine, gli esponenti si moltiplicano.
$[x^{e×d}]_N= [x^{1+φ(N)×k}]_N$, come visto prima.
Proprietà delle potenze: $n^{a+b} = n^a×n^b$.
$[x^1×x^{φ(N)×k}]_N$.
Proprietà delle potenze: $n^{a×b} = (n^a)^b$.
$[x^1×(x^{φ(N)})^k]_N$.
Proprietà vista prima: $[x^{φ(N)}]_N = [1]_N$.
$[x^1×1^k]_N = [x]_N$.

Tutto insieme:
$[y^d]_N = [(x^e)^d]_N = [x^{e×d}]_N = [x^{1+φ(N)×k}]_N = [x^1×x^{φ(N)×k}]_N = [x^1×(x^{φ(N)})^k]_N = [x^1×1^k]_N = [x]_N$

Sapendo solo $e$ ed $N$, puoi criptare un messaggio facilmente, ma non puoi decriptarlo senza $φ(N)$, che non puoi calcolare senza $p_1$ e $p_2$, e con numeri molto grandi ci vogliono molto tempo e potenza computazionale per trovarli, anche perché sono l’unico modo per moltiplicare due numeri e ottenere $N$ (oltre a $N×1$).
Gli unici valori comunicati da un computer all’altro sono $e$, $N$ e $y$.

Ripetiamo tutti i passaggi dell’RSA e poi facciamo un esempio:

Ricevente:

* Sceglie $p_1$ e $p_2$;
* Calcola $N = p_1 × p_2$;
* Calcola $φ(N) = (p_1-1) × (p_2 – 1)$;
* Sceglie $e$, coprimo con $φ(N)$;
* Calcola $d$ = $[e]_{φ(N)}^{-1}$;
* Invia la chiave $(e, N)$;

Mittente:

* Riceve la chiave $(e, N)$;
* Sceglie un messaggio $x$;
* Calcola il messaggio criptato $y = [x^e]_N$;
* Invia il messaggio criptato $y$;

Ricevente:

* Riceve il messaggio criptato $y$;
* Calcola il messaggio originale $x = [y^d]_N$.

Un esempio:

$x=3,\ p_1=7,\ p_2=5,\ N=7×5=35,\ φ(N)=(6)×(4)=24,\ e=5$.
$(e, N) = (5, 24)$.
$y = [3^5]_{35} = [243]_{35} == [33]_{35}$.
$d = [5]_{24}^{-1} = [5]_{24}$ (per coincidenza sono uguali).
$x = [y^d]_N = [33^5]_35$.

Usiamo un metodo intelligente per calcolare quel modulo.

$[33]_{35} = [-2]_{35}$.
$[33^5]_{35} = [-2^5]_{35} = -[32]_{35} = -[-3]_{35} = [3]_{35}$, che è il messaggio originale.