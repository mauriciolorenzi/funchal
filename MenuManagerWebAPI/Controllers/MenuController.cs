using MenuManagerWebAPI.Interfaces;
using MenuManagerWebAPI.Models;
using Microsoft.AspNetCore.Mvc;

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
        public Response Create(Menu menu)
        {
            return _menuService.Create(menu);
        }

        [HttpPut]
        public Response Update(Menu menu)
        {
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
    }
}
