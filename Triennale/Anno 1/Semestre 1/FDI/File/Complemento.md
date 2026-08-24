---
cssclasses:
  - fdi
---
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
$72+C_{10}(41) = 72+59 = 131; 131-100 = 31$.
Funziona.
Perché funziona?
Il complemento di $x$ è $10k-x$. Perciò $y+C_{10}(x)=y+10k-x=y-x+10k$.
Quindi basta togliere $10k$ per avere $y-x$.