export type Formato = "pauta-guiada" | "pauta-normal" | "cuadricula-5" | "cuadricula-4" | null;
export type Margen = "sin" | "con" | "dibujo" | null;
export type MargenDibujo = "tren" | "barco" | "coche" | "arbol" | "casa" | "unicornio" | "perro" | "gato" | "nino" | "nina";
export type TipoLetra = "escolar" | "escolar-dot" | "massallera" | "massallera-dot" | "mestra-pauta" | "mestra-pauta-dot" | "mestra-guiada" | "mestra-guiada-dot" | null;
export type ModoContenido = "predefinido" | "libre" | null;
export type NumLineas = 8 | 12 | 16;

export interface Contenido {
  trazos: boolean;
  vocalesMay: boolean;
  vocalesMin: boolean;
  alfabetoMay: boolean;
  alfabetoMin: boolean;
  silabas: boolean;
  palabras: boolean;
  frases: boolean;
  textos: boolean;
}

export interface TextoLibre {
  enunciado: string;
  texto: string;
  pieDePagina: string;
  numLineas: NumLineas;
}

export interface Config {
  formato: Formato;
  margen: Margen;
  tipoLetra: TipoLetra;
  modoContenido: ModoContenido;
  contenido: Contenido;
  textoLibre: TextoLibre;
}

export const defaultConfig: Config = {
  formato: null,
  margen: null,
  tipoLetra: null,
  modoContenido: null,
  contenido: {
    trazos: false,
    vocalesMay: false,
    vocalesMin: false,
    alfabetoMay: false,
    alfabetoMin: false,
    silabas: false,
    palabras: false,
    frases: false,
    textos: false,
  },
  textoLibre: {
    enunciado: "",
    texto: "",
    pieDePagina: "",
    numLineas: 12,
  },
};

export const CANVAS_WIDTH = 794;
export const CANVAS_HEIGHT = 1123;
