let usuario, perfil;

window.onload = function () {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  usuario = searchParams.get('usuario');
  perfil = searchParams.get('perfil');

  document.getElementById("usuario").innerHTML = usuario;
  document.getElementById("perfil").innerHTML = perfil;

  if(perfil == "Administrador") {document.getElementById("administracao").style.display = "Block";}

  document.getElementById("usuarioAtual").value = usuario;
  document.getElementById("usuarioAtualSolicitacao").value = usuario;
  document.getElementById("perfilAtualSolicitacao").value = perfil;

  let href = window.location.href;
  if(href.includes("main.html")) {registraContagem()}
  else if(href.includes("sistemas.html")) {sistemasDoUsuario(usuario)}
  else if(href.includes("index.html")) {}
  else if(href.includes("filtro.html")) {consolidaFiltro(perfil)}
  else {coletaDadosProcesso(searchParams.get('ticket'))}
}

function acessaPagina(nomePagina,complemento) {
    window.location.href = `${nomePagina}.html?usuario=${usuario}&perfil=${perfil}${complemento}`;
}

function registraContagem() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        document.getElementById("numUsuarios").innerText = Object.values(data[0])[0];
        document.getElementById("sistemas").innerText = Object.values(data[0])[1];
        document.getElementById("tickets").innerText = Object.values(data[0])[2];
      }
    };
    var query = 'SELECT * FROM `sag-ti`.view_conatagem_dados;';

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
}

function validaUsuario() {
 if(validaFormulario("usuarioAtual","senhaAtual","novaSenha")) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              try {
                  if(usuario == Object.values(data[0])[0]) {alteraSenha();}
              }
              catch {
                  mensagem("A senha fornecida está incorreta. Por favor, tente novamente.");
              }
          }
      }
      var usuario = document.getElementById("usuarioAtual").value;
      var senha = document.getElementById("senhaAtual").value;
      var query = construtorConsulta("usuarios",["Nome"],["Nome","Senha"],[usuario,senha]);

      const url = `http://localhost:3000/consultar?query=${query}`;
      xhr.open('GET', url, true);
      xhr.send(); 
 } else {mensagem("Preencha todos os campos para prosseguir com a alteração de senha.");}
}

function alteraSenha() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          document.getElementById("alteraSenha").classList.remove("show");
          var backdrop = document.getElementsByClassName("modal-backdrop")[0];
          backdrop.parentNode.removeChild(backdrop);
          mensagem("Senha alterada com sucesso.");
      }
  }
  var usuario = document.getElementById("usuarioAtual").value;
  var novaSenha = document.getElementById("novaSenha").value;
  var query = construtorAlteracao("usuarios","Senha",novaSenha,["Nome"],[usuario]);

  const url = `http://localhost:3000/consultar?query=${query}`;
  xhr.open('GET', url, true);
  xhr.send(); 
}

function solicitaAcesso() {
  if(validaFormulario("sistemaModal")) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              document.getElementById("solicitarAcesso").classList.remove("show");
              var backdrop = document.getElementsByClassName("modal-backdrop")[0];
              backdrop.parentNode.removeChild(backdrop);
              mensagem("Solicitação enviada com sucesso. Aguarde a aprovação do administrador.");
          }
      }

      var select = document.getElementById("sistemaModal");
      var chaveSisArray = [];
      var SisArray = [];

      for (var i = 0; i < select.options.length; i++) {
        let option = select.options[i];
        if (option.selected) {
          optionArray = option.value.split("-");
          chaveSisArray.push(optionArray[0]);
          SisArray.push(optionArray[1]);
        }
      }
      let chaveSis = chaveSisArray.join(';');
      let Sis = SisArray.join(';');
      let dataHoje = hoje();
      var query = construtorInsercao("solicitacoes",["usuario","tipoUsuario","chaveSistemas","Sistemas","data"],[usuario,perfil,chaveSis,Sis,dataHoje]);

      const url = `http://localhost:3000/consultar?query=${query}`;
      xhr.open('GET', url, true);
      xhr.send(); 
 } else {mensagem("Preencha todos os campos para prosseguir com a solicitação de acesso a sistemas.");}
}

function verificaSistemas(elementId,user) {
  const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              let sistemasUsuarios = Object.values(data[0])[0].split(";");
              for(let i = 0; i < sistemasUsuarios.length;i++) {
                document.getElementById(elementId).removeChild(document.getElementById(sistemasUsuarios[i]));
              }
          }
      }
      var query = construtorConsulta("usuarios",["Acessos"],["Nome"],[user]);

      const url = `http://localhost:3000/consultar?query=${query}`;
      xhr.open('GET', url, true);
      xhr.send(); 
}

