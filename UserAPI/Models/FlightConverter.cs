using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserAPI.Models
{
    public class FlightConverter
    {
        public int Id { get; set; }
        public string DatumPoletanja { get; set; }
        public string DatumSletanja { get; set; }
        public string VremeTrajanjaLeta { get; set; }
        public Nullable<long> DuzinaPutovanja { get; set; }
        public Nullable<int> BrojPresedanja { get; set; }
        public Nullable<long> Cena { get; set; }
        public string MestoPoletanja { get; set; }
        public string MestoSletanja { get; set; }
        public Nullable<int> OcenaLeta { get; set; }
        public int IdAvioKompanije { get; set; }
    }
}