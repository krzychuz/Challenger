using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using LiteDB;
using Microsoft.EntityFrameworkCore;

namespace Challenger.Web.Data
{
   public class GenericRepository<T> : IGenericRepository<T> where T : class, new()
   {
        private readonly LiteDatabase context;
        private readonly LiteCollection<T> dbSet;

        public GenericRepository(LiteDatabase context)
        {
            this.context = context;
            dbSet = context.GetCollection<T>(typeof(T).Name);
        }

        public virtual T GetById(object id)
        {
            return dbSet.FindById(new BsonValue(id));
        }

        public virtual IEnumerable<T> Get(
           Expression<Func<T, bool>> filter)
        {
            return dbSet.Find(filter);
        }

        public IEnumerable<T> GetAll()
        {
            return dbSet.FindAll();
        }

        public void Edit(T entity)
        {
            dbSet.Update(entity);
        }

        public void Insert(T entity)
        {
            dbSet.Insert(entity);
        }

        public void Delete(object id)
        {
            dbSet.Delete(new BsonValue(id));
        }

        public void DeleteAll()
        {
            dbSet.Delete(arg => true);
        }

    }
}