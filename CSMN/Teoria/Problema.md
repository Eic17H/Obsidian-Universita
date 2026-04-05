---
cssclasses:
  - csmn
---
## Problema ben posto
Un problema si definisce Problema Ben Posto (secondo Hadamard) se, in un prefissato campo di definizione:
1.  Ammette una e una sola soluzione.
2.  Questa soluzione dipende in modo continuo dai dati.

Nella pratica computazionale, i dati iniziali non sono quasi mai esatti perché **esistono sempre errori sperimentali** o di misurazione. Dobbiamo quindi capire come questi errori si ripercuotono sul risultato finale.

## Condizionamento e propagazione dell'errore
Un problema è **ben condizionato** se le perturbazioni sui dati in input non influenzano eccessivamente i risultati in output. In genere, sappiamo a priori se un problema è ben o mal condizionato. 

Per quantificare questa sensibilità utilizziamo il Numero di Condizionamento, che definisce l'entità dell'influenza dell'errore. Ne esistono due varianti:
* **Numero di condizionamento assoluto ($K$)**:
    $$|\delta x| \le K |\delta d|$$
* **Numero di condizionamento relativo ($k$)**:
    $$\frac{|\delta x|}{|x|} \le k \frac{|\delta d|}{|d|}$$
    *Nota:* La forma relativa è spesso più utile perché è **proporzionata all'ordine di grandezza**. Il rapporto $\frac{|\delta x|}{|x|}$ indica quale porzione del totale $|x|$ è rappresentata dall'errore. Moltiplicando questo valore per 100 otteniamo l'errore in percentuale, definendone la reale gravità.

#### Esempio analitico 1: Il Prodotto (Problema Ben Condizionato)
Vogliamo calcolare il prodotto fra due numeri reali: $x = a \cdot b$.
Consideriamo i dati affetti da un errore di misurazione ($\delta a$ e $\delta b$), tali per cui le grandezze reali (macchina) siano:
$\bar{a} = a + \delta a$ e $\bar{b} = b + \delta b$

Il calcolo effettivo sarà:
$$\bar{x} = \bar{a} \cdot \bar{b} = (a + \delta a)(b + \delta b) = ab + a\delta b + b\delta a + \delta a\delta b$$

Poiché $\delta a$ e $\delta b$ sono errori (valori molto piccoli), il loro prodotto $\delta a\delta b$ tende a 0 ed è trascurabile. L'errore assoluto sul prodotto è quindi la differenza tra il risultato perturbato e quello esatto ($ab$):
$$\delta x \approx a\delta b + b\delta a$$

Passando all'**errore relativo**, otteniamo:
$$\frac{|\delta x|}{|x|} = \frac{|a\delta b + b\delta a|}{|ab|} \le \frac{|a\delta b|}{|ab|} + \frac{|b\delta a|}{|ab|} = \frac{|\delta b|}{|b|} + \frac{|\delta a|}{|a|}$$

Sapendo che gli errori relativi sui singoli dati sono limitati dalla *precisione di macchina* ($\tau$), avremo che $\frac{|\delta a|}{|a|} \le \tau$ e $\frac{|\delta b|}{|b|} \le \tau$. 
Quindi:
$$\frac{|\delta x|}{|x|} \le \tau + \tau = 2\tau$$
Richiamando la definizione iniziale, otteniamo un numero di condizionamento relativo $k \approx 2$. Essendo un valore molto basso, deduciamo che **la moltiplicazione è un problema ben condizionato**.

#### Esempio 2: La Somma (Potenziale Problema Mal Condizionato)
A differenza del prodotto, la somma algebrica di reali può essere **mal condizionata**. Se sommiamo due numeri approssimati che sono molto vicini tra loro ma di segno opposto (o se li sottraiamo), le cifre significative si elidono e l'errore preesistente viene enormemente amplificato rispetto al risultato (fenomeno noto come *cancellazione numerica*).
* *Fonti di errore a priori:* Approssimazioni di numeri periodici o conversioni di base (es. da decimale a binario, che non garantiscono la finitezza del numero) introducono piccoli errori che, in caso di cancellazione, diventano disastrosi.

## Valutazione di un algoritmo
Le prestazioni di un algoritmo (sequenza finita e univoca di operazioni) si valutano su tre parametri critici:

1. **Stabilità**: Capacità dell'algoritmo di non amplificare gli errori di arrotondamento introdotti durante i vari passaggi computazionali.
2. **[[Complessità]] in termini di tempo**: Il numero di operazioni richieste. È fondamentale avere una complessità polinomiale e non esponenziale.
    * *L'esempio del foglio di carta:* Piegare un foglio di spessore **$10^{-4}$ m** per 50 volte segue la legge di crescita esponenziale $10^{-4} \cdot 2^n$. Con $n=10$ abbiamo **$10^{-1}$ m**, ma arrivati a $n=50$ raggiungiamo dimensioni astronomiche oltre il concepibile fisico, dimostrando l'insostenibilità pratica degli algoritmi esponenziali.
3. **Occupazione della memoria**: Efficienza delle strutture dati utilizzate (fondamentale per matrici molto grandi).

### Problema risolubile
Unendo i concetti visti, un problema si definisce computazionalmente e concretamente **risolubile** solo quando:
1.  È **ben posto** (Hadamard).
2.  È **ben condizionato** (l'errore sui dati non esplode).
3.  È risolto mediante un **algoritmo stabile** e con **complessità polinomiale**.