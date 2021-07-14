using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MenuManagerWebAPI.Interfaces
{
    public interface IMongoDAO<T> where T : class
    {
        public Task Create(T model);

        public List<T> GetByFilter(FilterDefinition<T> filter, SortDefinition<T> sort = null);

        public T GetById(ObjectId id);

        public T GetById(string id);

        public List<T> GetAll();

        public Task Update(T model);

        public long Count(FilterDefinition<T> filter);

        public Task Remove(FilterDefinition<T> filter);
        
        public Task Remove(T model);

        public Task Remove(string id);

        public Task RemoveAll();
        
    }
}