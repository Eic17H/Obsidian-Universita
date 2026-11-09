---
cssclasses:
  - r54
---
## Perché farlo così

Dopo quasi due mesi, credo di aver capito come tradurre la combinazione contratto-proprietà in logica formale. In particolare, credo sia sensato usare il <span class="logica">[[Calcolo dei Sequenti|calcolo delle sequenze]]</span>.

Una sequenza ha tre componenti: le assunzioni, l'antecedente e il conseguente. Li facciamo corrispondere al contratto, ai requisiti e alle asserzioni. L'unico problema è che gli elementi del conseguente sono uniti in disgiunzione (basta che valga uno), mentre le asserzioni sono unite in congiunzione (devono valere tutte). Semplicemente mi toccherà scrivere le asserzioni come lunga congiunzione anziché usare la virgola, ma tendo a farlo anche nel codice.

L'altra grande differenza è che io ho studiato il calcolo delle sequenze nella <span class="logica">[[Enunciati|logica proposizionale]]</span>, mentre le proprietà seguono la <span class="alf">[[Triennale/Anno 2/Semestre 1/ALF/File/Logica dei predicati|logica dei predicati]]</span>: per ogni stato di partenza, se di esso si può dire questo, allora di esso si può dire quello, $\forall s\ R(s)\to A(s)$. Spero di potermela cavare applicando quello che so.

A che mi serve? Se voglio dimostrare la proprietà, $\forall s\ R(s)\to A(s)$, cioè $\Pi \vdash R \Rightarrow A$, non posso scrivere direttamente quello nel test? Evidentemente no, altrimenti non sarei qui. Il problema è che, soprattutto con Certora, non possiamo direttamente leggere il valore di verità di $R$ ed $A$. L'obiettivo è quindi di esprimere $R \Rightarrow A$ come un certo $\Gamma \Rightarrow D$ tale che io possa leggere sia $\Gamma$ che $D$.

In realtà non corrisponderà bene a quello che facevo a Istituzioni di Logica, perché lì dimostravo teoremi, qua invece non proprio.

## Esempio

Vediamo un test che mi ha dato difficoltà, e vediamo come avrei potuto affrontarlo col calcolo delle sequenze.

> if an address `addr` has participated in a recovery, then `addr` is a guardian.

$$\begin{matrix*}[l]
\Pi \vdash R(a) \Rightarrow G(a) \\
\begin{matrix*}[l]
\Pi = & \ldots
\end{matrix*}
\end{matrix*}$$
Qui c'è già un problema. Non so come esprimere il passaggio del tempo. In logica classica, $a \land b \to \lnot a$ sarebbe semplicemente falso, invece per noi $b$ può essere un metodo che cambia il valore di $a$. Non credo di poterci fare niente in modo formale.

Fatto sta che non potevo leggere direttamente il valore di $G$. Quello che ho sfruttato è stato:

$$\begin{matrix*}[l]
\Pi =
& IR(a) \to G(a) \land \lnot R(a) \land \ldots, \\
& SR(a) \to G(a) \land \lnot R(a) \land \ldots, \\
& CR(a) \to G(a) \land \lnot R(a) \land \ldots, \\
& ER(a) \to G(a) \land R(a) \land \ldots, \\
\end{matrix*}$$

No niente, è orrendo. Niente. Non lo so come scriverlo.

#hidden