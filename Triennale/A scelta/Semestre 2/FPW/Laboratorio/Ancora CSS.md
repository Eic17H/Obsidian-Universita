---
cssclasses:
  - fpw
---
## 2 Aprile

Nella scorsa lezione abbiamo visto CSS #mancavo.
Continuiamo a vedere come usare il CSS per dare uno stile alle pagine HTML usando il box model
Nella scorsa lezione è stato introdotto il footer
Il solito, npm vue eccetera

Non credo di riuscire a lavorare sul progetto adesso perché mi manca il progetto della scorsa volta

Facciamo uno stile per un solo elemento usandone l'indice:
```
#titoloIndice {
    background: var(--primary);
    font-weight: bold;
    color: var(--white);
    font-size: 20px;
    border-radius: 10px;
}
```
`background` e `background-color` sono equivalenti.

Il box model si divide in:
* Content - il contenuto vero e proprio, occupa un determinato spazio
* Padding - ci permette di creare uno spazio nel contenuto prima del bordo
* Bordo - letteralmente un bordo
* Margine - uno spazio esterno al bordo

Aggiungiamo un padding a quella regola di stile.

```
padding: 15px 0px 15px 45px;
```
Su, destra, giù, sinistra. L'ordine è quello. Volendo esistono anche `padding-top` e gli altri tre.

Aggiungiamo un bordo arrotondato. Usiamo `border-radius` per tutti gli angoli, oppure specifichiamo un angolo specifico.

```
border-top-left-radius: 20px;
border-top-right-radius: 20px;
```

Aggiungiamo (o togliamo) anche un po' di margine. Come per il padding, si può dare un valore generale o quattro valori specifici.

```
margin-bottom: 0px;
```

Ora passiamo alla regola dell'indice. Togliamo il margine di sopra per attaccarlo a titoloIndic, e togliamo il padding. Per coerenza, mettiamo gli angoli arrotondati in basso.

```
#indice {
    list-style: none;
    background-color: var(--secondary);
    margin-top: 0px;
    padding: 0px 0px 20px 30px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
```

Rivediamo che si possono specificare regole per i tag figli di certi ID. Un `<li>` dentro `#indice` per esempio:
```
li #indice{
    ...
}
```
O ancora `#indice li>a`, gli `<a>` che sono discendenti di qualunque `<li>` che sia a sua volta discendente di `#indice`.

Per coerenza di stile, diciamo che definendo padding, bordo e margine partiamo dall'interno.

Cosa interessante:

```
#indice li:last-child{
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
```
Trova l'ultimo `<li>` dentro `#indice` e gli applica questa regola. Ci sarebbe anche un selettore per l'N-esimo figlio, ma non funziona su tutti i browser quindi lasciamo stare.

Diamo uno stile alla classe `newsCard`, così racchiudiamo tutto il contenuto del componente `NewsCard` dentro un div con questa classe.

```
.newsCard {
    background: var(--white);
    padding: 15px;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 40px;
}
```

Aggiungiamo delle ombre usando la proprietà `box-shadow`, che prende 3 o 4 attributi: coordinata x, coordinata y, grandezza dell'ombra, colore dell'ombra. Il colore, nero di default, si può, come al solito, definire con un nome (`red`), una variabile (`var(--white)`), un codice rgb (`#1155ff`), un codice rgba (`#1155ff99`), la funzione rgb #finisci.

La lista nel nav adesso è in verticale. È più bella in orizzontale.

```
nav li {
    list-stlyle-type: none;
    display: inline-block;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}
```

Adesso sono affiancati, ma aggiungiamo un separatore visivo.

```
border-left: 20px solid var(--primary);
```

Ma non vogliamo metterlo prima del primo elemento, quindi sovrascriviamo la proprietà sul primo.

```
nav li:first-child{
    border-left: none;
}
```

Nella navbar, usiamo la proprietà `position: sticky;`. Da sola non fa nulla, devi specificare dove si deve appiccicare, quindi aggiungiamo `top: 0px;`.

## Colonne

I siti professionali spesso sono divisi in tre colonne, per esempio contenuto al centro e pubblicità ai lati. Questo è utile anche per creare un layout responsive.

Andiamo su `base.css` e usiamo cose normalissime.

Applichiamo a tutti gli elementi questa regola: l'elemento deve occupare tutto lo spazio fino al bordo.

```
* {
    box-sizing: border-box;
}
```

Dividiamo la pagina in 12 colonne usando 12 classi. Una colonna, due colonne, tre colonne, eccetera. La somma totale delle colonne deve essere sempre 12, cioè 100%.

```
.col-1 {width: 8.33%}
.col-2 {width: 16.66%}
.col-3 {width: 25%}
.col-4 {width: 33.33%}
.col-5 {width: 41.66%}
.col-6 {width: 50%}
.col-7 {width: 58.33}
.col-8 {width: 66.66%}
.col-9 {width: 75%}
.col-10 {width: 83.33%}
.col-11 {width: 91.66%}
.col-12 {width: 100%}
```

