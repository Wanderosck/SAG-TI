function tabelaProcessos(tipoProcesso,titulo) {
    if(verificaPermissao(1,perfil,tipoProcesso)) {
        var modal = new bootstrap.Modal(document.getElementById("processosModal"));
        document.getElementById("processosModalTitulo").innerText = titulo;
        document.getElementById("botaoProcessos").setAttribute("onclick",`removeModal('processosModal');abrirFormularioProcesso(0,'${tipoProcesso}','${tipoProcesso.substring(0,3)}')`);
        modal.show();
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                insereProcessos(Object.values(data[0])[0],tipoProcesso);
            }
        }

        var query = construtorConsulta("usuarios",["Acessos"],["Nome"],[usuario]);

        const url = `http://localhost:3000/consultar?query=${query}`;
        xhr.open('GET', url, true);
        xhr.send(); 
    } else {
        mensagem("Seu perfil não possui permissão para acessar esse processo.");
    }
}

function insereProcessos(sistemas,processo) {
    new DataTable('#tabelaProcessos');
    var tabelaProcessos = $('#tabelaProcessos').DataTable()
    tabelaProcessos.clear().draw();
    let arraySistemas = sistemas.split(';');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            var tabelaProcessos = $('#tabelaProcessos').DataTable();
            for(let i = 0;i <data.length;i++) {
                tabelaProcessos.row.add([`<a class="link" title="Acessar" onclick="acessaPagina('${processo}','&ticket=${Object.values(data[i])[0]}')">${Object.values(data[i])[0]}</a>`, Object.values(data[i])[1], Object.values(data[i])[2], Object.values(data[i])[3]]).draw();
            }
        }
    }
    let tabela = "`sag-ti`." + processo;
    for (let j = 0;j < arraySistemas.length;j++) {arraySistemas[j] = `'${arraySistemas[j]}'`}
    sistemas = arraySistemas.join(',');
    var query = `SELECT ChaveProcesso,Titulo,Status,Sistema FROM ${tabela} WHERE ChaveSistema IN (${sistemas});`
    
    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send(); 
}

function coletaDadosProcesso(ticket) {
    const processos = ['incidente','problema','mudanca','requisicao'];
    const processoId = ['inc','pro','mud','req'];
    const ticketArray = ticket.split('-');
    let processoTicket = processos[processoId.indexOf(ticketArray[1])];
    colunaProcessos = [
        ['ChaveProcesso','Titulo','Descricao','Status','Prioridade','DataClassificacao','Sistema','Solicitante','DataCriacao','DataIniSolucao','DataSolucao','DataEncerramento','ResponsavelTI','Desenvolvedor','NotaEncerramento','NotaSolucao','NotaCancelamento','DataCancelamento'],
        ['ChaveProcesso','Titulo','Status','Sistema','DataCriacao','Solicitante','Descricao','NotaCancelamento','DataCancelamento','ResponsavelTI','Desenvolvedor','Prioridade','DataClassificacao','DataIniAnalise','DataAnalise','NotaAnalise','NotaEncerramento','DataEncerramento'],
        ['Titulo','ChaveProcesso','Status','Sistema','DataCriacao','Solicitante','Descricao','NotaCancelamento','DataCancelamento','ResponsavelTI','Desenvolvedor','TipoMudanca','DataClassificacao','DataMudancaIni','HorarioMudancaIni','DataMudancaFim','HorarioMudancaFim','AprovadorMudanca','DataAutorizacao','DataExecucaoIni','HorarioExecucaoIni','DataExecucaoFim','HorarioExecucaoFim','DataEncerramento','NotaEncerramento'],
        ['Titulo','ChaveProcesso','Status','Sistema','DataCriacao','Solicitante','Descricao','NotaCancelamento','DataCancelamento','ResponsavelTI','Desenvolvedor','Prioridade','DataClassificacao','DataIniImplementacao','DataImplementacao','NotaImplementacao','DataEncerramento','NotaEncerramento']
    ];
    buscarTicket(ticket,processoTicket,colunaProcessos[processoId.indexOf(ticketArray[1])]);
}

function buscarTicket(ticket,processo,dados) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            mostraDados(processo,dados,Object.values(data[0]));
        }
    }

    var query = construtorConsulta(processo,dados,["ChaveProcesso"],[ticket]);

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
}

