Atix Challenge

## Bibliotecas/plugins utilizados

- React-redux: Se usó principalmente para manejar el estado de la aplicacion en general en un lugar a parte de las paginas, para que todos los componentes que necesiten utilizar información del estado lo puedan hacer directamente utilizando el hook "useSelector".
- React-thunk: Plugin de react redux para permitir que se ejecuten acciones asíncronas (Llamados a APIs);
- Node-sass: Utilizado para poder compilar sass.
- React hook form: Utilizado para facilitar el validado de formularios (sobre todo cuando se trata de multiples validaciones).
- React-router: Usado para convertir la aplicación en una Single Page Application, y manejar de manera sencilla el ruteo.
- Axios: Usado para llamadas al backend.
- MirageJs: Herramienta usada para simular un backend, el mismo provee la inicializacion de un server, con rutas e incluso una base de datos. Cabe destacar que la misma no persiste datos en ningun lado. Una vez reiniciado el navegador, se vuelve a la instancia de carga. Es una biblioteca muy útil ya que nos permite recrear escenarios dinámicos, del tipo en que normalmente es posible cuando se utiliza un servidor de producción real.
- No se utilizaron bibliotecas o frameworks de estilos ya que me enfoqué en componentes custom.


### ¿Cómo inicializar la app?

1. npm install.
2. npm start.
