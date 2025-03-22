I modi più vecchi per suddividere una pagina HTML sono i `<div>` e gli `<span>`. I primi sono necessariamente uno sopra l'altro, i secondi possono essere affiancati.

| `<div>Ciao</div><div>Salve</div><div>Come va</div>`            | `<span>Ciao</span><span>Salve</span><span>Come va</span>`            |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| <html><div>Ciao</div><div>Salve</div><div>Come va</div></html> | <html><span>Ciao</span><span>Salve</span><span>Come va</span></html> |
Nell'HTML moderno possiamo anche dividere le pagine in modo *semantico*: per esempio un `<div>` utilizzato per una navbar può essere implementato con un tag `<nav>`. Funzionano allo stesso modo, ma rendono più facile organizzare il CSS e capire cosa fa ciascun elemento.