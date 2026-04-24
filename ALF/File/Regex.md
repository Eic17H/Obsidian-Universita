---
cssclasses:
  - alf
---
Lo stesso argomento: <span class="lip">[[Espressioni regolari|LiP]]</span>, <span class="so">[[SO/Lab/Regex|SO]]</span>

Abbiamo visto gli [[ALF/File/Automi|automi a stati finiti]]. Non possono fare tante cose, per esempio i palindromi. Si usano per l'analisi lessicale nei compilatori.

Se vogliamo stati infiniti, dobbiamo usare un linguaggio regolare. Il pallogramma non è uno strumento comodo. Il Regex (Regular Expression) è compatto, conviene ai compilatori. In ambiente Linux si usa con `grep` per le ricerche e `sed` per le sostituzioni.

Definiamo una sintassi e una semantica.

## Sintassi

Metavariabili, rappresentano due linguaggi generici
	$E$, $E'$
Linguaggio che non contiene nessuna parola
	$\emptyset$
Linguaggio che contiene esattamente una parola, la parola vuota
	$ε$ (può rappresentare sia il linguaggio che la parola vuota)
Unione tra due linguaggi, $E$ ed $E'$
	$E+E'$
Concatenazione tra due linguaggi
	$EE'$
Concatenazione di un linguaggio con sé stesso $N$ volte
	$E^N$
Concatenazione di un linguaggio con sé stesso $N$ volte, dove $N$ è qualunque numero da $0$ in su
	$E^*$ (stella di Kleene)

La stella di Kleene ci sblocca i linguaggi infiniti.

## Semantica

Diciamo che $\mathcal{L}(E)$ è il linguaggio del regex E.
	$\mathcal{L}(Ø) = Ø$
	$\mathcal{L}(ε) = {ε}$
	$\mathcal{L}(a) = {a}$
	$\mathcal{L}(E+E') = \mathcal{L}(E) \cup \mathcal{L}(E')$
	$ℒ(EE') = ℒ(E)ℒ(E')$, dove $LL' = \{w w'\;|\; w\in L, w'\in L'\}$
	$\mathcal{L}(E^*) = L(E)^* = \bigcup\limits_{i=0}^{\infty} L^i$

Volendo definire la potenza in modo più rigoroso per essere sicuri che abbia senso,
	$L^1 = L, L^2 = LL, L^xL^y = L^{x+y}$
	$L^1L^0 = L$
	Cosa può essere $L^0$? Se fosse $\emptyset$ avremmo che $L^1L^0 = \emptyset$ (devo prendere un elemento da ciascuno, ma il secondo non ha elementi, quindi non posso prendere niente).
	Se $L^0$ è $ε$, allora posso prendere un solo elemento, che è vuoto, quindi a ogni elemento di $L^1$ segue lo stesso elemento seguito da niente, quindi non ho cambiato niente.
	$L^0 = ε$

Osserviamo anche che
	$\emptyset$ è l'elemento assorbente della concatenazione
	$ε$ è l'elemento neutro della concatenazione

Definiamo formalmente la stella di Kleene già che ci siamo
	$\bigcup\limits_{i=0}^{\infty}L^i$
# Grep

Su Linux, usiamo egrep per usare Regex.
```bash
egrep $pattern $source
```
`egrep` può prendere in input non una banale stringa ma una stringa che descrive una Regex.
Se qualcosa matcha, ti ristampa la stringa con la parte matchata evidenziata.

L'esempio dell'altra volta:
```bash
egrep -x "(0|1)*01"
```
`-x` sta per *exact* e indica che l'intera stringa deve matchare.
Eseguire quel comando ti fa entrare in una modalità dove ti valuta tutti gli input successivi.
Senza `-x` cerca le sottostringhe. Qui segno gli input con `>` ma nel terminale la differenza è il colore.

```bash
$ egrep -x "(0|1)*01"
> 0
> 1
> 001
001
> 1100
> 0001010100111101101
0001010100111101101
> '1010101010101
> kdkdkdkd01
> 01010100101010001010101
01010100101010001010101
> 00011100010101010010101010
> 01010010101101
01010010101101
```

L'opzione `-v` matcha ciò che non matcha l'espressione regolare fornita.
```bash
egrep -v "00|11"
```
Questa qui sopra matcha ciò che non contiene le sottostringhe 00 e 11.

Caratteri speciali da ricordare:
	`^` - matcha l'inizio della riga
	`$` - matcha la fine della riga
	`.` - matcha qualunque carattere, una sola volta
	`\` - rimuove le funzioni speciali del prossimo carattere

Altri esempi:

Matcha solo se comincia con la maiuscola e poi ha solo lettere minuscole.
Unit test:
	`Abba` sì
	`ciao` no
	`Ciao123` no
	`CiaoMamma` no
La regex che ci serve è `^[A-Z][a-z]+$`

Matcha sequenze di tre o più parole di solo lettere separate da esattamente uno spazio.
Dopo l'ultima parola ci può essere uno spazio.
Unit test:
	`qui quo qua` sì
	`qui quo qua ` sì
	`qui quo` no
	`qui quo qua3` no
	`qui quo       qua` no
La regex è `^([A-Za-z]+)( [A-Za-z]+)( [A-Za-z]+)*( )?$`.
Per indicare che un `(`campo`)` va ripetuto esattamente N volte, fai `(){N}`.