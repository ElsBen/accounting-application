
/**
 * Das Modul "Fehlerbox" stellt die Klasse "Fehlerbox" zur Verfügung.
 * @module classes/Fehlerbox
 */

/**
 * Die Klasse "Fehlerbox" stellt alle Eigenschaften 
 * und Methoden der Fehlerbox (inkl. HTML und Events) zur Verfügung.
 */

export default class Fehlerbox {

    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Fehler" anhand der u.g. Parameter
     * das HTML des Fehlers mit den u.g. Eigenschaften.
     * @param {HTMLSpanElement} fehlertext - der Parameter bekommt ein HTML "span" übergeben
     * @param {Variable} formular_fehler - bekommt die Variable "_formular_fehler" übergeben
     * @prop {HTMLSpanElement} _fehlertext - der Parameter bekommt ein HTML "span" übergeben
     * @prop {Variable} _formular_fehler - bekommt die Variable "_formular_fehler" übergeben
     * @prop {Element} _html - HTML des Fehlers
     */

    constructor(fehlertext, formular_fehler) {
        this._fehlertext = fehlertext;
        this._formular_fehler = formular_fehler;
        this._hmtl = this._html_generieren();
    }

    /**
     * Diese Methode generiert das HTML für den Fehler und gibt das HTML zurück.
     * @returns {HTMLDivElement} - gibt das "div" mit den generierten Fehlern zurück
     */

    _html_generieren() {
        let fehlerbox = document.createElement("div");
        fehlerbox.setAttribute("class", "fehlerbox");
        
        let fehlertext = document.createElement("span");
        fehlertext.textContent = this._fehlertext;
        fehlerbox.insertAdjacentElement("afterbegin", fehlertext);

        let fehlerliste = document.createElement("ul");
        this._formular_fehler.forEach(fehler =>{
            let fehlerlistenpunkt = document.createElement("li");
            fehlerlistenpunkt.textContent = fehler;
            fehlerliste.insertAdjacentElement("beforeend", fehlerlistenpunkt);
        });
        fehlerbox.insertAdjacentElement("beforeend", fehlerliste);

        return fehlerbox;
    }

    /**
     * Diese Methode löscht die "bestehende_fehlerbox".
     */

    _entfernen() {
        let bestehende_fehlerbox = document.querySelector(".fehlerbox");
        if (bestehende_fehlerbox !== null) {
            bestehende_fehlerbox.remove();
        }
    }

    /**
     * Diese Methode überprüft ob sich schon Fehler im "eingabeformular_container" 
     * und setzt ggf. das HTML für die Fehler in den "eingabeformular_container" ein.
     */

    anzeigen() {
        this._entfernen();
        let eingabeformular_container = document.querySelector("#eingabeformular-container");
        if (eingabeformular_container !== null) {
            eingabeformular_container.insertAdjacentElement("afterbegin", this._hmtl);
        }
    }
}