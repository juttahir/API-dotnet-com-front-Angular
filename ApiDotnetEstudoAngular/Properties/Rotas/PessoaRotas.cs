using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using ApiDotnetEstudoAngular.Data;
using ApiDotnetEstudoAngular.Models;

namespace ApiDotnetEstudoAngular.Properties.Rotas
{
    public class PessoaController : ControllerBase
    {
        [HttpGet("/pessoas")]
        public ActionResult GetPessoas()
        {
            return Ok(PessoaData.Pessoas);
        }

        [HttpGet("/pessoas/nome/{nome}")]
        public ActionResult GetPessoaByNome(string nome)
        {
            var pessoa = PessoaData.Pessoas.FirstOrDefault(x => x.Nome.StartsWith(nome));
            if (pessoa == null)
                return NotFound();

            return Ok(pessoa);
        }

        [HttpGet("/pessoas/byid/{id}")]
        public ActionResult GetPessoaById(string id)
        {
            var pessoa = PessoaData.Pessoas.FirstOrDefault(x => x.Id == id);
            if (pessoa == null)
                return NotFound();

            return Ok(pessoa);
        }

        [HttpPost("/pessoas")]
        public ActionResult CreatePessoa([FromBody] Pessoa pessoa)
        {
            try
            {
                pessoa.Id = Guid.NewGuid().ToString();
                PessoaData.Pessoas.Add(pessoa);
                return Created($"/pessoas/{pessoa.Id}", pessoa);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro durante o processamento da solicitação: {ex.Message}");
            }
        }

        [HttpPut("/pessoa/update/{id}")]
        public ActionResult UpdatePessoa(string id, [FromBody] Pessoa pessoa)
        {
            var encontrada = PessoaData.Pessoas.FirstOrDefault(x => x.Id == id);
            if (encontrada == null)
                return NotFound();

            encontrada.Nome = pessoa.Nome;
            encontrada.Idade = pessoa.Idade;
            encontrada.Nacionalidade = pessoa.Nacionalidade;
            encontrada.Clube = pessoa.Clube;
            encontrada.Gols = pessoa.Gols;
            encontrada.Jogos = pessoa.Jogos;

            return Ok(encontrada);
        }

        [HttpDelete("/pessoa/{id}")]
        public ActionResult DeletePessoa(string id)
        {
            var encontrada = PessoaData.Pessoas.FirstOrDefault(x => x.Id == id);
            if (encontrada == null)
                return NotFound();

            PessoaData.Pessoas.Remove(encontrada);
            return Ok(encontrada);
        }
    }
}
