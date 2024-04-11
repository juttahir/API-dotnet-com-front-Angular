using ApiDotnetEstudoAngular.Interfaces;

namespace ApiDotnetEstudoAngular.Models;

public class Pessoa : IPessoas
{
    public string Id { get; set; }
    
    public string Nome { get; set; }
    
    public int Idade { get; set; }
    
    public string Nacionalidade { get; set; }
    
    public string Clube { get; set; }
    
    public int Gols { get; set; }
    
    public int Jogos { get; set; }

    public Pessoa()
    {
    }
    
    public Pessoa(string id, string nome, int idade, string nacionalidade, string clube, int gols, int jogos)
    {
        Id = id;
        Nome = nome;
        Idade = idade;
        Nacionalidade = nacionalidade;
        Clube = clube;
        Gols = gols;
        Jogos = jogos;
    }
}