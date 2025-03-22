# Settimana 1

Il regolamento esiste per rispondere a dubbi e domande.
Se fai una domanda che non è nel regolamento, viene risposta e aggiunta al regolamento.

Questo corso trasforma gli studenti in programmatori veri e propri.
Il progetto si consegna quando è pronto. Intanto continui a correggere.

Per ora conosciamo un po' il C. Dopo il progetto lo conosceremo davvero.

Il docente di questo modulo è un po' <span class="pink">particolare</span>. Ha fondato un'azienda e ha due lavori.

Le mail si mandano a sistemioperativi.unica@gmail.com.
Agli indirizzi individuali non rispondono.
Bisogna fare sempre "rispondi a tutti", pessimo errore altrimenti.
Siamo (imperativo) tech-literate. Studiamo informatica, dobbiamo sapere come mandare una mail in modo corretto.

Nel mondo del lavoro capiterà spesso di dover subire le conseguenze degli errori di comunicazione.
Piccolo spoiler del nostro futuro:
> "Mettila in linea" - poco specifico
> \*la mette in linea\*
> "Noo, ma io intendo..."

Tra l'altro, sul progetto, le mail col collega in CC, sempre.
Se no è da <span class="pink">stronzi</span>. Succede raramente, ma comunque non è professionale.
Tu magari comunichi un sacco di cose ai docenti e il collega non ne sa nulla. <span class="pink">Brutto</span>.

Se copi il progetto tanto non sai fare nulla e lavoro non ne trovi.
E della laurea che te ne fai?
Ce n'era uno così, tirocinante, nell'azienda di prof. Carta. Non sapeva fare nulla.
Ma neanche ti accorgi dei tuoi difetti. E non impari niente.

Elearning. Materiale e anche esami. Leggi il regolamento.
Simulazioni di esame durante il semestre.
Il voto si può rifiutare una sola volta. In totale, quindi o teoria o pratica. Entro 7 giorni.

Per passare un modulo, la media deve essere sufficiente, anche se il singolo parziale non lo è.
Fatte tutte le esercitazioni, hai uno scheletro del progetto.
Se sai la teoria sai la pratica, quindi puoi fare il progetto.
A settembre si resettano i voti dei singoli moduli, ma non il progetto.

Il modulo di teoria ha 14 sottomoduli.
Libro di testo. E anche materiale scritto dal professor Carta.
Il libro ha <span class="pink">problemi gravi</span>.

Questo corso è ARE con vari strati di software a basso livello.
Ci sono cose che non si possono fare senza questo corso.
Il modo migliore per apprezzare l'aria è non respirare.
Il DevOps si occupa della parte sistemistica.
La parte applicativa e quella sistemistica si mischiano.

Alcuni argomenti del corso saranno:
- Interfacce <span class="orange">HW-SW</span>.
- Instruction set diverso da 8088.
- Gestione della memoria e delle periferiche.
- Usare computer senza un sistema operativo.
  
Architetture di elaborazione. Partiamo dal basso.
Cos'è un <span class="blue">processore</span>?  #termine
Macchina sequenziale che esegue esclusivamente operazioni della propria ISA.
Le <span class="green">istruzioni</span> sono stringhe di bit che stanno nella memoria, che il processore legge, decodifica ed esegue.
Le istruzioni eseguite sono legate alla lettura scrittura manipolazione di dati.
Leggere, manipolare, riscrivere dati. Dal punto di vista del processore, questo è il mondo.
Non è limitante? E le periferiche? Come fa a gestire tutto così?
Astraiamo un po'.
Dal punto di vista del processore la memoria è un indirizzo su cui scrivere e leggere. Il processore è master, il resto è slave.
Un'immagine sul monitor è una matrice di pixel, di caselle, contenenti numeri.
Il processore definisce tutto come valori negli indirizzi del data buffer.
Adesso l'universo è processore, memoria dati, memoria istruzioni, e i bus.
Cosa c'entra il codice C con questa roba qua?  
Ci si arriva, usando altre tecnologie.
Tramite la tecnologia della compilazione, la rappresentazione in codice C diventa una rappresentazione della stessa funzione in assembly.
Il programma assemblato non è più generico, ma specifico a quell'ISA.
Il codice assembly è testo, ancora non lo posso usare. Ora serve l'<span class="blue">assembler</span>.
L'<span class="blue">assembler</span> associa alle istruzioni assembly le giuste sequenze di bit. #termine 

Noi sappiamo che dal C si passa all'ASM e poi quello gira.
Se vuoi capire cosa fa un sistema operativo devi sapere a cosa serve.
Impareremo a mappare il codice C al codice ISA.
<span class="blue">Macchina sequenziale</span>: azioni singole legate ad un clock. #termine 

Il <span class="blue">loader</span> carica, al reset, sul <span class="green">program counter</span>, l'indirizzo della prima istruzione.
Infinite sequenze di cose facili stratificate che diventano difficili.
È più comodo che dopo l'istruzione #1 ci sia l'istruzione #2.
`1, PC -> ADD -> PC` - Facile da fare in <span class="orange">hardware</span>.
Se qualcosa è difficile da fare in <span class="orange">HW</span>, costa tempo, energia e soldi.

