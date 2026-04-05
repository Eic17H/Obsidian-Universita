---
cssclasses:
  - pr1
---
Un programma complesso può andare bene per un insieme di dati piccolo, ma per quelli grandi essere troppo lento.

Il caso medio si denota con $O(n)$, il caso ottimo con $Ω(n)$ e il caso pessimo con $Θ(n)$, dove $n$ è la dimensione dei dati.
A noi interessa $O(n)$.

$O(f(n))$ è la classe di complessità.
Leggendo la definizione formale avete il diritto di non capirci niente.
Aiuto ci sono i logaritmi perché? Aaa.

Esempio: $n^2+2n+4 ∋ O(n^2) ∴ Ǝ n, c |$ boh vedi slide.
$n^2$ asintoticamente esprime $n^2+2n+4$.
$lim_{n→∞} n^2+2n+4 = lim_{n→∞} n^2 = ∞^2$.

| Le classi di complessità più comuni sono: | <                             | <                                                                                                                                                                                                                       |
| ----------------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <br><br><br><br><br><br>😇                | $O(1)$                        | Ci mette sempre la stessa quantità di tempo. Scordatelo.                                                                                                                                                                |
| ^                                         | $O(log(n))$                   | Tempo ∝ log(n). Tipicamente log₂.<br>log8=3, log1024=10.<br>La differenza tra 8 e 1024 è molta, quella tra 3 e 10 no.<br>Molto efficiente.<br>Caratteristico della ricerca in set ordinati. Pagine gialle dato il nome. |
| ^                                         | $O(n)$                        | Lineare. Caratteristico della ricerca in set disordinati. Pagine gialle dato il numero di telefono.                                                                                                                     |
| ^                                         | $O(n log(n))$                 | Linearitmico, poco più che lineare.<br>Ancora molto accettabile. Caratteristico dell’ordinamento.                                                                                                                       |
| <br><br><br>😈                            | $O(n²)$<br>$O(n³)$<br>$O(2ⁿ)$ | Quadratica, cubica, esponenziale, fattoriale.<br>Questi sono pessimi.                                                                                                                                                   |
| ^                                         | $O(n!)$                       | Esplorazione combinatorica di uno spazio di soluzioni.<br>Hai n oggetti, di cui vuoi trovare la combinazione ideale guardandole una per volta. Processo estremamente lungo.                                             |

Vedi la tabella nelle slide.
L’universo ha 10¹⁴ anni. Il “>>” nella slide significa “più di 10²⁵ anni”. Il punto separa le migliaia.
Google deve cercare tra milioni di risultati. La complessità dell’algoritmo di ricerca è molto importante.
La radice è poco più del logaritmo.
Nel grafico, $n!$ è praticamente verticale.

$Ω(n)$: Meglio di così non si può fare, lower bound.
Se $Ω(n)=nlogn$ e tu mi dici che il tuo $O(n)$ è $\sqrt{n}$ mi stai dicendo una bugia.
$Θ(n)$: Peggio di così non si può fare, se ci riesci sei un <span class="pink">caprone puzzolente</span>.

La O(n) andrebbe calcolata sull’algoritmo, noi lo facciamo sulla sua traduzione in linguaggio di programmazione, è equivalente.
Complessità di alcune operazioni.

L’assegnazione è $O(1)$. Che stia assegnando $5$ o $1000000$ ci vuole la stessa quantità di tempo. Anche le operazioni aritmetiche sono a tempo fisso: ci sono circuiti dedicati.
Lo stesso vale per i confronti: `< > = <= >=`.

Quando nei rami di un blocco di scelta ci sono complessità diverse, considero la peggiore.
Mi prendo il sicuro.
Per il for, la condizione, l’incremento e le istruzioni si ripetono, quindi si moltiplicano (credo).
Insomma, vedi le slide, c’è tutto.

Per combinare insieme le complessità dei singoli pezzi del programma, funziona un po’ come i limiti.
Nelle addizioni, rimuovi la componente più piccola. Nelle moltiplicazioni, si tengono entrambe, ma $O(1)$ è l’elemento neutro.
Si scrive $g(n)∈O(n)$, non $g(n)=O(n)$.
Se non conosco una funzione la lascio esplicita, tipo $O(n⋅g(n))$.