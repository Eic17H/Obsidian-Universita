---
cssclasses: rc
---
Classless InterDomain Routing, una soluzione all'inefficienza del sistema delle [[Classi IPv4|classi]] di [[IPv4]]. In particolare, la classe B era stata assegnata alle aziende, ma una rete di classe B è comunque troppo grande per un'azienda, e si stavano terminando gli indirizzi. Una classe B ha circa 65k indirizzi, ma più della metà delle aziende ne usano meno di 50, quindi addirittura anche una classe A sarebbe sprecata. Quindi molti indirizzi sono stati revocati, le risorse sono state riassegnate con un sistema diverso (in Italia dalla GARR), e sono state usate sottoreti (si suddivide una rete per usarla come più reti).

Anziché avere quindi 4 classi, cioè 4 possibili lunghezze del prefisso, si permettono più lunghezze diverse. La lunghezza del prefisso, per esempio 22 bit, si indica aggiungendo `/22` al primo indirizzo dell'aggregazione. Visto che un indirizzo è lungo 32 bit, una maschera di $22$ bit ha $2^{32-22}=1024$ indirizzi a disposizione.

![[Pasted image 20260820210306.png]]