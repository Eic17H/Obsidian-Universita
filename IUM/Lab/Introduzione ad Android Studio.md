Le slide ti danno il link al download di Android Studio. La versione che ci troverai è diversa da quella che hanno usato per gli screenshot nelle slide, quindi non potrai seguire le loro istruzioni. Anche avendo la stessa versione, le loro istruzioni non ti dicono dov'è ciascun riquadro che ti dicono di usare. Mancano anche molti passaggi.

Questo documento si riferisce alla versione Narwhal 4.

Puoi zoommare in ```activity_main.xml```. Dalla barra a destra puoi aprire `Attributes`, se non è già aperto. Stessa cosa per `Palette` a sinistra.

Gli attributi degli elementi potrebbero essere organizzati diversamente dalle slide. Sono molto disordinati, e potresti trovare certi attributi in sottosezioni di altri attributi. Direi di guardare prima in `Declared Attributes` e poi in `Common Attributes`.

In `MainActivity.kt`, ho dovuto importare `android.view.View` e `android.widget.*`. Non c'è scritto nelle slide, ma senza mancavano certe definizioni di tipi.

Devi usare il tasto play verde per accendere l'emulatore. Non sarà disponibile finché Android Studio non avrà installato Gradle, e ci vuole tanto. Credo debba farlo ogni volta che crei un progetto. Già.

Nel riquadro a destra con dentro l'emulatore di Android, assicurati che il telefono virtuale sia **acceso**. C'è la solita icona dell'accensione. Se clicchi play quando il telefono è spento, non si accenderà da solo. Vedrai solo uno schermo nero. Già.

Se ricordi JavaScript, `findViewById<>()` è simile a `Document.getElementById()`. `<>` è come in Java, serve per specificare il tipo. Anche `.setOnClickListener()` ha un equivalente in JavaScript, ma non mi pare si faccia in FPW. Le enum sono simili al Java, quindi `View.INVISIBLE` è un valore di tipo `View`.