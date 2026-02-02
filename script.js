
const CHECKLIST = [
    "O Técnico esqueceu de anexar alguma foto necessária?",
    "Foi necessária solicitar ao técnico a liberação do acesso remoto?",
    "Precisou cobrar alguma configuração interna do roteador para o técnico? (IPV6, DHCPV6, TR069, etc.)",
    "A conexão estava offline no momento da validação?",
    "Os equipamentos foram alocados corretamente?"
  
];

const CHECKLIST_divergencia = [
    "Algum erro foi apresentado na Foto do SINAL INTERNO?",
    "Algum erro foi apresentado na Foto do LOCAL DO EQUIPAMENTO?",
    "Algum erro foi apresentado na Foto do TESTE DE VELOCIDADE?",
    "O serviço possui necessidade das fotos externas?",
    "Algum erro foi apresentado na Foto do SINAL EXTERNO?",
    "Algum erro foi apresentado na Foto da CTO?",
    "Ficou algum cliente OFF na CTO após o serviço?"
];

const CHECKLIST_tecnico = [
    "Sinal externo (Foto final):",
    "Sinal Interno (Foto final):",
    "Sinal UNM:",
    "Média da CTO:",
    "IP de conexão:"
];



const tbody = document.getElementById("tabela-CHECKLIST-GERAL");

const tbody_1 = document.getElementById("dados-tecnicos");

const tbody_2 = document.getElementById("divergencia");






function criar_tabelas(teste_1,teste_2,teste_3) {
    teste_1.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="produto">${item}</td>
            <td class= "sim_bt"><input type="radio" name="${teste_2}-${index}" value="Sim"></td>
            <td class= "nao_bt"><input type="radio" name="${teste_2}-${index}" value="Não"></td>
            <td><textarea></textarea></td>
        `;
        teste_3.appendChild(tr);
    });

}


function criar_tabelas_1(teste_1,teste_2) {
    
    teste_1.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="produto">${item}</td>
            <td colspan="3"><textarea></textarea></td>
        `;
        teste_2.appendChild(tr);
        });

}



function coletarDados_1(teste_1,teste_2,teste_3) {
    let texto = "";

    teste_1.querySelectorAll("tr").forEach((linha, index) => {
        const resposta = linha.querySelector(`input[name="${teste_2}-${index}"]:checked`);
        const obs = linha.querySelector("textarea")?.value || "";

        
        texto += `${teste_3[index]}\n`;
        texto += `Resposta: ${resposta ? resposta.value : "Não informado"}\n`;
        texto += `Observação: ${obs || "Nenhuma"}\n`;
        texto += "------------------------------------------\n";
      
    });
    return texto
}


function coletarDados_2(teste_1,teste_2) {
    let texto = "";

     teste_1.querySelectorAll("tr").forEach((linha, index ) => {
        
        const obs = linha.querySelector("textarea")?.value || "";

        
        texto += `${teste_2[index ]} ${obs || "Não informado"}\n`;
        texto += "------------------------------------------\n";
      
    });
    return texto
}




function gerar_tabelas(){
    criar_tabelas(CHECKLIST, "checklist", tbody);
    criar_tabelas(CHECKLIST_divergencia, "divergencia", tbody_2);
    criar_tabelas_1(CHECKLIST_tecnico, tbody_1);


}

function coletarDados() {
    document.getElementById("blocoNotas").value = texto;

}



gerar_tabelas()

function aplicarPadrao() {

    // CHECKLIST GERAL
    tbody.querySelectorAll("tr").forEach((linha, index) => {
        const sim = linha.querySelector('input[value="Sim"]');
        const nao = linha.querySelector('input[value="Não"]');

        if (index < 4) {
            nao.checked = true;   // primeiros 4 = Não
        } else {
            sim.checked = true;   // resto = Sim
        }
    });

    
    tbody_2.querySelectorAll("tr").forEach((linha, index) => {
        const nao = linha.querySelector('input[value="Não"]');
        const sim = linha.querySelector('input[value="Sim"]');
        nao.checked = true;

         if (index == 3) {
            sim.checked = true;   // primeiros 4 = Não
        } 
    
    });

    // DADOS TÉCNICOS → preencher com S/N
    tbody_1.querySelectorAll("tr").forEach((linha) => {
        const textarea = linha.querySelector("textarea");
        textarea.value = "S/N";
    });
}

function limparTudo() {

    // Limpa radios (Sim / Não) - checklist geral e divergências
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    // Limpa todos os textareas
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = "";
    });

    // Limpa bloco de notas
    document.getElementById("blocoNotas").value = "";
}




function coletarDados() {
    let texto = "";

    texto += coletarDados_1(tbody, "checklist", CHECKLIST);
    texto += coletarDados_1(tbody_2, "divergencia", CHECKLIST_divergencia);
    texto += coletarDados_2(tbody_1, CHECKLIST_tecnico);

    document.getElementById("blocoNotas").value = texto;
}





