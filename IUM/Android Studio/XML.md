L'XML è un linguaggio *di markup*, cioè permette di descrivere dati usando una formattazione specifica che fa uso di *tag*, vale a dire marcatori. Anche l'<span class="fpw">[[HTML e CSS|HTML]]</span> è un linguaggio di markup.

I linguaggi di markup hanno in comune l'utilizzo dei tag (quelli segnati da `<>`), che connettono il contenuto del documento alle istruzioni di markup.

Ecco dell'esempio di codice XML:
```XML
<TextView
android:layout_width="match_parent"
android:layout_height="match_parent"
android:text="Hello world"
android:id="@+id/text" />

<LinearLayout
android:layout_width="match_parent"
android:layout_height="match_parent"
android:orientation="vertical">

<TextView
android:layout_width="match_parent"
android:layout_height="match_parent"
android:text="Hello world 1"
android:id="@+id/text1" />

</LinearLayout>
```