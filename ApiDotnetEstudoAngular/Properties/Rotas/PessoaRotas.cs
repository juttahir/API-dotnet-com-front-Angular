using ApiDotnetEstudoAngular.Data;
using ApiDotnetEstudoAngular.Models;

namespace ApiDotnetEstudoAngular.Properties.Rotas;

public static class PessoaRotas
{
    public static void MapPessoaRotas(this WebApplication app)
    {
        app.MapGet("/pessoas", () => PessoaData.Pessoas);

        app.MapGet("/pessoas/nome/{nome}",
            (string nome) => PessoaData.Pessoas.Find(x => x.Nome.StartsWith(nome)));

        app.MapGet("/pessoas/byid/{id}",
            (string id) => PessoaData.Pessoas.Find(x => x.Id == id));

        app.MapPost("/pessoas",
            (HttpContext request, Pessoa pessoa) =>
            {
                try
                {
                    pessoa = new Pessoa
                    {
                        Id = Guid.NewGuid().ToString(),
                        Nome = pessoa.Nome,
                        Idade = pessoa.Idade,
                        Nacionalidade = pessoa.Nacionalidade,
                        Clube = pessoa.Clube,
                        Gols = pessoa.Gols,
                        Jogos = pessoa.Jogos
                    };
                    PessoaData.Pessoas.Add(pessoa);
                    return Results.Created($"/pessoas/{pessoa.Id}", pessoa);
                }
                catch (Exception ex)
                {
                    return Results.BadRequest($"Erro durante o processamento da solicitação: {ex.Message}");
                }
            });
       
        app.MapPut("/pessoa/update/{id}", (string id, Pessoa pessoa) =>
        {
            var encontrado = PessoaData.Pessoas.Find(x => x.Id == id);
            
            if(encontrado == null)
                return Results.NotFound();
            
            encontrado.Nome = pessoa.Nome;
            encontrado.Idade = pessoa.Idade;
            encontrado.Nacionalidade = pessoa.Nacionalidade;
            encontrado.Clube = pessoa.Clube;
            encontrado.Gols = pessoa.Gols;
            encontrado.Jogos = pessoa.Jogos;

            return Results.Ok(encontrado);
        });
        
        app.MapDelete("/pessoa/{id}", (string id) =>
        {
            var encontrado = PessoaData.Pessoas.Find(x => x.Id == id);
            
            if(encontrado == null)
                return Results.NotFound();

            PessoaData.Pessoas.Remove(encontrado);
            return Results.Ok(encontrado);
        });
    }
}