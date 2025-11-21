# Preparcial Web - NestJS Travel Planner

La entrega de este preparcial se realiza por medio de un repositorio público que contiene la solución completa.

## Cómo ejecutar el proyecto

### Instalación
1.  Clonar el repositorio.
2.  Instalar las dependencias:
    ```bash
    npm install
    ```

### Configuración de la base de datos elegida
- **Base de Datos:** SQLite.
- **Configuración:** No requiere instalación de servidor. El archivo `preparcial.sqlite` se genera automáticamente en la raíz del proyecto al iniciar la aplicación.
- **ORM:** TypeORM con `synchronize: true`.

### Comando para correr la API
```bash
npm run start:dev
```
La API estará disponible en `http://localhost:3000`.

## Descripción mínima de la API

La API tiene como propósito gestionar planes de viaje y la información de los países destino. Cuenta con dos módulos principales:
1.  **CountriesModule:** Se encarga de obtener y almacenar información de países. Actúa como una caché local para la API externa RestCountries.
2.  **TravelPlansModule:** Gestiona la creación, listado y consulta de los planes de viaje de los usuarios.

## Documentación de endpoints

### Countries
*   `GET /countries/:code`
    *   Obtiene la información de un país por su código ISO Alpha-3 (ej: `COL`, `ARG`).
    *   *Ejemplo:* `GET http://localhost:3000/countries/COL`
*   `DELETE /countries/:code`
    *   Elimina un país de la base de datos local.
    *   **Restricción:** No se puede eliminar si tiene planes de viaje asociados.
    *   **Seguridad:** Requiere el header `Authorization: parcialweb`.
    *   *Ejemplo:* `DELETE http://localhost:3000/countries/COL`

### TravelPlans
*   `POST /travel-plans`
    *   Crea un nuevo plan de viaje.
    *   *Ejemplo Body:*
        ```json
        {
          "countryCode": "ARG",
          "title": "Viaje a Buenos Aires",
          "startDate": "2025-01-10",
          "endDate": "2025-01-20",
          "notes": "Visitar el Obelisco"
        }
        ```
*   `GET /travel-plans`
    *   Lista todos los planes de viaje registrados.

## Características Adicionales (Parcial)

### Logger Middleware
Se incluye un middleware global para los controladores de `Countries` y `TravelPlans` que registra en consola:
- Método HTTP.
- URL solicitada.
- Tiempo transcurrido en ms.

### Protección de Endpoints
El endpoint de eliminación (`DELETE`) está protegido por un `AuthGuard` que valida el header `Authorization`.

## Explicación del provider externo

Se consultan los países desde **RestCountries** (v3.1).
- **Endpoint usado:** `https://restcountries.com/v3.1/alpha/{code}`.
- **Lógica:** Cuando se solicita un país, el sistema verifica primero si existe en la base de datos local (SQLite). Si no existe, el `RestCountriesProvider` realiza una petición HTTP GET a la API externa, mapea la respuesta a nuestra entidad `Country`, la guarda en la base de datos y la retorna. Esto optimiza el rendimiento y reduce el tráfico externo.

## Modelo de datos

### Country
Campos principales:
- `code`: Código ISO Alpha-3 (PK).
- `name`: Nombre común del país.
- `capital`: Capital del país.
- `region`: Región geográfica.
- `population`: Población total.
- `flagUrl`: URL de la bandera (PNG).

### TravelPlan
Campos principales:
- `id`: Identificador único (UUID).
- `title`: Título del viaje.
- `startDate`: Fecha de inicio.
- `endDate`: Fecha de fin.
- `notes`: Notas opcionales.
- `country`: Relación con la entidad `Country`.

## Pruebas básicas sugeridas

1.  **Consultar un país no cacheado:**
    - Hacer `GET /countries/JPN`.
    - El sistema tardará un poco más mientras consulta la API externa y guarda los datos.

2.  **Consultar un país cacheado:**
    - Hacer nuevamente `GET /countries/JPN`.
    - La respuesta debe ser inmediata, ya que los datos vienen de SQLite.

3.  **Crear un plan de viaje:**
    - Hacer `POST /travel-plans` con un `countryCode` (ej: `JPN`).
    - Verificar que el plan se crea correctamente y que la respuesta incluye los datos del país asociado.
