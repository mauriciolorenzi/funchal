namespace MenuManagerWebAPI.Models
{
    public class Data<T> : Response
    {
        public T Object { get; set; }
    }
}