## Aritmetica binaria (per gli interi positivi)
Ci sono solo due cifre, quindi cominciamo definendo le operazioni a singola cifra.

### Addizione:
$0+0=0; 0+1=1; 1+0=0; 1+1=1$, riporto di 1
Notiamo che ci sono casi in cui un'operazione tra due numeri a una cifra ha un risultato che non può essere rappresentato con una cifra.
Esempio: $11001011+1101110=100111001$

### Sottrazione:
$1-1=0=0-0; 1-0=1; 0-1=1$, prestito di 1
Esempio: $100111001-11001011=1101110$

### Moltiplicazione
$0*0=0=1*0=0*1; 1*1=1$
E si eseguono le somme come in base 10.
Esempio: $10110*101=10110+000000+1011000=1101110$
Notiamo che, poiché le cifre sono solo 1 e 0, gli addendi possono essere solo 0 o il primo fattore trasposto.
Questo è lo stesso concetto della moltiplicazione per le potenze di B in base B:
	$(b_{n-1}·B^{n-1}+b_{n-2}·B^{n-2}+b_{n-3}·B^{n-3}+…+b_1·B+b_0)*B^k=$
	$b_{n-1}·B^{n-1+k}+b_{n-2}·B^{n-2+k}+…+b_1·B^{k+1}+b_0·B^k+0·(B^{k-1}+B^{k-2}+…+B^1+B^0)$
Che graficamente equivale alle cifre originali ($b_n…$) seguito da k zeri ($0·B^k-…$)

### Divisione:
Come in base 10, mi chiedo se il divisore è contenuto nel dividendo.
In base 10, può essere contenuto sì, no o un po'.
In base 2 è contenuto o no, non ci sono altre opzioni.
$1001:11. 100:11=1R11, 11:11=1R0, 1001:11= 11$.

## Numeri negativi

Con $n$ bit, posso rappresentare $2n$ numeri, da $0$ a $2n-1$.
Se faccio un'operazione con un numero limitato di bit, devo stare attento a non andare oltre.
Quello si chiamerebbe overflow, si vedrà dopo.

Ci sono diversi modi per rappresentare i numeri negativi.
### Modulo e segno

Con 4 bit, uso 3 bit per il valore assoluto (modulo) e un bit per il segno.
$0000–0111$: da $+0$ a $+7$, $1000–1111$: da $-0$ a $-7$
Notiamo che ci sono due modi per rappresentare lo 0: $+0$ e $-0$.

Per fare la sottrazione, adesso posso aggiungere il negativo del secondo numero, quindi basta insegnare al computer come si fanno le addizioni.
Però adesso le addizioni si complicano.
Se i segni sono concordi, uso la vecchia logica.
Se sono discordi però, devo comunque fare una sottrazione per fare un'addizione normale.
È solo una complicazione, adesso per fare un'addizione mi serve anche altra logica per sapere quale tipo di addizione devo fare.
### Complemento

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

# Overflow

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

## Numeri razionali

Numeri frazionari.
Noi facciamo così: $0,35610 = 3·10-1+5·10-2+6·10-3$.
È come le cifre normali, ma gli esponenti sono al contrario.
Applicando la stessa logica alla base 2: $0,101_2 = 2-1+2-3 = \frac{1}{2} + \frac{1}{8}$.
Chiaramente, non tutti i numeri razionali hanno poche cifre in binario, quindi spesso dovremo approssimare.
Molti numeri con un numero finito di cifre in base 10 ne hanno infinite in base 2, così come ⅓, che in base 3 ha due cifre ($0,1_3$), ne ha infinite in base 10.
$0,2_{10}$ in base 2 è $0,001100110011…$, è periodico.

Ho comunque un numero limitato di bit.
Dovrei decidere dov'è la virgola. Questa è la rappresentazione a virgola fissa (fixed point).
Con 12 bit, di cui 4 dopo la virgola, rappresento $72,6$:
$72 = 64+8 = 1001000$;
$0,6 = 0,\overline{1001}$;
$72,6 = 01001000,1001 = 72,5625$.

Con questo sistema, la precisione è di, per esempio, $0,25$, usando due bit dopo la virgola.
E questa precisione è costante per tutti i numeri.
Però, $0,25$ è troppo impreciso per i numeri piccoli, e troppo preciso per quelli grandi.
La soluzione è la rappresentazione in [[Virgola mobile]].