---
cssclasses:
  - so
---
Con il comando `cat` puoi vedere i contenuti di un file.
Con il comando `head` puoi vedere la prima riga dei dati in entrata.

Ci sono due modi per dare dati in entrata a un comando:
* La tastiera
* Il carattere `<`

L'output di un comando può essere salvato in un file di testo con il carattere `>`. Con `>` si sostituiscono i contenuti preesistenti del file, con `>>` l'output si aggiunge (append) alla fine del file. Questa si chiama *redirezione dell'output*.

Il comando `ls` ha un output testuale.
```
$ ls /home/user
  Dati Documenti Scrivania
```
Questo output si può mettere in un file
* Prima, viene creato il file
* Poi, si esegue il primo comando e si scrive nel file

Quindi il comando a sinistra del `>` viene chiamato dopo la creazione del file.
```
$ ls -C /home/user > output_data
$ cat output_data
  Dati Documenti Scrivania output_data
```

Se provo a visualizzare qualcosa che non esiste, mi dà errore. Posso redirigere l'output di errore con `2>`
```
  $ ls /home/user/nonesiste 2> error_data
  $ cat error_data
    ls: '/home/user/nonesiste': No such file or directory
```

Questi tre canali si chiamano *standard input*, *standard output* e *standard error*. Abbiamo rediretto lo stanrdard output e lo standard error in un file, ma come lo ridirigiamo nello standard input di un altro comando? Con le pipe: `|`.
```
$ ls ./ | more
```
Magari invece vuoi redirigere lo standard output non nello standard input ma in un'opzione. Questo non si può fare con le pipe, e richiede la *command substitution*:
```
$ echo "/home/Gabri/Desktop/Musica/" > musica.txt
$ cd 'cat musica.txt'
```
È facile confondere le pipe e la command substitution.