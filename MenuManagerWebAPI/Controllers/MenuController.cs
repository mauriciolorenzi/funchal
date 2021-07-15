using MenuManagerWebAPI.Interfaces;
using MenuManagerWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace MenuManagerWebAPI.Controllers
{
    [Route("api/menu")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService _menuService;

        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }

        [HttpGet]
        public Response Get(string id)
        {
            return _menuService.GetById(id);
        }

        [HttpGet("get-all")]
        public Response GetAll()
        {
            return _menuService.GetAll();
        }

        [HttpPost]
        public Response Create([FromForm]Menu menu)
        {
            if (HttpContext.Request.Form.Files.Count > 0)
            {
                IFormFile formFile = HttpContext.Request.Form.Files[0];

                string[] fileName = formFile.FileName.Split('.');

                menu.File = new();

                menu.File.Name = fileName[0];
                menu.File.Extension = fileName[1];
                menu.File.Base64 = ConvertToBase64(formFile);
            }
            
            return _menuService.Create(menu);
        }

        [HttpPut]
        public Response Update([FromForm]Menu menu)
        {
            if (HttpContext.Request.Form.Files.Count > 0)
            {
                IFormFile formFile = HttpContext.Request.Form.Files[0];

                string[] fileName = formFile.FileName.Split('.');

                menu.File = new();

                menu.File.Name = fileName[0];
                menu.File.Extension = fileName[1];
                menu.File.Base64 = ConvertToBase64(formFile);
            }
            else
            {
                Response response = _menuService.GetById(menu._id);

                if(response != null)
                {
                    Data<Menu> data = response as Data<Menu>;

                    if (data.Object != null)
                    {
                        Menu _menu = data.Object;

                        menu.File = _menu.File;
                    }
                }
            }

            return _menuService.Update(menu);
        }

        [HttpDelete]
        public Response Remove(string id)
        {
            return _menuService.Remove(id);
        }

        [HttpDelete("remove-all")]
        public Response RemoveAll()
        {
            return _menuService.RemoveAll();
        }

        private string ConvertToBase64(IFormFile file)
        {
            using MemoryStream memoryStream = new();

            file.CopyTo(memoryStream);
            byte[] bytes = memoryStream.ToArray();

            return Convert.ToBase64String(bytes);
        }
    }
}
