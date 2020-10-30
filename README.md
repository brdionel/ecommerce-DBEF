<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Henry

El proyecto fue realizado con las tecnologias aprendidas en el Bootcamp. 

FRONT-END

- React
- Redux
- Sass

BACK-END

- Node
- Express
- Sequelize
- Postrges
- Passport (Autenticación)

![Ver demo](https://res.cloudinary.com/dtnixnyfz/video/upload/v1604033110/gif_ecommerce_ipp4td.mp4)

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`.

En `api` vas a tener que crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Tenés que reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado por github, ya que contiene información sensible (las credenciales).

El contenido de `client` fue creado usando: Create React App.

### Requerimientos

La aplicación del e-commerce va a contar con los siguientes requerimientos:

### Usuarios no Autenticados

Un Visitante anónimo debería poder navegar tu e-commerce, ver y buscar productos.

###### Como un Guest yo quiero...

- PRODUCTOS:
    + ...ver la lista completa de productos (catálogo), para ver todo lo disponible para comprar.
    + ...refinar el listado por categorías, para poder ver los items en los que estoy interesado.
    + ...buscas productos, para poder encontrar rápido los productos que quiero comprar.
    + ...ver los detalles de un producto individual (incluida las fotos, descripciones, reviews, etc...), asi puede determinar si quiero ese producto o no.
    
- CARRITO:
    + ...poder agregar items a mi carrito de compras desde el listado o desde a página de detalles de un producto, para poder comprarlos despues.
    + ...sacar items de mi carrito, en caso que decida no quererlos.
    + ...editar cantidades de los items de mi carrito, en caso que quiera mas o menos cantidad de un item en particular.
    + ...refrescar la página, o irme y volver, y todavía tener mi carrito de compras (sin haberme creado una cuenta). (Podés usar sessionStorage, localStorage, cookies, o JWT).
    + ...poder crearme una cuenta, loguearme y seguir editando ese mismo carrito, asi no pierdo los items seleccionados.
- CHECKOUT:
    + ...poder comprar todos los items de un mi carrito.
    + ...especificar una dirección de envio y un email cuando hago el checkout, asi me envien la compra a lugar que dije.
    + ...recibir un email de confirmación que hice la compra.
    + ...recibir un email de notificación cuando la orden fue despachada.
- GESTION DE CUENTA:
    + ...poder crear una cuenta, asi puede hacer otras cosas como dejar un review.
    + ...poder logearme usando Google o Github, para no tener que acordarme de un password nuevo.

### Usuarios Autenticados

Los usuarios que hayan creado su cuenta, podrán hacer todo lo que puede hacer un usuario guest y además:

###### Como un Usuario Autenticado yo quiero...

- GESTION DE CUENTA:
    + ...poder desloguearme, asi nadie más pueda usar mi sesión.
    + ...ver el historial de ordenes previas, asi puede reever las ordenes que hice en el pasado.
    + ...ver los detalles de una orden que hice en el pasado, incluyendo:
        * Los items comprados, con sus cantidades.
        * Links a la página del producto comprado.
        * Fecha y hora de la compra.
- REVIEWS:
    + ...poder dejar reviews a los productos, que incluyan texto y un sistema de cinco estrellas.

### Admin

Los usuarios administradores pueden manejar el sitio, los productos que se listan y los items que están disponibles.

###### Como un administrador yo quiero...

- GESTION DE PRODUCTOS:
    + ...poder crear y editar productos, con nombre, descripción, precio y uno o más fotos, tal que los visitantes puedan ver la última información de lo que se vende.
    + ...poder crear categorías, para que los usuarios puedan filtrar los items.
    + ...poder agregar o sacar categorías de los items (los items deben poder aceptar múltiples categorías).
    + ...gestionar la disponibilidad de un item. (un item que no esta disponible, no deberá estar listado en la página, pero su detalle debe seguir siendo accesible desde el historial de compras o con su URL, pero debe mencionar que el item no está disponible).

- GESTION DE ORDENES:
    + ...poder ver una lista de todas las ordenes, para poder ver y revisar las ordener.
    + ...poder filtrar as ordenes por su estado (creada, procesando, cancelada, completa).
    + ver los detalles de una orden específica, asi puedo revisarla y actualizar su estado.
    + ...poder cambiar el estado de una orden (creada => procesando, procesando => cancelada || completa).

- GESTION DE USUARIOS:
    + ...poder hacer que un usuario se convierta en admin.
    + ...borrar a un usuario, asi no puedan logearse más.
    + ...forzar una password reset para un usuario.

### Validación de Datos

Cuando crees los modelos, debes considerar los tipos de datos que vas a recibir, qué cosas van a ser requeridas y cómo vas a devolver los errores a los usuarios.
Algunas constrains qué deberás implementar:

- Productos:
    + Deben tener `titulo`, `descripcion`, `precio`, `cantidad`
    + Deben pertenecer a por lo menos una categoría.
    + Deben tener una foto, si no tienen una foto, deben tener un placeholder de foto por defecto.
- Usuarios:
    + Deben tener una dirección de mail válida.
    + Su email debe ser único.
- Ordenes:
    + Una orden debe pertenecer a un usuario o a un guest (autenticado vs no autenticado).
    + Las ordenes deben tener línea de orden que contiene el `precio`, `productId`, y `cantidad`.
    + Si un usuario completa una orden, esa orden debe mantener el precio del item al momento de la compra, sin importar que el precio del producto cambie después.
- Reviews:
    + Todas las reviews deben pertenecer a un producto.
    + Todas las reviews deben pertenecer a un usuario.
    + Todas las reviews deben tener por lo menos x caractéres.

### Milestones

Este proyecto tiene muchas tareas para realizar, asi que es fácil sentirse abrumado. Estas son las features que esperamos que muestres en cada demo:

- Demo **1**: Catálogo de productos
    + Los usuarios pueden ver los productos y filtrar por categoría.
    + Los administradores pueden editar y agregar productos
- Demo **2**:
    + Los usuarios pueden buscar productos en el catálogo.
    + El catálogo está paginado.
    + Los usuarios tienen un carrito al que pueden agregar productos.
- Demo **3**:
    + Los usuarios pueden ver su historial de compras.
    + Los usuarios tienen su carrito en cualquier device al que se logueen.
- Demo **Final**:
    + Los usuarios pueden hacer el checkout.
    + Los admins pueden ver las ordenes pendientes.
    + Los usuarios reciben mails de notificaciones.
    
## Contribuidores

- [Franco Silva](https://github.com/francoderweb)
- [Dayamar Martinez](https://github.com/dayamartinez)
- [Ezequiel Diaz](https://github.com/EzequielDiaz1)
