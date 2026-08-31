---
cssclasses:
  - dem
---
Per installare l'addin: https://support.microsoft.com/en-us/excel/load-the-solver-add-in-in-excel. Si fa dalle impostazioni, non dal tasto degli addin che trovi in alto, anche se è il più evidente, lì trovi altri addin con lo stesso nome.

Quando ce l'hai, devi avere i tuoi dati formattati bene tipo così:

![[Pasted image 20260829170625.png]]

Di fianco poi metti una colonna che conterrà le quantità di ciascuna riga (se hai presente le matrici, sarebbe il vettore per cui lo stai moltiplicando). Sotto metti una riga in cui ogni colonna contiene la somma della colonna moltiplicata elemento-per-elemento per quel vettore di fianco.

Poi vai su Dati, a destra Analisi, Risolutore. Imposti come obiettivo la singola cella che vuoi massimizzare o minimizzare, che sarà in quella riga delle somme. Imposti come variabili il vettore a destra. Aggiungi i vincoli, per esempio "queste celle devono essere positive" o appunto "la somma deve essere al massimo tot".

Volendo ci possono essere anche altre celle che contengono altri valori chiaramente.

![[Pasted image 20260829215522.png]]

![[Pasted image 20260829220421.png]]

[Clicca qui per aprire lo spreadsheet (spero funzioni)](./ottimizzazione.xlsx)
[[Triennale/Anno 2/Semestre 1/DeM/Tesine/Ottimizzazione|Tesina]]