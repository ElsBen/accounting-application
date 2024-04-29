
/**
 * Das Modul "Haushaltsbuch" stellt die Klasse "Haushaltsbuch" zur Verfügung.
 * @module classes/Haushaltsbuch
 */

import Navigationsleiste from "./Navigationsleiste.js";
import Eingabeformular from "./Eingabeformular.js";
import Monatslistensammlung from "./Monatslistensammlung.js";
import Gesamtbilanz from "./Gesamtbilanz.js";
import Eintrag from "./Eintrag.js";

/**
 * Die Klasse "Haushaltsbuch" stellt alle Eigenschaften 
 * und Methoden eines Haushaltsbuch (inkl. HTML und Events) zur Verfügung.
 */

export default class Haushaltsbuch {

    /**
     * Der Konstruktor der Klasse Haushaltsbuch generiert ein Eintraege-Array,
     * generiert und Instanziiert die anderen Klassen in die Privaten-Eigenschaften 
     * und ruft dann die Methode "_wiederherstellen" auf.
     * @prop {class} _navigationsleiste - beinhaltet die Klasse "Navigationsleiste" 
     * @prop {class} _eingabeformular - beinhaltet die Klasse "Eingabeformular"
     * @prop {class} _monatslistensammlung - beinhaltet die Klasse "Monatslistensammlung"
     * @prop {class} _gesamtbilanz - beinhaltet die Klasse "Gesamtbilanz"
     */

    constructor() {
        this._eintraege = [];
        this._navigationsleiste = new Navigationsleiste();
        this._eingabeformular = new Eingabeformular();
        this._monatslistensammlung = new Monatslistensammlung();
        this._gesamtbilanz = new Gesamtbilanz();
        this._wiederherstellen();
    }

    /**
     * Diese Methode bekommt denn Parameter "eintragsdaten" übergeben, 
     * mit dem auf "titel, betrag, typ, datum" zugegriffen wird 
     * und pushed diese Einträge dann in die Klasse Eintrag.
     * Monatslistensammlung, Gesantbilanz werden aktualisiert 
     * und die Methode "speichern" wird aufgerufen.
     * @param {class} eintragsdaten - eintragsdaten für titel, betrag, typ, datum
     */

    eintrag_hinzufuegen(eintragsdaten) {
        let neuer_eintrag = new Eintrag(
            eintragsdaten.titel, 
            eintragsdaten.betrag, 
            eintragsdaten.typ, 
            eintragsdaten.datum
        );
        this._eintraege.push(neuer_eintrag);
        this._monatslistensammlung.aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege);
        this._speichern();
    }

    /**
     * Diese Methode erhält den Parameter "timestamp",
     * iteriert über die Einträge, 
     * gleicht den Zeitstempel (ID) mit dem zu löschenden Eintrag ab 
     * und entfernt bei übereinstimmung diesen Eintrag.
     * Monatslistensammlung und Gesamtbilanz werden aktualisiert 
     * und die Methode "speichern" wird aufgerufen.
     * @param {String} timestamp - erhält den Zeitstempel des Eintrags
     */

    eintrag_entfernen(timestamp) {
        let start_index;
        for (let i = 0; i < this._eintraege.length; i++) {
            if (this._eintraege[i].timestamp() === parseInt(timestamp)) {
                start_index = i;
                break;
            }
        }
        this._eintraege.splice(start_index, 1);
        this._monatslistensammlung.aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege);
        this._speichern();
    }

    /**
     * Diese Methode überträgt den Wert "einträge" 
     * und den aus einem JSON convertierten String (this._entraege) in den Local-Storage.
     */

    _speichern() {
        localStorage.setItem("eintraege", JSON.stringify(this._eintraege));
    }

    /**
     * Diese Methode stellt die gespeicherten Eintraege aus einem JSON im LocalStorage wieder her
     * und fügt diese wieder hinzu.
     */

    _wiederherstellen() {
        let gespeicherte_eintraege = localStorage.getItem("eintraege");
        if (gespeicherte_eintraege !== null) {
            JSON.parse(gespeicherte_eintraege).forEach(eintrag => {
                this.eintrag_hinzufuegen({
                    titel: eintrag._titel,
                    betrag: eintrag._betrag,
                    typ: eintrag._typ,
                    datum: new Date(eintrag._datum)
                });
            });
        }
    }

    /**
     * Diese Methode startet die Klassen "Navigationsleiste, Eingabeformular, Monatslistensammlung, Gesamtbilanz"
     * und zeigt diese an.
     */

    start() {
        this._navigationsleiste.anzeigen();
        this._eingabeformular.anzeigen();
        this._monatslistensammlung.anzeigen();
        this._gesamtbilanz.anzeigen();
    }
}