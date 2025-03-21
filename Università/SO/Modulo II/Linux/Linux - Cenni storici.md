Pensando a Linux, si pensa a Unix
All'inizio non c'erano OS, c'erano grosse macchine che eseguivano un programma alla volta
Poi hanno fatto i primi OS, scritti in assembly, quindi 1 OS per macchina
Anni '60, primo sistema operativo in HLL (C), essendo in HLL si può portare su altre macchine
     HLL: astrazione
Il C fu creato per fare un OS in modo astratto, così si usa su più macchine diverse
Per fare un OS, il C doveva toccare la memoria. Molto pericoloso, segfault etc
In PR2, che fa OOP con Java, non devi toccare la memoria a mano, fa tutto lui e tu non sbagli
In computer graphics, si usa C per essere molto efficienti
Chiusa parentesi, Unix era FOSS, quindi si è diffuso molto, soprattutto tra accademici e sviluppatori
Si continuò a contribuire in maniera collaborativa e aperta
Poi il C era facile da imparare
Tantissime branch di Unix. Qual è il vero Unix?
Molti tentativi per standardizzarlo
Ah btw Unix fu fatto alla Bell
L'IBM aveva AiX, Sun aveva Solaris, etc
Bell claimò copyright (vedi EED), morirono le altre
Free Software Foundation, Richard Stallman, GNU
GNU: Gnu's Not Unix. Ispirato a Unix ma non davvero Unix, software davvero libero
Nascono poi vari programmi importanti molto diffusi anche fuori Linux, e molto importanti tutt'ora
     gcc (gnu C compiler), LaTeX (formattazione), Emacs (ambiente di sviluppo), Grub (ne parleremo dopo)
Mancava un kernel efficiente. Il kernel è molto fondamentale
Prof. Tanenbaum creò MINIX (mini unix), ispirato a Unix ma nuovo e piccolo
     Tutto il codice sorgente è in un libro
Linus Torvalds creò Linux. Era uno studente di Tanenbaum
Torvalds ha creato Linux come hobby, ha risolto i problemi della gestione dei processi (kernel)
Linux, bel kernel, si fonde con GNU (GNU-Linux), risolto tutto
Il Linux moderno è GNU-Linux. Kernel Linux e applicativi GNU
C'è un diagramma nelle slide
MacOS è Unix