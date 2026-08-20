---
cssclasses:
  - so
---
SO20241016
󱤽󱥡󱤡󱤿󱥩󱥮‍󱥳󱤧󱤬 (input, output, error)
< - 󱥄󱥌󱤉󱥁󱥩󱤪󱦜󱤪󱤧󱤬󱤡󱥄󱥶󱤉󱤄
> - etc etc etc

| - 󱥧󱥂󱥵󱥩󱥂󱥵
󱤴󱥡󱤨󱤉󱥁

󱥂󱥵grep󱤧󱥵󱥣
grep, sort, uniq - 󱥔󱥣󱥩󱤙

processi󱤊job
i processi creano altri processi
󱤴󱥌󱤉󱥂󱥵󱥩shell
    shell󱤧processo
i processi sono organizzati ad albero, la root è init o systemd
kernel󱤧󱥇󱤉init
init󱤧󱤘󱤇󱤉SO
shell󱤧󱥇󱤉processi ogni volta che 󱤴󱥌󱤉󱥂󱥵
󱤴󱤘󱥳󱤉processi󱤼󱤙pipe
    󱥁󱤧job
    job è più complesso dei processi normali
job󱤧󱤘󱤿󱥮󱥁󱦝foreground󱤊background (primo/secondo piano)
    FG󱤡terminal󱤧󱥁󱥨󱤡󱤴󱤘󱥉󱤉󱤆󱤂
    BG󱤡󱤴󱤘󱤆
un'istruzione complessa e lunga di ricerca, job va in BG conviene
    󱥂󱥵󱥂󱥵󱥂󱥵 󱤡󱤿FG
    󱥂󱥵󱥂󱥵󱥂󱥵 & 󱤡󱤿BG

󱥳󱤡
    find / -name "*.txt" > output.txt 2> error.txt &
󱥁󱤧󱤃󱤉󱤪󱥠󱥬󱤄󱤬󱤄󱤧󱥌󱤉󱥁󱥆󱥩󱤪output.txt󱤧󱥌󱤉󱥡󱥈󱥩󱤪error.txt󱤡󱤎terminal󱤧󱤘󱤆

PID = process ID - 󱥉󱤄󱤧󱤓󱤉󱤽󱥂󱥳󱤡󱤴󱤘󱥬󱥩󱥆󱤙󱤽󱥆

+ = job attuale
- = job appena dopo l'attuale
vedi slide

kill non interrompe necessariamente, può inviare vari segnali, anche sospendere

ps mostra i processi correnti
    PID: ID processo
    TTY: a quale terminale appartiene (è una struttura ad albero ricorda)
    TIME: boh
    CMD: con quale comando è stato chiamato
se vuoi vedere l'effettiva struttura ad albero, pstree
per una tabella simile al task manager, top (table of processes)

ogni terminale ha i propri processi, e gli altri non vedono i suoi processi

ci sono processi con relazione padre/figlio, che possono condividere un certo spazio per passarsi dati