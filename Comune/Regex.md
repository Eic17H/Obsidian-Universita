## Pompianu

Le espressioni regolari (regex) possono essere molto utili. Permettono di cercare del testo tramite il pattern matching, cioè trovare segmenti di testo che hanno la stessa struttura. Così come ci sono molti linguaggi di programmazione, ci sono molti linguaggi per le regex. Ecco le basi:
Quale carattere:
* `.` Un carattere qualunque
* `^` L'inizio della stringa
* `$` La fine della stringa
* `\` Annulla gli effetti speciali del carattere che segue e lo fa trattare da carattere normale
* `[...]` Un carattere qualunque tra quelli dentro le parentesi
* `[^...]` Un carattere qualunque tranne quelli dentro le parentesi
* `[A-Z]` Un carattere qualunque con codice tra quello di A e quello di Z
* `[^A-Z]` Un carattere qualunque con codice non tra quello di A e quello di Z
Quanti caratteri:
* `?` Nessuno o uno
* `+` Uno o più
* `*` Zero o più
* `{n}` Esattamente $n$
* `{n,}` Minimo $n$
* `{,m}` Massimo $m$
* `{n,m}` Minimo $n$ e massimo $m$

Per usare le regex su Linux, si usa il comando `grep` (general regular expression print). Con le pipeline puoi mettere insieme le regex e gli altri comandi.
```
$ echo "la battaglia di magenta" | grep a
```

## Bartoletti

Su Linux, usiamo egrep per usare Regex.
```
egrep $pattern $source
```
`egrep` può prendere in input non una banale stringa ma una stringa che descrive una Regex.
Se qualcosa matcha, ti ristampa la stringa con la parte matchata evidenziata.

L'esempio dell'altra volta:
```
egrep -x "(0|1)*01"
```
`-x` sta per *exact* e indica che l'intera stringa deve matchare.
Eseguire quel comando ti fa entrare in una modalità dove ti valuta tutti gli input successivi.
Senza `-x` cerca le sottostringhe. Qui segno gli input con `>` ma nel terminale la differenza è il colore.

```
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
```
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