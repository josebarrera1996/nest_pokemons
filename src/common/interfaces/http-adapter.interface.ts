export interface HttpAdapter {
    // Definiendo el método 'get'
    get<T> ( url: string ): Promise<T>;
}