Creiamo una macroclasse per tutte le classi che iniziano con "col-":

```
[class*="col-"]{
    float: left;
    padding: 0px 15px;
}
```

Quando metti solo due valori al padding, sono sopra-sotto e destra-sinistra.

Insomma, aggiungiamo queste classi al nostro sito. Se le mettiamo a casaccio, il sito si rompe.
Facciamo un indice di 3 colonne, il contenuto principale di 6, spazio vuoto di 3, header e footer di 12.

In realtà a questo punto il footer sta rovinando tutto perché non sa dove posizionarsi. Ricordiamo che il footer deve essere dopo l'article.

Usiamo un media selector per cambiare le regole di stile a seconda della grandezza dello schermo.

```
@media only screen and (min-width: 768px){
    [class*="col-"]{
        float: left;
        padding: 0px 15px;
    }
}
@media only screen and (max-width: 768px){
    [class*="col-"]{
        float: none;
        width: 100%;
        padding: 15px;
    }
}
```

## 9 Aprile

Continua la lezione sul css della volta scorsa. Poi database.

Per mettere la navbar che rimane sticky nonostante il flex, mettiamo header e navbar dentro un div col-12, perché devono stare in alto e non c'è bisogno che si organizzino a 12 colonne.
Quindi mettiamo header navbar div.cols(routervirew footer).
La classe cols ha la proprietà overflow: hidden.

Pagina di login

Creiamo una pagina di login, con due campi di input testo e un bottone.
```
template
div id=loginContent
div id=loginForm
h1 login
<form action="login" method="POST">
    <label for="username">Username:</label>
    input type=text username=id=name
    label for password
    input type=id=name=password
    input type=submit value=accedi
</form>
/div
/div
/template

style #loginContent
heihgt: 600px
width: auto (dipende dal contenuto)

style #loginForm
text-align: center
background: var(--primary)
color: var(--white)
position: absolute
top: 65% //si sposta 65% in basso
left: 50% //L'ORIGINE si sposta al centro della pagina, risolviamo con una transform (trasformata della traslazione)
transform: translate(-50%, -50%) //La rispostiamo al centro
padding: 20px
margin: 0px
border-radius: 10px
box-shadow: 0 3px rgba(0,0,0,0.5)

#loginForm h1
color: var(--white)
```

Andiamo a lavorare sugli input
In questo caso abbiamo tre tipi di input: button, text e ...

```
#loginForm input {
    display: block; // Uno sotto l'altro
    width: 66%;
    margin-left: 16.5%;
}
```

Come lavoriamo su input submit in particolare?

```
#loginForm input[type="submit"]{
    background: var(--white);
    color: var(--primary);
    font-weight: bold;
    cursor: pointer; // Mette il dito
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
}
```

Ultime proprietà, sempre sul pulsante
```
#loginForm input[type="submit"]:hover {
    background: var(--tertiary);
    color: var(--white);
}
```

Comunque chiama il form "modàle".

Nella Home dovremmo aver creato una tabella. Facciamo finta che l'abbia creata anch'io. È nelle slide.
Mettiamo lo stile direttamente in homeview.
```
table {
    width: 100&;
    backgroundd: transparent;
    
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
```
Teniamo separate le cose del box model per ordine ↑.

```
th {
    background: var(--primary);
    color: var(--white);
    padding: 10px;
}
```

Lavoriamo con pseudoclassi
```
th:first-child {
    border-top-left-radius: 10px;
}
th:last-child {
    border-top-right-radius: 10px;
}
```

Su table. Quando collassano, i bordi devono avere il comportamento: collassare
```
border-collapse: colapse;
```

```
td {
    padding: 10px;
    text-align: center;
}
td:first-child{
    background-color: var(--primary);
    color: var(--white);
    font-weight: bold;
}
```
Però. Ci colora anche l'ultimo attore in classifica. Perché? Perché abbiamo collassato le ultime due righe. Non ci sono workaround. Possiamo però usare le classiche proprietà CSS, usiamo una classe.
Diventa:
```
td.firstChild{
    background-color: var(--primary);
    color: var(--white);
    font-weight: bold;
}
```

Stondiamo. `td:last-child` si applica alla casella a destra di ciascuna riga. Mi serve proprio l'ultima. `tr:last-child` non va bene, perché il border radius non si applica a tr. Classe.
```
td.rightCorner{
    border-bottom-right-radius: 10px;
}
td.leftCorner{
    border-bottom-left-radius: 10px;
}
```

Ci manca una sola cosa: colori alternati nelle righe. Usiamo un'altra pseudoclasse. Sì, quella che ci avevano detto di non usare perché non è supportata da tutti i browser.

```
tr:nth-child(even){
    background: var(--primary);
}
tr:nth-child(odd){
    background: var(--white);
}
```

finita la lezione slide 4.

ci sono degli esercizi