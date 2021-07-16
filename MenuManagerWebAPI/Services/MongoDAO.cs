using MenuManagerWebAPI.Interfaces;
using MenuManagerWebAPI.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

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

        public void Create(T model) => mongoCollection.InsertOne(model);

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

        public T GetById(string id) => this.GetByFilter(Builders<T>.Filter.Eq(e => e._id, id), null)?.FirstOrDefault();

        public List<T> GetAll() => mongoCollection.Find(FilterDefinition<T>.Empty).ToList<T>();

        public void Update(T model)
        {
            FilterDefinition<T> filter = Builders<T>.Filter.Eq("_id", model._id);
            mongoCollection.ReplaceOne(filter, model);
        }

        public long Count(FilterDefinition<T> filter) => mongoCollection.CountDocuments(filter);

        public void Remove(FilterDefinition<T> filter) => mongoCollection.DeleteMany(filter);

        public void Remove(T model) => this.Remove(Builders<T>.Filter.Eq("_id", model._id));

        public void Remove(string id) => this.Remove(Builders<T>.Filter.Eq("_id", id));

        public void RemoveAll() => mongoCollection.DeleteMany(FilterDefinition<T>.Empty);
    }
}