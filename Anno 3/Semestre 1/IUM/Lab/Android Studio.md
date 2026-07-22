---
cssclasses:
  - ium
---
Le slide ti danno il link al download di Android Studio. La versione che ci troverai è diversa da quella che hanno usato per gli screenshot nelle slide, quindi non potrai seguire le loro istruzioni. Anche avendo la stessa versione, le loro istruzioni non ti dicono dov'è ciascun riquadro che ti dicono di usare. Mancano anche molti passaggi.

Android Studio usa il linguaggio Kotlin, che è un derivato di Java. Un paio di caratteristiche: ha la Null Safety, cioè gestisce i valori null, e ovviamente è orientato a oggetti.

Questo documento si riferisce alla versione Narwhal 4.

Puoi zoommare in ```activity_main.xml```. Dalla barra a destra puoi aprire `Attributes`, se non è già aperto. Stessa cosa per `Palette` a sinistra.

Gli attributi degli elementi potrebbero essere organizzati diversamente dalle slide. Sono molto disordinati, e potresti trovare certi attributi in sottosezioni di altri attributi. Direi di guardare prima in `Declared Attributes` e poi in `Common Attributes`.

In `MainActivity.kt`, ho dovuto importare `android.view.View` e `android.widget.*`. Non c'è scritto nelle slide, ma senza mancavano certe definizioni di tipi.

Devi usare il tasto play verde per accendere l'emulatore. Non sarà disponibile finché Android Studio non avrà installato Gradle, e ci vuole tanto. Credo debba farlo ogni volta che crei un progetto. Già.

Nel riquadro a destra con dentro l'emulatore di Android, assicurati che il telefono virtuale sia **acceso**. C'è la solita icona dell'accensione. Se clicchi play quando il telefono è spento, non si accenderà da solo. Vedrai solo uno schermo nero. Già.

Se ricordi JavaScript, `findViewById<>()` è simile a `Document.getElementById()`. `<>` è come in Java, serve per specificare il tipo. Anche `.setOnClickListener()` ha un equivalente in JavaScript, ma non mi pare si faccia in FPW. Le enum sono simili al Java, quindi `View.INVISIBLE` è un valore di tipo `View`.

Essenzialmente in xml crei gli elementi, in kotlin fai `val nome = findViewById()` e poi `nome.addOnClickEventListener(){}` o qualcosa del genere.

Oggi colori e activity di Android, e navigazione.

Un fragment è una parte di un'activity, è come un cassetto che apri e chiudi, ora c'è e ora no e ora sì e ora no. Comodo comodo.

# Activity

Ci sono diversi fasi del ciclo di vita di un'attività di Android.

Vedi il grafo nelle #slide, non sarà nell'esame ma è utile capirci qualcosina.

### `onCreate()`

Viene chiamata quando l'activity viene creata, le viene passata un oggetto di tipi `Bundle`, che si usano per scambiare informazioni tra un'activity e un'altra.

### `setContentView()`

Visualizza il contenuto

# XML

è un linguaggio di markup, come l'HTML. Hanno deciso di usare questo anziché HTML per Android. ChatGPT se la cava. Anche l'XML usa i tag `<>`.

Per esempio:

```
<TextView
	android:layout width="match parent"
	android:layout height="match_parent"
	android:text="Hello world"
	>
```

Credo sia sbagliato, vedi #slide.

Il layout degli elementi può essere relativo o lineare. Se è lineare, può essere verticale o orizzontale.

In FPW ci hanno detto di usare colonne e non tabelle. Qui possiamo benissimo usare le tabelle. L'alternativa alle tabelle sono i constraint, che definiscono per ogni blocco la posizione relativa agli altri blocchi. Per il progetto bastano cose semplici, non complicarti la vita.

# Activity ne parliamo davvero adesso

Su Android programmiamo a eventi. La scorsa volta abbiamo nascosto cose per cambiare l'interfaccia, adesso invece passeremo da un'activity all'altra.

Su Elearning c'è un link al GitHub del corso (\[Lab\] Codice), ci troviamo il codice, perché saper programmare non è necessario per superare il corso.

Quando crei una cosa in Android studio non fare empty o non ti mette l'XML. Invece per la seconda activity boh empty c'è scritto boh.

In `res/values/colors.xml` possiamo definire colori. In `res/layout/nome_attivita.xml` possiamo cambiare il layout. Vedi #slide.