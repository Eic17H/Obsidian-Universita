## Matematica

Ottimizzazione Lineare o Programmazione Lineare		
Otimizzazione/minimizzazione di una funzione lineare con vincoli lineari di (dis)uguaglianza		
Esiste una funzione di cui si ricerca l'ottimo		
	In particolare valori di certe variabili decisionali che massimizzino/minimizzino una funzione	
	Funzione anche soggetta a vincoli	
		
Diciamo che f = c1x1 + c2x2 + …		
	c1 è il costo/beneficio della variabile decisionale x1 etc	
	Somma con j da 1 a n di cjxj	
	f è la funzione obiettivo	
		
E poi ci sono dei vincoli		
	a1,1x1 + a1,2x2 + … + a1,n*xn >= b1	
	a2,1x2 + a2,2x2 + … etc	
	o anche <= comunque	
	b1 è il 1o vincolo	
		
Metti che am1=1, amn=0 per ogni x, bm=0		
	Il vincolo è 1^xj=xj>=0 (o <=0)	
	Essenzialmente in questo caso con 1 e poi solo 0 sto creando un vincolo sul segno della variabile decisionale	
		
Fine della matematica		
	Adesso vediamo perché è utile	
	Vedremo un problema realistico che si usa con l'ottimizzazione lineare	
		Così capiamo in che modo è utile

## Problema reale

Quindi vediamo i vincoli	
quantità	somma xA…xH = 1225
volatilità	somma volA*xA/1225… >= 19
logica	xA…xH >= 0
capacità	xA<=capA, …
sindacato	almeno metà del carbone va acquistato con sindacato: xA+xB+xD+xF-xC-xE-xG-xF>=0
treno	massimo 650 via treno: xA+xC+xG+xH <= 650
auto	massimo 720 via auto: xB+xD+xE+xF <= 720
	
Insoma dato tutto questo Excel subito me lo ottimizza	
	
Arriviamo a xA…xH = 55,600,0,20,100,0,450,0	
Quindi il costo è 73'267'500$	

## Excel

Per risolverlo, devi andare su strumenti -> risolutore
Partiamo dal file excel che c'è su moodle
Serve l'addin solver (componente aggiuntiva risolutore)
L'interfaccia ti dice tutto
Per usarlo devi premere il tasto play schiacciato in alto a destra nel riquadro
