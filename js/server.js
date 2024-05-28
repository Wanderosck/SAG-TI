const express = require('express');
const mysql = require('mysql');

const app = express();

// Configuração de conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Victor@2804',
    database: 'sag-ti'
});

const cors = require('cors');

app.use(cors());

app.get('/consultar', (req, res) => {
    const { query } = req.query;
  
    // Constrói a consulta dinamicamente usando os parâmetros recebidos
    //const sql = `Select * From ${tabela}`;
  
    connection.query(query, (err, results) => {
        if (err) {
          console.error('Erro na consulta:', err);
          res.status(500).send('Erro na consulta');
          return;
        }
  
        res.json(results);
    });
  
    // Encerra a conexão
    //connection.end((err) => {
    //if (err) {
    //    console.error('Erro ao encerrar a conexão:', err);
    //    return;
    //}

    //console.log('Conexão encerrada com sucesso.');
    //});
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
  });