using ApiDotnetEstudoAngular.Data;

namespace ApiDotnetEstudoAngular.Properties.Rotas;

public static class Pagination
{
    public static void MapPagination(this WebApplication app)
    {
        app.MapGet("/getbypagination", (int page, int quantity) =>
        {
            var pessoas = PessoaData.Pessoas;
            var startIndex = (page - 1) * quantity;
            var endIndex = Math.Min(startIndex + quantity, pessoas.Count);

            var allowListRegisters = pessoas.GetRange(startIndex, endIndex - startIndex);

            var result = new
            {
                AllowListRegisters = allowListRegisters,
                TotalItems = pessoas.Count,
                Page = page,
                PageSize = quantity
            };

            return Results.Ok(result);
        });
    }
}