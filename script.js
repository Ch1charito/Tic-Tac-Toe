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
                symbol = 'o';
            } else if(fields[index] === 'cross'){
                symbol = 'x';
            }
            tableHtml += `<td>${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
}
