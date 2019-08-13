namespace Challenger.Web.Configuration
{
    public class Credentials
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }

    public class EndomondoData
    {
        public Credentials Credentials { get; set; }
        public string ChallengeId { get; set; }
    }
}