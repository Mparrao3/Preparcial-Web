# Preparcial Web - NestJS Travel Planner

Este proyecto es una API REST desarrollada en NestJS para gestionar planes de viaje, integrando consumo de APIs externas y almacenamiento en caché local.

## Cómo ejecutar el proyecto

### Instalación
1.  Clonar el repositorio o descargar el código.
2.  Instalar las dependencias:
    ```bash
    npm install
    ```

### Configuración de Base de Datos
- **Base de Datos:** SQLite.
- **Archivo:** `preparcial.sqlite` (se crea automáticamente en la raíz).
- **ORM:** TypeORM configurado con `synchronize: true` para creación automática de tablas.

### Comando para correr la API
```bash
npm run start:dev
```
La API estará disponible en `http://localhost:3000`.

## Descripción de la API

La API cuenta con dos módulos principales:
1.  **CountriesModule:** Gestiona la información de países, actuando como caché de la API externa RestCountries.
2.  **TravelPlansModule:** Gestiona la creación y consulta de planes de viaje asociados a esos países.

## Documentación de Endpoints

### Módulo Countries

*   `GET /countries`
    *   Lista todos los países almacenados en la base de datos local.
*   `GET /countries/:code`
    *   Busca un país por su código Alpha-3 (ej: `COL`, `ARG`).
    *   **Comportamiento:** Busca en DB -> Si no existe, consulta API externa -> Guarda en DB -> Retorna.

### Módulo Travel Plans

*   `POST /travel-plans`
    *   Crea un nuevo plan de viaje.
    *   **Validación:** Verifica fechas y existencia del país (lo importa automáticamente si no existe).
    *   **Body:**
        ```json
        {
            "countryCode": "JPN",
            "title": "Viaje a Tokio",
            "startDate": "2024-12-01",
            "endDate": "2024-12-15",
            "notes": "Llevar adaptador"
        }
        ```
*   `GET /travel-plans`
    *   Lista todos los planes de viaje ordenados por fecha de creación.
*   `GET /travel-plans/:id`
    *   Obtiene el detalle de un plan específico.

## Explicación del Provider Externo

Se ha implementado `RestCountriesProvider` para aislar la comunicación con la API `https://restcountries.com`.
- **Funcionamiento:** Consulta el endpoint `/alpha/{code}` solicitando solo los campos necesarios (`fields=...`) para optimizar la respuesta.
- **Desacoplamiento:** Se inyecta en el servicio mediante la interfaz `ICountryProvider`, permitiendo cambiar la fuente de datos sin afectar la lógica de negocio.

## Modelo de Datos

### Country
- `code`: String (PK, Alpha-3)
- `name`: String
- `region`: String
- `subregion`: String
- `capital`: String
- `population`: Number
- `flagUrl`: String

### TravelPlan
- `id`: UUID (PK)
- `countryCode`: String (FK lógica)
- `title`: String
- `startDate`: Date
- `endDate`: Date
- `notes`: String (Opcional)

## Pruebas Básicas Sugeridas

Se uso **Thunder Client** para realizar las siguientes pruebas:

1.  **Consultar país no cacheado (Origen: API)**
    *   `GET /countries/BRA`
    *   Debe devolver los datos de Brasil con `"origin": "api"`.

2.  **Consultar país cacheado (Origen: Cache)**
    *   `GET /countries/BRA` (Segunda vez)
    *   Debe devolver los mismos datos con `"origin": "cache"`.

3.  **Crear un plan de viaje**
    *   `POST /travel-plans` con un `countryCode` válido.
    *   Debe devolver el plan creado con su ID.
    *   *Nota:* Si se usa un código de país que no está en la BD (ej: `FRA`), el sistema lo importará automáticamente antes de crear el plan.
    endDate = "2024-06-15"
    notes = "Llevar bloqueador solar"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri "http://localhost:3000/travel-plans" -Body $body -ContentType "application/json"
1
