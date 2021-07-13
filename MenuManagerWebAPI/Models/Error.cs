namespace MenuManagerWebAPI.Models
{
    public class Error : Response
    {
        public string Exception { get; set; }

        public string InnerException { get; set; }
    }
}
