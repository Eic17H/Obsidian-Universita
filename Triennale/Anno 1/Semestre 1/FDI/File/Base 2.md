---
cssclasses:
  - fdi
---
Ci sono solo due cifre, quindi cominciamo definendo le operazioni a singola cifra.

### Addizione:
$0+0=0; 0+1=1; 1+0=0; 1+1=1$, riporto di 1
Notiamo che ci sono casi in cui un'operazione tra due numeri a una cifra ha un risultato che non può essere rappresentato con una cifra.
Esempio: $11001011+1101110=100111001$

Quando lavoriamo con una quantità limitata di cifre, può portare a [[overflow|overflow]].

### Sottrazione:
$1-1=0=0-0; 1-0=1; 0-1=1$, prestito di 1
Esempio: $100111001-11001011=1101110$

### Moltiplicazione
$0*0=0=1*0=0*1; 1*1=1$
E si eseguono le somme come in base 10.
Esempio: $10110\cdot101=10110+000000+1011000=1101110$
Notiamo che, poiché le cifre sono solo 1 e 0, gli addendi possono essere solo 0 o il primo fattore trasposto.
Questo è lo stesso concetto della moltiplicazione per le potenze di B in base B:
	$(b_{n-1}·B^{n-1}+b_{n-2}·B^{n-2}+b_{n-3}·B^{n-3}+…+b_1·B+b_0)*B^k=$
	$b_{n-1}·B^{n-1+k}+b_{n-2}·B^{n-2+k}+…+b_1·B^{k+1}+b_0·B^k+0·(B^{k-1}+B^{k-2}+…+B^1+B^0)$
Che graficamente equivale alle cifre originali ($b_n…$) seguito da k zeri ($0·B^k-…$)

### Divisione:
Come in base 10, mi chiedo se il divisore è contenuto nel dividendo.
In base 10, può essere contenuto sì, no o un po'.
In base 2 è contenuto o no, non ci sono altre opzioni.
$1001:11;\ 100:11=1R11;\ 11:11=1R0;\ 1001:11= 11$.

### Altro

Come rappresento i [[Complemento|numeri negativi]]? Come interagiscono con l'[[Overflow|overflow]]? E come rappresento i [[Virgola mobile|numeri razionali]]?

Certamente il metodo più intuitivo è di fare quello che facciamo con la base 10, e scrivere per esempio $-0.1_2=-0.5_{10}$, ma non è la strategia migliore per i computer.