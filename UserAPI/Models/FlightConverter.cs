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
        public Nullable<int> DuzinaPutovanja { get; set; }
        public Nullable<int> BrojPresedanja { get; set; }
        public Nullable<long> Cena { get; set; }
        public string MestoPoletanja { get; set; }
        public string MestoSletanja { get; set; }
        public Nullable<int> OcenaLeta { get; set; }
        public int IdAvioKompanije { get; set; }
        public Nullable<long> CenaBiznisKlase { get; set; }
        public Nullable<long> CenaEkonomskeKlase { get; set; }
        public Nullable<long> CenaPrveKlase { get; set; }
        public Nullable<int> BrojSedista { get; set; }
        public string Klasa { get; set; }
    }
}