---
cssclasses: rc
---
Address Resolution Protocol.

Ogni macchina di Internet ha uno o più [[Indirizzo IP|indirizzi IP]], ma non si possono usare direttamente per inviare pacchetti, perché le schede di rete del [[Data Link|livello data link]] non li comprendono.

Le schede di rete, per esempio le schede Ethernet, comprendono i loro indirizzi, come gli indirizzi Ethernet.

L'ARP "converte" tra indirizzi IP e indirizzi data link.

## Esempio 6.4 di Dessì

![[Pasted image 20260819190440.png]]

Abbiamo 4 host, ciascuno con un indirizzo IP e un indirizzo Ethernet. L'host 1 ha indirizzo IP1 ed E1, 2 IP2 E2, 3 IP3 E5, 4 IP4 E6. 1 e 2 sono collegati allo stesso switch ethernet nella rete CS, e 3 e 4 sono collegati allo stesso swtich ethernet nella rete EE. La rete CS ed EE sono collegati allo stesso router tramite IP. Il router ha due interfacce Ethernet con indirizzi E3 ed E4 (e anche degli indirizzi IP). CS ha il suo prefisso IP, e lo stesso vale per EE.

1 vuole inviare un pacchetto a 2 conoscendone il nome di dominio. Sono entrambi in CS, quindi va inviato via Ethernet, quindi deve conoscere l'indirizzo Eth di 2.
Primo passo:
* 1 riceve IP2 dal DNS;
* Il software del livello superiore costruisce un pacchetto con destinazione IP2;
* Il pacchetto viene passato al software che implementa IP;
* Il software capisce che il mittente e il destinatario sono entrambi in CS, quindi bisogna ottenere il suo indirizzo Ethernet sapendone l'IP.
Secondo passo:
* 1 broadcasta in CS un pacchetto che chiede al proprietario di IP2 di palesarsi e comunicare il suo indirizzo Ethernet;
* Tutte le macchine in CS lo ricevono, controllano il proprio indirizzo IP, e se è IP2 allora inviano il proprio indirizzo Ethernet (nel nostro caso, 2 invia E2);
Terzo passo:
* Il software che implementa IP in 1 costruisce un frame Ethernet indirizzato a E2;
* Inserisce il pacchetto IP nel payload;
* Scarica tutto sulla Ethernet
* La scheda Ethernet in 2 rileva il frame, capisce che è il destinatario, preleva i dati e genera un'interrupt;
* Il driver Ethernet di 2 estrae il pacchetto IP e lo passa al software che lo elabora.
[[Untitled 2|Correzioni da implementare]]
### Ottimizzazioni

Quell'esempio era semplice, ci sono delle migliorie possibili.

* Eseguito ARP, puoi salvare il risultato nella cache per saltare i primi due passaggi.
* 2 potrebbe aver bisogno di conoscere E1, quindi 1 può direttamente inviarlo.
* Un host può cambiare indirizzo IP mantenendo quello Ethernet, quindi la cache ARP dovrebbe scadere dopo pochi minuti per potersi aggiornare. Invece, all'accensione, ogni host broadcasta i propri indirizzi durante l'accensione (==gratuitous ARP==).