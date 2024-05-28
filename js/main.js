function geraArray(objeto,x) {
    var array = [];
    for(let i = 0;i<objeto.length;i++) {
        array[i] = Object.values(objeto[i])[x];
    }
    return array;
}

function validaFormulario(...id) {
    var validacao = true;
    for (var i = 0; i < id.length; i++) {
        if(document.getElementById(id[i]).value == "") {
            validacao = false;
        }
    }
    return validacao;
}

function fecharModal() {
    var meuModal = document.getElementById("mensagemModal");
    var bootstrapModal = bootstrap.Modal.getInstance(meuModal);
    bootstrapModal.hide();
}

function consultaSistemas(elementId,user = usuario) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        var nomeSistemas = geraArray(data,0);
        var chaveSistemas = geraArray(data,1);
        var options = "";
        for(let i = 0;i<nomeSistemas.length;i++) {
            options += `<option id=${chaveSistemas[i]} value="${chaveSistemas[i]}-${nomeSistemas[i]}">${nomeSistemas[i]}</option>`;
        }
        document.getElementById(elementId).innerHTML = options;
        }
        verificaSistemas(elementId,user);
    };
    var query = "SELECT Nome, Chave FROM `sag-ti`.sistemas;";

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
}

function construtorConsulta(tabela,colunasBuscadas,colunasFiltradas,valoresFiltrados) {
    tabela = "`sag-ti`." + tabela;
    colunas = colunasBuscadas.join(',');
    if(colunasFiltradas.length > 0) {
        filtro = "";
        for(let i = 0;i < colunasFiltradas.length ;i++) {
            filtro += `${colunasFiltradas[i]}='${valoresFiltrados[i]}'`;
            if(i != colunasFiltradas.length - 1) {filtro += " and ";}
        }
        return `SELECT ${colunas} FROM ${tabela} WHERE ${filtro}`;
    }
    else {
        return `SELECT ${colunas} FROM ${tabela}`;
    }
}

function construtorInsercao(tabela,colunas,valores) {
    tabela = "`sag-ti`." + tabela;
    var colunasString = colunas.join(',');
    var valoresString; 
    for(let i = 0;i < valores.length ;i++) {
        valores[i] = `'${valores[i]}'`;
    }
    return `INSERT INTO ${tabela} (${colunas}) VALUES (${valores})`;
}

function construtorAlteracao(tabela,colunaAlteracao,Valor,colunasFiltro,valoresFiltro) {
    tabela = "`sag-ti`." + tabela;
    var filtro = "";
    for(let i = 0;i < colunasFiltro.length ;i++) {
        filtro += `${colunasFiltro[i]}='${valoresFiltro[i]}'`;
        if(i != colunasFiltro.length - 1) {filtro += " and ";}
    }
    return `UPDATE ${tabela} SET ${colunaAlteracao} = '${Valor}' WHERE ${filtro};`;
}

function construtorDelecao(tabela,colunasFiltro,valoresFiltro) {
    tabela = "`sag-ti`." + tabela;
    var filtro = "";
    for(let i = 0;i < colunasFiltro.length ;i++) {
        filtro += `${colunasFiltro[i]}='${valoresFiltro[i]}'`;
        if(i != colunasFiltro.length - 1) {filtro += " and ";}
    }
    return `DELETE FROM ${tabela} WHERE ${filtro};`;
}

function mensagem(texto) {
    var meuModal = new bootstrap.Modal(document.getElementById("mensagemModal"));
    document.getElementById("mensagem").innerText = texto;
    meuModal.show();
}

function hoje() {
    var data = new Date();
    var ano = data.getFullYear();
    var mes = ('0' + (data.getMonth() + 1)).slice(-2);
    var dia = ('0' + data.getDate()).slice(-2);

    var dataFormatada = ano + '-' + mes + '-' + dia;
    return dataFormatada;
}

function hora() {
    var agora = new Date();
    var minutos = agora.getMinutes();
    var horas = agora.getHours();
    if(minutos.length < 10) {minutos = `0${agora.getMinutes()}`}
    if(horas.length < 10) {horas = `0${agora.getHours()}`}
    return `${horas}:${minutos}`;
}

function ajustaData(data) {
    let novaData = data.split('-');
    return `${novaData[2]}/${novaData[1]}/${novaData[0]}`
}

function removeModal(elementId) {
    document.getElementById(elementId).classList.remove("show");
    document.getElementById(elementId).style = "display: none";
    var backdrop = document.getElementsByClassName("modal-backdrop")[0];
    backdrop.parentNode.removeChild(backdrop);
}

function abrirFormularioProcesso(desabilitar, nome, chave) {
    if(desabilitar) {
        document.getElementById('nomeSistemaProcesso').innerHTML = `<option value="${nome}-${chave}" selected>${nome}</option>`;   
        document.getElementById('nomeSistemaProcesso').disabled = true;
        document.getElementById('tipoProcesso').disabled = false;
        document.getElementById('tipoProcesso').innerHTML = '<select class="form-control" id="tipoProcesso"> <option value="incidente-inc">Incidente</option> <option value="problema-pro">Problema</option> <option value="mudanca-mud">Mudança</option> <option value="requisicao-req">Requisição</option> </select>';
    }
    else {
        document.getElementById('tipoProcesso').innerHTML = `<option value="${nome}-${chave}" selected>${nome}</option>`;
        document.getElementById('tipoProcesso').disabled = true;
        document.getElementById('nomeSistemaProcesso').disabled = false;
        insereSistemasUsuario(usuario);
    }
    var modalFormulario = new bootstrap.Modal(document.getElementById("criarProcesso"));
    modalFormulario.show();
}

