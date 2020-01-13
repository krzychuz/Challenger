using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using LiteDB;

namespace Challenger.Web.Data
{
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        private readonly LiteDatabase context;
        private readonly Dictionary<Type, object> repositories = new Dictionary<Type, object>();

        public UnitOfWork()
        {
            string databaseName = Assembly.GetEntryAssembly()?.GetName().Name + ".db";
            context = new LiteDatabase(databaseName);
        }

        public void Save()
        {
            context.Dispose();
        }        

        public IGenericRepository<T> Repository<T>() where T : class, new()
        {
            if (repositories.Keys.Contains(typeof(T)))
            {
                return repositories[typeof(T)] as IGenericRepository<T>;
            }

            IGenericRepository<T> repository = new GenericRepository<T>(context);
            repositories.Add(typeof(T), repository);
            return repository;
        }

        private bool disposed;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
        }
    }
}