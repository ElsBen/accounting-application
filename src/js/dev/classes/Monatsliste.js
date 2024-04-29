
/**
 * Das Modul "Monatsliste" stellt die Klasse "Monatsliste" zur Verfügung.
 * @module classes/Monatsliste
 */

/**
 * Die Klasse "Monatsliste" stellt alle Eigenschaften 
 * und Methoden eines Monatsliste (inkl. HTML und Events) zur Verfügung.
 */

export default class Monatsliste {

    /**
     * Der Konstruktor generiert bei Instanziierung der Klasse "Monatsliste" 
     * anhand der u.g. Parameter ein Monatslisten-Objekt mit den u.g. Eigenschaften.
     * @param {Number} jahr - Jahr des Eintrags bzw. der Transaktion
     * @param {Number} monat - Monat des Eintrags bzw. der Transaktion
     * @prop {Number} _jahr - Jahr des Eintrags bzw. der Transaktion
     * @prop {Number} _monat - Monat des Eintrags bzw. der Transaktion
     * @prop {Object} _eintraege - Objekt-Array mit den Eintragsdaten 
     * @prop {Number} _bilanz - Eigenschaft "_bilanz" enthält die Bilanz für die Monatsliste
     * @prop {HTMLElement} _html - das HTML der Monatsliste
     */

    constructor(jahr, monat) {
        this._jahr = jahr;
        this._monat = monat;
        this._eintraege = [];
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    /**
     * Diese Methode gibt die Private Eigenschaft "_monat" zurück.
     * @returns {Number} - gibt die Zahl des Transaktionsmonats zurück
     */

    monat() {
        return this._monat;
    }

    /**
     * Diese Methode gibt die Private Eigenschaft "_jahr" zurück.
     * @returns {Number} - gibt die Zahl für das Transaktionsjahr zurück
     */

    jahr() {
        return this._jahr;
    } 

    /**
     * Diese Methode gibt die Private Eigenschaft "_html" zurück.
     * @returns {HTMLElement} - enthält das HTML für die Monatsliste
     */

    html() {
        return this._html;
    }

    /**
     * Diese Methode fügt den Eintrag in das "_eintraege []" Array und führt die Methode "_aktualisieren" aus.
     * @param {Number} eintrag - enthält die Eintragsdaten der Monatsliste
     */

    eintrag_hinzufuegen(eintrag) {
        this._eintraege.push(eintrag); 
        this._aktualisieren();
    }

    /**
     * Diese Methode sortiert die Einträge absteigender Reihenfolge.
     */

    _eintraege_sortieren() {
        this._eintraege.sort((eintrag_a, eintrag_b) => {
            if (eintrag_a.datum() > eintrag_b.datum()) {
                return -1;
            } else if (eintrag_a.datum() < eintrag_b.datum()) {
                return 1;
            } else {
                if (eintrag_a.timestamp() > eintrag_b.timestamp()) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
    }

    /**
     * Diese Methode iteriert über die Einträge, holt sich die "einnahmen" oder "ausgaben" 
     * und errechnet anhand des eingetragenen Typs die Bilanz für die Monatsliste.
     * @prop {Number} monatsbilanz - enthält die Bilanz für die Monatsliste
     */

    _bilanzieren() {
        let monatsbilanz = 0;
        this._eintraege.forEach(eintrag => {
            if (eintrag.typ() === "einnahme") {
                monatsbilanz += eintrag.betrag();
            } else {
                monatsbilanz -= eintrag.betrag();
            }
        });
        this._bilanz = monatsbilanz;
    }

    /**
     * Diese Methode generiert das HTML für die Monatsliste und gibt diese dann zurück.
     * @returns {HTMLElement} - beiinhaltet das HTML der Monatsliste
     */

    _html_generieren() {
        let monatsliste = document.createElement("article");
        monatsliste.setAttribute("class", "monatsliste");

        let ueberschrift = document.createElement("h2");

        let monat_jahr = document.createElement("span");
        monat_jahr.setAttribute("class", "monat-jahr");
        monat_jahr.textContent = `${new Date(this._jahr, this._monat - 1).toLocaleString("de-DE", {
            month: "long",
            year: "numeric"
        })}`;
        ueberschrift.insertAdjacentElement("afterbegin", monat_jahr);

        let monatsbilanz = document.createElement("span");
        if (this._bilanz >= 0) {
            monatsbilanz.setAttribute("class", "monatsbilanz positiv");
        } else {
            monatsbilanz.setAttribute("class", "monatsbilanz negativ");
        }
        monatsbilanz.textContent = `${(this._bilanz / 100).toFixed(2).replace(/\./, ",")} €`;
        ueberschrift.insertAdjacentElement("beforeend", monatsbilanz);

        monatsliste.insertAdjacentElement("afterbegin", ueberschrift);

        let eintragsliste = document.createElement("ul");
        this._eintraege.forEach(eintrag => eintragsliste.insertAdjacentElement("beforeend", eintrag.html()));
        monatsliste.insertAdjacentElement("beforeend", eintragsliste);

        return monatsliste;
    }

    /**
     * Diese Methode ruft die Methoden "_eintraege_sortieren, _bilanzieren, _html_generieren" auf 
     * und aktualisiert die Monatsliste.
     */

    _aktualisieren() {
        this._eintraege_sortieren();
        this._bilanzieren();
        this._html = this._html_generieren();
    }
}