function consolidaFiltro(perfil) {
    let statusPadrao;
    if(perfil == "Gerente de TI" || perfil == "Administrador" || perfil =="Desenvolvedor") {
        document.getElementById('processoSelect').innerHTML += 
        `<option value="Incidente">Incidente</option>
        <option value="Problema">Problema</option>
        <option value="Mudança">Mudança</option>
        <option value="Requisição">Requisição</option>`;
        statusPadrao = ["Aguardando informações","Análise concluída","Ativo","Autorizado","Cancelado","Em análise","Em andamento","Em autorização","Em espera","Em execução","Em planejamento","Em validação","Encerrado","Novo","Priorizado","Resolvido"];
    }
    else if(perfil == "Solicitante" || perfil == "Usuario" ) {
        document.getElementById('processoSelect').innerHTML += 
        `<option value="Incidente">Incidente</option>
        <option value="Mudança">Mudança</option>
        <option value="Requisição">Requisição</option>`;
        statusPadrao = ["Aguardando informações","Ativo","Autorizado","Cancelado","Em andamento","Em autorização","Em espera","Em execução","Em planejamento","Em validação","Encerrado","Novo","Priorizado","Resolvido"];
    }
    else if(perfil == "Gerente de Mudanças") {
        document.getElementById('processoSelect').innerHTML = `<option value="Mudança" selected>Mudança</option>`;
        document.getElementById('processoSelect').disabled = true;
        statusPadrao = ["Novo","Em planejamento","Em autorização","Autorizado","Em execução","Em validação","Encerrado","Cancelado"];
    }
    for(let i = 0;i < statusPadrao.length;i++) {
        document.getElementById("statusSelect").innerHTML += `<option value="${statusPadrao[i]}">${statusPadrao[i]}</option>`;
    }
    buscaAcessosSistemas();
    consultaFiltro();
}

function buscaAcessosSistemas() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            insereSistemasSelect(Object.values(data[0])[0]);
        }
    }
    var query = construtorConsulta("usuarios",["Acessos"],["Nome"],[usuario]);

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send(); 
}

function insereSistemasSelect(sisID) {
    var sisArray = sisID.split(';');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            var arrayNomeSistemas = [];
            for(let i = 0;i < sisArray.length;i++) {
                for(let j = 0;j < data.length;j++) {
                    if(sisArray[i]==Object.values(data[j])[2]) {
                        arrayNomeSistemas.push(Object.values(data[j])[1]);
                    }
                }
            }
            for(let j = 0;j < sisArray.length;j++) {
                document.getElementById('sistemaSelect').innerHTML += `<option value="${sisArray[j]}">${arrayNomeSistemas[j]}</option>`;   
            }
        }
    }
    var query = "SELECT * FROM `sag-ti`.sistemas;"

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send(); 
}

function consultaFiltro() {
    new DataTable('#tabelaFiltro');
    var tabelaFiltro = $('#tabelaFiltro').DataTable()
    tabelaFiltro.clear().draw();
    const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                var tabelaFiltro = $('#tabelaFiltro').DataTable();
                let tipoProcesso = ["Incidente","Problema","Mudança","Requisição"];
                let paginaProcesso = ["incidente","problema","mudanca","requisicao"];
                for(let i = 0;i <data.length;i++) {
                  tabelaFiltro.row.add([`<a class="link" title="Acessar" onclick="acessaPagina('${paginaProcesso[tipoProcesso.indexOf(Object.values(data[i])[2])]}','&ticket=${Object.values(data[i])[0]}')">${Object.values(data[i])[0]}</a>`, Object.values(data[i])[1], Object.values(data[i])[2], Object.values(data[i])[3], Object.values(data[i])[4], Object.values(data[i])[5], Object.values(data[i])[6], ajustaData(Object.values(data[i])[7].substring(0,10))]).draw();
                }
            }
        }
    var tabela = "`sag-ti`.view_filtro";

    var processo = document.getElementById("processoSelect").value;
    if(processo == "todos") {processo = 'Tipo is not null';}
    else {processo = `Tipo = '${processo}'`;}
    
    var sistemas = document.getElementById("sistemaSelect").value;
    if(sistemas == "todos") {sistemas = 'ChaveSistema is not null';}
    else {sistemas = `ChaveSistema = '${sistemas}'`;}

    var status = document.getElementById("statusSelect").value;
    if(status == "todos") {status = 'status is not null';}
    else {status = `status = '${status}'`;}

    var solicitante = document.getElementById("exampleRadios1").checked;
    if(solicitante) {solicitante = 'Solicitante is not null';}
    else {solicitante = `Solicitante = '${usuario}'`;}

    var query = `SELECT ChaveProcesso, Titulo, Tipo, Status, Prioridade, Sistema, Solicitante, DataCriacao FROM ${tabela} WHERE ${processo} AND ${sistemas} AND ${status} AND ${solicitante};`

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
}

function atualizaSelectStatus() {
    let processoSelect = document.getElementById("processoSelect").value;
    document.getElementById("statusSelect").innerHTML = '<option value="todos" selected>--Todos--</option>';
    let status;
    if(processoSelect == 'Incidente') {
        status = ["Novo","Priorizado","Em andamento","Resolvido","Encerrado","Em espera","Cancelado"];
    }
    else if(processoSelect == 'Problema') {
        status = ["Novo","Em análise","Análise concluída","Encerrado","Cancelado"];
    }
    else if(processoSelect == 'Mudança') {
        status = ["Novo","Em planejamento","Em autorização","Autorizado","Em execução","Em validação","Encerrado","Cancelado"];
    }
    else if(processoSelect == 'Requisição') {
        status = ["Novo","Ativo","Em andamento","Resolvido","Encerrado","Aguardando informações","Cancelado"];
    }
    else {
        if(perfil == "Gerente de TI" || perfil == "Administrador" || perfil =="Desenvolvedor") {
            status = ["Aguardando informações","Análise concluída","Ativo","Autorizado","Cancelado","Em análise","Em andamento","Em autorização","Em espera","Em execução","Em planejamento","Em validação","Encerrado","Novo","Priorizado","Resolvido"];
        }
        else if(perfil == "Solicitante" || perfil == "Usuario" ) {
            status = ["Aguardando informações","Ativo","Autorizado","Cancelado","Em andamento","Em autorização","Em espera","Em execução","Em planejamento","Em validação","Encerrado","Novo","Priorizado","Resolvido"];
        }
        else if(perfil == "Gerente de Mudanças") {
            status = ["Novo","Em planejamento","Em autorização","Autorizado","Em execução","Em validação","Encerrado","Cancelado"];
        }
    }
    for(let i = 0;i < status.length;i++) {
        document.getElementById("statusSelect").innerHTML += `<option value="${status[i]}">${status[i]}</option>`;
    }
}