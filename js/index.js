function abreForm(id) {
    if (id == "entrar") {
        document.getElementById(id).style.display = "flex";
        document.getElementById("cadastrar").style.display = "none";
        document.getElementById("entrarItem").classList.add('active');
        document.getElementById("cadastrarItem").classList.remove('active');
        document.getElementsByClassName("divLogin")[0].style.height = "300px";
    }
    else {
        document.getElementById(id).style.display = "flex";
        document.getElementById("entrar").style.display = "none";
        document.getElementById("entrarItem").classList.remove('active');
        document.getElementById("cadastrarItem").classList.add('active');
        document.getElementsByClassName("divLogin")[0].style.height = "370px";
    }
}

function verificaLogin() {
  if(validaFormulario("usuario","senha")) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        try {
          window.location.href = `main.html?usuario=${usuario}&perfil=${Object.values(data[0])[0]}`;
        }
        catch {
          mensagem("Tentativa de login mal sucedida. Verifique suas credenciais e tente novamente. Caso ainda não tenha acesso, solicite o cadastro do seu usuário.");
        }
      }
    };
    var usuario = document.getElementById("usuario").value;
    var query = construtorConsulta("usuarios",["Tipo"],["Nome","Senha"],[usuario,document.getElementById("senha").value]);

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send();
  } else {mensagem("Preencha todos os campos para prosseguir com o login.");}
};

function validaNomeUsuario(nome) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      if(data.length == 0) {cadastraUsuario();}
      else {mensagem("O nome de usuário fornecido já está em uso. Por favor, cadastre um nome de usuário único.");}
    }
  };
  var query = construtorConsulta("usuarios",["Tipo"],["Nome"],[nome]);
  const url = `http://localhost:3000/consultar?query=${query}`;
  xhr.open('GET', url, true);
  xhr.send();
}

function cadastraUsuario() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      mensagem("Usuário criado! Ao logar no SAG-TI, solicite acesso aos sistemas pertinentes ao seu usuário.");
    }
  };
  var usuario = document.getElementById("novoUsuario").value;
  var senha = document.getElementById("novaSenha").value;
  var tipo = document.getElementById("tipoUsuario").value;
  var tabela = "`sag-ti`.usuarios";
  var query = `INSERT INTO ${tabela} (Nome, Senha, Tipo, Acessos) VALUES ('${usuario}','${senha}','${tipo}','')`;

  const url = `http://localhost:3000/consultar?query=${query}`;
  xhr.open('GET', url, true);
  xhr.send();
}

document.addEventListener("keydown", function(event) { if (event.key === "Enter") {verificaLogin();} });