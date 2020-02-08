using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenger.Web.ViewModels
{
    public interface IViewModelFactory<TViewModel, TModel>
    {
        TViewModel GetViewModel(TModel model);
    }
}
