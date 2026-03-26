const btn = document.getElementById("adicionarProc");
const container = document.querySelector(".import");

// carregar dados salvos
let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

render();

btn.addEventListener("click", () => {
    const novo = {
        duimp: document.getElementById("duimp").value,
        pinterno: document.getElementById("pinterno").value,
        proc: document.getElementById("proc").value,
        bl: document.getElementById("bl").value,
        ncnt: document.getElementById("ncnt").value,
        motorista: document.getElementById("motorista").value,
        placa: document.getElementById("placa").value,
        nf: document.getElementById("nf").value,
        data: document.getElementById("data").value,
        hora: document.getElementById("hora").value
    };

    agendamentos.push(novo);

    // salva no navegador
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    // 👇 gera backup automático
    salvarBackupJSON();

    render();
});

function render() {
    container.innerHTML = "";

    agendamentos.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <div class="card-grid">
                <p><span>DUIMP:</span> ${item.duimp}</p>
                <p><span>Proc. interno:</span> ${item.pinterno}</p>
                <p><span>PROC:</span> ${item.proc}</p>
                <p><span>BL:</span> ${item.bl}</p>
                <p><span>Container:</span> ${item.ncnt}</p>
                <p><span>Motorista:</span> ${item.motorista}</p>
                <p><span>Placa:</span> ${item.placa}</p>
                <p><span>NF:</span> ${item.nf}</p>
                <p class="full"><span>Agendamento:</span> ${item.data} ${item.hora}</p>
            </div>

            <div class="card-actions">
                <button class="btn-remover" onclick="remover(${index})">
                    Remover
                </button>
            </div>
        `;

        container.appendChild(div);
    });
}

function remover(index) {
    agendamentos.splice(index, 1);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
    salvarBackupJSON();
    render();
}

// 🔥 FUNÇÃO DE BACKUP
function salvarBackupJSON() {
    const data = JSON.stringify(agendamentos, null, 2);
    const blob = new Blob([data], { type: "application/json" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "agendamentos_backup.json";

    a.click();
}