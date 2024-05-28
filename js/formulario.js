function criaFormulario(processo,status) { 
    const formulario = document.getElementById('formularioFluxo');
    let botaoformulario = document.getElementById('botaoAvancaFluxo');
    const ticket = document.getElementById('ChaveProcesso').innerText; 
    if(processo == "incidente") {
        if(status == "Priorizado") {
            document.getElementById('fluxoModalTitulo').innerText = 'Classificação';
            botaoformulario.innerText = 'Classificar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let prioridade = document.getElementById('ClassificacaoPrioridade').value;
                let desenvolvedor = document.getElementById('ClassificacaoDesenvolvedor').value;

                var query = `UPDATE ${processo} SET Status = 'Priorizado', ResponsavelTI = '${usuario}', Desenvolvedor = '${desenvolvedor}', Prioridade = '${prioridade}', DataClassificacao = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="ClassificacaoPrioridade" class="form-label">Prioridade</label>
                <select class="form-control" id="ClassificacaoPrioridade">
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="ClassificacaoResponsavelTI" class="form-label">Título</label>
                <input type="text" class="form-control" id="ClassificacaoResponsavelTI" value=${usuario} disabled>
            </div>
            <div class="mb-3">
                <label for="ClassificacaoDesenvolvedor" class="form-label">Desenvolvedor</label>
                <select class="form-control" id="ClassificacaoDesenvolvedor"></select>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
            selecionaPerfis('Desenvolvedor',ticket.split('-')[0],'ClassificacaoDesenvolvedor');
        }
        else if(status == "Em andamento") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    coletaDadosProcesso(ticket);
                }
            }

            var query = `UPDATE ${processo} SET Status = 'Em andamento', DataIniSolucao = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
            
            const url = `http://localhost:3000/consultar?query=${query}`;
            xhr.open('GET', url, true);
            xhr.send();
        }
        else if(status == "Resolvido") {
            document.getElementById('fluxoModalTitulo').innerText = 'Solução';
            botaoformulario.innerText = 'Solucionar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let SolucaoNota = document.getElementById('SolucaoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Resolvido', NotaSolucao = '${SolucaoNota}', DataSolucao = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="SolucaoNota" class="form-label">Nota de solução</label>
                <textarea class="form-control" id="SolucaoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
        else if(status == "Encerrado") {
            document.getElementById('fluxoModalTitulo').innerText = 'Validação';
            botaoformulario.innerText = 'Validar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let EncerramentoNota = document.getElementById('EncerramentoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Encerrado', NotaEncerramento = '${EncerramentoNota}', DataEncerramento = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="EncerramentoNota" class="form-label">Nota de validação</label>
                <textarea class="form-control" id="EncerramentoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
        else if(status == "Cancelado") {
            document.getElementById('fluxoModalTitulo').innerText = 'Cancelamento';
            botaoformulario.innerText = 'Cancelar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let CancelamentoNota = document.getElementById('CancelamentoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Cancelado', NotaCancelamento = '${CancelamentoNota}', DataCancelamento = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="CancelamentoNota" class="form-label">Nota de cancelamento</label>
                <textarea class="form-control" id="CancelamentoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
        else if(status == "Em espera") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    coletaDadosProcesso(ticket);
                }
            }

            var query = `UPDATE ${processo} SET Status = 'Em espera' WHERE ChaveProcesso = '${ticket}';`
            
            const url = `http://localhost:3000/consultar?query=${query}`;
            xhr.open('GET', url, true);
            xhr.send();
        }
    }
    else if(processo == "problema") {
        if(status == "Em análise") {
            document.getElementById('fluxoModalTitulo').innerText = 'Priorização';
            botaoformulario.innerText = 'Priorizar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let prioridade = document.getElementById('ClassificacaoPrioridade').value;
                let desenvolvedor = document.getElementById('ClassificacaoDesenvolvedor').value;

                var query = `UPDATE ${processo} SET Status = 'Em análise', ResponsavelTI = '${usuario}', Desenvolvedor = '${desenvolvedor}', Prioridade = '${prioridade}', DataClassificacao = '${hoje()}', DataIniAnalise = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="ClassificacaoPrioridade" class="form-label">Prioridade</label>
                <select class="form-control" id="ClassificacaoPrioridade">
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="ClassificacaoResponsavelTI" class="form-label">Título</label>
                <input type="text" class="form-control" id="ClassificacaoResponsavelTI" value=${usuario} disabled>
            </div>
            <div class="mb-3">
                <label for="ClassificacaoDesenvolvedor" class="form-label">Desenvolvedor</label>
                <select class="form-control" id="ClassificacaoDesenvolvedor"></select>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
            selecionaPerfis('Desenvolvedor',ticket.split('-')[0],'ClassificacaoDesenvolvedor');
        }
        else if(status == "Análise concluída") {
            document.getElementById('fluxoModalTitulo').innerText = 'Concluir análise';
            botaoformulario.innerText = 'Concluir';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let AnaliseNota = document.getElementById('AnaliseNota').value;

                var query = `UPDATE ${processo} SET Status = 'Análise concluída', NotaAnalise = '${AnaliseNota}', DataAnalise = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="AnaliseNota" class="form-label">Análise</label>
                <textarea class="form-control" id="AnaliseNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
        else if(status == "Encerrado") {
            document.getElementById('fluxoModalTitulo').innerText = 'Validação';
            botaoformulario.innerText = 'Validar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let EncerramentoNota = document.getElementById('EncerramentoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Encerrado', NotaEncerramento = '${EncerramentoNota}', DataEncerramento = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="EncerramentoNota" class="form-label">Nota de validação</label>
                <textarea class="form-control" id="EncerramentoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
        else if(status == "Cancelado") {
            document.getElementById('fluxoModalTitulo').innerText = 'Cancelamento';
            botaoformulario.innerText = 'Cancelar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let CancelamentoNota = document.getElementById('CancelamentoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Cancelado', NotaCancelamento = '${CancelamentoNota}', DataCancelamento = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="CancelamentoNota" class="form-label">Nota de cancelamento</label>
                <textarea class="form-control" id="CancelamentoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
    }
    else if(processo == "mudanca") {
        if(status == "Em planejamento") {
            document.getElementById('fluxoModalTitulo').innerText = 'Classificação';
            botaoformulario.innerText = 'Classificar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let prioridade = document.getElementById('ClassificacaoPrioridade').value;
                let desenvolvedor = document.getElementById('ClassificacaoDesenvolvedor').value;

                var query = `UPDATE ${processo} SET Status = 'Em planejamento', ResponsavelTI = '${usuario}', Desenvolvedor = '${desenvolvedor}', TipoMudanca = '${prioridade}', DataClassificacao = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="ClassificacaoPrioridade" class="form-label">Tipo de mudança</label>
                <select class="form-control" id="ClassificacaoPrioridade">
                    <option value="Padrão">Padrão</option>
                    <option value="Normal">Normal</option>
                    <option value="Emergencial">Emergencial</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="ClassificacaoResponsavelTI" class="form-label">Responsável</label>
                <input type="text" class="form-control" id="ClassificacaoResponsavelTI" value=${usuario} disabled>
            </div>
            <div class="mb-3">
                <label for="ClassificacaoDesenvolvedor" class="form-label">Desenvolvedor</label>
                <select class="form-control" id="ClassificacaoDesenvolvedor"></select>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
            selecionaPerfis('Desenvolvedor',ticket.split('-')[0],'ClassificacaoDesenvolvedor');
        }
        else if(status == "Em autorização") {
            document.getElementById('fluxoModalTitulo').innerText = 'Planejamento';
            botaoformulario.innerText = 'Planejar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                var dataIni = document.getElementById('dataIni').value;
                var horaIni = document.getElementById('horaIni').value;
                var dataFim = document.getElementById('dataFim').value;
                var horaFim = document.getElementById('horaFim').value;
    
                var query = `UPDATE ${processo} SET Status = 'Em autorização', DataMudancaIni = '${dataIni}', HorarioMudancaIni = '${horaIni}', DataMudancaFim = '${dataFim}', HorarioMudancaFim = '${horaFim}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="dataIni" class="form-label">Data de início:</label>
                <input type="date" class="form-control" id="dataIni" name="dataIni">
            </div>
            <div class="mb-3">
                <label for="horaIni" class="form-label">Horário de início:</label>
                <input type="time" class="form-control" id="horaIni" name="horaIni">
            </div>
            <div class="mb-3">
                <label for="dataFim" class="form-label">Data de fim:</label>
                <input type="date" class="form-control" id="dataFim" name="dataFim">
            </div>
            <div class="mb-3">
                <label for="horaFim" class="form-label">Horário de início:</label>
                <input type="time" class="form-control" id="horaFim" name="horaFim">
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
            selecionaPerfis('Desenvolvedor',ticket.split('-')[0],'ClassificacaoDesenvolvedor');
        }
        else if(status == "Autorizado") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    coletaDadosProcesso(ticket);
                }
            }

            var query = `UPDATE ${processo} SET Status = 'Autorizado', AprovadorMudanca = '${usuario}', DataAutorizacao = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
            
            const url = `http://localhost:3000/consultar?query=${query}`;
            xhr.open('GET', url, true);
            xhr.send();
        }
        else if(status == "Em execução") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    coletaDadosProcesso(ticket);
                }
            }

            var query = `UPDATE ${processo} SET Status = 'Em execução', DataExecucaoIni = '${hoje()}', HorarioExecucaoIni = '${hora()}' WHERE ChaveProcesso = '${ticket}';`
            
            const url = `http://localhost:3000/consultar?query=${query}`;
            xhr.open('GET', url, true);
            xhr.send();
        }
        else if(status == "Em validação") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    coletaDadosProcesso(ticket);
                }
            }

            var query = `UPDATE ${processo} SET Status = 'Em validação', DataExecucaoFim = '${hoje()}', HorarioExecucaoFim = '${hora()}' WHERE ChaveProcesso = '${ticket}';`
            
            const url = `http://localhost:3000/consultar?query=${query}`;
            xhr.open('GET', url, true);
            xhr.send();
        }
        else if(status == "Encerrado") {
            document.getElementById('fluxoModalTitulo').innerText = 'Validação';
            botaoformulario.innerText = 'Validar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let EncerramentoNota = document.getElementById('EncerramentoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Encerrado', NotaEncerramento = '${EncerramentoNota}', DataEncerramento = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="EncerramentoNota" class="form-label">Nota de validação</label>
                <textarea class="form-control" id="EncerramentoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
        else if(status == "Cancelado") {
            document.getElementById('fluxoModalTitulo').innerText = 'Cancelamento';
            botaoformulario.innerText = 'Cancelar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let CancelamentoNota = document.getElementById('CancelamentoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Cancelado', NotaCancelamento = '${CancelamentoNota}', DataCancelamento = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="CancelamentoNota" class="form-label">Nota de cancelamento</label>
                <textarea class="form-control" id="CancelamentoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
    }
    else if(processo == "requisicao") {
        if(status == "Ativo") {
            document.getElementById('fluxoModalTitulo').innerText = 'Classificação';
            botaoformulario.innerText = 'Classificar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let prioridade = document.getElementById('ClassificacaoPrioridade').value;
                let desenvolvedor = document.getElementById('ClassificacaoDesenvolvedor').value;

                var query = `UPDATE ${processo} SET Status = 'Ativo', ResponsavelTI = '${usuario}', Desenvolvedor = '${desenvolvedor}', Prioridade = '${prioridade}', DataClassificacao = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="ClassificacaoPrioridade" class="form-label">Prioridade</label>
                <select class="form-control" id="ClassificacaoPrioridade">
                    <option value="Alta">Alta</option>
                    <option value="Média">Média</option>
                    <option value="Baixa">Baixa</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="ClassificacaoResponsavelTI" class="form-label">Título</label>
                <input type="text" class="form-control" id="ClassificacaoResponsavelTI" value=${usuario} disabled>
            </div>
            <div class="mb-3">
                <label for="ClassificacaoDesenvolvedor" class="form-label">Desenvolvedor</label>
                <select class="form-control" id="ClassificacaoDesenvolvedor"></select>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
            selecionaPerfis('Desenvolvedor',ticket.split('-')[0],'ClassificacaoDesenvolvedor');
        }
        else if(status == "Em andamento") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    coletaDadosProcesso(ticket);
                }
            }

            var query = `UPDATE ${processo} SET Status = 'Em andamento', DataIniImplementacao = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
            
            const url = `http://localhost:3000/consultar?query=${query}`;
            xhr.open('GET', url, true);
            xhr.send();
        }
        else if(status == "Resolvido") {
            document.getElementById('fluxoModalTitulo').innerText = 'Implementação';
            botaoformulario.innerText = 'Finalizar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let SolucaoNota = document.getElementById('SolucaoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Resolvido', NotaImplementacao = '${SolucaoNota}', DataImplementacao = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="SolucaoNota" class="form-label">Nota de implementação</label>
                <textarea class="form-control" id="SolucaoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
        else if(status == "Encerrado") {
            document.getElementById('fluxoModalTitulo').innerText = 'Validação';
            botaoformulario.innerText = 'Validar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let EncerramentoNota = document.getElementById('EncerramentoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Encerrado', NotaEncerramento = '${EncerramentoNota}', DataEncerramento = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="EncerramentoNota" class="form-label">Nota de validação</label>
                <textarea class="form-control" id="EncerramentoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
        else if(status == "Aguardando informações") {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    coletaDadosProcesso(ticket);
                }
            }

            var query = `UPDATE ${processo} SET Status = 'Aguardando informações' WHERE ChaveProcesso = '${ticket}';`
            
            const url = `http://localhost:3000/consultar?query=${query}`;
            xhr.open('GET', url, true);
            xhr.send();
        }
        else if(status == "Cancelado") {
            document.getElementById('fluxoModalTitulo').innerText = 'Cancelamento';
            botaoformulario.innerText = 'Cancelar';
            botaoformulario.onclick = function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        removeModal("fluxoModal");
                        coletaDadosProcesso(ticket);
                    }
                }
                let CancelamentoNota = document.getElementById('CancelamentoNota').value;

                var query = `UPDATE ${processo} SET Status = 'Cancelado', NotaCancelamento = '${CancelamentoNota}', DataCancelamento = '${hoje()}' WHERE ChaveProcesso = '${ticket}';`
               
                const url = `http://localhost:3000/consultar?query=${query}`;
                xhr.open('GET', url, true);
                xhr.send(); 
            }
            formulario.innerHTML =
            `<div class="mb-3">
                <label for="CancelamentoNota" class="form-label">Nota de cancelamento</label>
                <textarea class="form-control" id="CancelamentoNota" rows="2" style="resize: none;"></textarea>
            </div>`;
            var fluxoModal = new bootstrap.Modal(document.getElementById("fluxoModal"));
            fluxoModal.show();
        }
    }
}