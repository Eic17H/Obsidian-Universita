---
cssclasses:
  - so
---
Lo stesso argomento: <span class="alf">[[ALF/File/Regex|ALF]]</span>, <span class="lip">[[Espressioni regolari|LiP]]</span>

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
```bash
$ echo "la battaglia di magenta" | grep a
```
