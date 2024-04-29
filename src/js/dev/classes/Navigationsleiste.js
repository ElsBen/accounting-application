
/**
 * Das Modul "Navigationsleiste" stellt die Klasse "Navigationsleiste" zur Verfügung.
 * @module classes/Navigationsleiste
 */

/**
 * Die Klasse "Navigationsleiste" stellt alle Eigenschaften 
 * und Methoden der Navigationsleiste (inkl. HTML und Events) zur Verfügung.
 */

export default class Navigationsleiste {

    /**
     * Der Konstruktor generiert bei instanziierung das HTML der Navigationsleiste.
     * @prop {HTMLElement} _html - das HTML der Navigationsleiste
     */

    constructor() {
        this._html = this._html_generieren();
    }

    /**
     * Diese Private Methode generiert das HTML der Navigationsleiste.
     * @prop {HTMLElement} navigationsleiste - ein <nav> welches den "anker" und die "span" beinhaltet
     * @prop {HTMLElement} anker - ein <a> welches die "span" beinhaltet
     * @prop {HTMLElement} span - eine <span> welches den Markennamen beinhaltet
     * @returns {HTMLElement} - gibt das HTML der Navigationsleiste wieder
     */

    _html_generieren() {
        let navigationsleiste = document.createElement("nav");
        navigationsleiste.setAttribute("id", "navigationsleiste");

        let anker = document.createElement("a");
        anker.setAttribute("href", "#");

        let span = document.createElement("span");
        span.setAttribute("id", "markenname");
        span.textContent = "Liqui-Planner";
        anker.insertAdjacentElement("afterbegin", span);

        navigationsleiste.insertAdjacentElement("afterbegin", anker);

        return navigationsleiste;
    }

    /**
     * Diese Methode fügt das HTML in den "body" ein und zeigt ihn an.
     * @prop {HTMLElement} body - beinhaltet den "body"
     */

    anzeigen() {
        let body = document.querySelector("body");
        if (body !== null) {
            body.insertAdjacentElement("afterbegin", this._html);
        }
    }
}