function insereSistemasUsuario(user = usuario) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            insereSistemasEChavesUsuario(Object.values(data[0])[0]);
        }
    }
    var query = construtorConsulta("usuarios",["Acessos"],["Nome"],[usuario]);

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send(); 
}

function insereSistemasEChavesUsuario(sisID) {
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
            document.getElementById('nomeSistemaProcesso').innerHTML = "";
            for(let j = 0;j < sisArray.length;j++) {
                document.getElementById('nomeSistemaProcesso').innerHTML += `<option value="${arrayNomeSistemas[j]}-${sisArray[j]}" selected>${arrayNomeSistemas[j]}</option>`;   
            }
        }
    }
    var query = "SELECT * FROM `sag-ti`.sistemas;"

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send(); 
}

function criarProcesso() {
    if(validaFormulario("tituloProcesso","descricaoProcesso")) {
        if(verificaPermissao(0,perfil,document.getElementById('tipoProcesso').value.split('-')[0])) {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    removeModal('criarProcesso');
                    var chaveProcesso = document.getElementById('tipoProcesso').value.split('-')[1];
                    document.getElementById('tituloProcesso').value = "";
                    document.getElementById('descricaoProcesso').value = "";
                    acessaPagina(tabela,`&ticket=${ChaveSistema}-${chaveProcesso}-${data.insertId.toString()}`);
                }
            }
            var tabela = document.getElementById('tipoProcesso').value.split('-')[0];
            var Titulo = document.getElementById('tituloProcesso').value;
            var Descricao = document.getElementById('descricaoProcesso').value;
            var Sistema = document.getElementById('nomeSistemaProcesso').value.split('-')[0];
            var ChaveSistema = document.getElementById('nomeSistemaProcesso').value.split('-')[1];
            var Status = "Novo";

            var query = construtorInsercao(tabela,["Titulo","Descricao","Status","Sistema","ChaveSistema","Solicitante"],[Titulo,Descricao,Status,Sistema,ChaveSistema,usuario]);
            
            const url = `http://localhost:3000/consultar?query=${query}`;
            xhr.open('GET', url, true);
            xhr.send(); 
        } else {removeModal('criarProcesso');mensagem("Seu perfil não possui pemissão para a criação desse processo.");}
    } else {mensagem("Preencha todos os campos para prosseguir com a criação do processo.");}
}

function verificaPermissao(tipoPermissao,perfilUsuario,processo) {
// 0: Criação de processo
    if(tipoPermissao == 0) {
        if((processo == "incidente" || processo == "requisicao") && (perfilUsuario == "Solicitante" || perfilUsuario == "Usuario" || perfilUsuario == "Administrador")) {
            return true;
        }
        else if((processo == "problema" || processo == "mudanca") && (perfilUsuario == "GerenteTI" || perfilUsuario == "Administrador")){
            return true;
        }
        else{return false;}
    }
//1: Acesso a processo
    else if(tipoPermissao == 1) {
        if((processo == "incidente" || processo == "requisicao") && (perfilUsuario == "Solicitante" || perfilUsuario == "Usuario" || perfilUsuario == "Administrador" || perfilUsuario == "Gerente de TI" || perfilUsuario == "Desenvolvedor")) {
            return true;
        }
        else if(processo == "problema" && (perfilUsuario == "Administrador" || perfilUsuario == "Gerente de TI" || perfilUsuario == "Desenvolvedor")) {
            return true;
        }
        else if(processo == "mudanca" && (perfilUsuario == "Solicitante" || perfilUsuario == "Gerente de Mudanças" || perfilUsuario == "Administrador" || perfilUsuario == "Gerente de TI" || perfilUsuario == "Desenvolvedor")) {
            return true;
        }
        else{return false;}
    }
}

function pesquisaTicket() {
    var processos = ['incidente','problema','mudanca','requisicao'];
    var processoId = ['inc','pro','mud','req'];
    var ticket = document.getElementById("ticketPesquisa").value;
    var ticketArray = ticket.split('-');
    if(ticketArray.length == 3 && processoId.includes(ticketArray[1])) {
      if(verificaPermissao(1,perfil,processos[processoId.indexOf(ticketArray[1])])) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                let sistemasUsuarioArray = Object.values(data[0])[0].split(';');
                if (sistemasUsuarioArray.includes(ticketArray[0])) {
                    buscaTicket(ticket,processos[processoId.indexOf(ticketArray[1])]);
                } else {mensagem("Seu perfil não possui acesso a esse sistema.");}
            }
        }
        var query = construtorConsulta("usuarios",["Acessos"],["Nome"],[usuario]);

        const url = `http://localhost:3000/consultar?query=${query}`;
        xhr.open('GET', url, true);
        xhr.send(); 
      } else {mensagem("Seu perfil não possui permissão para acessar esse processo.");}
    } else {mensagem("Chave inválida.");}
}

function buscaTicket(chave,tabela) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            if(data.length) {
                acessaPagina(tabela,`&ticket=${chave}`)
            } else{mensagem("Ticket inexistente.");}
        }
    }
    var query = construtorConsulta(tabela,["id"],["ChaveProcesso"],[chave]);

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send(); 
}