Il programma deve gestire anche le <span class="yellow">istruzioni di salto</span>.
`jump 7`
`7, ADD -> MUX -> PC, 1 -> ADD, 7 -> MUX`
Se l'istruzione è <span class="yellow">jump</span>, sovrascrivo PC subito, non aspetto al ciclo dopo, faccio tutto insieme.

Ci sono due categorie dei famiglie di instruction set.
<span class="orange">RISC</span>: Insieme ridotto di istruzioni (meno istruzioni distinte) #termine 
<span class="orange">CISC</span>: Insieme complesso di istruzioni (molte istruzioni) #termine 
#SLIDE

Ha vari registri. Il <span class="green">registro</span> `$0` ha sempre valore `0`.
Gli altri <span class="green">registri</span> sono general-purpose.
In un'architettura a 32 bit, possiamo al massimo indirizzare 2³² <span class="green">locazioni di memoria</span>.
Noi usiamo L'ISA del MIPS, capostipite delle ISA RISC.
Col MIPS 4000 hanno fatto la PS1.
Noi useremo <span class="red">word</span> di 32 bit.
>`lw $3, 0x100($2)` = `*3 = *(0x100 + *2)`
>`sw $3, 0x100($2)` = `*(0x100 + *2) = *3`
>`add a, b, c` = `a = b + c`
>`sub`, `and` eccetera sono simili
>`beq $2, $3, label` = `if($2<=$3) PC = PC+4+label`
>Le label diventano macro di numero di riga. Se ne occupa l'<span class="blue">assembler</span>.

Perché nell'istruzione di <span class="yellow">salto</span> c'è "`+4`"?
Quest'architettura ha istruzioni a 32 bit, che sono 4 byte, quindi ogni volta si va avanti di 4 byte.
C'è una cosa che si chiama "pseudo-address" ma è troppo difficile e non la spiega.

Ci sono tre tipi di istruzione: <b><span class="green">i</span></b>mmediate, <b><span class="green">r</span></b>egister e <b><span class="yellow">j</span></b>ump.
Gli <span class="red">opcode</span> sono lunghi 6 bit.

| opcode | rs    | rt    | rd    |
| ------ | ----- | ----- | :---- |
| add    | $2,   | $3,   | $4,   |
| 6 bit  | 5 bit | 5 bit | 5 bit |

Com'è possibile che gli <span class="red">opcode</span> ma ci siano 80 <span class="red">opcode</span> diversi?
Beh. C'è una <span class="pink">gabbola</span>.
La <span class="pink">gabbola</span> si spiega con "<span class="green">function</span>", che è il <span class="pink">colpo di tacco</span> dei designer.
Per la `add` e la `sub` è tutto uguale tranne la <span class="orange">ALU</span>.
Faccio dipendere la <span class="orange">ALU</span> dal campo <span class="green">function</span>.
La <span class="orange">ALU</span> è combinatoria, quindi uso lo stesso <span class="red">opcode</span>.

Ci sono tre tipi ben distinti di istruzioni (di nuovo), sempre: <span class="yellow">sposta</span>, <span class="yellow">manipola</span> e <span class="yellow">salto</span>.

<span class="orange">RISC</span>: Minimalista, programmi in ASM, molto vicino all'<span class="orange">HW</span>, efficiente.
<span class="orange">CISC</span>: Massimalista, programmi in ASM ma è più astratto.
Prima i computer erano per programmatori, era bello il <span class="orange">CISC</span>.
Adesso sono per utenti, serve efficienza, <span class="orange">RISC</span>.
Il MIPS è facile per il compilatore, è <span class="orange">RISC</span>.

Sostanzialmente, <span class="pink">chissenefrega</span> chi deve scrivere in ASM, favoriamo chi scrive in C.
Una volta arrivati i processori <span class="orange">RISC</span>, i <span class="orange">CISC</span> si sono estinti... [vero?](https://www.youtube.com/watch?v=TN25ghkfgQA&autoplay=on) <b><span class="red">Falso.</span></b>
Per motivi economici, IBM si è impuntato che si poteva fare un computer domestico a bassa potenza. Ebbero successo ma furono troppo ottimisti.
Ai tempi i computer erano molto grandi.
Si sono affidati ad altri per il sistema operativo e per la CPU.
Il SO era di uno <span class="pink">studentello</span>, un tale Bill Gates, era DOS e faceva <span class="pink">schifo</span>.
Per la CPU, una certa compagnia Intel.
Gates e Intel hanno saltato il middle man, che faceva la parte più facile, costruire l'hardware.
Nacquero i computer IBM-compatible, che costavano meno.
Il professor Carta ne aveva uno. C'era anche gente in Sardegna che li costruiva. <span class="pink">Bruttini</span>.
Retrocompatibilità = compatibilità con Intel = x86 = <span class="orange">CISC</span>.
Però Apple e ARM usano <span class="orange">RISC</span>.