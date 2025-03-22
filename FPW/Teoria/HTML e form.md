È scontato che il server invii dati al client, ma è anche possibile che il client invii dati al server. Il metodo più semplice per farlo è il tag `<form>` in HTML, insieme ad altri tag quali `<input>` e `<button>`. `<input>` è un tag autochiudente con un attributo, `type`, che permette di selezionare in che modo vegono immessi i dati.

## Testo

Ci sono tre modi per inserire del testo, e tutti permettono del testo predefinito. Nel caso di `<input>`, poiché è autochiudente, si usa l'attributo `value`, invece `<textarea>` permette di inserire del testo tra il tag di apertura e quello di chiusura.

|      `<input type="text" value="Inserire testo">`       |      `<textarea>Inserire molto testo</textarea>`       |      `<input type="password" value="Password">`       |
| :-----------------------------------------------------: | :----------------------------------------------------: | :---------------------------------------------------: |
|                       Testi brevi                       |                      Testi lunghi                      |                 Testi brevi nascosti                  |
| <html><input type="text" value="Inserire testo"></html> | <html><textarea>Inserire molto testo</textarea></html> | <html><input type="password" value="Password"></html> |

## Scelta singola

Per decidere come fare immettere una scelta singola, si deve considerare la *cardinalità*. È buona pratica usare un `<input type="radio">` con poche scelte, per esempio meno di 6, un `<select>` con più scelte, e `<select size="n">` (dove `n`) è il numero di scelte se le scelte sono molte.

Per i radio button, il testo associato ai bottoni deve essere indicato con un tag `<label>`, che deve avere come attributo `for` l'`id` di ciò a cui si riferiscono. I tag `<input>` della stessa lista devono essere collegati dando loro lo stesso `name`.

| `<input type="radio" id="1" name="scelta"> <label for="1">Primo</label>`<br>`<input type="radio" id="2" name="scelta"> <label for="2">Secondo</label>` | <html><input type="radio" id="1" name="scelta"><label for="1">Primo</label><br><input type="radio" id="2" name="scelta"><label for="2">Secondo</label></html> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<select>`<br>`<option value="">Seleziona</option>`<br>`<option value="1">Primo</option>`<br>`<option value="2">Secondo</option>`<br>`</select>`       | <html><select><br><option value="">Seleziona</option><br><option value="1">Primo</option><br><option value="2">Secondo</option><br></select></html>           |
| `<select size="2">`<br>`<option value="1">Primo</option>`<br>`<option value="2">Secondo</option>`<br>`</select>`                                       | <html><select size="3"><br><option value="1">Primo</option><br><option value="2">Secondo</option><br></select></html>                                         |

## Scelta multipla

L'equivalente a scelta multipla dei radio button sono le checkbox. È anche possibille fare un `<select multiple>`, in cui le scelte multiple si immettono con `Ctrl`+clic.

| `<input type="checkbox" id="1" name="scelta"> <label for="1">Primo</label>`<br>`<input type="checkbox" id="2" name="scelta"> <label for="2">Secondo</label>` | <html><input type="checkbox" id="1" name="scelta"><label for="1">Primo</label><br><input type="checkbox" id="2" name="scelta"><label for="2">Secondo</label></html> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<select multiple>`<br>`<option value="1">Primo</option>`<br>`<option value="2">Secondo</option>`<br>`</select>`                                             | <html><select multiple><br><option value="1">Primo</option><br><option value="2">Secondo</option><br></select></html>                                               |
