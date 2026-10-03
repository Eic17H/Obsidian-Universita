---
cssclasses:
  - ds
---
## Programmazione lineare

La maggior parte dei modelli di ottimizzazione saranno di <span class="dem">[[Triennale/Anno 2/Semestre 1/DeM/Tesine/Ottimizzazione/Ottimizzazione|ottimizzazione lineare]]</span>, perché molti problemi decisionali sono descrivibili come tali, e sono compresi molto bene e facili da implementare. Tanto che anche se il problema non è modellabile come lineare, lo si può trattare fino a un certo punto come se lo fosse e si ottengono comunque risultati decenti. La programmazione lineare (**==PL==**) consente di trattare problemi molto più grandi della programmazione non lineare.

Se un problema di ==PL== ammette una soluzione ottima, il valore è unico, ma si può ottenere con più vettori diversi. Per esempio se hai due macchine identiche, se scambi i percorsi che fanno non ti cambia nulla.

Se ci limitiamo ai valori interi, abbiamo ==PLI==, programmazione lineare intera.

Un esempio di problema affrontabile con la ==PL== è:
* Dobbiamo capire la quantità da acquistare per ciascun prodotto di una lista;
* Ogni prodotto ha un limite massimo di quantità;
* Ogni prodotto ha certe proprietà;
* Ogni proprietà ha una somma minima;
* Dobbiamo minimizzare la spesa totale.

E si rappresenta come:
* Sia $J$ l'insieme dei prodotti tra cui scegliere;
* Sia $I$ l'insieme delle proprietà;
* Sia $x_j$ la quantità non-negativa da acquistare del prodotto $j \in J$ (==variabili decisionali==);
* Sia $c_j$ il costo di un'unità del prodotto $j \in J$;
* Sia $u_j$ la quantità massima del prodotto $j \in J$;
* Sia $b_i$ la quantità minima della proprietà $i \in I$;
* Sia $a_{ij}$ la quantità di proprietà $i \in I$ presente in un'unità del prodotto $j \in J$.

Il modello di PL di questo problema decisionale si può scrivere così:

Le mie decisioni riguardano quello che è direttamente sotto il mio controllo, le quantità $x_j$ (che lui legge "*ics con gei*"), le quantità dei prodotti che compro. Ognuna ha un costo, letteralmente un prezzo, e una quantità massima. Le proprietà non le posso controllare direttamente, seguono da $x_j$, e ho dei minimi e/o dei massimi per ciascuna, e in particolare, se ogni prodotto ha un vettore dei macronutrienti, il vettore dei macronutrienti totali è la somma del prodotto tra ogni vettore e il suo coefficiente quantità, quindi questo è un problema lineare.

Quindi rappresento il problema così:
* $\min \sum\limits_{j \in J} c_jx_j$ è la *funzione obiettivo*;
* $\sum\limits_{j \in J} a_{ij} x_j \geq b_i,\ \forall i \in I$ sono i *vincoli tecnologici*, cioè limiti massimi o minimi legati ai requsiti;
* $0 \leq x_j \leq u_j,\ \forall j \in J$ sono altri vincoli sul dominio variabili decisionali, chiaramente quel vincolo c'è perché i valori di $x$ non possono essere negativi, non posso comprare $-16$ carote.

Ricordando come funzionano le <span class="csmn">[[Triennale/Anno 2/Semestre 2/CSMN/Teoria/Matrici|matrici]]</span> e i vettori, possiamo anche scriverli come:
* $\min c' x$;
* $Ax \geq b$;
* $0 \leq x \leq u$.

Visto che quelle formule sopra corrispondono alla definizione di prodotto vettoriale e matriciale.

#slide #fix

## Problemi non lineari

Ignoriamo a quali problemi corrispondono questi modelli. Vediamo una differenza matematica tra questi due problemi: uno è lineare e l'altro no.

## Vincoli

Se non rispetto i vincoli, la soluzione è inammissibile. Se li rispetto, cioè le disequazioni sono vere, allora la soluzione è ammissibile. Non è detto che sia ottima.

Nel primo, notiamo che i costi possono anche essere negativi, e in quel caso il coefficiente tende ad essere alto. Non è per forza minimizzazione dei mali, può essere massimizzazione dei benefici.

In un problema lineare, posso solo prendere una variabile e moltiplicarla per uno scalare. Non posso elevarla a potenza, non posso moltiplicarla per un'altra variabile.

