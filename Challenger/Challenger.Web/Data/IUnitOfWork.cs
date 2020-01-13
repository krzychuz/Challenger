namespace Challenger.Web.Data
{
    public interface IUnitOfWork
    {
        IGenericRepository<T> Repository<T>() where T : class, new();
        void Save(); 
    }
}