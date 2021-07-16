using MenuManagerWebAPI.Interfaces;
using MenuManagerWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace MenuManagerWebAPI.Controllers
{
    [Route("document/{name}")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly IMenuService _menuService;

        public DocumentController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet]
        public IActionResult ShowDocument(string name)
        {
            if(!String.IsNullOrEmpty(name))
            {
                Data<Menu> data = _menuService.GetByName(name) as Data<Menu>;

                if(data.Object != null)
                {
                    if(data.Object.File != null)
                    {
                        byte[] bytes = Convert.FromBase64String(data.Object.File.Base64);
                        Stream stream = new MemoryStream(bytes);

                        if (stream == null)
                        {
                            return NotFound();
                        }
                        
                        return File(stream, $"application/{data.Object.File.Extension}", $"{data.Object.File.Name}.{data.Object.File.Extension}");
                    }
                }                             
            }

            return NotFound();
        }
    }
}
