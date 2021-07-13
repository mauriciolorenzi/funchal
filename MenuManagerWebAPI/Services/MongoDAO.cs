using MenuManagerWebAPI.Interfaces;
using MenuManagerWebAPI.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MenuManagerWebAPI.Services
{
    public class MongoDAO<T> : IMongoDAO<T> where T : BaseMongoModel
    {
        private readonly IConfiguration _configuration;
        private MongoClient mongoClient;
        private IMongoDatabase mongoDatabase;
        IMongoCollection<T> mongoCollection;

        public MongoDAO(IConfiguration configuration)
        {
            _configuration = configuration;            
            mongoClient = new MongoClient(_configuration["Mongo:MongoConnectionString"]);
            mongoDatabase = mongoClient.GetDatabase(_configuration["Mongo:MongoDatabase"]);
            mongoCollection = mongoDatabase.GetCollection<T>(_configuration["Mongo:MongoCollection"]);
        }

        public async Task Create(T model)
        {
            await mongoCollection.InsertOneAsync(model);
        }

        public List<T> GetByFilter(FilterDefinition<T> filter, SortDefinition<T> sort = null)
        {
            List<T> models;

            if (sort != null)
            {
                models = mongoCollection.Find(filter).Sort(sort).ToList<T>();
            }
            else
            {
                models = mongoCollection.Find(filter).ToList();
            }

            return models;
        }

        public T GetById(ObjectId id) => this.GetByFilter(Builders<T>.Filter.Eq(e => e._id, id), null)?.FirstOrDefault();

        public T GetById(string id) => this.GetById(new ObjectId(id));


        public List<T> GetAll()
        {
            return mongoCollection.Find(FilterDefinition<T>.Empty).ToList<T>();
        }

        public async Task Update(T model)
        {
            FilterDefinition<T> filter = Builders<T>.Filter.Eq("_id", model._id);
            await mongoCollection.ReplaceOneAsync(filter, model);
        }

        public long Count(FilterDefinition<T> filter)
        {
            return mongoCollection.CountDocuments(filter);
        }

        public async Task Remove(FilterDefinition<T> filter)
        {
            await mongoCollection.DeleteManyAsync(filter);
        }

        public async Task Remove(T model) => await this.Remove(Builders<T>.Filter.Eq("_id", model._id));

        public async Task Remove(int id) => await this.Remove(Builders<T>.Filter.Eq("_id", id));

        public async Task RemoveAll()
        {
            await mongoCollection.DeleteManyAsync(FilterDefinition<T>.Empty);
        }
    }
}