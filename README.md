# UrlShortener

**Version de Meteor usada 1.3.2.4**

Los instalables se pueden encontrar en el siguiente enlace:
https://www.meteor.com/install

Para crear una nueva aplicación con meteor ejecutar:

    meteor create nombreApp 

Si se quiere elegir una versión concreta de Meteor a usar solo hay que ejecutar:


    meteor create nombreApp --release x.y.z 

siendo **x.y.z** el código de la versión


Para actualizar una app de meteor ejecutar similarmente:

    meteor update --release x.y.z


Para iniciar la aplicación se debe descargar el proyecto, a través
del terminal ir hacia la ruta del proyecto y finalmente ejecutar:

    meteor

La aplicación se desplegará en el puerto **3000**

## Autoevaluación del proyecto

### Funcionalidades implementadas
ID | PESO | TITULO | NIVEL ALCANZADO
------------ | ------------- | ------------- | -------------
F1 | 20 | La aplicación mostrará estadísticas | Sobresaliente
F2 | 20 | La aplicación verificará que una URL es alcanzable antes de acortarla | Notable
F3 | 20 | La aplicación identificará desde qué navegador y plataforma se hace una petición dado las cabeceras HTTP | Sobresaliente

### Justificación
F1 | La aplicación mostrará estadísticas
------------ | -------------
Sobresaliente | * Cada enlace acortado tendrá un recurso asociado con información de su creación 
              | * De cada enlace acortado se almacenará el número de veces que se ha utilizado el enlace, la fecha de creación y la URL de destino 
              | * Si se pide un HTML se devolverá otra URL donde habrá una página de HTML con dicha información. Si se pide JSON se devolverá la información 
              | * Para una URI determinada devuelve información agregada por países que se muestra en formato de tabla o gráfico 
              | * Se muestra la información de clicks, navegadores, sistemas operativos y localidades en gráfico y mapa 
Verificación | prueba manual e inspección de código

F2 | La aplicación verificará que una URL es alcanzable antes de acortarla
------------ | -------------
Notable | * Solo se puede crear una URI acortada si se verifica respuesta con estado 200 * Nivel de servicio asíncrono * Se verifica periódicamente la respuesta que la URI original devuelve * Si la última respuesta de verificación periódica no ha devuelto 200 o no es alcanzable, se devolverá una página HTML indicando desde cuándo dicha URI no es alcanzable. Este mensaje estará activo hasta que la verificación periódica no vuelva a devolver 200
Verificación | prueba manual e inspección de código

F3 | La aplicación identificará desde qué navegador y plataforma se hace una petición dado las cabeceras HTTP
------------ | -------------
Sobresaliente | * Cuando se crea una URL acortada se debe identificar desde qué navegador se hace la petición y desde que plataforma, guardando la información en la Base de Datos * Se mostrará la información almacenada mediante una página HTML * Comprobación es asíncrona *Se detecta el idioma del navegador del usuario * La información anterior se muestra en formato de tabla o gráfico *Se añadirá seguridad a la página mediante el uso de la API reCAPTCHA. En orden de acceder a la información de la Base de Datos habrá que identificarse como humano mediante la API.
Verificación | prueba manual e inspección de código

### Tecnologías
Tecnología | Implementada 
------------ | ------------- 
RESTful cliente HTML/JavaScript y un servidor | SI
SOAP entre máquinas (no navegadores) | NO
RESTful entre máquinas (no navegadores) | SI
Websockets cliente HTML/JavaScript y un servidor | NO

### Justificación
RESTful cliente HTML/JavaScript y un servidor | rutas
------------ | ------------
Implementación | **client/** (archivos utilizados solo por el cliente)
               | **servidor/** (archivos usados solo por el servidor)
               | **lib/** (archivos usados tanto por el cliente como el servidor)
Verificación | 	prueba manual e inspección de código

### Otras Tecnologías empleadas
* Node.js
* MongoDb
* Meteor.js 
* Cron (para verificación periódica en servidor)
