using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MenuManagerWebAPI.Models
{
    public class BaseMongoModel
    {
        [BsonId]
        [NotMapped]
        [JsonConverter(typeof(ObjectIdConverter))]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
    }

    public class ObjectIdConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            serializer.Serialize(writer, value.ToString());
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            return new ObjectId(serializer.Deserialize<string>(reader));
        }

        public override bool CanConvert(Type objectType)
        {
            return typeof(ObjectId).IsAssignableFrom(objectType);
        }
    }

}
