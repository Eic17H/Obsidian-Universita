---
cssclasses: lip
---
## Teoria

* [[Semantica]]
* [[Aritmetica non Tipizzata]]
* [[Stili di semantica]]
* [[Macchina SECD]]
* [[Linguaggio imperativo]]

## Concetto semplificato

Una regola di inferenza ha due componenti: un antecedente e un conseguente. L'antecedente si scrive sopra, il conseguente sotto, e in mezzo si mette una linea orizzontale. Contengono metavariabili, che vengono sostituite con variabili o valori quando si *istanzia* la regola.

Istanziare una regola significa sostituire ogni occorrenza di una metavariabile con la stessa variabile o valore. È come in matematica: se $f(x)=x^2-x+2$, lì $x$ è una metavariabile, e per istanziare quella formula faccio $f(10)=10^2-10+2$. Non posso sostituire $x$ con una cosa da una parte e con un'altra cosa dall'altra.

Le regole di inferenza significano: se so che l'antecedente è vero, so che il conseguente è vero. Per esempio, se so che $x$ è divisibile per $3$, so anche che $5x$ è divisibile per $3$. Ricorda che la divisibilità si scrive con una linea verticale, $3|x$.

Puoi impilare regole di inferenza. Per esempio se ho $\dfrac{3|x}{3|5x}$, posso continuare verso il basso, prendendo $3|5x$ come nuovo antecedente: $$\dfrac{\dfrac{3|x}{3|5x}}{3|25x}$$Posso anche continuare verso l'alto: $$\dfrac{\dfrac{\dfrac{3\left|\dfrac{x}{5}\right.}{3|x}}{3|5x}}{3|25x}$$

Una regola di inferenza può avere più antecedenti. In quel caso, ognuno diventa la propria pila quando si sale (o più pile si uniscono quando si scende). Per esempio, $\dfrac{2|x\qquad 3|x}{6|x}$. Per questo motivo, queste non sono pile, ma alberi: la radice, quella sotto, è una sola. Questi alberi sono detti dimostrazioni o derivazioni (la differenza tra dimostrazioni e derivazioni non ci importa per questo esame).

Una derivazione è tale quando non puoi più salire. Quando succede? Ci sono certe regole di inferenza che non hanno un antecedente, dette assiomi. Quando hai un assioma come foglia di un ramo, quel ramo non può più crescere. Quando hai solo assiomi alle foglie, quell'albero è una dimostrazione. Puoi comunque continuare in basso per dimostrare qualcosa di diverso.

Le regole di inferenza hanno spesso dei nomi, che si scrivono di fianco.

Di nuovo un esempio con la divisibilità. Diciamo che l'assioma e le regole di inferenza sono: $$\dfrac{}{3|0}\text{Zero} \qquad \dfrac{3|x}{3|kx}\text{Mult}_k \qquad \dfrac{3|x}{3|(x+3k)}\text{Sum}_k \qquad \forall k \in \mathbb{Z}$$Per semplicità, non aggiungo il $2$ e il $6$. Deriviamo $756|3$: $$\dfrac{\dfrac{\dfrac{\dfrac{\dfrac{}{3|0}\text{Zero}}{3|18}\text{Sum}_6}{3|180}\text{Mult}_{10}}{3|189}\text{Sum}_{3}}{3|756}\text{Mult}_4$$
Noi vedremo le regole di inferenza nel contesto della valutazione di un termine. Scriveremo per esempio $let\ x=3\ in\ x+2\rightarrow$ alla radice, costruiremo l'albero verso l'alto fino alla foglia, avendo sempre termini che finiscono con $\rightarrow$. Arrivati alla foglia, riusciremo a mettere qualcosa a destra della sua freccia, e così ripercorreremo l'albero verso il basso per mettere valori a destra della freccia dappertutto fino alla radice.

In realtà, ai nodi avremo una coppie scritte come $⟨\text{formula},\text{contesto}⟩$, dove il contesto è l'associazione tra variabili e valori. Il punto di partenza è il contesto vuoto, scritto come $\bot$. Vediamo un esempio poco rigoroso: $$\dfrac{\dfrac{}{⟨,(x,3)⟩}\text{NoOp}\qquad⟨x+2,δ⟩→}{⟨let\ x=3\ in\ x+2,\bot⟩\rightarrow}\text{LetIn}$$Fermiamoci un attimo. $δ$ è il simbolo di un contesto generico, in questo caso ancora non lo sappiamo. Quello che abbiamo fatto è stato ramificare (cioè avere due antecedenti), ottenendo dei termini diversi sopra. Non abbiamo visto formalmente queste regole di inferenza, ma lo diciamo informalmente: secondo la regola ipotetica $\text{LetIn}$, il contesto dell'antecedente a sinistra deve essere copiato in quello a destra. E quindi lo facciamo. L'assioma $\text{NoOp}$ riguarda il fatto che non c'è nessuna formula. $$\dfrac{\dfrac{}{⟨,(x,3)⟩}\text{NoOp}\qquad\dfrac{\dfrac{}{⟨3+2,(x,3)⟩→5}\text{Sum}}{⟨x+2,(x,3)⟩→}\text{Variable}}{⟨let\ x=3\ in\ x+2,\bot⟩\rightarrow}\text{LetIn}$$Vediamo un assioma che riguarda un'operatore: in questo modo otteniamo finalmente un valore. Adesso possiamo propagare il valore in basso.$$\dfrac{\dfrac{}{⟨,(x,3)⟩}\text{NoOp}\qquad\dfrac{\dfrac{}{⟨3+2,(x,3)⟩→5}\text{Sum}}{⟨x+2,(x,3)⟩→5}\text{Variable}}{⟨let\ x=3\ in\ x+2,\bot⟩\rightarrow5}\text{LetIn}$$E funziona.

Come faccio a sapere che devo copiare una cosa da un'altra parte e quale valore va propagato? Te lo dicono le regole di inferenza: se due "slot" usano la stessa metavariabile, devono essere sempre uguali. Quindi per esempio il contesto del sottoalbero sinistro che va in quello destro.
## Esempi

#modulo