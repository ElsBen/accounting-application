/**
 * Das Modul "Eingabeformular" stellt die Klasse "Eingabeformular" zur Verfügung.
 * @module classes/Eingabeformular
 */

import Fehlerbox from "./Fehlerbox.js";
import liqui_planner from "../liqui-planner.js";

/**
 * Die Klasse "Eingabeformular" stellt alle Eigenschaften
 * und Methoden des Eingabeformulars (inkl. HTML und Events) zur Verfügung.
 */

export default class Eingabeformular {

    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Eingabeformular"
     * das HTML des Eingabeformulars.
     * @prop {Element} _html - das HTML des Eingabeformulars
     */

    constructor() {
        this._html = this._html_generieren();
    }

    /**
     * Diese private Methode extrahiert die im Eingabeformular eingegebenen Daten aus
     * dem Submit-Event des Eingabeformulars.
     * @param {Event} submit_event - das Submit-Event des Eingabeformulars
     * @return {Object} - einfaches Objekt mit den Rohdaten des Eingabeformulars
     */ 

    _formulardaten_holen(submit_event){
        return {
            titel: submit_event.target.elements.titel.value,
            betrag: submit_event.target.elements.betrag.value,
            einnahme: submit_event.target.elements.einnahme.checked,
            datum: submit_event.target.elements.datum.valueAsDate
        }
    }

    /**
     * Diese private Methode überprüft die im Eingabeformular eingegebenen Daten 
     * und passt diese ggf. für die Weiterverarbeitung entsprechend an. 
     * @param {Methode} formulardaten - Startparameter der Eingabedaten des Formulars
     * @returns {Objekt} - einfaches Objekt welches die Rohdaten anpasst
     */

    _formulardaten_verarbeiten(formulardaten){
        return {
            titel: formulardaten.titel.trim(),
            typ: formulardaten.einnahme === false ? "ausgabe" : "einnahme",
            betrag: parseFloat(formulardaten.betrag) * 100,
            datum: formulardaten.datum
        }
    }

    /**
     * Diese private Methode überprüft die eingaben auf ihre Gültgkeit und
     * generiert ggf. bei nicht validen Daten einen Fehler.
     * @param {Methode} formulardaten - Startparameter der Eingabedaten des Formulars
     * @returns {string} - gibt die generierten Fehler wieder
     */

    _formulardaten_validieren(formulardaten){   
        let fehler = [];
        if (formulardaten.titel === ""){
            fehler.push("Titel");
        }
        if(isNaN(formulardaten.betrag)){
            fehler.push("Betrag");
        }
        if(formulardaten.datum === null){
            fehler.push("Datum");
        }
        return fehler;
    }

    /**
     * Diese private Methode holt sich das Datum aus der HTML-Datei,
     * überprüft ob sich ein Wert darin befindet und aktualisiert dann das Datum.
     */

    _datum_aktualisieren(){
        let datums_input = document.querySelector("#datum");
        if (datums_input !== null) {
            datums_input.valueAsDate = new Date();
        }
    }

    /**
     * Diese private Methode holt sich die ID "#eingabeformular", setzt für diese ID ein "submit"-Event und 
     * unterbindet die normale Funktion des Buttons. Die Daten werden aufgerufen, Eintraege werden hinzugefügt 
     * und auf Fehler geprüft (Fehler werden in die "bestehende_fehlerbox" geschrieben). 
     * Die Fehler werden angezeigt 
     * und danach wieder gelöscht.
     * Wenn keine Fehler bestehen werden die Eintraege dem "haushaltsbuch" hinzugefügt 
     * und das Datum wird aktualisiert,
     * sowie das "e.target"-Event resetet.
     * @param {EventListener} eingabeformular - Eingabeformular-Parameter für den EventListener
     */

    _absenden_event_hinzufuegen(eingabeformular) {
        eingabeformular.querySelector("#eingabeformular").addEventListener("submit", e => {
            e.preventDefault();
            let formulardaten = this._formulardaten_verarbeiten(this._formulardaten_holen(e));
            let formular_fehler = this._formulardaten_validieren(formulardaten);
            if(formular_fehler.length === 0){
                liqui_planner.eintrag_hinzufuegen(formulardaten);
                let bestehende_fehlerbox = document.querySelector(".fehlerbox");
                if (bestehende_fehlerbox !== null) {
                    bestehende_fehlerbox.remove();
                }          
                e.target.reset();
                this._datum_aktualisieren();
            }else{
                let fehler = new Fehlerbox("Folgende Felder wurden nicht korrekt ausgefüllt:", formular_fehler);
                fehler.anzeigen();
            }
        });
    }

    /**
     * Diese private Methode generiert das HTML für das Eingabeformular und ruft die Methode "_absenden_event_hinzufuegen(eingabeformular);" auf.
     * @returns {HTMLElement} - gibt das Eingabeformular wieder
     */

    _html_generieren() {
        let eingabeformular = document.createElement("section");
        eingabeformular.setAttribute("id", "eingabeformular-container");
        eingabeformular.innerHTML = `<form id="eingabeformular" action="#" method="get"></form>
        <div class="eingabeformular-zeile">
            <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
        </div>
        <div class="eingabeformular-zeile">
            <div class="titel-typ-eingabe-gruppe">
                <label for="titel">Titel</label>
                <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags">
                <input type="radio" id="einnahme" name="typ" value="einnahme" form="eingabeformular" title="Typ des Eintrags">
                <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
                <input type="radio" id="ausgabe" name="typ" value="ausgabe" form="eingabeformular" title="Typ des Eintrags" checked>
                <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="betrag">Betrag</label>
                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" min="0.01f" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)" >
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="datum" form="eingabeformular" size="10" title="Datum des Eintrags">
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
        </div>`;

        this._absenden_event_hinzufuegen(eingabeformular);

        return eingabeformular;
    }

    /**
     * Diese Methode holt sich das _html und integriert es in den body im HTML (Wird angezeigt).
     * Das Datum wird danach aktualisiert.
     */

    anzeigen(){
        let navigationsleiste = document.querySelector("#navigationsleiste");
        if (navigationsleiste !== null) {
            navigationsleiste.insertAdjacentElement("afterend", this._html);
            this._datum_aktualisieren();
        }
    } 
}