function mostraDados(processo,id,informacao) {
    const divsId = [['Classificacao','Solucao','Validacao'],['Classificacao','Analise','Validacao'],['Classificacao','Autorizacao','Execucao','Validacao'],['Revisao','Implementacao','Validacao']];
    for(let i = 0; i < id.length;i++) {
        if(typeof informacao[i] == 'object') {document.getElementById(id[i]).innerHTML = '<em>Não informado</em>';}
        else {
            if(id[i].substring(0,4) == 'Data') {
                document.getElementById(id[i]).innerText = ajustaData(informacao[i].substring(0,10));
            }
            else {document.getElementById(id[i]).innerText = informacao[i];}
        }
    }
    const status = informacao[id.indexOf('Status')];
    if(processo == 'incidente') {
        document.getElementById('tipo').innerText = "Incidente";
        if(status == 'Novo') {
            document.getElementById('Classificacao').style = "display: none";
            document.getElementById('Solucao').style = "display: none";
            document.getElementById('Validacao').style = "display: none";
            
            if(perfil == 'Gerente de TI' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Classificar";
            }
            else if(perfil == 'Solicitante') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
        else if(status == 'Priorizado') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Solucao').style = "display: none";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Desenvolvedor' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Iniciar solução";
            }
            else if(perfil == 'Solicitante' || perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
        else if(status == 'Em andamento') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Solucao').style = "display: block";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Desenvolvedor' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Finalizar solução";
            }
            else if(perfil == 'Solicitante' || perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
        else if(status == 'Resolvido') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Solucao').style = "display: block";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Solicitante' || perfil == 'Usuario' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('Espera').style = "display: none";
                document.getElementById('ProxStatus').innerText = "Validar";
            }
            else if(perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
            else if(perfil == 'Desenvolvedor') {
                document.getElementById('Acoes').style = "display: none";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
        else if(status == 'Encerrado') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Solucao').style = "display: block";
            document.getElementById('Validacao').style = "display: block";
            document.getElementById('Acoes').style = "display: none";
        }
        else if(status == 'Cancelado') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Solucao').style = "display: block";
            document.getElementById('Validacao').style = "display: block";
            document.getElementById('Acoes').style = "display: none";
        }
        else if(status == 'Em espera') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Solucao').style = "display: block";
            document.getElementById('Validacao').style = "display: block";

            if(perfil == 'Gerente de TI' || perfil == 'Desenvolvedor' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('Espera').style = "display: none";
                document.getElementById('ProxStatus').innerText = "Reclassificar";
            }
            else if(perfil == 'Solicitante') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
            else if(perfil == 'Usuario') {
                document.getElementById('Acoes').style = "display: none";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
    }
    else if(processo == 'problema') {
        document.getElementById('tipo').innerText = "Problema";
        if(status == 'Novo') {
            document.getElementById('Classificacao').style = "display: none";
            document.getElementById('Analise').style = "display: none";
            document.getElementById('Validacao').style = "display: none";
            
            if(perfil == 'Gerente de TI' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Priorizar";
            }
            else if(perfil == 'Desenvolvedor') {
                document.getElementById('Acoes').style = "display: none";
            }
        }
        else if(status == 'Em análise') {
            document.getElementById('Classificacao').style = "display: none";
            document.getElementById('Analise').style = "display: block";
            document.getElementById('Validacao').style = "display: none";
            
            if(perfil == 'Desenvolvedor' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Concluir análise";
            }
            else if(perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: none";
            }
        }
        else if(status == 'Análise concluída') {
            document.getElementById('Classificacao').style = "display: none";
            document.getElementById('Analise').style = "display: block";
            document.getElementById('Validacao').style = "display: none";
            
            if(perfil == 'Gerente de TI' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Validar";
            }
            else if(perfil == 'Desenvolvedor') {
                document.getElementById('Acoes').style = "display: none";
            }
        }
        else if(status == 'Encerrado') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Analise').style = "display: block";
            document.getElementById('Validacao').style = "display: block";
            document.getElementById('Acoes').style = "display: none";
        }
        else if(status == 'Cancelado') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Analise').style = "display: block";
            document.getElementById('Validacao').style = "display: block";
            document.getElementById('Acoes').style = "display: none";
        }
    }
    else if(processo == 'mudanca') {
        document.getElementById('tipo').innerText = "Mudança";
        if(status == 'Novo') {
            document.getElementById('Classificacao').style = "display: none";
            document.getElementById('Autorizacao').style = "display: none";
            document.getElementById('Execucao').style = "display: none";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Gerente de TI' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Classificar";
            }
            else {
                document.getElementById('Acoes').style = "display: none";
            }
        }
        else if(status == 'Em planejamento') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Autorizacao').style = "display: none";
            document.getElementById('Execucao').style = "display: none";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Gerente de TI' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Planejar";
            }
            else {
                document.getElementById('Acoes').style = "display: none";
            }
        }
        else if(status == 'Em autorização') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Autorizacao').style = "display: block";
            document.getElementById('Execucao').style = "display: none";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Gerente de Mudanças' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Autorizar";
            }
            else if(perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
            }
            else {
                document.getElementById('Acoes').style = "display: none";
            }
        }
        else if(status == 'Autorizado') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Autorizacao').style = "display: block";
            document.getElementById('Execucao').style = "display: none";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Desenvolvedor' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Executar";
            }
            else if(perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
            }
            else {
                document.getElementById('Acoes').style = "display: none";
            }
        }
        else if(status == 'Em execução') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Autorizacao').style = "display: block";
            document.getElementById('Execucao').style = "display: block";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Desenvolvedor' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Finalizar";
            }
            else if(perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
            }
            else {
                document.getElementById('Acoes').style = "display: none";
            }
        }
        else if(status == 'Em validação') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Autorizacao').style = "display: block";
            document.getElementById('Execucao').style = "display: block";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Solicitante' || perfil == 'Usuario' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Finalizar";
            }
            else {
                document.getElementById('Acoes').style = "display: none";
            }
        }
        else if(status == 'Encerrado') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Autorizacao').style = "display: block";
            document.getElementById('Execucao').style = "display: block";
            document.getElementById('Validacao').style = "display: block";
            document.getElementById('Acoes').style = "display: none";
        }
        else if(status == 'Cancelado') {
            document.getElementById('Classificacao').style = "display: block";
            document.getElementById('Autorizacao').style = "display: block";
            document.getElementById('Execucao').style = "display: block";
            document.getElementById('Validacao').style = "display: block";
            document.getElementById('Acoes').style = "display: none";
        }
    }
    else if(processo == 'requisicao') {
        document.getElementById('tipo').innerText = "Incidente";
        if(status == 'Novo') {
            document.getElementById('Revisao').style = "display: none";
            document.getElementById('Implementacao').style = "display: none";
            document.getElementById('Validacao').style = "display: none";
            
            if(perfil == 'Gerente de TI' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Classificar";
            }
            else if(perfil == 'Solicitante') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
        else if(status == 'Ativo') {
            document.getElementById('Revisao').style = "display: block";
            document.getElementById('Implementacao').style = "display: none";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Desenvolvedor' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Iniciar atendimento";
            }
            else if(perfil == 'Solicitante' || perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
        else if(status == 'Em andamento') {
            document.getElementById('Revisao').style = "display: block";
            document.getElementById('Implementacao').style = "display: block";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Desenvolvedor' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').innerText = "Finalizar atendimento";
            }
            else if(perfil == 'Solicitante' || perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
        else if(status == 'Resolvido') {
            document.getElementById('Revisao').style = "display: block";
            document.getElementById('Implementacao').style = "display: block";
            document.getElementById('Validacao').style = "display: none";

            if(perfil == 'Solicitante' || perfil == 'Usuario' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('Espera').style = "display: none";
                document.getElementById('ProxStatus').innerText = "Validar";
            }
            else if(perfil == 'Gerente de TI') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
            else if(perfil == 'Desenvolvedor') {
                document.getElementById('Acoes').style = "display: none";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
        else if(status == 'Encerrado') {
            document.getElementById('Revisao').style = "display: block";
            document.getElementById('Implementacao').style = "display: block";
            document.getElementById('Validacao').style = "display: block";
            document.getElementById('Acoes').style = "display: none";
        }
        else if(status == 'Aguardando informações') {
            document.getElementById('Revisao').style = "display: block";
            document.getElementById('Implementacao').style = "display: block";
            document.getElementById('Validacao').style = "display: block";

            if(perfil == 'Gerente de TI' || perfil == 'Desenvolvedor' || perfil == 'Administrador') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('Espera').style = "display: none";
                document.getElementById('ProxStatus').innerText = "Reclassificar";
            }
            else if(perfil == 'Solicitante') {
                document.getElementById('Acoes').style = "display: block";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
            else if(perfil == 'Usuario') {
                document.getElementById('Acoes').style = "display: none";
                document.getElementById('ProxStatus').style = "display: none";
                document.getElementById('Espera').style = "display: none";
            }
        }
        else if(status == 'Cancelado') {
            document.getElementById('Revisao').style = "display: block";
            document.getElementById('Implementacao').style = "display: block";
            document.getElementById('Validacao').style = "display: block";
            document.getElementById('Acoes').style = "display: none";
        } 
    }
}

function mudarStatus(fluxo,acao,id) {
    let status = document.getElementById('Status').innerText;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            let novoStatus = Object.values(data[0])[0];
            if(acao == "ResetStatus") {novoStatus = novoStatus.split(';')[id];}
            criaFormulario(fluxo,novoStatus);
        }
    }

    var query = construtorConsulta("fluxos",[acao],["Processo","Status"],[fluxo,status]);

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
}

function selecionaPerfis(perfil,chaveSistema,nomeSelect) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            var nomeUsuarios = geraArray(data,0);
            var acessosUsuarios = geraArray(data,1);
            let options = '';
            for(let i = 0;i < nomeUsuarios.length; i++) {
                let acessosDoUsuario = acessosUsuarios[i].split(';');
                if(acessosDoUsuario.includes(chaveSistema)) {
                    options += `<option value=${nomeUsuarios[i]}>${nomeUsuarios[i]}</option>`;
                }               
            }
            document.getElementById(nomeSelect).innerHTML = options;
        }
    }

    var query = construtorConsulta("usuarios",["Nome","Acessos"],["Tipo"],[perfil]);

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
}