function sistemasDoUsuario(usuario) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            mostraSistemas(Object.values(data[0])[0]);
        }
    }
    var query = construtorConsulta("usuarios",["Acessos"],["Nome"],[usuario]);

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send(); 
}

function mostraSistemas(sistemas) {
    new DataTable('#tabelaSistemas');
    var tabelaSistemas = $('#tabelaSistemas').DataTable()
    tabelaSistemas.clear().draw();
    var chaves = sistemas.split(';');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            var arraySistemas = [];
            for(let i = 0;i < chaves.length;i++) {
                for(let j = 0;j < data.length;j++) {
                    if(chaves[i]==Object.values(data[j])[2]) {
                        arraySistemas.push(j);
                    }
                }
            }
            var tabelaSistemas = $('#tabelaSistemas').DataTable();
              for(let i = 0;i <arraySistemas.length;i++) {
                var div = `<div class="d-flex w-100 h-100 align-items-center justify-content-center">
                          <a class="btn cursor-pointer" title="Lista de processos" onclick="acessaSistema('${Object.values(data[arraySistemas[i]])[2]}')">
                              <i class="fas fa-fw fa-table text-dark"></i>
                          </a>
                          <a class="btn cursor-pointer" title="Abrir novo processo" onclick="removeModal('sistemasModal');abrirFormularioProcesso(${1},'${Object.values(data[arraySistemas[i]])[1]}', '${Object.values(data[arraySistemas[i]])[2]}')">
                              <i class="fas fa-fw fa-plus text-dark"></i>
                          </a> 
                      </div>`
                tabelaSistemas.row.add([Object.values(data[arraySistemas[i]])[1], Object.values(data[arraySistemas[i]])[3], div]).draw();
              }   
        }
    }
    var query = "SELECT * FROM `sag-ti`.sistemas;"

    const url = `http://localhost:3000/consultar?query=${query}`;
    xhr.open('GET', url, true);
    xhr.send(); 
}