---
cssclasses:
  - so
---
[[Anno 2/Semestre 1/SO/Lab v2/File]]
[[Input, output e pipe]]
[[Anno 2/Semestre 1/SO/Lab v2/Regex]]

(20241104 non ho preso appunti ma mi sa che abbiamo cominciato lì)

## 20241104

### Esercizio 1

Indirizzo internet come parametro
Scarica il codice sorgente della pagina
Non visualizza eventuali warning o errori
Visualizza file sorgente di qualunque lunghezza
Usare wget

```Bash
#!/bin/bash
wget -O - $1 2>/dev/null | less
```

### Esercizio 2

Acquisisci una lettera che corrisponde a un'opzione di uname
Se non corrisponde a nessuna, visualizza un avvertimento
Se corrisponde, visualizza le informazioni sul sistema e spiega cosa stai mostrando

```Bash
#!/bin/bash
output=`uname -$1 2> /dev/null`
empty=""
if [ "${output}" != "${empty}" ];
then echo ${output};
else echo Questa non e\' un\'opzione;
fi
```

Non sono riuscito, ma se usi `2> /dev/null` puoi poi vedere se è vuota.

### Esercizi 3 e 4

Rubrica.txt
```
Ricercatore Tore Riceruno ricerunotore@tiscali.it
Attore Gian Franco francogian@tiscali.it
Cassiere Hans Haindl gino@zapf.de
Cassiere Uno Due tre@nanpa.la
```

#### Esercizio 3

Dato il file rubrica.txt con la struttura ruolo nome cognome e-mail
Stampa conteggio-ruolo per ogni ruolo
Stampa tutti i non ricercatori
Metti in italia.txt tutti quelli con email .it
Si può risolvere senza iterazione

```Bash
#!/bin/bash
cut -d' ' -f1 rubrica.txt | sort | uniq -c
echo I seguenti elementi non sono ricercatori:
grep "^[^(Ricercatore)].*$" rubrica.txt
grep "^.*\.it$" rubrica.txt > italia.txt
```

uniq -c ti dice la conta di ciascuna cosa unica
Con cut prendiamo tutto ciò che c'è prima del primo spazio
#### Esercizio 4

Sostituisci Raffaella con Antonella e metti in rubrica_due.txt
Togli le prime tre righe di rubrica_due.txt e metti in rubrica_tre.txt
Emtrambi usando sed

Non l'ho fatto

## Altri esercizi

```Bash
#!/bin/bash
# prende in input due numeri, dice se la somma è più grande di 10
if test $# -eq 2; then
	if test $(($1+$2)) -gt 10; then
		echo "grande"; else
		echo "piccolo"; fi
elif test $# -eq 0; then
	echo "Inserisci due parametri"
elif test $# -eq 1; then
	echo "Inserisci un altro parametro"
else
	echo "Inserisci due parametri"
fi
```

```Bash
#!/bin/bash
# converte un file da minuscolo a maiuscolo e non vice versa
if test $# -lt 1; then
	echo "Inserisci il nome di un file"
else
	# controlla che esista il file
	if [ ! -e "$1" ]; then
		echo Inserisci il nome di un file esistente
	else
		cat ${1} | tr a-z A-Z > maiusc_${1}
fi fi
```