"Abbiamo" visto le classi (non c'ero)

# Override

Già visto in PR2. Quando erediti da una classe, erediti i metodi. Se vuoi sostituire un metodo, fai l'override. Per chiamare il metodo originale, fai `super().METODO()`

# Metodi speciali

`__repr__` fa una stampa personalizzata dell'oggetto per il terminale, quindi è per il debug. `__str__` invece è per i valori veri e propri.

`__class__` ti dà le informazioni sulla classe, `__class__.__name__` solo il nome.

# File

Servono per elaborare dati molto grandi. Ci sono json, csv, etc...

```Python
with open(filename, 'modalita') as file_descriptor:
	operazione_sul_file(file_descriptor)
```

Grazie a `with open`, te lo apre *e chiude* in automatico senza errori causati dal fatto che lo chiudi male tu.

Le modalità sono `r`, `w`, `a`, `x` per creare, e l'aggiunta dei tipi, `t`esto e `b`inario. Di default `r` e `t`.

Come si leggono e scrivono? `fd.read()` dà il file intero, `fd.readlines()` una riga alla volta. Ma se il file è troppo grande può essere troppo. Ha detto qual è quello giusto ma ha molta fretta quindi non lo sapremo mai, queste lezioni sono talmente inutili che anche se ci vado devo comunque leggere le slide come avrei fatto restando a letto. E poi ci sono `fd.write(stringa)` e `fd.writelines(lista_stringhe)`.

Poi ha spiegato csv e json. "Spiegato".

# Args e kwargs

Vedi `#.items()`, `#.keys()`, `#.values()`

