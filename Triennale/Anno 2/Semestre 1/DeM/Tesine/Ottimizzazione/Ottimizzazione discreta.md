---
cssclasses:
  - dem
---
Una variante dell'[[Triennale/Anno 2/Semestre 1/DeM/Tesine/Ottimizzazione/Ottimizzazione|ottimizzazione]].
## Introduzione

Ottimizzazione discreta	
	
Vedi le slide	
Visto che il nostro valore varia linearmente sul piano del foglio, il massimo deve essere a un vertice	
	Quindi confronti tutti i vertici e vedi quale ha il valore massimo
I vincoli sono rette che delimitano un poligono	
	
C'è anche il problema di doversi limitare alle soluzioni intere	
Se i vertici sono frazionarie, come trovo la soluzione intera?	
Questo è l'argomento di oggi	

## Come si fa

Se arrotondi potresti trovare una soluzione inammissibile		
	Qualunque problema con probabilità più di 0% è inammissibile	
	Non farlo mai	
		
Vedi le slide		
		
Se una variabile booleana ti esce frazionaria, fai due copie del problema		
	Una ha vincolo che quella è =0	
	Una =1	
	Vedi quale dei due ti dà il massimo	
	Poi magari così ti esce un'altra variabile booleana frazionaria, ricorri	
		
Funzione obiettivo		
	Esiste	
	Quando fai quello dei booleani, potrebbe convenirti scegliere il ramo con la FO maggiore	
		Non è sempre vero
		
Slide, 6o nodo, nessuna soluzione ammissibile: perché?		
	Dice x1=x3=x4=1, però supera la capacità massima	
		
Tra l'altro guardare tutti nodi foglia è O(2^n)		
	Male	
Se sei di fretta, ti accontenti di una soluzione euristica (indovina con una certa logica)		
	Posso trovare una soluzione ottima se il mio algoritmo è furbo	
	Non visita tutte le soluzioni possibili	
	C'è chi fa tesi di laurea su lavori euristici	

## Excel

Documento "selezione di progetti" su elearning				
Stesso solver di prima				
Ci sono tutti i vincoli si vedono				
Non capisco niente perché il professore ha l'interfaccia del mac che è completamente diversa				
Magari si capisce				
				
Metti i vincoli <= va bene anche array				
Metti il vincolo di mettere le variabili booleane				
	Seleziona l'intervallo è metti binario come operatore (è unario)			
				
Come si imposta il branch&bound?				
	Dicendo che le variabili sono booleane. Già fatto			
				
Metto binary ma mette comunque valori frazionari ma insomma basta saperlo usare e capirò credo				
				
Sul libro ci sono diverse tesine che possono dare spunti per le tesine				
				
Per la tesina, fai due volte il test, una volta normale e una cambiando un po' per vedere se un altro modello è meglio				
				
Con produzione velivoli il solver me li fa interi e funziona				
				
Le tesine non hanno una scadenza troppo severa				
	Va anche bene se fai l'appello a febbraio e consegni le tesine ad aprile, il voto è registrato a febbraio			
		L'appello serve per lo scritto		
			E anche per sapere quanti scritti stampare	
				Eventualmente email o team
