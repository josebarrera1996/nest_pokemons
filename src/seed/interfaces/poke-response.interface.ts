export interface PokeResponse {
    // Definiendo las propiedades que simbolizarán la respuesta del JSON de la API
    count: number;
    next: string;
    previous: null;
    results: Result[];
}

export interface Result {
    // Definiendo las propiedades que simbolizarán la respuesta del JSON de la API
    name: string;
    url: string;
}