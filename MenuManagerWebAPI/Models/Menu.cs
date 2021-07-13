namespace MenuManagerWebAPI.Models
{
    public class Menu : BaseMongoModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public File File { get; set; }
    }
}