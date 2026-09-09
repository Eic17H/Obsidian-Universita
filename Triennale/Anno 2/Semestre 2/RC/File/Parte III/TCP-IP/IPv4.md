---
cssclasses: rc
---
[[IP|Protocollo internet]] versione 4.

## Intestazione

![[Pasted image 20260908143948.png]]

### Parte 1
* $4bit$ **versione**
* $4bit$ **internet header length**: minimo 5, unità 4 byte
* $8bit$ **type of service**: precedenza e congestione
* $16bit$ **total length**: intero datagramma, unità 1 byte, di solito 1500 per allinearsi coi frame Ethernet

### Parte 2
(frammentazione, magari in 500+500+500)
* $16bit$ **identification**: ID del datagramma di cui fa parte il frammento
* $1bit$ nullo letteralmente sticazzi
* $1bit$ **Don't Fragment**: per quando il destinatario non è capace a ricevere frammenti
* $1bit$ **More Fragment**: posto a 0 se è l'ultimo frammento
* $13bit$ **fragment offset**: posizione nel datagramma

### Parte 3
* $8bit$ **Time To Live**: scende di 1 a ogni salto (in origine a ogni secondo) e a 0 il pacchetto viene scartato
* $8bit$ **protocol**: TCP, UDP... Ognuno ha un ID valido globalmente, in un database
* $18bit$ **header checksum**: ricalcolato a ogni salto (causa soprattutto time to live), ma ci sono scorciatoie per farlo

### Parte 4
* $32bit$ **source address**
* $32bit$ **destination address**

### Parte 5
Opzioni
* **Security**: livello di sicurezza
* **Strict source routing**: percorso completo esplicito tramite lista di indirizzi, usato da amministratori se si danneggia un router o per misurare i tempi
* **Loose source routing**: elenco di router che devono fare parte del percorso, ma non un elenco completo del percorso
* **Record router**: ogni router scrive il proprio indirizzo per avere una cronologia
* **Timestamp**: ogni router scrive data e ora