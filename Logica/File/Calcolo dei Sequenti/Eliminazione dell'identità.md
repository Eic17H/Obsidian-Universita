Finora abbiamo visto teoremi, che sono enunciati *in* $\mathcal{L}_0$ e ci dicono cose riguardo alla logica. L'eliminazione dell'identità però *riguarda* $\mathcal{L}_0$, e quindi è enunciato in linguaggio naturale. Lo chiameremo teorema, ma è in realtà un *metateorema*, un teorema di metalogica.

Ricordiamo che una derivazione senza assunzioni è detta dimostrazione.

(Ho perso gli appunti di questa parte e li sto rifacendo a memoria, perdono un po' di fascino)

Ecco a voi il primo metateorema logico della vostra vita, un'esperienza che non si scorda mai.

## Teorema di eliminazione dell'identità

> $α \Rightarrow α$ è sempre dimostrabile.

Dimostriamo questo teorema per induzione. Con l'induzione, servono un passo base, cioè un esempio che sappiamo essere vero, e un passo induttivo, dove espandiamo l'insieme di esempi veri.

Il nostro **passo base** è l'assioma, $\vdash_{PK} p \Rightarrow p$. Cos'è $p$? Una variabile proposizionale. Cioè? Una formula che non contiene connettivi. Possiamo dire che è una formula che contiene $0$ connettivi.

Adesso stiamo lavorando con un numero naturale in una dimostrazione per induzione, quindi possiamo usare gli altri numeri naturali. Il nostro passo induttivo quindi potrebbe coinvolgere l'aumento del numero di connettivi.

**Passo induttivo**: se sappiamo che $β \Rightarrow β$ è dimostrabile per ogni $β$ che ha al più $m$ connettivi, allora sappiamo che $α \Rightarrow α$ è dimostrabile per ogni $α$ che ha al più $n = m +1$ connettivi.

Come lo dimostriamo? Serviamoci di $α$, che ha $n$ connettivi, e $β$ e $γ$, che hanno $m$ connettivi in totale. Il connettivo aggiunto da $α$ può essere uno dei quattro, quindi ci sono quattro casi:

### Negazione: $α \equiv ¬β$

$$\dfrac{
\dfrac
{β \xRightarrow{\times} β}
{\Rightarrow ¬β, β} sd, ¬d
}{¬β \Rightarrow ¬β}¬s$$
Possiamo chiudere quella foglia perché sappiamo già che è dimostrabile.

Come lo sappiamo? Con l'induzione. In un certo senso è un'assunzione a tempo determinato della dimostrazione induttiva, e dimostrando $α \Rightarrow α$ da $β \Rightarrow β$ l'abbiamo chiusa. Questa è una mia osservazione e vale puramente a livello concettuale informale, questa dimostrazione non è in deduzione naturale e non ha assunzioni.
### Congiunzione: $α \equiv β \land γ$

$$\dfrac
{
\dfrac
{
\dfrac
{β \xRightarrow{\times} β}
{β, γ \Rightarrow β}ss,is
\qquad
\dfrac
{γ\xRightarrow{\times} γ}
{β, γ \Rightarrow γ}is
}
{β, γ \Rightarrow β \land γ}Λd
}
{β \land γ \Rightarrow β \land γ}Λs$$
### Disgiunzione: $α \equiv β \lor γ$

$$\dfrac
{
\dfrac
{
\dfrac
{β \xRightarrow{\times} β}
{β \Rightarrow β,γ}id
\qquad
\dfrac
{γ\xRightarrow{\times} γ}
{γ \Rightarrow β,γ}sd,id
}
{β \lor γ \Rightarrow β, γ}Vs
}
{β \lor γ \Rightarrow β \lor γ}Vd$$
Guarda com'è bella questa simmetria con la congiunzione. Altro che deduzione naturale, guarda quanta armonia ci dà il doppio significato della virgola.
### Implicazione: $α \equiv β \rightarrow γ$

$$\dfrac
{
\dfrac
{
{β \xRightarrow{\times} β}
\qquad
{γ \xRightarrow{\times} γ}
}
{β\rightarrowγ, β \Rightarrow γ}ss,\rightarrow s
}
{β\rightarrowγ \Rightarrow β\rightarrowγ}\rightarrow d$$
Come fa ad essere così semplice? L'implicazione non doveva essere complicata?