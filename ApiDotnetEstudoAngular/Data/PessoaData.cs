using ApiDotnetEstudoAngular.Models;

namespace ApiDotnetEstudoAngular.Data
{
    public static class PessoaData
    {
        public static List<Pessoa> Pessoas { get; } = new List<Pessoa>
        {
            new Pessoa(Guid.NewGuid().ToString(), "Neymar", 32, "Brasil", "Al Hilal", 415, 674),
            new Pessoa(Guid.NewGuid().ToString(), "Cristiano Ronaldo", 39, "Portugal", "Al Nassr", 885, 1217),
            new Pessoa(Guid.NewGuid().ToString(), "Messi", 36 , "Argentina", "Inter Miami", 827, 1053)
        };
    }
}