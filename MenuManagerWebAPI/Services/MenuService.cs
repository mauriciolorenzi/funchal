using MenuManagerWebAPI.Interfaces;
using MenuManagerWebAPI.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace MenuManagerWebAPI.Services
{
    public class MenuService : IMenuService
    {
        private readonly IMongoDAO<Menu> _mongoDAO;

        public MenuService(IMongoDAO<Menu> mongoDAO)
        {
            _mongoDAO = mongoDAO;
        }

        public Response Create(Menu menu)
        {
            try
            {
                _mongoDAO.Create(menu);

                return new Response
                { 
                    Message = "Menu created successfully"
                };

            }
            catch (Exception exception)
            {
                return new Error
                {
                    Message = "Error while trying to create a menu",
                    Exception = $"{exception}",
                    InnerException = $"{exception.InnerException}"
                };
            }
        }

        public Response GetById(string id)
        {
            try
            {               
                return new Data<Menu>
                {
                    Message = "Menu returned successfully",
                    Object = _mongoDAO.GetById(id)
            };
            }
            catch (Exception exception)
            {
                return new Error
                {
                    Message = "Error while trying to get menu by id",
                    Exception = $"{exception}",
                    InnerException = $"{exception.InnerException}"
                };
            }
        }

        public Response GetAll()
        {
            try
            {
                return new Data<List<Menu>>
                {
                    Message = "Returned all menus successfully",
                    Object = _mongoDAO.GetAll()
                };

            }
            catch (Exception exception)
            {
                return new Error
                {
                    Message = "Error while trying to get all menus",
                    Exception = $"{exception}",
                    InnerException = $"{exception.InnerException}"
                };
            }
        }

        public Response Update(Menu menu)
        {
            try
            {
                _mongoDAO.Update(menu);

                return new Response
                {
                    Message = "Menu updated successfully"
                };
            }
            catch (Exception exception)
            {
                return new Error
                {
                    Message = "Error while trying to update a menu",
                    Exception = $"{exception}",
                    InnerException = $"{exception.InnerException}"
                };
            }
        }

        public Response Remove(Menu menu)
        {
            try
            {
                _mongoDAO.Remove(menu);
                
                return new Response
                {
                    Message = "Menu removed successfully"
                };
            }
            catch (Exception exception)
            {
                return new Error
                {
                    Message = "Error while trying to remove a menu",
                    Exception = $"{exception}",
                    InnerException = $"{exception.InnerException}"
                };
            }
        }

        public Response Remove(int id)
        {
            try
            {
                _mongoDAO.Remove(id);

                return new Response
                {
                    Message = "Menu removed successfully"
                };
            }
            catch (Exception exception)
            {
                return new Error
                {
                    Message = "Error while trying to remove a menu",
                    Exception = $"{exception}",
                    InnerException = $"{exception.InnerException}"
                };
            }
        }

        public Response RemoveAll()
        {
            try
            {
                _mongoDAO.RemoveAll();

                return new Response
                {
                    Message = "Removed all menus successfully"
                };
            }
            catch (Exception exception)
            {
                return new Error
                {
                    Message = "Error while trying to remove all menus",
                    Exception = $"{exception}",
                    InnerException = $"{exception.InnerException}"
                };
            }
        }
    }
}
