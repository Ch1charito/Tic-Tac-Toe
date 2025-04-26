// Tic Tac Toe Game

// Array für die Spielfelder, 9 Stück (alle leer = null)
let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

// Alle Gewinnkombinationen (3 Felder in einer Reihe, Spalte oder Diagonale)
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikal
    [0, 4, 8], [2, 4, 6], // diagonal
];

// aktueller Spieler: beginnt mit "circle"
let currentPlayer = 'circle';

// Initialisierungsfunktion beim Spielstart
function init() {
    render(); // baut das Spielfeld
}

// Funktion zum Erstellen der HTML-Tabelle
function render() {
    const contentDiv = document.getElementById('content'); // holt das Div-Element für das Spielfeld

    let tableHtml = '<table>'; // beginnt die Tabelle
    for (let i = 0; i < 3; i++) { // für jede Zeile
        tableHtml += '<tr>'; // beginnt eine neue Tabellenzeile
        for (let j = 0; j < 3; j++) { // für jede Spalte in der Zeile
            const index = i * 3 + j; // berechnet Index im Array
            let symbol = ''; // Standardmäßig ist kein Symbol drin
            if (fields[index] === 'circle') { // wenn Kreis eingetragen
                symbol = generateCircleSVG(); // hole SVG für Kreis
            } else if (fields[index] === 'cross') { // wenn Kreuz eingetragen
                symbol = generateCrossSVG(); // hole SVG für Kreuz
            }
            // Erzeugt eine Tabellenzelle mit dem Symbol und einem Klick-Handler
            tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += '</tr>'; // schließt die Tabellenzeile
    }
    tableHtml += '</table>'; // schließt die Tabelle

    contentDiv.innerHTML = tableHtml; // setzt die fertige Tabelle ins HTML
}

// Funktion zum Neustarten des Spiels
function restartGame(){
    fields = [ // setzt alle Felder wieder auf null (leer)
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    render(); // baut neues, leeres Spielfeld
}

// Funktion die aufgerufen wird, wenn ein Feld angeklickt wird
function handleClick(cell, index) {
    if (fields[index] === null) { // nur klicken, wenn Feld noch frei ist
        fields[index] = currentPlayer; // setzt aktuelles Symbol ins Array
        // setzt das passende Symbol (Kreis oder Kreuz) ins HTML der Zelle
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null; // entfernt das onclick, damit Feld nicht nochmal anklickbar ist
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // wechselt Spieler

        if (isGameFinished()) { // prüft, ob Spiel vorbei ist
            const winCombination = getWinningCombination(); // holt die Gewinnkombination
            drawWinningLine(winCombination); // zeichnet Gewinnlinie
        }
    }
}

// Prüft ob das Spiel vorbei ist (alle Felder voll oder Gewinner vorhanden)
function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}

// Gibt die Gewinnkombination zurück, falls jemand gewonnen hat
function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i]; // aktuelle Kombination holen
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) { // prüfen ob 3 gleiche Symbole
            return WINNING_COMBINATIONS[i]; // gibt die Gewinnkombination zurück
        }
    }
    return null; // wenn keine Gewinnkombination gefunden wird
}

// Funktion zum Erzeugen des SVG für Kreis
function generateCircleSVG() {
    const color = '#00B0EF'; // Farbe Blau
    const width = 70; // Breite SVG
    const height = 70; // Höhe SVG

    return `<svg width="${width}" height="${height}">
              <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
              </circle>
            </svg>`; // zeichnet animierten Kreis
}

// Funktion zum Erzeugen des SVG für Kreuz
function generateCrossSVG() {
    const color = '#FFC000'; // Farbe Gelb
    const width = 70; // Breite SVG
    const height = 70; // Höhe SVG

    const svgHtml = `
      <svg width="${width}" height="${height}">
        <line x1="0" y1="0" x2="${width}" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="0; ${width}" dur="200ms" />
          <animate attributeName="y2" values="0; ${height}" dur="200ms" />
        </line>
        <line x1="${width}" y1="0" x2="0" y2="${height}"
          stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="${width}; 0" dur="200ms" />
          <animate attributeName="y2" values="0; ${height}" dur="200ms" />
        </line>
      </svg>
    `; // zeichnet zwei animierte Linien zum Kreuz

    return svgHtml; // gibt SVG-HTML für Kreuz zurück
}

// Zeichnet eine weiße Linie durch die 3 gewonnenen Felder
function drawWinningLine(combination) {
    const lineColor = '#ffffff'; // Farbe der Gewinnlinie
    const lineWidth = 5; // Dicke der Linie

    const startCell = document.querySelectorAll(`td`)[combination[0]]; // Startfeld
    const endCell = document.querySelectorAll(`td`)[combination[2]]; // Endfeld

    const startRect = startCell.getBoundingClientRect(); // Position und Größe Startfeld
    const endRect = endCell.getBoundingClientRect(); // Position und Größe Endfeld
    const contentRect = document.getElementById('content').getBoundingClientRect(); // Position des gesamten Content-Divs

    // Länge der Linie berechnen (Pythagoras)
    const lineLength = Math.sqrt(
      Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    // Winkel der Linie berechnen
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div'); // neues Div für die Linie erstellen
    line.style.position = 'absolute'; // absolute Positionierung
    line.style.width = `${lineLength}px`; // Länge der Linie
    line.style.height = `${lineWidth}px`; // Höhe der Linie
    line.style.backgroundColor = lineColor; // weiße Farbe
    // Setzt die Linie genau auf das erste Feld
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    // dreht die Linie im richtigen Winkel
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`; // Drehpunkt ist die obere linke Ecke
    document.getElementById('content').appendChild(line); // fügt die Linie ins Content-Div ein
}

