Ci sono tre approcci per formalizzare la semantica:
## Operazionale

Si definisce una macchina astratta che implementa il comportamento di un linguaggio. La macchina è astratta perché il suo linguaggio macchina è tale linguaggio di programmazione, anziché un set di istruzioni di un microprocessore fisicamente esistente.

Per i linguaggi semplici, uno stato della macchina è solo un termine, e il comportamento della macchina è definito da una funzione di transizione che passa da uno stato a quello successivo con un passaggio di semplificazione, o termina il programma. Il significato di un termine $t$ può essere considerato lo stato finale a cui la macchina arriva avendo $t$ come stato iniziale (small-step semantic).

Talvolta può essere utile avere più di una semantica operativa per uno stesso linguaggio: magari una più astratta, con stati che somigliano a termini scritti dal programmatore, e una più vicina al funzionamento di un interprete. Si dimostra la correttezza dell'implementazione dimostrando che tutte le semantiche hanno lo stesso comportamento.

Useremo questa semantica.
## Denotazionale

Una visione più astratta: i termini sono considerati oggetti matematici, come numeri e funzioni, e si trova una "funzione di interpretazione" che mappa dai termini agli elementi (oggetti semantici) di certi insiemi, detti *domini semantici*.

Dare una semantica denotazionale significa trovare una raccolta di questi domini. Questo ha dato vita all'area di ricerca detta *teoria dei domini*.

I vantaggi sono che astrae dai dettagli della valutazione e tira fuori i concetti essenziali del linguaggio. Inoltre le proprietà della raccolta di domini possono essere usate per derivare leggi potenti sul comportamento dei programmi, come sapere che due programmi sono equivalenti, o sapere cosa è impossibile in un linguaggio (possiamo voler rendere impossibili certe cose indesiderabili).

## Assiomatica

Anziché definire i comportamenti dei programmi e derivarne leggi, usano le leggi come definizione del linguaggio. Il significato di un termine è ciò che può esserne dimostrato.

"La bellezza dei metodi assiomatici è che focalizzano l’attenzione sul processo di ragionamento sui programmi. È questa linea di pensiero che ha dato all’informatica idee così potenti come le invariants." Sorrido e annuisco.

## Cenni storici

Negli anni '60 e '70, la semantica operativa era considerata inferiore: *quick and dirty* ma matematicamente debole. Negli anni '80 gli altri metodi mostrarono i propri limiti, e figure come Plotkin, Kahn e Milner introdussero formalismi più eleganti e metodi per usare le potenti tecniche matematiche della semantica denotazionale in quella operazionale.