Socket in C

Librerie: sys/types.h, sys/socket.h, netinet/in.h
    types: tipi usati per le syscall
    socket: socket
    in: costanti e strutture per indirizzi di dominio internet

Ci sono alcune macro che usiamo da queste librerie, perlopiù da types in realtà

socket(domain, type, protocol)
    domain: valori macro vedi slide
    type: useremo stream, macro vedi slide
    protocol: di solito 0, usiamo comunque macro, vedi slide

struct sockaddr_in
    sin_family: tipo IPv4
    sin_port: porta
    sin_addr: indirizzo IP
    sin_zero: boh parametro che viene usato per fare _a__ing boh non sembra importante vedi slide

bind(sockfd, addr, addrlen)
    sockfd: lo riceviamo da socket()
    addr: è la struct
    addrlen: lunghezza
    return 0 if !error()

listen(sockfd, backlog)
    dice che è pronto ad accettare richieste
    sockfd: ok sì fd
    backlog: numero massimo di client, dipende da quanto pesa il codice del server

    La magistrale è stata riformata. Primo anno uguali, altro: IA, security, computer vision, comunque si possono mischiare gli esami
        Uno degli esami è cloud infrastructure and security, si vede come superare i limiti del C
Chiusa parentesi

connect(sockfd, addr, addrlen)
    si capisce
    estrae la prima richiesta in coda, funzione di tipo bloccante

Con socket stream e usiamo send e receive
    flags le impostiamo a 0 con una macro non ci interessano

Socket datagram, sendto e recvfrom, sempre ripetere a chi ci vogliamo connettere

close(fd)
    Chiude un file descriptor
    0 ok, -1 errore

Sequenza di passi server vs client: vedi slide, vedi slide, sì, "esempio di utilizzo di tcp socket (2/8)"
Codice: slide dalla 4/8 in poi
Copiare il codice adesso non ha senso, ma si capisce è semplice ed è sempre la stessa logica, bisogna solo ricordare i prototipi
