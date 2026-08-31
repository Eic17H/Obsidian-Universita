---
cssclasses:
  - dem
---
## Obiettivo

L'obiettivo è di massimizzare l'assunzione giornaliera di fibre seguendo una dieta ipocalorica che limita la quantità giornaliera di calorie, grassi, carboidrati e proteine, con l'aggiunta di un limite sugli zuccheri che non è specifico alla dieta ipocalorica ma è la quantità generalmente consigliata per gli adulti.

Sono stati usati i dati di tredici alimenti, reperiti dalle confezioni o dal CREA.

![[Pasted image 20260829183330.png]]

I limiti massimi presi in considerazione per i macronutrienti sono:
* $1700\ kcal$;
* $60g$ di grassi;
* $150g$ di carboidrati;
* $30g$ di zuccheri;
* $140g$ di proteine.
I limiti minimi sono il $95\%$ dei massimi, esclusi gli zuccheri che hanno un minimo di $0g$.

Un ulteriore vincolo è che tutte le quantità devono essere positive, e sono state imposte quantità massime su ciascun alimento:
* $30g$ di edamame tostati;
* $50g$ di gelato ad alto contenuto di fibre;
* $100g$ di cereali;
* $210g$ di fagioli, equivalenti a mezza lattina;
* $50g$ di banana;
* $50g$ di mela;
* $200g$ di cipolla;
* $500g$ di pollo;
* $110g$ di uova, equivalenti a circa due uova;
* $500g$ di latte totale.

Inoltre, la quantità di cereali è stata imposta a un massimo del $40\%$ della quantità di latte.

## Rappresentazione matematica dei vincoli

Il limite minimo imposto sui valori nutrizionali corrisponde a:$$\sum_{a=1}^{|A|}p_{m,a}\cdot q_a\geq min_m \ \forall m \in M$$
Dove $A$ è l'insieme degli alimenti, $M$ è l'insieme dei macronutrienti, $p_{m,a}$ è la percentuale, per peso, del macronutriente $m$ nell'alimento $a$, equivalente a $^1 / _{100}$ delle quantità riportate nella tabella, $q_a$ è la quantità in grammi dell'alimento $a$, e $min_m$ è la quantità minima per il macronutriente $m$.

Allo stesso modo il limite massimo:$$\sum_{a=1}^{|A|}p_{m,a}\cdot q_a\leq max_m \ \forall m \in M$$
Dove $max_m$ è la quantità massima del macronutriente $m$.

Le quantità sono tutte non-negative:$$q_a\geq0\ \forall\  a \in A$$
Inoltre, latte totale:$$q_{10}+q_{14}\leq500g$$E latte e cereali:$$\dfrac{q_4}{0.4}\leq q_{10}+q_{14}$$
## Funzione obiettivo

La somma del prodotto tra la quantità di fibre per $100g$ per ogni alimento e la quantità di ogni alimento.$$\sum_{a=1}^{|A|}p_{\text{fibre},a}\cdot q_a$$
## Risultati

![[Pasted image 20260829183856.png|253]]
Dai risultati vediamo che gli alimenti con maggiore quantità di fibre rispetto agli altri macronutrienti, vale a dire gli edamame, il gelato e i fagioli, sono stati impostati ai valori massimi consentiti.

![[Pasted image 20260829184510.png]]

Per avere varietà, ho eseguito di nuovo il risolutore impostando a $0$ i valori massimi dei tre alimenti:

![[Pasted image 20260829211717.png]]
![[Pasted image 20260829211733.png]]

Poiché l'alimento con più fibre sono i cereali, composti al $21\%$ da zuccheri, il limite di $30g$ di zucchero ha limitato la quantità di fibre possibile.