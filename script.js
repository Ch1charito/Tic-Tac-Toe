let fields = [
    null, //0
    'circle', //1
    'cross', //2
    null, //3
    null, //4
    null, //5
    null, //6
    null, //7
    null, //8
];

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');

    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if(fields[index] === 'cross'){
                symbol = generateCrossSVG();
            }
            tableHtml += `<td>${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}


/* function generateCircleSVG() {
    const color = '#00B0EF';
    const width = 70;
    const height = 70;

    const svgHTML = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 2}"
                            stroke="${color}" stroke-width="2" fill="none"/>
                        <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 2}"
                            stroke="none" fill="${color}">
                            <animate attributeName="r" values="0; ${width / 2 - 2}" dur="200ms" fill="freeze" />
                            <animate attributeName="opacity" values="0;1" dur="200ms" fill="freeze" />
                        </circle>
                    </svg>`;
    
    return svgHTML;
} */

    function generateCircleSVG() {
        const color = '#00B0EF';
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
        const color = '#FFC000';
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
    

/* function generateCrossSVG() {
    const color = '#FFC000';
    const width = 70;
    const height = 70;

    const svgHTML = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="${color}" stroke-width="8" stroke-linecap="round" opacity="0" transform="scale(0.5)" transform-origin="center">
                            <line x1="20" y1="20" x2="50" y2="50" />
                            <line x1="50" y1="20" x2="20" y2="50" />
                            <animateTransform attributeName="transform"
                                              type="scale"
                                              from="0" to="1"
                                              dur="200ms" fill="freeze" />
                            <animate attributeName="opacity"
                                     from="0" to="1"
                                     dur="200ms" fill="freeze" />
                        </g>
                    </svg>`;

    return svgHTML;
} */