function criarSistema() {
  if(validaFormulario("nomeSistema","chaveSistema","descricaoSistema")) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              document.getElementById("criarSistema").classList.remove("show");
              var backdrop = document.getElementsByClassName("modal-backdrop")[0];
              backdrop.parentNode.removeChild(backdrop);
              mensagem("Sistema criado com sucesso.");
          }
      }
      var nomeSis = document.getElementById("nomeSistema").value;
      var chaveSis = document.getElementById("chaveSistema").value;
      var descricaoSis = document.getElementById("descricaoSistema").value;

      var query = construtorInsercao("sistemas",["Nome","Chave","Descricao"],[nomeSis,chaveSis,descricaoSis]);

      const url = `http://localhost:3000/consultar?query=${query}`;
      xhr.open('GET', url, true);
      xhr.send(); 
 } else {mensagem("Preencha todos os campos para prosseguir com a criação do sistema.");}
}

function consultaUsuarios(elementId) {
  const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        var nomeUsuario = geraArray(data,0);
        var options = "";
        for(let i = 0;i<nomeUsuario.length;i++) {
            options += `<option value="${nomeUsuario[i]}"></option>`;
        }
        document.getElementById(elementId).innerHTML = options;
        }
    };
    var query = "SELECT Nome FROM `sag-ti`.usuarios;";

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
}

function buscaUsuario(usuarioPesquisa,perfilUsuario,selectSistema,acessosUsuario,tipo) {
  var nomeUsuario = document.getElementById(usuarioPesquisa).value;
  if(nomeUsuario != '') {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if(data.length != 0) {
          document.getElementById(perfilUsuario).value = Object.values(data[0])[0];
          document.getElementById(acessosUsuario).value = Object.values(data[0])[1];
          if(tipo == 'Remocao') {
            apresentaAcessos(selectSistema,Object.values(data[0])[1]);
          }
          else {
            consultaSistemas(selectSistema,nomeUsuario);
          }          
        }
        else {
          mensagem("Usuário inexistente. Selecione um usuário existente para gestão de acesso.");
        }
      }
    }
    var query = construtorConsulta("usuarios",["Tipo","Acessos"],["Nome"],[nomeUsuario]);

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
  }
  else(mensagem('Selecione um usuário para dar seguimento na gestão de acesso.'))
}

function apresentaAcessos(elementId,acessos) {
  var acessosArray = acessos.split(';');
  const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        var nomeSistemas = geraArray(data,0);
        var chaveSistemas = geraArray(data,1);
        var options = "";
        for(let i = 0;i<nomeSistemas.length;i++) {
          if(acessosArray.includes(chaveSistemas[i])) {
            options += `<option id=${chaveSistemas[i]} value="${chaveSistemas[i]}">${nomeSistemas[i]}</option>`;
          }            
        }
        document.getElementById(elementId).innerHTML = options;
        }
    };
    var query = "SELECT Nome, Chave FROM `sag-ti`.sistemas;";

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
}

function resetFormulario(inputText,multipleSelect) {
  document.getElementById(inputText).value = '';
  document.getElementById(multipleSelect).innerHTML = '';
}

function concedeAcesso() {
  if(validaFormulario("pesquisaUsuario","perfilUsuarioEscolhido","sistemasUsuario")) {
    const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              document.getElementById("concederAcesso").classList.remove("show");
              var backdrop = document.getElementsByClassName("modal-backdrop")[0];
              backdrop.parentNode.removeChild(backdrop);
              mensagem("Acesso concedido com sucesso.");
          }
      }
      var usuarioAtual = document.getElementById("pesquisaUsuario").value;
      var select = document.getElementById("sistemasUsuario");
      var chaveSisArray = [];
      var SisArray = [];

      for (var i = 0; i < select.options.length; i++) {
        let option = select.options[i];
        if (option.selected) {
          optionArray = option.value.split("-");
          chaveSisArray.push(optionArray[0]);
          SisArray.push(optionArray[1]);
        }
      }
      let chaveSis = chaveSisArray.join(';');
      if (document.getElementById("acessosAtuaisConcessao").value != '') {
        chaveSis = chaveSis + ';' + document.getElementById("acessosAtuaisConcessao").value;
      }      
      var query = construtorAlteracao("usuarios",["Acessos"],[chaveSis],["Nome"],[usuarioAtual]);

      const url = `http://localhost:3000/consultar?query=${query}`;
      xhr.open('GET', url, true);
      xhr.send(); 
  }
  else (mensagem("Preencha todos os campos para prosseguir com a concessão de acesso ao usuário."))
}

