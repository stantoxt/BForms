﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using BForms.Utilities;

namespace BForms.Models
{
    public abstract class BsItemModel
    {
        public abstract object GetUniqueID();
    }

    #region Group Model
    public abstract class BsEditorGroupItemModel<TForm> : BsEditorGroupItemModel
    {
        public TForm Form { get; set; }
    }

    public abstract class BsEditorGroupItemModel : BsItemModel
    {
        public object TabId { get; set; }
    }

    public interface IBsEditorGroupModel
    {
        TabGroupConnection GetTabGroupConnection();
    }

    public class TabGroupConnectionItem
    {
        public object TabId { get; set; }
        public object Id { get; set; }
    }

    public class TabGroupConnection
    {
        public object GroupId { get; set; }
        public List<TabGroupConnectionItem> Items { get; set; }
    }

    public class BsEditorGroupModel<TRow> : BsItemsModel<TRow>, IBsEditorGroupModel where TRow : BsEditorGroupItemModel
    {
        public TabGroupConnection GetTabGroupConnection()
        {
            if (this.Items != null)
            {
                return new TabGroupConnection
                {
                    Items = this.Items.Select(x => new TabGroupConnectionItem
                    {
                        TabId = x.TabId,
                        Id = x.GetUniqueID()
                    }).ToList()
                };
            }
            return null;
        }
    }

    public class BsEditorGroupModel<TRow, TRowForm> : BsEditorGroupModel<TRow> where TRow : BsEditorGroupItemModel<TRowForm>
    {
        public TRowForm Form { get; set; }
    }
    #endregion

    #region Tab Model
    public interface IBsEditorTabModel
    {
        BsGridModel<TRow> GetGrid<TRow>();

        IEnumerable<TRow> GetItems<TRow>();
    }

    public class BsEditorTabModel<TRow> : IBsEditorTabModel
    {
        public BsGridModel<TRow> Grid { get; set; }

        public BsGridModel<T> GetGrid<T>()
        {
            return this.Grid as BsGridModel<T>;
        }

        public IEnumerable<TRow> GetItems<TRow>()
        {
            if (this.Grid == null)
            {
                throw new Exception("Grid is null");
            }
            return this.Grid.Items as IEnumerable<TRow>;
        }
    }

    public class BsEditorTabModel<TRow, TSearch> : BsEditorTabModel<TRow>
    {
        public TSearch Search { get; set; }
    }

    public class BsEditorTabModel<TRow, TSearch, TNew> : BsEditorTabModel<TRow, TSearch>
    {
        public TNew New { get; set; }
    }
    #endregion
}
