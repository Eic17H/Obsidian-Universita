---
cssclasses:
  - lip
---
## La materia

Questa materia riguarda le scelte di design dietro i linguaggi di programmazione, le fondamenta matematiche dei linguaggi formali, e come viene definito il comportamento dei linguaggi funzionali e imperativi. Vedi anche [[LiP/Appunti dal libro/Introduzione|l'introduzione e la storia]].

LiP è una sorta di ALF 2. Inoltre, è più facile se si è anche seguito Istituzioni di Logica.

C'è anche il [[λ-calcolo non tipizzato|λ-calcolo]], molto importante in generale ma completamente inutile per l'esame.
## Esame scritto

L'esame scritto contiene quattro categorie di esercizi. Non è necessario conoscere tutta la teoria per fare lo scritto, ma è utile in generale, e rende più facile capire cosa stai facendo. In generale, bisogna saper fare gli esercizi.

Il voto massimo dello scritto è 16.

### [[LiP/Categorie/Linguaggi|Linguaggi]]

1 punto.

Dato un linguaggio, si deve scrivere una grammatica o un pallogramma equivalente.
### [[Valutazione|Valutazione]]

6 punti.

Vengono date le regole di inferenza big-step e small-step per la valutazione di un linguaggio imperativo, e viene dato un termine. Si chiede di valutare quel termine, sia con la semantica big-step che con la semantica small-step.
### [[Tipizzazione|Tipizzazione]]

3 punti.

Vengono date le regole di inferenza di tipo di un linguaggio imperativo, e viene dato un tipo. Si chiede di scrivere un termine con quel tipo, e di inferirne il tipo.
### [[Binding|Binding]]

6 punti.

Ci sono diversi modi in cui un linguaggio di programmazione può gestire lo scope e il passaggio di parametri. All'esame, viene fornito del codice e viene chiesto come varia il valore di certe variabili dopo la sua esecuzione al variare di questa gestione.

## Termini

Lista di termini un po' abbandonata. Per ora la tengo.

**Lexer** - Legge il codice carattere per carattere e li raggruppa in token. Genera un errore se trova una serie vietata di caratteri.
**Parser** - Legge il codice token per token e identifica i token. Genera un errore se trova una serie vietata di token.
**Token** - Coppia significante-significato.
**Grammatica** - Determina cos'è un token e quali sequenze di token sono valide.
**Tavola dei simboli** - Generata dal parser, contiene le informazioni sui token trovati.
**Alfabeto** - Un insieme di simboli.
**Parola** - Stringa di simboli dell'alfabeto.
**Linguaggio** - Dato un alfabeto, l'insieme delle parole che soddisfano una certa regola.
**Automa** - Un insieme di stati, un alfabeto, una funzione che porta da uno stato e un simbolo a uno o più stati, lo stato iniziale e degli stati finali. Descrive un linguaggio.
**Espressione regolare** - Un modo per descrivere un linguaggio.
**Pallogramma** - Un modo per descrivere un linguaggio.

#materia