---
cssclasses: lip
---
Scope: <span class="pr1">[[Triennale/Anno 1/Semestre 1/PR1/Modulo I/Scope|strumenti per la pulizia di pavimenti…?]]</span> Scherzi a parte, ci sono diversi modi in cui un linguaggio può gestire lo scope e l'ambiente quando una funzione ne chiama un'altra.

Lo scope può essere dinamico o statico, e lo scope dinamico può avere binding di tipo shallow o deep. Lo scope statico è quello del C, per intenderci, viene da sé che gli altri due siano più difficili da capire. Detto che il codice usato è talmente volutamente storto che neanche la somiglianza al C ci salverà. Ho dovuto usare Gemini per capire.

Sia il libro di Pinna che quello di Dessì sono poco chiari, quindi non ho potuto nascondere una certa confusione in questo documento, specie per il deep binding. Nei prossimi anni LiP cambierà radicalmente, possiamo sperare che siano rimossi questi esercizi.

## Teoria

* [Chat con Gemini](https://share.gemini.google/B9MhmM4DlMsB)
* Per lo stack degli ambienti, [[Valutazione#Small-step|Valutazione>Small-step]]
## Concetto semplificato

### Stack di ambienti

Ricordiamo che l'ambiente è una funzione che prende in input un identificatore e rende in output il valore corrente corrispondente. Scriviamo $\bot$ per l'ambiente vuoto, $\delta$ per un ambiente generico, e $\delta[x/k]$ per un ambiente che è identico a $\delta$ ma con la differenza che $x$ vale $k$.

Vediamo dello pseudocodice:

```JS showLineNumbers
function f(x) {
	return x-1
}
function g(x) {
	return x+x
}
function h(x) {
	return f(g(x+1))
}
function main() {
	a=3
	b=h(a)
}
```

Assumendo che questo pseudolinguaggio segua un po' le regole del C, cosa succede quando eseguo `main()`? Si parte dall'ambiente vuoto, $\bot$. Viene poi fatta l'associazione `a=3`, quindi il nostro ambiente è $\bot[a/3]$. Poi entriamo in `h()`.

Cosa succede qua? Logicamente, la variabile `a` non esiste più. Però il parametro `x` assume il valore `3`. Quindi abbiamo un nuovo ambiente $\bot[x/3]$. Noi non vogliamo dimenticare l'ambiente di prima, perché ci servirà di nuovo quando usciremo da `h()` e rientreremo in `main()`. Lo mettiamo da parte, sotto forma di stack: la cima dello stack è l'ambiente corrente, e tutti quelli sotto sono quelli di prima. Quando entro in un nuovo ambiente faccio push, e quando esco faccio pop per tornare a quello vecchio.

Se gli ambienti si indicano con $\delta$, le pile di ambienti si indicano con $\Delta$. Darò nomi solo a quelle utili.

Vediamo quindi come si evolve la pila degli ambienti (non scritta come dice Pinna ma in modo comprensibile):$$\begin{matrix*}[l]
\text{Funzione} & \text{Istruzione} & \text{Stack}\\
main() & & \bot\\
main() & a=3 & \bot[a/3]\\
main() & h(3) & \bot[a/3]\\
h(x) & g(3+1) & \underset {\bot[a/3]} {\bot[x/3]}\\
g(x) & return\ 4+4 &  \underset {\underset {\bot[a/3]} {\bot[x/3]}} {\bot[x/4]}\\
h(x) & f(8) & \underset {\bot[a/3]} {\bot[x/3]}\\
f(x) & return\ 8-1 & \underset {\underset {\bot[a/3]} {\bot[x/3]}} {\bot[x/8]}\\
h(x) & return\ 7 & \underset {\bot[a/3]} {\bot[x/3]} \\
main() & b=7 & \bot[a/3][b/7]
\end{matrix*}$$Vediamo che quando siamo dentro `f(x)`, abbiamo la nozione corrente di `x=8`, ma ci ricordiamo anche che quando torniamo alla funzione chiamante lei ha che `x=3` (e lei si deve ricordare che la funzione prima ancora ha che `a=3`).
### Scope dinamico

Diciamo che abbiamo il corpo del codice con `g(){}; f(){g()};`. Quando entriamo dentro `f()`, nello stack degli ambienti c'è l'ambiente di `f()`, scriviamolo $\delta_f$. Poi entriamo dentro `g()`, e lì lo stack degli ambienti è $\underset {\delta_f} {\delta_g}$.
Se `g()` vuole leggere il valore della variabile `x`, lo cerca prima in $\delta_g$, e se non lo trova lì lo cerca in $\delta_f$ (e se ci fosse altro continuerebbe verso il basso). Gli assegnamenti di `x` poi restano dentro $\delta_f$ se non dichiaro una nuova `x` in `g`, quindi se ho $\langle a=a+1,\ \underset{\bot[a/3]}{\bot}\rangle$ ne risulta $\underset{\bot[a/4]}{\bot}$, e non $\underset{\bot[a/3]}{\bot[a/4]}$.

Vediamo il binding. Prima di tutto un estratto dalla risposta di Deepseek che magari può aiutare a ricordare:
#### Shallow binding

Questa è la parte incomprensibile, si spera che diventi più comprensibile facendo gli esercizi. Con lo shallow binding, quando una funzione viene passata come parametro, il suo ambiente è deciso al momento in cui viene eseguita.

Cioè, io quando passo $g$ passo solo $g$. Quindi se ho una cosa del genere:

```JS
function h(fun, val) {
	k=2
	return fun(val)
}
function g(x) {
	return x+k+1
}
function f() {
	k=3
	return h(g,1)
}
```

Quindi lo stack di $g$ sarebbe $\underset{\underset{\delta_f=\bot[k/3]}{\delta_h=\bot[fun/g][val/1][k/2]}}{\delta_g=\bot[x/1]}$ e restituirebbe $1+2+1=4$.

#### Deep binding

Col deep binding invece, l'ambiente viene deciso quando la funzione viene passata. Cioè, quando passo $g$, in realtà passo la coppia $(g,\Delta)$, e quel "$\Delta$" si riferisce a un puntatore a quello strato della pila di ambienti.

Nell'esempio di prima, $g$ avrebbe $\underset{\delta_f=\bot[k/3]}{\delta_g=\bot[x/1]}$ e restituirebbe $1+3+1=5$. Partirebbe dallo stack di $f$ perché la coppia $(g,\Delta)$ è stata generata in $f$. Se il valore di $k$ viene modificato, $g$ ne percepisce i cambiamenti (io all'inizio avevo capito di no).

Diciamo che si chiama "deep binding" perché $g$ resta legato al suo $\Delta$ fino alla fine, anziché prendere il primo $\Delta$ che trova quando gli serve.

### Scope statico

#### Scope statico con passaggio per riferimento

Semplicemente credo che sia uguale al C ma come se passassi tutte le variabili come puntatori.

Il metodo per vederlo è completamente diverso. Stavo dormendo e stavo sognando di studiare LiP, e ha funzionato perché l'ho capito e il metodo è abbastanza semplice.

Anziché avere una call stack e un'env stack separate, hai solo la call stack. Questa stack continua a cambiare dinamicamente nel corso dell'esecuzione. Poi però hai i blocchi, le parentesi graffe nel nostro caso, ed essendo un diagramma di Eulero si può rappresentare come albero. E questo albero degli scope te lo fai all'inizio e rimane *statico*. E somiglia a un albero dell'ereditarietà in OOP, perché se hai `g {f {}}`, `f` eredita da `g`.

Durante l'esecuzione, se tu devi cercare un simbolo lo cerchi nell'env in cima allo stack. Se non lo trovi lì, non lo cerchi scendendo in basso nella pila. Invece, guardi il nodo corrispondente nell'albero e cerchi il simbolo risalendo gli antenati di quel nodo.
## Esercizi

### 11 Luglio 2025

```C
/*01*/  {
/*02*/      int x = 3;
/*03*/      int y = 2;
/*04*/      int z = 1;
/*05*/  
/*06*/      int f (int y) {
/*07*/          y = y + x;
/*08*/          return y;
/*09*/      }
/*10*/  
/*11*/      int m (int x) {
/*12*/          x = y + z;
/*13*/          return x;
/*14*/      }
/*15*/  
/*16*/      int h1 (int→int w) {
/*17*/          int z = 2;
/*18*/          x = f(x) + w(x) - x;
/*19*/          return x;
/*20*/      }
/*21*/  
/*22*/      int h2 (int x) {
/*23*/          int w = 2;
/*24*/          int z=4;
/*25*/          x = f(w) + m(w); // ***
/*26*/          return w;
/*27*/      }
/*28*/  
/*29*/      int→int g (int n)) {
/*30*/          int h (int→int o, int w) {
/*31*/              return o(w) - w;
/*32*/          }
/*33*/          n=h1(m)-z;     
/*34*/          z = h2(x) + x;
/*35*/          y = f(n) + n;
/*36*/          return h;
/*37*/      }
/*38*/  
/*39*/      {
/*40*/          int x = 1;
/*41*/          int z = 0;
/*42*/          x = g(x)(f, z) + y;
/*43*/      }
/*44*/  }
```

Cerchiamo il valore di `x` dopo la riga 42.

#### Scope dinamico con shallow binding

$$\begin{matrix*}[l]
\text{Riga} & \text{Istruzione} & \text{Ambiente} \\
02 & \text{int x = 3;} & \bot[x/3] \\
03 & \text{int y = 2;} & \bot[x/3][y/2] \\
04 & \text{int z = 1;} & \bot[x/3][y/2][z/1] \\
06 & \text{int f ...} & \bot[x/3][y/2][z/1][f/fun_f] \\
11 & \text{int m ...} & \bot[x/3][y/2][z/1][f/fun_f][m/fun_m] \\
16 & \text{int h1 ...} & \bot[x/3][y/2][z/1][f/fun_f][m/fun_m][h1/fun_{h1}] \\
22 & \text{int h2 ...} & \bot[x/3][y/2][z/1][f/fun_f][m/fun_m][h1/fun_{h1}][h1/fun_{h2}] \\
29 & \text{int g ...} & G=\bot[x/3][y/2][z/1][f/fun_f][m/fun_m][h1/fun_{h1}][h1/fun_{h2}][g/fun_g] \\
39 & \text{\{} & \bot::G \\
40 & \text{int x = 1;} & \bot[x/1]::G \\
41 & \text{int z = 0;} & \bot[x/1][z/0]::G \\
42\to29 & \text{g(x)} & \bot[n/1]::\bot[x/1][z/0]::G \\
30 & \text{int h ...} & \bot[n/1][h/fun_h]::\bot[x/1][z/0]::G \\
33\to16 & \text{h1(m)} & \bot[w/fun_m]::\bot[n/1][h/fun_h]::\bot[x/1][z/0]::G \\
17 & \text{int z = 2;} & \bot[w/fun_m][z/2]::\bot[n/1][h/fun_h]::\bot[x/1][z/0]::G \\
18 \to 06 & \text{f(x)} & \bot[y/1]::\bot[w/fun_m][z/2]::\bot[n/1][h/fun_h]::\bot[x/1][z/0]::G \\
07 & \text{y = y + x;} & \bot[y/2]::\bot[w/fun_m][z/2]::\bot[n/1][h/fun_h]::\bot[x/1][z/0]::G \\
18 \leftarrow 08 & \text{return y;} & \bot[w/fun_m][z/2]::\bot[n/1][h/fun_h]::\bot[x/1][z/0]::G & f(x)=2 \\
18 \to 11 & \text{w(x)} & \bot[x/1]::\bot[w/fun_m][z/2]::\bot[n/1][h/fun_h]::\bot[x/1][z/0]::G & f(x)=2 \\
12 & \text{x = y + z;} & \bot[x/4]::\bot[w/fun_m][z/2]::\bot[n/1][h/fun_h]::\bot[x/1][z/0]::G & f(x)=2 \\
18 \leftarrow 13 & \text{return x;} & \bot[w/fun_m][z/2]::\bot[n/1][h/fun_h]::\bot[x/1][z/0]::G & f(x)=2 & w(x)=4 \\
18 & \text{x = f(x) + w(x) - x;} & \bot[w/fun_m][z/2]::\bot[n/1][h/fun_h]::\bot[x/5][z/0]::G \\
33 \leftarrow 19 & \text{return x;} & \bot[n/1][h/fun_h]::\bot[x/5][z/0]::G & h1(m)=5 \\
33 & \text{n = h1(m) - z;} & \bot[n/5][h/fun_h]::\bot[x/5][z/0]::G & h1(m)=5 \\
34\to22 & \text{h2(x)} & \bot[x/5]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G \\
23 & \text{int w = 2;} & \bot[x/5][w/2]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G \\
24 &  \text{int z = 4;} & \bot[x/5][w/2][z/4]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G \\
25\to06 & \text{f(w)} & \bot[y/2]::\bot[x/5][w/2][z/4]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G \\
07 & \text{y = y + x;} & \bot[y/7]::\bot[x/5][w/2][z/4]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G \\
25 \leftarrow 07 & \text{return y;} & \bot[x/5][w/2][z/4]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G & f(w)=7 \\
25\to11 & \text{m(w)} & \bot[x/2]::\bot[x/5][w/2][z/4]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G & f(w)=7 \\
12 & \text{x = y + z;} & \bot[x/6]::\bot[x/5][w/2][z/4]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G & f(w)=7 \\
25 \leftarrow 13 & \text{return x;} & \bot[x/5][w/2][z/4]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G & f(w)=7 & m(w)=6 \\
25 & \text{x = f(w) + m(w)} & \bot[x/13][w/2][z/4]::\bot[n/5][h/fun_h]::\bot[x/5][z/0]::G & f(w)=7 & m(w)=6 \\
34 \leftarrow 26 & \text{return w;} & \bot[n/5][h/fun_h]::\bot[x/5][z/0]::G & h2(x)=2 \\
34 & \text{z = h2(x) + x;} & \bot[n/5][h/fun_h]::\bot[x/5][z/7]::G & h2(x)=2 \\
35\to06 & \text{f(n)} & \bot[y/5]::\bot[n/5][h/fun_h]::\bot[x/5][z/7]::G \\
07 & \text{y = y + x;} & \bot[y/10]::\bot[n/5][h/fun_h]::\bot[x/5][z/7]::G \\
35 \leftarrow 08 & \text{return y;} & \bot[n/5][h/fun_h]::\bot[x/5][z/7]::G & f(n)=10 \\
35 & \text{y = f(n) + n;} & \bot[n/5][h/fun_h]::\bot[x/5][z/7]::G[y/15] & f(n)=10 \\
42\leftarrow36 & \text{return h;} \bot[x/5][z/7]::G[y/15] & g(x)=fun_h \\
42 \to 30 & \text{g(x)(f,z)} & \bot[o/fun_f][w/7]::\bot[x/5][z/7]::G[y/15] \\
31\to06 & \text{o(w)} & \bot[y/7]::\bot[o/fun_f][w/7]::\bot[x/5][z/7]::G[y/15] \\
07 & \text{y = y + x;} & \bot[y/12]::\bot[o/fun_f][w/7]::\bot[x/5][z/7]::G[y/15] \\
31 \leftarrow 08 & \text{return y;} & \bot[o/fun_f][w/7]::\bot[x/5][z/7]::G[y/15] & o(w)=12 \\
42 \leftarrow 31 & \text{return o(w) - w;} & \bot[x/5][z/7]::G[y/15] & g(x)(f,z)=5 \\
42 & \text{x = g(x)(f,z) + y;} & \bot[x/20][z/7]::G[y/15] \\
\end{matrix*}$$

Mi dà $20$. Quanto ci ho messo? Credo 40 minuti. Vedo che il documento da cui l'ho preso non dà la soluzione.

Gemini dice che ho ragione. ChatGPT pure, ma non gli piace come ho scritto la tabella. E poi ci sono errori di battitura. Noto il giorno dopo che anche a un utente di Discord ha dato $20$.

Ho poi provato un metodo per farlo fattibilmente su un foglio. Anziché scrivere tutto scrivi solo le cose effettivamente utili. Ci ho messo 10 minuti.

In questo metodo, hai due colonne che rappresentano due stack. La call stack e l'env stack. Ogni elemento della call stack è una terna con il numero della riga a cui returnare (come in assembly), il simbolo da sostituire con il risultato (per esempio $\text{f(x)}$) e il valore che viene restituito, scritto solo dopo che hai finito l'esecuzione. L'env stack invece è uguale a prima. Alla fine dell'esecuzione risulta una cosa del genere:$$\begin{matrix*}[l]
\text{Call stack} & \text{Env stack} \\
\begin{matrix*}[l]
42 & \cancel{\text{g(x)}} & = & fun_h \\
33 & \cancel{\text{h1(m)}} & = & 5 \\
18 & \cancel{\text{f(x)}} & = & 2 \\
18 & \cancel{\text{w(x)}} & = & 4 \\
34 & \cancel{\text{h2(x)}} & = & 2 \\
25 & \cancel{\text{f(w)}} & = & 7 \\
25 & \cancel{\text{m(w)}} & = & 6 \\
42 & \cancel{\text{g(x)(f,z)}} & = & 5 \\
31 & \cancel{\text{o(w)}} & = & 12 \\ \\ \\
\end{matrix*}
& \begin{matrix*}[l]
\bot[x/3][y/15][z/1][f/fun_f][m/fun_m][h1/fun_{h1}][h2/fun_{h2}][g/fun_g] \\
\bot[x/20][z/7] \\
\cancel{\bot[n/5][h/fun_h]} \\
\cancel{\bot[w/fun_m][z/2]} \\
\cancel{\bot[y/2]} \\
\cancel{\bot[x/4]} \\
\cancel{\bot[x/13][w/2][z/4]} \\
\cancel{\bot[y/7]} \\
\cancel{\bot[x/6]} \\
\cancel{\bot[o/fun_f][w/7]} \\
\cancel{\bot[y/12]}
\end{matrix*}
\end{matrix*}$$
Ho saltato una chiamata perché l'ho fatta a mente, quando avrò la certezza di farlo bene la aggiungerò.

Gli stack sono sottosopra per convenienza, quindi la cima dello stack è sotto. Quando fai pop, sbarri la cima. Notiamo che ci sono due ambienti in più rispetto alle chiamate, questo è perché c'è l'ambiente globale e poi c'è il blocco $\text{\{\}}$ che viene pushato senza una chiamata a funzione.

La parte difficile è ricordarsi di poppare entrambi gli stack insieme quando si returna

Consiglio di fare come me e fare un esercizio con la versione lunga per capire bene quello che stai facendo, e poi rifare lo stesso esercizio con la versione corta.
#### Scope dinamico con deep binding

Con lo shallow binding, abbiamo visto che una funzione può modificare una variabile anche se non si trova nell'ambiente in cima alla pila degli ambienti. E quando esegui una funzione passata come riferimento, la sua pila degli ambienti parte da quella presente al momento dell'esecuzione.

Col deep binding, invece, la funzione chiamata così non si copia l'intero stack. Se è stata definita nel main per esempio, ignora tutta la parte dello stack che c'è sopra l'ambiente del main. Però le modifiche che nel mentre sono state fatte all'ambiente del main e a quelli sotto vengono comunque percepite. È un po' come se lo stack ramificasse, o come se ciascun ambiente avesse anche l'informazione su quali strati saltare.

[Chat con Gemini](https://share.gemini.google/GWKUnXStJ7EF)

Indicizzeremo gli strati dell'env stack, e i valori delle variabili che contengono funzioni conterranno anche puntatori allo strato a cui si riferiscono, per esempio $φ:\bot[m/fun_h@γ]$.

La differenza rispetto allo shallow binding è quando stiamo eseguendo $\text{w(x)}$. Assumendo che il mio svolgimento e quello dei lettori abbia la stessa struttura (e credo che sia ciò in cui si deve sperare), con lo shallow binding useremmo $[z/2]$ da $δ$, invece col deep binding abbiamo $[w/fun_m@γ]$, che salta $δ$, e quindi prendiamo $[z/0]$ da $β$.

Quando alla riga 34 invochiamo $\text{h2(x)}$, visto che viene usata così com'è e non viene usata essendo stata passata come parametro, allora lì si comporta come con lo shallow binding e usa l'intero stack.

Non mostro la notazione lunga anche perché non l'ho fatta, ecco quella corta.$$\begin{matrix*}[l]
\text{Call stack} & \text{Env stack} \\
\begin{matrix*}[l]
42 & \cancel{\text{g(x)}} & = & fun_h@γ \\
33 & \cancel{\text{h1(m)}} & = & 3 \\
18 & \cancel{\text{f(x)}} & = & 2 \\
18 & \cancel{\text{w(x)}} & = & 2 \\
34 & \cancel{\text{h2(x)}} & = & 2 \\
25 & \cancel{\text{f(w)}} & = & 5 \\
25 & \cancel{\text{m(w)}} & = & 6 \\
35 & \cancel{\text{f(n)}} & = & 6 \\
42 & \cancel{\text{g(x)(f,z)}} & = & 3 \\
31 & \cancel{\text{o(w)}} & = & 8 \\ \\ \\
\end{matrix*}
& \begin{matrix*}[l]
α:\bot[x/3][y/9][z/1][f/fun_f][m/fun_m][h1/fun_{h1}][h2/fun_{h2}][g/fun_g] \\
β:\bot[x/12][z/5] \\
γ:\cancel{\bot[n/3][h/fun_h]} \\
δ:\cancel{\bot[w/fun_m@γ][z/2]} \\
ε:\cancel{\bot[y/2]} \\
ζ:\cancel{\bot[x/2]} \\
η:\cancel{\bot[x/11][w/2][z/4]} \\
θ:\cancel{\bot[y/5]} \\
ι:\cancel{\bot[x/6]} \\
κ:\cancel{\bot[y/6]} \\
λ:\cancel{\bot[o/fun_f@β][w/5]} \\
μ:\cancel{\bot[y/8]}
\end{matrix*}
\end{matrix*}$$
In realtà verso la fine avevo completamente dimenticato il senso del deep binding e quindi ho dimenticato di legare un ambiente al valore $fun_f$ passato, ho scritto $β$ adesso e credo sia quello giusto ma non lo so al 100%, nel caso specifico di $fun_f$ non importava per coincidenza.

Inoltre, e spero tantissimo che questa sia vera, una funzione come valore di ritorno viene comunque legata all'ambiente *dal quale* viene returnata. In questo caso $\text{g()}$, che ha pila ambiente $γ::β::α$ restituisce $fun_h@γ$. Questo è ciò che ChatGPT ha capito dall'incomprensibile libro di Pinna (paragrafo 4.6), e nel caso specifico di questo esercizio non cambia, perché $fun_h$ usa solo la cima dello stack, e $fun_f$ usa solo $x$ da sotto, che non è presente in $γ$. Se questo è vero quindi, $fun_h$ ha pila $λ::γ::β::α$, altrimenti credo $λ::β::α$, ma fidiamoci di ChatGPT. Leggendo il libro di Dessì, anche quello non chiarissimo riguardo al deep binding, a me sembra che abbia ragione ChatGPT: lo chiama "congelare uno scope da riattivare dopo". Speriamo bene. È comodo quindi che con questa notazione l'ambiente rimanga scritto anche se poppato.

#### Scope statico per riferimento

Qui c'è un problema. La persona che ha dato la soluzione dice che la riga 25 ha `w=` e non `x=`. Con scope dinamico non cambia, ma con le variabili passate per riferimento credo cambi eccome. Per poter confrontare la soluzione con la sua, considererò il codice modificato.

Vediamo il mio albero e la mia call stack. Nell'albero ho lasciato i valori vecchi barrati (che è equivalente ad avere uno stack di valori per ogni simbolo), così si può confrontare lo storico dei valori nella vostra esecuzione.

$$\begin{matrix}
\textbf{ENV TREE}\\
\begin{matrix*}[l]
\text{Global} \quad [x=\cancel3\cancel6\cancel36][y=\cancel222][z=\cancel117] \\
\quad \vdash f \quad [y=\cancel{x@Global}\cancel{w@h2}\cancel{n@g}w@h] \\
\quad \vdash m \quad [x=\cancel{x@Global}w@h2] \\
\quad \vdash h1 \quad [w=m@Global][z/2] \\
\quad \vdash h2 \quad [x=x@Global][w=\cancel2\cancel8\cancel311][z=4] \\
\quad \vdash g \quad [n=x@α] \\
\quad | \quad \llcorner \; h \quad [o=f@Global][w=z@α] \\
\quad \llcorner \boldsymbol{\alpha} \quad [x=\cancel1\cancel5\cancel{11}22][z=\cancel06]
\end{matrix*}
\end{matrix}$$

$$\begin{matrix}
\textbf{CALL STACK}\\
\begin{matrix*}[l]
& Global \\
& α \\
42 & \cancel{g(x)} & = & fun_h \\
33 & \cancel{h1(m)} & = & 6 \\
18 & \cancel{f(x)} & = & 6 \\
18 & \cancel{w(x)} & = & 3 \\
34 & \cancel{h2(x)} & = & 11 \\
25 & \cancel{f(w)} & = & 8 \\
25 & \cancel{m(w)} & = & 3 \\
35 & \cancel{f(n)} & = & 11 \\
42 & \cancel{g(x)(f,z)=h(f,z)} & = & 0 \\
31 & \cancel{o(w)=f(z@α)} & = & 6 \\
\end{matrix*}
\end{matrix}$$

Appunto alla fine $x@α$ vale $22$. Vediamo adesso quelli che sono praticamente dei log che ho fatto durante l'esecuzione.

*  Allora, in questo momento ho lo stack $f::h1::g::{}::Global$. Sto eseguendo $f$, che ha $[y/x@Global]$. `y=y+x`. $x$ prende quella del $Global$, che prima dell'esecuzione è $3$ e dopo quindi diventa $6$.
* Poi con `w(x)` vale $3$.
* Poi con `n=h1(m)-z`, $x@α$ diventa $5$.
* Sto eseguendo $f(w)$ chiamata da $h2$. $w@h2$ ottiene il valore $8$.
* Dopo $m(w)$, $w@h2$ vale $3$, ed $m(w)$ returna $3$.
* $z@Global$ diventa $18$.
* $x@α$ diventa $11$, che sarebbe $5+6$ che sarebbe $x@α+x@Global$.
* $o(w)$ mette $z@α$ a $6$ e returna $6$.

