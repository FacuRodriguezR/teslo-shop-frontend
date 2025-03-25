export interface ProductAs {
    idarticulo:             number;
    nombre:                 string;
    cantimagenes:           number;
    precioantes:            null;
    precioahora:            number;
    porcentajeDesc:         number;
    porcentajeDescEfectivo: number;
    detalle:                string;
    stock:                  number;
    idcategoria:            number;
    proveedor:              string;
    diametro:               null | string;
    seccion:                null | string;
    tipo:                   Tipo | null;
    llanta:                 null | string;
    diseno:                 null | string;
    telas:                  string;
    valvula:                Valvula | null;
    uso:                    Uso | null;
    descripcion:            string;
    familia:                number;
    grupo:                  number;
    subfamilia:             number | null;
    alto:                   string;
    ancho:                  string;
    profundidad:            string;
    especificaciones:       string;
    aplicaciones:           null | string;
    IndiceVel:              string;
    Velocidad:              string;
    IndiceVU:               string;
    VidaUtil:               null | string;
    IndiceCarga:            string;
    Carga:                  string;
    IndiceTracion:          string;
    Traccion:               string;
    IndiceTemp:             null | string;
    Temperatura:            null | string;
    estado:                 number;
    Matriz:                 number;
    BsAs:                   number;
    Neuquen:                number;
    NeuquenShop:            number;
    Garay:                  number;
    Garay2:                 number;
    AutoShop:               number;
    AutoShop2:              number;
    Belgrano:               number;
    Halpern:                number;
}

export enum Tipo {
    CR = "CR",
    Ech = "ECH",
    Hr = "HR",
    LTR = "LTR",
    Lr = "LR",
    Qr = "QR",
    R = "R",
    Rr = "RR",
    Sr = "SR",
    Tr = "TR",
    VR = "VR",
    Vrf = "VRF",
    Wr = "WR",
    Yr = "YR",
    Zr = "ZR",
    Zr17 = "ZR17",
    Zrf = "ZRF",
}

export enum Uso {
    C = "C",
    Ech = "ECH",
    Empty = " ",
    Lt = "LT",
    MS = "M+S",
    P = "P",
    Run = "RUN",
}

export enum Valvula {
    Ad140105R13 = "AD140/105R13",
    Empty = "",
    List09 = "LIST09",
    MS = "M+S",
    Norenovar = "NORENOVAR",
    Qingdao = "QINGDAO",
    Usar32209 = "USAR 32209",
    Xrp = "XRP",
}
