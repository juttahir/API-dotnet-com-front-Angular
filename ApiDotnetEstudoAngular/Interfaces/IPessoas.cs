namespace ApiDotnetEstudoAngular.Interfaces;

public interface IPessoas
{
    string Id { get; set; }
    string Nome { get; set; }
    int Idade { get; set; }
    string Nacionalidade { get; set; }
    string Clube { get; set; }
    int Gols { get; set; }
    int Jogos { get; set; }
}