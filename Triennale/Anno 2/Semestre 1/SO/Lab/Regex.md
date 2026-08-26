---
cssclasses:
  - so
---
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
Vedi le #slide.

Se hai un file con varie righe, i cui contenuti magari sono organizzati in colonne, puoi ordinarli con il comando `sort`. L'opzione `-k` indica la colonna
```
$ cat file.txt
  Echo 3
  Alpha 1
  India 2
$ sort file.txt -k 0
  Alpha 1
  Echo 3
  India 2
$ sort file.txt -k 1
  Alpha 1
  India 2
  Echo 3
```

Quello usato finora è stato il linguaggio Bash, che si può usare anche per creare script. È un po' vecchio ma è noto e versatile.

Con il comando `tr` si può `tr`asformare il testo. Si danno due insiemi di caratteri e il primo viene sostituito col secondo in una stringa.
```
$ echo "test" | tr a-z A-Z
  TEST
$ cat file.txt | tr a-z A-Z > altroFile.txt
```
Il file di origine e quello di destinazione devono essere diversi, perché l'ordine è:
* Viene svuotato `altroFile.txt`
* `cat` legge `file.txt`
* Viene eseguito `tr`
* `>` scrive in `altroFile.txt`

Non confondere `cut` con `cat`.
C'è anche `uniq`.