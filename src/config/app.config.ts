// Función en donde se manejarán los valores de las variables de entorno 
// Y si estas no tienen, se asignarán valores por defecto.
// Devolverá un objeto
export const EnvConfiguration = () => (
    {
        environment: process.env.NODE_ENV || 'dev',
        mongodb: process.env.MONGO_URI, // Sin valor por defecto. La app no funcionará si no existe o no funciona la b.d,
        port: +process.env.PORT || 3000,
        defaultLimit: +process.env.DEFAULT_LIMIT || 7
    }
);
