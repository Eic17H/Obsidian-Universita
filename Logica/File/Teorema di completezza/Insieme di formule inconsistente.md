## Condizione sufficiente

> Sia $Γ\subseteq For(\mathcal L_0)$. $Γ$ si dice ==inconsistente== se per ogni formula $β$ si ha $Γ\vdash_{HK}β$.

Un insieme di formule è inconsistente se da esso posso derivare tutto.

> Un insieme di formule si dice ==consistente== quando *non è* inconsistente, cioè esiste una formula che non si può derivare da esso.

Per esempio, $Γ=\{α,¬α\}$. Semplice esempio di insieme inconsistente: ex absurdo quodlibet.$$\begin{matrix}
1. & α & \text{assunzione} \\
2. & ¬α & \text{assunzione} \\
3. & α\rightarrow(¬α\rightarrowβ) & A10 \\
4. & ¬α\rightarrowβ&R1, 1, 3 \\
5. & β & R1,2,4
\end{matrix}$$Non è però condizione necessaria perché sia inconsistente. Potrei non avere una contraddizione esplicita nelle assunzioni, ma potrei ricavarmela tramite modus ponens.

## Condizione necessaria e sufficiente

Nelle dispense vediamo certi lemmi. Non serve ricordare l'ordine a memoria, il professore non lo sa e non è una cosa standard, deriva dalla circostanza del professore che scrive il documento. Eccone uno:

> $Γ$ è un insieme consistente ==se e solo se== **non** esiste $β\in For(\mathcal L_0)$ tale che $Γ\vdash_{HK}β$ e $Γ\vdash_{HK}¬β$.

Questa è una condizione necessaria e sufficiente.

Facciamo entrambe le direzioni per contrapposizione.

> $Γ$ è un insieme inconsistente sse esiste $β\in For(\mathcal L_0)$ tale che $Γ\vdash_{HK}β$ e $Γ\vdash_{HK}¬β$.

### Da sinistra verso destra (se)

È inconsistente, quindi deriva tutto, quindi deriva sia una formula che la sua negazione, perché deriva tutto. Fine. Non solo una contraddizione è derivabile, lo sono tutte.

### Da destra verso sinistra (solo se)

Quindi l'ipotesi è che io possa derivare $β$ e $¬β$ da $Γ$. Quindi ho queste due derivazioni. Tecnica del'innesto. Due derivazioni:$$D\left\{\begin{matrix}Γ&&Γ\\\vdots&&\vdots\\β&&¬β\end{matrix}\right\}D'$$Creo la mia nuova derivazione:$$D'''\left\{\begin{matrix}
D\left\{\begin{matrix}&Γ\\&\vdots\\i.&β\end{matrix}\right.\\
D'\left\{\begin{matrix}&\vdots\\j.&¬β\end{matrix}\right.
\end{matrix}\right.$$Quindi posso continuare:$$\begin{matrix}
j+1. & β\rightarrow(¬β\rightarrowα) & A10 \\
j+2. & ¬β\rightarrowα & R1,i,j+1 \\
j+3. & α & R1,j,j+2 \\
\end{matrix}$$E nello stesso modo posso derivare qualunque formula.

## Altre logiche

Le logiche rilevanti non hanno Duns Scoto, $A10$. E lì l'implicazione non è verofunzionale. Come si dimostra lì? Usando una semantica a mondi possibili.

C'è un insieme di mondi, con relazione di accessibilità: un mondo può vedere o non vedere un altro mondo. Pensa a un mondo come a un modo in cui il mondo potrebbe essere, una possibile storia alternativa del mondo. Da alcuni mondi posso immaginarne altri, e altri no.

Nella logica intuizionista, interpreto i mondi come stati di conoscenza di un qualche agente epistemico e realizzato; un mondo ne vede un altro quando quell'altro mondo è più raffinato, relazione binaria. Nelle logiche rilevanti è una relazione ternaria, tre mondi: combinando due mondi, ne vediamo un terzo. Questa cosa fu introdotta da Meyer, che scriveva articoli 50% teoremi e 50% battute, e scriveva in stile biblico, *thou shalt*.

(È sicuramente scritto male ma non è argomento di esame, è una curiosità)