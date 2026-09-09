---
cssclasses: rc
---
[[IP|Protocollo internet]] versione 6.
## Intestazione

![[Pasted image 20260820210336.png]]

* $4bit$ **version**
* $8bit$ **traffic class**: simile a ToS, gestione prioritaria del traffico
* $20bit$ **flow label**: se non è 0, marca un gruppo di pacchetti da trattare in un modo specifico, come un certo ordine di consegna
* $16bit$ **payload length**: unità 1 byte, minimo 40, non più total length
* $8bit$ **next header**: che tipo di header c'è dopo quella IPv6, quindi o di trasporto (TCP, UDP, etc) o estensioni di IPv6 (sono 6)
* $8bit$ **hop limit**: scende a ogni salto, a 0 scarti il pacchetto
* $128bit$ **source address**
* $128bit$ **destination address**

### Estensioni

![[Pasted image 20260820210349.png]]

Le estensioni corrispondono ai campi IPv4 meno utilizzati

* Opzioni **hop per hop**: informazioni per i router
* Opzioni di **destinazione**: informazioni sulla destinazione
* **Routing**: lista di router da visitare
* **Frammentazione**
* **Autenticazione**: verifica dell'identità del trasmittente
* **Carico utile cifrato**: informazioni sul contenuto cifrato

Procatoria, c'è molto da dire su questi

#### Hop per hop

#### Destinazione

#### Routing

#### Frammentazione

#### Autenticazione

#### Carico utile cifrato