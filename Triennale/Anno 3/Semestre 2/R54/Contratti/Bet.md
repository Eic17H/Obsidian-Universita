---
cssclasses:
  - r54
---
Vedo molti molti molti molti molti molti molti falsi. Capiamoci

|        | ab-gte0 | ab-lte2 | bb-gte0 | bb-lte2 | candep | cannotdep | cb-gte0 | cb-lte2 |
| ------ | ------- | ------- | ------- | ------- | ------ | --------- | ------- | ------- |
| **v1** | TP!     | **FN**  | TP!     | **FN**  | TP!    | **FN**    | TP!     | **FN**  |
| **v2** | TP!     | TN      | TN      | **FN**  | TP!    | TN        | TP!     | TN      |
| **v3** | TN      | **FN**  | TP!     | TN      | TN     | **FN**    | TP!     | **FN**  |
| **v4** | TP!     | **FN**  | TP!     | **FN**  | TN     | **FN**    | TP!     | TP!     |
| **v5** | TP!     | **FN**  | TP!     | **FN**  | TP!    | **FN**    | TN      | **FN**  |

Vediamo. Le regole **lte2** sono sbagliatissime, e anche **cannotdep**. Ci sono anche un paio di falsi negativi condivisi con SolCMC, namely **cannotdep**-v3 e **cb-lte2**-v3. v3 è quella in cui il giocatore A può depositare e avere un bilancio negativo. La seconda è un errore mio, la prima è il test che non controlla il sender.

Il problema è che le regole **lte2** sono implementate nel modo più semplice possibile:

```CVL
invariant ab_lte2()
	currentContract.balance_a<=2;
```

Io non capisco come risolvere. Forse con qualcosa che non è un'invariant ma un test più normale con require eccetera.

Ho introdotto un falso positivo creando v6 che reverta con tutto.

Quindi, concettualmente: mettere più require, controllare il sender, non usare invariant.

Vorrei fare una versione che soddisfa le proprietà, ma in modo stupido. In realtà fa tutt'altro, ma per coincidenza soddisfa anche le proprietà. E ora ci penso. Ho tre variabili con tre valori possibili, cioè ho tre trit, cioè ho 9 stati possibili lavorando solo con queste variabili, 18 stati se considero anche lo scorrere del tempo. Se e solo se `b != 0`, allora è possibile usare `deposit` che fa `b--, c++`. Non ho altre restrizioni. Non so non mi viene in mente niente. Potrei fare una cosa che calcola le cifre di $\pi$, semplicemente andando avanti di un passo ogni volta che si chiama un metodo, ho anche trovato un bell'algoritmo che lo fa usando solo gli interi oggi. Potrei far sì che oooooooooooooooooooooooooooh... Potrei far sì che con ogni metodo che chiami, vai avanti di un passo, calcolando le cifre di pi greco in base 9 e codificandole in base 3. Per le restrizioni su `deposit` posso semplicemente continuare ad andare avanti con le cifre finché non trovo una cifra che rispetta quella proprietà. Dai ci sta. Uso le tre variabili solo come display delle cifre, i calcoli li faccio su altre variabili.

---

La cosa del pi greco sarebbe molto più difficile da implementare quindi direi di no.

Ho invece aggiustato commenti e simili.

Sì rimangono da correggere quei test di Certora di Bet che non so come correggere e così forse posso fare la PR. Ah no devo chiedere a Bartoletti. C'è anche quella cosa di rel-grows-linear e rel-strictly-incr.

No basta sono qui da un'ora e non so come aggiustare quegli lte2.