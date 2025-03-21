VM o dual boot
Dual boot: bootloader, partizione, grub
Mount point, nel caso di Linux è la root, "/"
La swap partition è un meccanismo dei SO per mettere la RAM su disco10
     Windows usa un file, Linux usa una partizione
Si può cifrare una partizione
Se cifri la partizione, la chiave sta in RAM, ma magari va poi nella swap, e ci rimane, quindi cifra anche la swap
LVM: crea partizioni astratte ma concretamente distribuite su più dischi
RAID: distribuire i dati su più dischi, duplicate, così se perdi uno hai gli altri
Sarà utile una VM
Creeremo un gioco
Importante avere la stessa versione di Linux, stiamo facendo cose a basso livello. Consigliata una VM per questo
Ci sono due tipi di VM
Tipo 1: comunicazione diretta con l'HW, efficiente
Tipo 2: useremo questa, virtualbox e simili, VM comunica con OS, più facile da usare
C'è una guida su come installare una BM di Ubuntu
Ubuntu 22.04.3 x64
Oracle VM VirtualBox 7.0.10