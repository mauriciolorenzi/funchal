using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;

namespace MenuManagerWebAPI.Interfaces
{
    public interface IMongoDAO<T> where T : class
    {
        public void Create(T model);

        public List<T> GetByFilter(FilterDefinition<T> filter, SortDefinition<T> sort = null);

        public T GetById(string id);

        public List<T> GetAll();

        public void Update(T model);

        public long Count(FilterDefinition<T> filter);

        public void Remove(FilterDefinition<T> filter);
        
        public void Remove(T model);

        public void Remove(string id);

        public void RemoveAll();
        
    }
}