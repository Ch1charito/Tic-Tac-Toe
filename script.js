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

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');

    let html = '<table>';
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const symbol = fields[index] ? fields[index] : '';
            html += `<td onclick="handleClick(${index})">${symbol}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    contentDiv.innerHTML = html;
}
