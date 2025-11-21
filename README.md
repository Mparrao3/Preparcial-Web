Preparcial Web - NestJS Travel Planner

La entrega de este preparcial se realiza por medio de un repositorio público que contiene la solución completa.

Cómo ejecutar el proyecto

Instalación

Clonar el repositorio.

Instalar las dependencias con el comando npm install.

Configuración de la base de datos
Base de datos: SQLite.
Configuración: No requiere instalación de servidor. El archivo preparcial.sqlite se genera automáticamente en la raíz del proyecto al iniciar la aplicación.
ORM: TypeORM con synchronize en true.

Comando para correr la API
npm run start:dev
La API estará disponible en http://localhost:3000

Descripción mínima de la API

La API gestiona planes de viaje y la información de los países destino. Tiene dos módulos principales:

CountriesModule: Obtiene y almacena información de países. Funciona como caché local para la API externa RestCountries.

TravelPlansModule: Gestiona la creación, listado y consulta de planes de viaje de los usuarios.

Documentación de endpoints

Countries
GET /countries/:code
Obtiene información de un país por su código ISO Alpha-3.
Ejemplo: GET http://localhost:3000/countries/COL

DELETE /countries/:code
Elimina un país de la base de datos local.
Restricción: No se puede eliminar si tiene planes de viaje asociados.
Seguridad: Requiere el header Authorization: parcialweb
Ejemplo: DELETE http://localhost:3000/countries/COL

TravelPlans
POST /travel-plans
Crea un nuevo plan de viaje.
Ejemplo de body:
countryCode: ARG
title: Viaje a Buenos Aires
startDate: 2025-01-10
endDate: 2025-01-20
notes: Visitar el Obelisco

GET /travel-plans
Lista todos los planes de viaje registrados.

Características adicionales

Logger Middleware
Se incluye un middleware global para los controladores de Countries y TravelPlans que registra en consola:

Método HTTP

URL solicitada

Tiempo transcurrido en milisegundos

Protección de endpoints
El endpoint DELETE está protegido por un AuthGuard que valida el header Authorization.

Explicación del provider externo

La API consulta los países desde RestCountries versión 3.1.
Endpoint utilizado: https://restcountries.com/v3.1/alpha/{code}

Funcionamiento:
Si un país no está en la base de datos local, el sistema consulta la API externa, mapea la información a la entidad Country, la guarda en SQLite y luego la retorna. Esto reduce tráfico externo y mejora el rendimiento.

Modelo de datos

Country
code: Código ISO Alpha-3
name: Nombre del país
capital: Capital
region: Región
population: Población total
flagUrl: URL de la bandera

TravelPlan
id: Identificador único UUID
title: Título del viaje
startDate: Fecha de inicio
endDate: Fecha de fin
notes: Notas opcionales
country: Relación con la entidad Country

Pruebas básicas sugeridas

Consultar un país no cacheado:
GET /countries/JPN. La API consultará la API externa y luego guardará el país.

Consultar un país cacheado:
GET /countries/JPN nuevamente. La respuesta será inmediata desde SQLite.

Crear un plan de viaje:
POST /travel-plans usando un countryCode como JPN. Validar que el país asociado aparece en la respuesta.

Parte C

Extensión de la API
Se amplió la API agregando capacidades de administración y monitoreo. Se agregó un endpoint para eliminar países asegurando integridad referencial. También se implementó un sistema simple de seguridad basado en un token en headers y un registro de actividad para las peticiones HTTP.

Funcionamiento y validación

Endpoint protegido y guard
DELETE /countries/:code permite eliminar un país cacheado.
El AuthGuard verifica que el header Authorization tenga el valor parcialweb.
Si el token es correcto y no hay planes asociados, se elimina el país.
Si el token es incorrecto, se retorna 401 Unauthorized.

Middleware de logging
El LoggerMiddleware registra método HTTP, ruta y tiempo de respuesta.
Para validarlo, hacer cualquier petición como GET /countries/ARG y verificar en la consola del servidor.