Parti da un nodo
Metti tutte le distanze a $\infty$
Ripeti:
	Vedi tutti i nodi collegati
	Prendi la distanza del nodo in cui sei e la chiami fai $D$
	Per ogni nodo collegato, aggiorni la distanza a il suo $peso + D$, se è minore di quello corrente
	Quando lo fai, metti il nodo corrente come quello da cui conviene raggiungerlo
Quando hai finito, percorri l'array della convenienza come lista, a ritroso, e sommi anche i $D$, e così trovi percorso e distanza
Usi l'insieme $V$ (visitati), $F$ (frontiera), e $\text{un altro}$ (mai visti), e li aggiorni man mano