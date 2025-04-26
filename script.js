let fields = [
  null, //0
  null, //1
  null, //2
  null, //3
  null, //4
  null, //5
  null, //6
  null, //7
  null, //8
];


// Legt fest, welches Symbol als Nächstes gesetzt wird ("circle" startet)
let currentShape = "circle";

// Startfunktion, die beim Laden der Seite aufgerufen wird
function init() {
  render(); // Baut das Spielfeld im HTML auf
}

// Baut das Spielfeld (HTML-Tabelle) dynamisch aus dem fields-Array auf
function render() {
  const contentDiv = document.getElementById("content"); // Holt den Container-DIV, in den die Tabelle eingefügt wird

  let tableHtml = "<table>"; // Start des Tabellen-HTML-Codes
  for (let i = 0; i < 3; i++) { // Schleife über die 3 Tabellenzeilen (i = 0,1,2)
    tableHtml += "<tr>"; // Neue Tabellenzeile beginnen
    for (let j = 0; j < 3; j++) { // Schleife über die 3 Spalten pro Zeile (j = 0,1,2)
      const index = i * 3 + j; // Berechnet den Index im fields-Array (Zeile * 3 + Spalte)
      let symbol = ""; // Standardmäßig kein Symbol
      if (fields[index] === "circle") { // Wenn im Feld ein "circle" steht
        symbol = generateCircleSVG(); // Dann hole den SVG-Code für Kreis
      } else if (fields[index] === "cross") { // Wenn im Feld ein "cross" steht
        symbol = generateCrossSVG(); // Dann hole den SVG-Code für Kreuz
      }
      // Baut das Tabellenfeld auf. Fügt das aktuelle Symbol ein und bindet ein onclick-Event, das handleClick(index, this) ausführt
      tableHtml += `<td onclick="handleClick(${index}, this)">${symbol}</td>`;
    }
    tableHtml += "</tr>"; // Tabellenzeile abschließen
  }
  tableHtml += "</table>"; // Tabelle abschließen
  contentDiv.innerHTML = tableHtml; // Ganze Tabelle in den Content-DIV einfügen
}

// Wird aufgerufen, wenn ein Tabellenfeld (td) angeklickt wird
function handleClick(index, tdElement) {
  if (!fields[index]) { // Prüfen, ob das Feld noch leer ist
    fields[index] = currentShape; // Setzt das aktuelle Symbol ("circle" oder "cross") in das fields-Array an die passende Stelle
    if (currentShape === "circle") { // Wenn aktuelles Symbol ein Kreis ist
      tdElement.innerHTML = generateCircleSVG(); // Dann SVG-Kreis ins angeklickte <td> einfügen
      currentShape = "cross"; // Danach wechseln auf "cross" für den nächsten Zug
    } else { // Wenn aktuelles Symbol ein Kreuz ist
      tdElement.innerHTML = generateCrossSVG(); // Dann SVG-Kreuz ins angeklickte <td> einfügen
      currentShape = "circle"; // Danach wechseln auf "circle" für den nächsten Zug
    }
    tdElement.onclick = null; // Entfernt das onclick-Attribut vom angeklickten <td>, damit man es nicht nochmal anklicken kann
  }
}

function generateCircleSVG() {
  const color = "#00B0EF";
  const width = 70;
  const height = 70;

  const radius = width / 2 - 2; // passt besser zum Viewport
  const circumference = 2 * Math.PI * radius;

  const svgHTML = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                            <circle 
                                cx="${width / 2}" 
                                cy="${height / 2}" 
                                r="${radius}"
                                fill="none"
                                stroke="${color}"
                                stroke-width="4"
                                stroke-dasharray="${circumference}"
                                stroke-dashoffset="${circumference}">
                                <animate 
                                    attributeName="stroke-dashoffset" 
                                    from="${circumference}" 
                                    to="0" 
                                    dur="200ms" 
                                    fill="freeze" />
                            </circle>
                        </svg>`;

  return svgHTML;
}

function generateCrossSVG() {
  const color = "#FFC000";
  const width = 70;
  const height = 70;

  const diagonalLength = Math.sqrt(2 * Math.pow(width, 2)); // für stroke-dasharray

  const svgHTML = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0" y1="0" x2="${width}" y2="${height}"
                                  stroke="${color}" stroke-width="8" stroke-linecap="round"
                                  stroke-dasharray="${diagonalLength}" stroke-dashoffset="${diagonalLength}">
                                <animate attributeName="stroke-dashoffset"
                                         from="${diagonalLength}" to="0"
                                         dur="100ms" fill="freeze" />
                            </line>
                            <line x1="${width}" y1="0" x2="0" y2="${height}"
                                  stroke="${color}" stroke-width="8" stroke-linecap="round"
                                  stroke-dasharray="${diagonalLength}" stroke-dashoffset="${diagonalLength}">
                                <animate attributeName="stroke-dashoffset"
                                         from="${diagonalLength}" to="0"
                                         begin="100ms"
                                         dur="100ms" fill="freeze" />
                            </line>
                        </svg>`;

  return svgHTML;
}
