using System;
using System.Collections.Generic;
using System.Text;

namespace prod.Master.Unpacking.Dto
{
    public class GetUnpackingInput
    {
        public string ModuleNo { get; set; }

        public string DevaningNo { get; set; }

        public string Renban { get; set; }
        public string Supplier { get; set; }

        public string ModuleStatus { get; set; }

    }
}
