# Proprietà

## Commutatività

$α \land β \vdash_{ND} β \land α$. Vogliamo smontare la congiunzione e rimontarla al rovescio.$$\dfrac{\dfrac{α \land β}{β}Λ\text{-}E(b) \enspace \enspace \enspace \dfrac{α \land β}{α}Λ\text{-}E(a)}{β \land α} Λ\text{-}I$$
## Associatività

$α \land (β \land γ) \vdash_{ND} (α \land β) \land γ$

$$\dfrac{\dfrac{\dfrac{α \land (β\landγ)}{α}Λ\text{-}E(a) \enspace \enspace \enspace \dfrac{\dfrac{α \land (β\landγ)}{β\landγ}Λ\text{-}E(b)}{β}Λ\text{-}E(a)}{α \land β}Λ\text{-}I \enspace \enspace \enspace \dfrac{\dfrac{α \land (β\landγ)}{β\landγ}Λ\text{-}E(b)}{γ}Λ\text{-}E(b)}{(α \land β) \land γ}Λ\text{-}I$$

## Legge di importazione

$\vdash_{ND} (α\rightarrow(β\rightarrowγ))\rightarrow(α\landβ\rightarrowγ)$

Siamo messi un po' peggio, perché ci sono implicazioni inscatolate nell'antecedente.

Assunzioni
* $α\rightarrow(β\rightarrowγ)$
* $α\landβ$
Come facciamo il modus ponens? Eliminazione della conseguenza.

$$\dfrac{\dfrac{α\landβ}{α}ΛE(a) \enspace\enspace\enspace α\rightarrow(β\rightarrowγ)}{β\rightarrowγ}\rightarrow E$$Siamo in logica classica, molto semplicemente riuso la stessa assunzione più volte$$\dfrac{\dfrac{\dfrac{\dfrac{[α\landβ]_1}{β}ΛE(b) \enspace\enspace\enspace \dfrac{\dfrac{[α\landβ]_1}{α}ΛE(a) \enspace\enspace\enspace [α\rightarrow(β\rightarrowγ)]_2}{β\rightarrowγ}\rightarrow E}{γ}\rightarrow E}{α\landβ\rightarrowγ}\rightarrow I,1}{α\rightarrow(β\rightarrowγ))\rightarrow((α\landβ\rightarrowγ)}\rightarrow I,2$$

Sappiamo adesso notare che questa derivazione non è valida nella logica lineare.

Notiamo anche che abbiamo due significati della congiunzione: con 1€50 compriamo un caffé e un giornale. Ma nel senso, possiamo comprarne uno dei due alla volta. Nell'altro senso no, non possiamo comprarli insieme. E in alcune logiche restano distinti, quindi come abbiamo visto il vel verofunzionale e non verofunzionale, vediamo questi due et.

L'Unica sta in due progetti internazionali sulle logiche sottostrutturali, uno qui e uno al DMI, anche se collaborano molto.