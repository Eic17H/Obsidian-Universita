## Settimana 11

Ricorsione.
Una classe di studenti è una classe di studenti + uno studente, o uno studente da solo.
classe = classe + studente | studente
Se da una classe togli uno studente, o ne aggiungi uno, è ancora una classe.
Il concetto di ricorsione è legato al concetto di oggetto autosimile.
Pensa alla scatola del Droste, la cui illustrazione contiene una scatola del Droste.
Guardi nella foto e dentro c’è la stessa foto, in cui c’è la stessa foto, in cui c’è la stessa foto, ma non puoi zoommare all’infinito, a un certo punto devi trovare la tipa che ti fa 🖕.
Vedi anche i frattali, e il triangolo di Sierpiński, che è formato da tre triangoli di Sierpiński.
Se cerchi “recursion” su Google, ti chiede se intendevi scrivere “recursion”.
A noi programmatori fa ridere, a qualcun altro sembriamo imbecilli, e forse hanno ragione.

ℕ, successore e precedente, utile. Fattoriale.
5! = 5×4×3×2×1
	4! = 4×3×2×1
		3! = 3×2×1
			2! = 2×1
				1! = 1
Questo è fattibile perché ℕ è ordinato.
Quindi ∀n∈ℕ∃!m | m=n-1
Puoi anche farlo in ordine inverso, che è utile se vuoi usare l’iterazione anziché la recursione.
Il metodo iterativo però è meno elegante.

Fibonacci iterativo? Quel famoso pisano, che ci ha portato lo zero e le cifre indoarabe.
Era un mercante, matematico nel tempo libero.
Il padre trasportava spezie tra la Repubblica di Pisa e l’Algeria.
Questa formula nasce da una considerazione di Fibonacci.
Mai pensato di prendere due conigli? A un mese si riproducono. I conigli scopano molto, devono mantenere questa fama.
Una coppia, poi 1, 2, 3, 5, 8, già 13, 21, 34, 55.
Scopano come conigli.
Al mese i, hai mesei-1+mesei-2 coppie. 89. 144. 233.

Con l’iterazione come fai? Non fai. Sì è fattibile ma difficile.
Ma la formula è già il suo algoritmo iterativo.
Sì è pesante ma è una semplice traduzione da matematica a linguaggio di programmazione.
Vedi le slide.