---
cssclasses:
  - ip
---
[[Immagine|Teoria]]

Le funzioni del toolbox sono di tipo m-files. Possiamo vedere il codice di una funzione con `type nome_funzione`.

In MatLab, le immagini sono rappresentate come matrici (quando la prof dice "array", lo intende come termine generalizzato a più dimensioni). Molto comodo, perché concettualizziamo già le immagini come matrici, e MatLab tratta tutto come matrice, indicizzate a partire da $1$, mentre noi le indicizziamo da $0$.

Ogni elemento della matrice rappresenta un pixel. Partiamo dal caso più semplice, scala di grigio, ogni elemento della matrice è uno scalare.

Piccolo problema, di default le matrici di MatLab sono di tipo `double`, quindi per esempio un'immagine $1000 \times 1000$ occupa $8\text{ MB}$, e quindi il carico computazionale si appesantisce. Per fortuna possiamo usare la classe `uint8`, che comodamente va da $0$ a $255$. Anche se una funzione richiede `double`, si casta quindi non c'è problema.

MatLab supporta immagini di più tipo:
* Intensità (scala di grigio): ogni elemento della matrice è uno scalare, in cui $0$ corrisponde al nero, e se il tipo è `uint8` $255$ corrisponde a bianco, e se il tipo è `double` $1$ corrisponde a bianco;
* Binarie (*logical*): ogni pixel può essere **solo** nero ($0$) o bianco ($1$)
* Indicizzate (a colori, con palette): c'è una lista di colori che sono terne RGB, ciascuno dei quali ha un indice, e ogni pixel dell'immagine è un intero che corrisponde a un indice, è come i giochi dove devi colorare ciascun quadrato col colore numerato giusto, e come venivano codificati i colori dal NES e dal GameBoy;
* RGB: ogni pixel è una terna di scalari per i valori RGB, sia `uint8` che `double`, e quindi un'immagine $m \times n$ è una matrice $m \times n \times 3$.

Per leggere un'immagine dal file `immagine.jpg`, uso la funzione `imread('immagine.jpg')`. Questo vale se il file è nel path, altrimenti serve il percorso, come `imread('c:\uni\ip\immagine.jpg')`. Restituisce una matrice.

Per scrivere da una matrice `f` a un'immagine, si usa `imwrite(f, 'out.jpg')` o `imwrite(f, 'out', 'jpg')`.

Per visualizzare un'immagine si usa `imshow(f, G)`. `G` è opzionale indica il range di valori, ma lasciandolo vuoto con `[]` rimane al default che è ciò che faremo. Possiamo visualizzare informazioni sul pixel su cui abbiamo il mouse con `impixelinfo`. Con `whos f` ci dice il nome, le dimensioni, la memoria occupata e la classe.

Per esempio, con un'immagine default di MatLab:
```MatLab
f = imread('cameraman.tif');
whos f;
imshow(f);
impixelinfo;
```

Ci sono funzioni per convertire un'immagine da un formato a un altro.
* `rgb2gray()` converte da RGB a intensità;
* `mat2gray()` converte da una matrice qualunque a intensità, considerando il valore massimo presente nella matrice come bianco, e $0$ come nero;
* `im2double()` converte da `uint8` a `double`;
* `im2uint8()` converte da `double` a `uint8`.

[[Aritmetica delle immagini|Ci sono anche operazioni specifiche]].