Quel "s.t." sarebbe "subject to", "soggetto a", ma si usa allo stesso modo di "tale che", "such that".

Esercizio: formalizzare quel problema delle slide come problema di programmazione lineare.

* Sia $x$ il vettore delle quantità degli alimenti, tutte positive
* Sia $p$ il vettore dei prezzi degli alimenti
* Sia $m$ il vettore dei requisiti minimi di valori nutrizionali
* $|x| = |p| = |m|$
* Sia $V$ la matrice $|p| \times |x|$ dei valori nutrizionali degli alimenti
* Requisito minimo dei valori nutrizionali: $Vx \geq m$
* Ottimizzazione del prezzo: $\min px'$

Con la sintassi con cui l'ha scritta nelle slide, ci sono degli applicativi che lo risolvono come codice.

Certamente possiamo farlo a mano andando per tentativi, con tante variabili viene male, e a prescindere quasi di sicuro non troviamo l'ottimo.

Appunto personale, questo $px'$ è equivalente a una funzione $R^{|x|}\to R$. Possiamo trovare un minimo con l'analisi. Non so fare la derivata ma magari si riesce. Cioè uso la definizione con $h$ molto piccolo, ma mi servirebbe un versore casuale e quello funziona solo in due dimensioni.

Tornando a noi, la soluzione trovata è l'unica soluzione minima (ma magari con vettore diverso). Si dicono soluzioni simmetriche o equivalenti.

> **==Vincolo stretto==**: Un vincolo è soddisfatto in senso stretto se la disuguaglianza è soddisfatta con l'uguaglianza, cioè in parole povere il valore è proprio al limite.

> **==Variabile duale==** di un vincolo: Se aumento la vedi slide, ricorda l'<span class="csmn">[[Problema#Condizionamento e propagazione dell'errore|errore]]</span>

Un tipo specifico di PLI è quello [[PLI booleana|booleano]].

# Ottimizzazione (o programmazione matematica)

Possiamo rappresentare quello che abbiamo detto come $x \in X \subseteq \mathbb R ^n$, in cui $X$ è detto ==*spazio ammissibile*==. Un problema di ottimizzazione si può scrivere in due modi, che sono entrambi sistemi:$$\begin{matrix}
\left\{
\begin{matrix*}[l]
\min f(x) \\
x \in X
\end{matrix*}
\right.
&
\left\{
\begin{matrix*}[l]
\min f(x) \\
g_i (x) \leq 0,\ i=1\ldots l
\end{matrix*}
\right.
\end{matrix}$$

Vedremo problemi di ottimizzazione in cui i campi di $x$ sono legati in modo lineare ai dati.

I problemi si possono rappresentare in forma canonica o in forma standard, talvolta in altri modi. Tutti i problemi si possono rappresentare in forma canonica, tutti si possono rappresentare in forma standard.

#todo: ho sbagliato la notazione per la lunghezza dei vettori

Forma canonica:

> Ho un vettore colonna $x$ di variabili decisionali, e un vettore riga $c'$ di costi, tale $|x|  = |c| = n$. La mia funzione obiettivo è $\min c'x$.
> Abbiamo dei vincoli di forma $Ax \geq b$, dove $A$ è la matrice dei vincoli, e $b$ è il vettore dei vincoli tecnologici.
> Poi abbiamo i vincoli di non-negatività, $x \geq 0$.

Vediamo i vincoli tecnologici, $Ax \geq b$. $A$ è una matrice dei coefficienti, con $m$ righe ed $n$ colonne, dove $n$ è lo stesso di prima. $|b|=m$ è il numero di restrizioni o vincoli.

Detto $a'_i$ l'$i$-esimo vettore riga di $A$, un problema di PL si può scrivere come:$$\left\{
\begin{matrix*}[l]
\min \sum\limits_{j=1}^n e_j x_j \\
\sum\limits_{j=1}^n a_{ij} x_j \geq b_i,\ i=1\ldots n \Rightarrow a'_i x \geq b_i,\ i=1\ldots n \Rightarrow -a_i' x + b_i \leq 0, i=1\ldots n \\
x_j \geq 0, j = 1 \ldots n \Rightarrow -x_j \leq 0,\ j = 1 \ldots n
\end{matrix*}
\right.$$
Adesso tutti i vincoli sono di forma $g(x) \leq 0$.

Se tutti i vincoli tecnologici sono uguaglianze, un problema di PL è in forma standard. Come faccio a renderle uguaglianze? #slide vedi appunti scritti a mano, squeeze.

