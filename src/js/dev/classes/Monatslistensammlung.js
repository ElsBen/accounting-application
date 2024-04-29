
/**
 * Das Modul "Monatslistensammlung" stellt die Klasse "Monatslistensammlung" zur Verfügung.
 * @module classes/Monatslistensammlung
 */

import Monatsliste from "./Monatsliste.js";

/**
 * Die Klasse "Monatslistensammlung" stellt alle Eigenschaften 
 * und Methoden eines Monatslistensammlung (inkl. HTML und Events) zur Verfügung.
 */

export default class Monatslistensammlung {

    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Monatslistensammlung" ein Objekt "_monatslisten"
     * und das HTML der Monatslistensammlung.
     * @prop {Object} _monatslisten - enthält Monatslisten für die Monatslistensammlung
     * @prop {HTMLElement} _html - enthält das HTML für die Monatslistensammlung
     */

    constructor() {
        this._monatslisten = [];
        this._html = this._html_generieren();
    }

    /**
     * Diese Methode überprüft ob der Eintrags-Monat und -Jahr mit dem Monatsliste-Monat und -Jahr übereinstimmt, 
     * bei übereinstimmung wird der Eintrag in die entsprechende Monatsliste hinzugefügt.
     * @param {Objekt} eintrag - enthält den Monat und das Jahr des Eintrags
     * @prop {Number} eintragsmonat - bekommt den Monat nummerisch übergeben
     * @prop {Number} eintragsjahr - bekommt das Jahr nummerisch übergeben
     * @prop {Bolean} monatsliste_vorhanden - bekommt einen Wahrheitswert (true/false) übergeben
     */

    _eintrag_hinzufuegen(eintrag) {
        let eintragsmonat = eintrag.datum().toLocaleString("de-DE", {month: "numeric"});
        let eintragsjahr = eintrag.datum().toLocaleString("de-DE", {year: "numeric"});
        let monatsliste_vorhanden = false;
        this._monatslisten.forEach(monatsliste => {
            if (eintragsmonat === monatsliste.monat() && eintragsjahr === monatsliste.jahr()) {
                monatsliste.eintrag_hinzufuegen(eintrag);
                monatsliste_vorhanden = true;
            }
        }); 
        if (!monatsliste_vorhanden) {
            this._monatsliste_hinzufuegen(eintragsjahr, eintragsmonat, eintrag);
        }
    }

    /**
     * Diese Methode bekommt drei Parameter übergeben "jahr, monat, eintrag".
     * Die beiden Parameter "jahr und monat" werden an die Monatsliste übergeben 
     * und als "neue_monatsliste" in das Objekt "_monatslisten" gepushed. 
     * @param {*} jahr 
     * @param {*} monat 
     * @param {*} eintrag 
     */

    _monatsliste_hinzufuegen(jahr, monat, eintrag) {
        let neue_monatsliste = new Monatsliste(jahr, monat); 
        neue_monatsliste.eintrag_hinzufuegen(eintrag);
        this._monatslisten.push(neue_monatsliste);
    }

    /**
     * Diese Methode sortiert die Monatslisten nach Jahr und Monat in absteigender Reihenfolge.
     */
    
    _monatslisten_sortieren() {
        this._monatslisten.sort((monatsliste_a, monatsliste_b) => {
            if (monatsliste_a.jahr() < monatsliste_b.jahr()) {
                return 1;
            } else if (monatsliste_a.jahr() > monatsliste_b.jahr()) {
                return -1;
            } else {
                if (monatsliste_a.monat() < monatsliste_b.monat()) {
                    return 1;
                } else {
                    return -1;
                }
            }
        });
    }

    /**
     * Diese Methode erstellt das HTML für die Monatslistensammlung und passt die Einträge ggf. an.
     * @prop {HTMLSectionElement} monatslisten - beinhaltet dein HTML-Section Tag
     * @returns {HTMLElement} - gibt das HTML zurück
     */

    _html_generieren() {
        let monatslisten = document.createElement("section");
        monatslisten.setAttribute("id", "monatslisten");

        this._monatslisten.forEach(monatsliste => {
            monatslisten.insertAdjacentElement("beforeend", monatsliste.html());
        });
        return monatslisten;
    }

    /**
     * Diese Methode leert das "_monatslisten" Objekt, iteriert über die "eintraege" und fügt den Eintrag hinzu.
     * Die Methode "_monatslisten_sortieren" wird aufgerufen, das HTML wird generiert und die Methode "angezeigen" aufgerufen. 
     * @param {Object} eintraege - hält die Einträge zum hinzufügen bereit 
     */

    aktualisieren(eintraege) {
        this._monatslisten = [];
        eintraege.forEach(eintrag => {this._eintrag_hinzufuegen(eintrag)});
        this._monatslisten_sortieren();
        this._html = this._html_generieren();
        this.anzeigen();
    }

    /**
     * Diese Private Methode entfernt eine bereits bestehende Monatslistensammlung, wenn vorhanden.
     */

    _entfernen() {
        let monatslistensammlung = document.querySelector("#monatslisten");
        if (monatslistensammlung !== null) {
            monatslistensammlung.remove();
        }
    }

    /**
     * Diese Methode fügt das HTML in das Eingabeformular ein und zeigt es so an.
     * @prop {HTMLElement} eingabeformular_container - enthält das HTML der ID "#eingabeformular-container"
     * @prop {HTMLElement} monatslistensammlung - enthält das HTML der ID "#monatslisten"
     */

    anzeigen() {
        let eingabeformular_container = document.querySelector("#eingabeformular-container");
        if (eingabeformular_container !== null) {
            this._entfernen();
            eingabeformular_container.insertAdjacentElement("afterend", this._html);
        }
    }
}