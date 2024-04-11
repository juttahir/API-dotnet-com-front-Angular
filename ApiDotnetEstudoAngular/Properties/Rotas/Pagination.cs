using Microsoft.AspNetCore.Mvc;
using System;
using ApiDotnetEstudoAngular.Data;

namespace ApiDotnetEstudoAngular.Properties.Rotas
{
    public class PaginationController : ControllerBase
    {
        [HttpGet("/getbypagination")]
        public ActionResult GetByPagination(int page, int quantity)
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

            return Ok(result);
        }
    }
}