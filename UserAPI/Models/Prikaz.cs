using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserAPI.Models
{
    public class Prikaz
    {
        public int Id { get; set; }
        public Nullable<System.DateTime> DatumPoletanja { get; set; }
        public Nullable<System.DateTime> DatumSletanja { get; set; }
        public string VremeTrajanjaLeta { get; set; }
        public Nullable<int> DuzinaPutovanja { get; set; }
        public Nullable<int> BrojPresedanja { get; set; }
        public Nullable<long> Cena { get; set; }
        public string MestoPoletanja { get; set; }
        public string MestoSletanja { get; set; }
        public Nullable<int> OcenaLeta { get; set; }
        public int IdAvioKompanije { get; set; }
        public Nullable<int> BrojSedista { get; set; }
    }
}