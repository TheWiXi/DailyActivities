# API de Registro de Actividades Diarias

El proyecto **API de Registro de Actividades Diarias** tiene como objetivo crear una herramienta eficiente y flexible que permita a los usuarios organizar, registrar y seguir su progreso en diversas actividades cotidianas. Esta API servirá como un sistema de gestión de tareas que incluye funcionalidades clave como el seguimiento de hábitos, establecimiento de metas y generación de reportes de productividad. El enfoque principal es proporcionar a los usuarios una plataforma que les ayude a gestionar tanto sus tareas personales como profesionales, mejorando su organización y permitiendo un control detallado sobre su tiempo y prioridades.

## Tabla de Contenidos

- [Características](#características)
- [Dependencias](#dependencias)
- [Scripts](#scripts)
- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Base de datos](#base-de-datos)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características

- Registro y seguimiento de actividades.
- Creación y gestión de categorías, etiquetas, hitos y objetivos.
- Generación de reportes sobre el rendimiento y progreso.
- Funcionalidades de recordatorios.

## Dependencias

Este proyecto utiliza las siguientes dependencias:

```json
"dependencies": {
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "express": "^4.18.2",
  "express-rate-limit": "^7.1.5",
  "express-validator": "^7.0.1",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.0.3",
  "winston": "^3.11.0"
}
```

## Scripts

* Iniciar la api en produccion:
  ```
  npm start
  ```
* Iniciar la api en modo desarrollo:
  ```
  npm run dev
  ```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TheWiXi/DailyActivities.git
   ```
2. Navega a la carpeta del proyecto:

   ```bash
   cd DailyActivities
   ```
3. Instala las dependencias:

   ```bash
   npm install
   ```
4. Crea un archivo `.env` basado en `.env.template` y configura tus variables de entorno.
5. Inicia la API:

   ```bash
   npm start
   ```

## Uso

La API se ejecuta en `http://localhost:3000` y requiere un token de autorización para acceder a la mayoría de los endpoints. Los archivos `.http` en la carpeta `docs` facilitan el envío de solicitudes HTTP para probar cada endpoint.

## Autenticación

Todos los endpoints (excepto creación de usuario e inicio de sesión) requieren autenticación mediante token Bearer:

```
Authorization: Bearer <token>
```

## URL Base

```
http://localhost:3000/api
```

## Endpoints

### Usuarios

#### Crear Usuario

```http
POST /usuarios
Content-Type: application/json
```

Cuerpo:

```json
{
  "nombre": "string",
  "apellido": "string",
  "email": "string",
  "contrasena": "string"
}
```

#### Iniciar Sesión

```http
POST /usuarios/iniciarSesion
Content-Type: application/json
```

Cuerpo:

```json
{
  "email": "string",
  "contrasena": "string"
}
```

#### Validar Sesión

```http
GET /usuarios/validarSesion
Authorization: Bearer <token>
```

#### Obtener Todos los Usuarios

```http
GET /usuarios
Authorization: Bearer <token>
```

#### Obtener Usuario por ID

```http
GET /usuarios/:id
Authorization: Bearer <token>
```

#### Actualizar Usuario

```http
PUT /usuarios/:id
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "nombre": "string",
  "apellido": "string",
  "email": "string"
}
```

#### Eliminar Usuario

```http
DELETE /usuarios/:id
Authorization: Bearer <token>
```

### Actividades

#### Crear Actividad

```http
POST /actividades
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "titulo": "string",
  "descripcion": "string",
  "fecha_inicio": "datetime",
  "fechaFin": "datetime",
  "duracion_estimada": "number",
  "prioridad": "string",
  "estado": "string",
  "categoria": "string",
  "recordatorio": "boolean"
}
```

#### Obtener Todas las Actividades

```http
GET /actividades
Authorization: Bearer <token>
```

#### Obtener Actividad por ID

```http
GET /actividades/:id
Authorization: Bearer <token>
```

#### Actualizar Actividad

```http
PUT /actividades/:id
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "estado": "string"
}
```

#### Eliminar Actividad

```http
DELETE /actividades/:id
Authorization: Bearer <token>
```

### Categorías

#### Crear Categoría

```http
POST /categorias
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "nombre": "string",
  "descripcion": "string",
  "color": "string"
}
```

#### Obtener Todas las Categorías

```http
GET /categorias
Authorization: Bearer <token>
```

#### Obtener Categoría por ID

```http
GET /categorias/:id
Authorization: Bearer <token>
```

#### Actualizar Categoría

```http
PUT /categorias/:id
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "descripcion": "string"
}
```

#### Eliminar Categoría

```http
DELETE /categorias/:id
Authorization: Bearer <token>
```

### Estadísticas

#### Crear Estadística

```http
POST /estadisticas
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "fecha": "datetime",
  "actividades_completadas": "number",
  "objetivos_completados": "number",
  "tiempo_total_actividades": "number",
  "distribucion_categorias": [
    {
      "categoria": "string",
      "tiempo_dedicado": "number"
    }
  ]
}
```

#### Obtener Todas las Estadísticas

```http
GET /estadisticas
Authorization: Bearer <token>
```

#### Obtener Estadística por ID

```http
GET /estadisticas/:id
Authorization: Bearer <token>
```

#### Actualizar Estadística

```http
PUT /estadisticas/:id
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "actividades_completadas": "number"
}
```

#### Eliminar Estadística

```http
DELETE /estadisticas/:id
Authorization: Bearer <token>
```

### Etiquetas

#### Crear Etiqueta

```http
POST /etiquetas
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "nombre": "string",
  "color": "string"
}
```

#### Obtener Todas las Etiquetas

```http
GET /etiquetas
Authorization: Bearer <token>
```

#### Obtener Etiqueta por ID

```http
GET /etiquetas/:id
Authorization: Bearer <token>
```

#### Actualizar Etiqueta

```http
PUT /etiquetas/:id
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "color": "string"
}
```

#### Eliminar Etiqueta

```http
DELETE /etiquetas/:id
Authorization: Bearer <token>
```

### Hitos

#### Crear Hito

```http
POST /hitos
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "objetivo": "string",
  "titulo": "string",
  "descripcion": "string",
  "fecha_objetivo": "datetime",
  "estado": "string",
  "orden": "number"
}
```

#### Obtener Todos los Hitos

```http
GET /hitos
Authorization: Bearer <token>
```

#### Obtener Hito por ID

```http
GET /hitos/:id
Authorization: Bearer <token>
```

#### Actualizar Hito

```http
PUT /hitos/:id
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "estado": "string"
}
```

#### Eliminar Hito

```http
DELETE /hitos/:id
Authorization: Bearer <token>
```

### Objetivos

#### Crear Objetivo

```http
POST /objetivos
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "titulo": "string",
  "descripcion": "string",
  "fechaFin": "date",
  "hitos": "array"
}
```

#### Obtener Todos los Objetivos

```http
GET /objetivos
Authorization: Bearer <token>
```

#### Obtener Objetivo por ID

```http
GET /objetivos/:id
Authorization: Bearer <token>
```

#### Actualizar Objetivo

```http
PUT /objetivos/:id
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "titulo": "string",
  "descripcion": "string",
  "fechaFin": "date",
  "progreso": "number"
}
```

#### Eliminar Objetivo

```http
DELETE /objetivos/:id
Authorization: Bearer <token>
```

### Recordatorios

#### Crear Recordatorio

```http
POST /recordatorios
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "actividad": "string",
  "fecha_recordatorio": "datetime",
  "mensaje": "string"
}
```

#### Obtener Todos los Recordatorios

```http
GET /recordatorios
Authorization: Bearer <token>
```

#### Obtener Recordatorio por ID

```http
GET /recordatorios/:id
Authorization: Bearer <token>
```

#### Actualizar Recordatorio

```http
PUT /recordatorios/:id
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "actividad": "string",
  "fecha_recordatorio": "datetime",
  "mensaje": "string",
  "estado": "string"
}
```

#### Eliminar Recordatorio

```http
DELETE /recordatorios/:id
Authorization: Bearer <token>
```

### Reportes

#### Crear Reporte

```http
POST /reportes
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "usuario": "string",
  "tipo": "string",
  "fecha_inicio": "date",
  "fecha_fin": "date",
  "resumen": {
    "actividades_totales": "number",
    "actividades_completadas": "number",
    "objetivos_alcanzados": "number",
    "tiempo_total_dedicado": "number",
    "categoria_mas_trabajada": "string"
  },
  "detalles": {
    "actividades": "array",
    "objetivos": "array"
  }
}
```

#### Obtener Todos los Reportes

```http
GET /reportes
Authorization: Bearer <token>
```

#### Obtener Reporte por ID

```http
GET /reportes/:id
Authorization: Bearer <token>
```

#### Actualizar Reporte

```http
PUT /reportes/:id
Authorization: Bearer <token>
```

Cuerpo:

```json
{
  "resumen": {
    "actividades_totales": "number",
    "actividades_completadas": "number",
    "objetivos_alcanzados": "number",
    "tiempo_total_dedicado": "number"
  }
}
```

#### Eliminar Reporte

```http
DELETE /reportes/:id
Authorization: Bearer <token>
```

## Formato de Respuesta

### Respuesta Exitosa

```json
{
  "status": "código de estado",
  "message": "Mensaje opcional",
  "data": {} // Datos solicitados
}
```

### Respuesta de Error

```json
{
  "status": "código de error",
  "message": "Descripción del error"
}
```

## Base de datos

La base de datos de MongoDB se encuentra alojada en AWS. Asegúrate de tener las credenciales y la configuración correcta en tu archivo `.env`.
