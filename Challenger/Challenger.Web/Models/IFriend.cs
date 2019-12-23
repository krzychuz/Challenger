namespace Challenger.Web.Models
{
    public interface IFriend
    {
        string FirstName { get; set; }
        int Id { get; set; }
        string LastName { get; set; }
        string Name { get; set; }
        int Picture { get; set; }
        string PictureUrl { get; set; }
        bool? Premium { get; set; }
        string PremiumType { get; set; }
    }
}