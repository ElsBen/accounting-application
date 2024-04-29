
/**
 * Das Modul "Eintrag" stellt die Klasse "Eintrag" zur verfügung.
 * @module classes/Eintrag
 */

import liqui_planner from "../liqui-planner.js";

/**
 * Die Klasse "Eintrag" stellt alle Eigenschaften 
 * und Methoden eines Eintrags (inkl. HTML und Events) zur Verfügung.
 */

export default class Eintrag {

    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Eintrag" 
     * anhand der u.g. Parameter ein Eintrags-Objekt mit den u.g. Eigenschaften.
     * @param {String} titel - der Titel des Eintrags 
     * @param {Number} betrag - der Betrag des Eintrags (in Cent, ganzzahlig)
     * @param {String} typ - der Typ des Eintrags (entweder "einnahme" oder "ausgabe")
     * @param {Date} datum - das Datum des Eintrags 
     * @prop {String} _titel - der Titel des Eintrags
     * @prop {Number} _betrag - der Betrag des Eintrags (in Cent, ganzzahlig)
     * @prop {String} _typ - der Typ des Eintrags (entweder "einnahme" oder "ausgabe")
     * @prop {Date} _datum - das Datum des Eintrags 
     * @prop {Number} _timestamp - der Unix-Zeitstempel der Instanziierung des Eintrags (dient als ID)
     * @prop {Element} _html - das HTML des Eintrags
     */

    constructor(titel, betrag, typ, datum) {
        this._titel = titel;
        this._betrag = betrag;
        this._typ = typ;
        this._datum = datum;
        this._timestamp = Date.now();
        this._html = this._html_generieren();
    }

    /**
     * Diese Methode gibt den Titel des Eintrags wieder.
     * @returns {String} - gibt den Titel zurück
     */

    titel() {
        return this._titel;
    }

    /**
     * Diese Methode gibt den Betrag des Eintrags wieder.
     * @returns {Number} - gibt den Betrag zurück
     */

    betrag() {
        return this._betrag;
    }

    /**
     * Diese Methode gibt den Typ des Eintrags wieder.
     * @returns {String} - gibt den Typ zurück ("einnahme" oder "ausgabe")
     */

    typ() {
        return this._typ;
    }

    /**
     * Diese Methode gibt das Datum unseres Eintrags wieder.
     * @returns {Date} - gibt das Datum zurück
     */

    datum() {
        return this._datum;
    }

    /**
     * Diese Methode gibt den Zeitstempel des Eintrags wieder.
     * @returns {Number} - gibt den Zeitstempel für den Eintrag zurück (ID des Eintrags)
     */

    timestamp() {
        return this._timestamp;
    }

    /**
     * Diese Methode gibt das gibt das HTML des Eintrags wieder. 
     * @returns {HTMLLIElement} - gibt das HTML zurück
     */

    html() {
        return this._html;
    }

    /**
     * Diese Methode generiert das HTML für den Eintrag und gibt den "listenpunkt" zurück.
     * @returns {HTMLLIElement} - gibt den "listenpunkt" zurück
     */

    _html_generieren() {
        let listenpunkt = document.createElement("li");
        this._typ === "einnahme" ? listenpunkt.setAttribute("class", "einnahme") : listenpunkt.setAttribute("class", "ausgabe");
        listenpunkt.setAttribute("data-timestamp", this._timestamp);

        let datum = document.createElement("span");
        datum.setAttribute("class", "datum");
        datum.textContent = this._datum.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        listenpunkt.insertAdjacentElement("afterbegin", datum);

        let titel = document.createElement("span");
        titel.setAttribute("class", "titel");
        titel.textContent = this._titel;
        datum.insertAdjacentElement("afterend", titel);

        let betrag = document.createElement("span");
        betrag.setAttribute("class", "betrag");
        betrag.textContent = `${(this._betrag / 100).toFixed(2).replace(/ \./, ",")} €`;
        titel.insertAdjacentElement("afterend", betrag);

        let button = document.createElement("button");
        button.setAttribute("class", "entfernen-button");
        betrag.insertAdjacentElement("afterend", button);

        let icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-trash");
        button.insertAdjacentElement("afterbegin", icon);
        
        this._eintrag_entfernen_event_hinzufuegen(listenpunkt);

        return listenpunkt
    }

    /**
     * Diese Methode mit dem Parameter "listenpunkt" setzt für den Eintrag "entfernen-button" ein "click-Event" 
     * und entfernt in der Funktion mittels Zeitstempel (hier eingesetzt als ID) den Eintrag.   
     * @param {Event} listenpunkt - der "listenpunkt" erhält das Event und übergibt der Funktion den Timestamp
     */

    _eintrag_entfernen_event_hinzufuegen(listenpunkt) {
        listenpunkt.querySelector(".entfernen-button").addEventListener("click", e => {
            let timestamp = e.target.parentElement.getAttribute("data-timestamp");
            liqui_planner.eintrag_entfernen(timestamp);
        });
    }
}