function removeAcesso() {
  if(validaFormulario("pesquisaUsuarioRemove","perfilUsuarioEscolhidoRemove","sistemasUsuarioRemove")) {
    const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              document.getElementById("removerAcesso").classList.remove("show");
              var backdrop = document.getElementsByClassName("modal-backdrop")[0];
              backdrop.parentNode.removeChild(backdrop);
              mensagem("Acesso(s) removido(s) com sucesso.");
          }
      }
      var usuarioAtual = document.getElementById("pesquisaUsuarioRemove").value;
      var acessosAtuais = document.getElementById("acessosAtuaisRemocao").value;
      acessosAtuais = acessosAtuais.split(';');
      var select = document.getElementById("sistemasUsuarioRemove");

      for (var i = 0; i < select.options.length; i++) {
        let option = select.options[i];
        if (option.selected) {
          let indice = acessosAtuais.indexOf(option.value);
          acessosAtuais.splice(indice,1);
        }
      }
      acessosAtuais = acessosAtuais.join(';');
      var query = construtorAlteracao("usuarios",["Acessos"],[acessosAtuais],["Nome"],[usuarioAtual]);

      const url = `http://localhost:3000/consultar?query=${query}`;
      xhr.open('GET', url, true);
      xhr.send(); 
  }
  else (mensagem("Preencha todos os campos para prosseguir com a remoção de acesso ao usuário."))
}

function consultaSolicitacoes() {
  new DataTable('#tabelaSolicitacoes');
  var tabelaSolicitacoes = $('#tabelaSolicitacoes').DataTable()
  tabelaSolicitacoes.clear().draw();
  const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              var tabelaSolicitacoes = $('#tabelaSolicitacoes').DataTable();
              for(let i = 0;i <data.length;i++) {
                var div = `<div class="d-flex w-100 h-100 align-items-center justify-content-center">
                          <a class="btn cursor-pointer" title="Aprovar" onclick="aprovaSolicitacao(this,${Object.values(data[i])[0]},'${Object.values(data[i])[1]}','${Object.values(data[i])[3]}')">
                              <i class="fas fa-fw fa-check text-success"></i>
                          </a>
                          <a class="btn cursor-pointer" title="Reprovar" onclick="reprovaSolicitacao(this,${Object.values(data[i])[0]})">
                              <i class="fas fa-fw fa-times text-danger"></i>
                          </a> 
                      </div>`
                tabelaSolicitacoes.row.add([Object.values(data[i])[1], Object.values(data[i])[2], Object.values(data[i])[3], div]).draw();
              }
          }
      }
      var query = "SELECT * FROM `sag-ti`.solicitacoes;"

      const url = `http://localhost:3000/consultar?query=${query}`;
      xhr.open('GET', url, true);
      xhr.send();
}

function reprovaSolicitacao(tr,id) {
  var tabelaSolicitacoes = $('#tabelaSolicitacoes').DataTable();
  const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              mensagem("Solicitação reprovada.");
              var linha = tabelaSolicitacoes.row($(tr).closest('tr'));
              linha.remove().draw();
          }
      }
      
      var query = construtorDelecao("solicitacoes",["id"],[id]);

      const url = `http://localhost:3000/consultar?query=${query}`;
      xhr.open('GET', url, true);
      xhr.send(); 
}

function aprovaSolicitacao(tr,id,usuario,novoAcesso) {
  var tabelaSolicitacoes = $('#tabelaSolicitacoes').DataTable();
  const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              alteraAcessos(usuario,Object.values(data[0])[0],novoAcesso);
              deletaSolicitacao(id);
              var linha = tabelaSolicitacoes.row($(tr).closest('tr'));
              linha.remove().draw();
          }
      }
      
      var query = construtorConsulta("usuarios",["Acessos"],["Nome"],[usuario]);

      const url = `http://localhost:3000/consultar?query=${query}`;
      xhr.open('GET', url, true);
      xhr.send(); 
}

function deletaSolicitacao(pKey) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {const data = JSON.parse(xhr.responseText);}
  }
  
  var query = construtorDelecao("solicitacoes",["id"],[pKey]);

  const url = `http://localhost:3000/consultar?query=${query}`;
  xhr.open('GET', url, true);
  xhr.send();
}

function alteraAcessos(usuario,acessoAtual,novoAcesso) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          mensagem("Solicitação concedida com sucesso.");
      }
  }
  if (acessoAtual != "") {novoAcesso = acessoAtual + ';' + novoAcesso;}
  var query = construtorAlteracao("usuarios",["Acessos"],[novoAcesso],["Nome"],[usuario]);
  
  const url = `http://localhost:3000/consultar?query=${query}`;
  xhr.open('GET', url, true);
  xhr.send(); 
}

$(document).ready(function() {
  $('#tabelaSolicitacoes').DataTable({
    "paging": true,
    "pageLength": 3,
    "lengthMenu": [3],
    "columnDefs": [
      {
        "targets": -1,
        "orderable": false,
        "className": "text-center"
      }
    ]
  });
});