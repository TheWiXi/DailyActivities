[TOC]

# Descripción del Proyecto

El proyecto **API de Registro de Actividades Diarias** tiene como objetivo crear una herramienta eficiente y flexible que permita a los usuarios organizar, registrar, y seguir su progreso en diversas actividades cotidianas. Esta API servirá como un sistema de gestión de tareas que incluye funcionalidades clave como el seguimiento de hábitos, establecimiento de metas, y generación de reportes de productividad. El enfoque principal es proporcionar a los usuarios una plataforma que les ayude a gestionar tanto sus tareas personales como profesionales, mejorando su organización y permitiendo un control detallado sobre su tiempo y prioridades.



## Problemática

Muchas personas, tanto en su vida personal como profesional, enfrentan dificultades para gestionar de manera efectiva sus tareas diarias, hábitos y metas. La falta de organización puede llevar a una disminución en la productividad, retrasos en proyectos importantes, o la incapacidad de cumplir objetivos a largo plazo. Algunas de las principales problemáticas incluyen:

1. **Falta de seguimiento del progreso**: Las personas pueden comenzar proyectos o tareas, pero sin un sistema que les permita monitorear su avance de manera clara, es fácil perder el control sobre el estado de sus actividades.

2. **Dificultad para establecer y cumplir metas**: Sin una estructura adecuada, es difícil crear metas específicas y medir el progreso hacia ellas de forma efectiva.

3. **Falta de recordatorios y prioridades claras**: Las tareas diarias a menudo se ven desplazadas o olvidadas debido a la falta de un sistema de recordatorios o la incapacidad de priorizar actividades clave.

4. **Desorganización de tareas**: Los usuarios necesitan una forma de organizar sus actividades en categorías y etiquetarlas para una mejor visualización y búsqueda.

5. **Ausencia de colaboración**: En muchos casos, personas que trabajan en proyectos en equipo no cuentan con una herramienta que les permita compartir y gestionar actividades colaborativas de manera sencilla.

   

## Funcionalidades Principales

1. **Registro de Actividades**:
   - Los usuarios pueden registrar diferentes tipos de actividades diarias (trabajo, ejercicio, lectura, estudio, etc.).
   - Cada actividad puede tener atributos como nombre, descripción, prioridad, fecha y duración estimada.
   
2. **Seguimiento de Progreso**:
   - Los usuarios pueden actualizar el estado de las actividades (pendiente, en curso, completada).
   - Funcionalidad para visualizar el progreso de las actividades a lo largo del tiempo.
   - Gráficas que muestren estadísticas del porcentaje de actividades completadas en un periodo determinado (diario, semanal, mensual).
   
3. **Establecimiento de Metas**:
   - Los usuarios pueden establecer metas o desafíos relacionados con sus actividades, como "leer 30 páginas al día" o "hacer ejercicio 3 veces a la semana".
   - Almacenamiento y seguimiento de los hitos logrados.
   
4. **Categorías y Etiquetas**:
   - Los usuarios pueden agrupar actividades en categorías (por ejemplo: trabajo, personal, salud).
   - Funcionalidad para agregar etiquetas personalizadas a las actividades, facilitando su organización y búsqueda.
   
5. **Prioridades y Recordatorios**:
   - Sistema de prioridades para que el usuario pueda marcar actividades como "alta", "media" o "baja" prioridad.
   - Opción para configurar recordatorios o notificaciones sobre actividades pendientes, con alertas programadas.
   
6. **Visualización y Reportes**:
   - Generación de reportes que muestren el rendimiento del usuario en completar sus actividades a lo largo de una semana o mes.
   - Visualización de hábitos y estadísticas de tiempo dedicado a cada actividad o categoría.
   
7. **Sincronización Multidispositivo**:
   - Sincronización en tiempo real para que los usuarios puedan acceder a sus actividades desde cualquier dispositivo.
   - Funcionalidad para mantener el progreso actualizado en múltiples dispositivos.
   
8. **Colaboración** (Opcional):
   - Permitir que los usuarios compartan actividades con otros para colaborar en proyectos o tareas.
   
   - Funcionalidad para asignar actividades a otros usuarios o trabajar en equipo.
   
     

# Tecnologías Recomendadas

1. **Recurso:** https://drive.google.com/drive/folders/1xqWMQHUWFMq_ovgsP-eD4zud5_xUYcYT?usp=drive_link

2. **Backend**:
   
   - **Node.js** con Express para la creación de los endpoints.
   - **Java** con Spring Boot  para la creación de los endpoints. 
   
3. **Base de Datos**:
   - **MongoDB**: Para un almacenamiento flexible de actividades y sus atributos.
   - **PostgreSQL** o **MySQL**: Si prefieres una base de datos relacional.

4. **Autenticación**:
   - **JWT (JSON Web Tokens):** para gestionar sesiones y autenticación de usuarios.
   - **Autenticación Segura **(Opcional): Implementar autenticación con OAuth2.

5. **GitHub**: Para la gestión de versiones del código en el desarrollo, usando **conventional commits.**

   

# Casos de Uso

- **Productividad Personal**: Usuarios que desean mejorar su gestión del tiempo y ser más productivos.
- **Seguimiento de Hábitos**: Para quienes desean realizar un seguimiento de sus hábitos y progresar hacia objetivos específicos como la lectura diaria o el ejercicio.
- **Gestión de Proyectos Simples**: Profesionales o equipos pequeños que necesitan una herramienta básica para dividir tareas y colaborar en pequeñas metas o proyectos.
- **Educación**: Estudiantes que quieren organizar sus estudios y gestionar tareas diarias, exámenes y actividades extracurriculares.



# Estructura de la API (Especificaciones Técnicas)

1. **Acceso a la API:**
   - Es necesario estar logueado.
   - Cada router debe validar la sesión activa con el formato **JWT**.
   - Las sesiones tienen un tiempo máximo de expiración de 30 minutos.
   - Mensaje al caducar: "sesión expirada" (con el Formato de Respuesta).
2. **Tasas de solicitudes por tipo de método:**
   - Métodos POST - **iniciar Sesión**:
     - Máximo de 3 solicitudes.
     - Se refrescan después de 3 minutos.
   - Métodos GET:
     - Máximo de 25 solicitudes.
     - Se refrescan después de 15 minutos.
   - Métodos POST:
     - Máximo de 45 solicitudes.
     - Se refrescan después de 15 minutos.
   - Métodos DELETE:
     - Máximo de 10 solicitudes.
     - Se refrescan después de 10 minutos.
   - Métodos PUT:
     - Máximo de 45 solicitudes.
     - Se refrescan después de 15 minutos.
3. **Mensajes al alcanzar la tasa máxima:**
   - Mensaje para **iniciar Sesión**  "Espera 3 minutos antes de volver a intentarlo." (con el Formato de Respuesta).
   - Mensaje de "tasa superada" (con el Formato de Respuesta).



## Endpoints que deben desarrollarse

| Método HTTP | Endpoint                              | Descripción                                             |
| ----------- | ------------------------------------- | ------------------------------------------------------- |
| POST        | `/usuarios`                       | Crear un nuevo usuario.<br />**Nota:** La contraseña del usuario debe estar encriptada al momento de registrar un nuevo usuario en la base de datos. Los datos de prueba no tienen la contraseña encriptada. Se recomienda utilizar la librería mencionada en las clases para realizar la encriptación su validación. |
| POST | `/usuarios/iniciarSesion `        | Obtener la información del usuario excluyendo **contrasena_hash** y el campo **fecha_de_creacion**, debe devolver la fecha y hora actual del inicio de sesión. Además, se debe cambiar el nombre del campo a **fecha_y_hora_de_inicio_de_sesion**. |
| POST | `/usuarios/validarSesion `        | Descifrar la sesión proporcionada en el **header Authorization: Bearer <token>** y retornar la información que incluye. |
| GET         | `/usuarios`                       | Obtener todos los usuarios.                             |
| GET         | `/usuarios/{id}`                  | Obtener un usuario específico por ID.                   |
| PUT         | `/usuarios/{id}`                  | Actualizar un usuario específico por ID.                |
| DELETE      | `/usuarios/{id}`                  | Eliminar un usuario específico por ID.                  |
| POST        | `/actividades`                    | Crear una nueva actividad.                              |
| GET         | `/actividades`                    | Obtener todas las actividades.                          |
| GET         | `/actividades/{id}`               | Obtener una actividad específica por ID.                |
| PUT         | `/actividades/{id}`               | Actualizar una actividad específica por ID.             |
| DELETE      | `/actividades/{id}`               | Eliminar una actividad específica por ID.               |
| POST        | `/recordatorios`                  | Crear un nuevo recordatorio.                            |
| GET         | `/recordatorios`                  | Obtener todos los recordatorios.                        |
| GET         | `/recordatorios/{id}`             | Obtener un recordatorio específico por ID.              |
| PUT         | `/recordatorios/{id}`             | Actualizar un recordatorio específico por ID.           |
| DELETE      | `/recordatorios/{id}`             | Eliminar un recordatorio específico por ID.             |
| POST        | `/objetivos`                      | Crear un nuevo objetivo.                                |
| GET         | `/objetivos`                      | Obtener todos los objetivos.                            |
| GET         | `/objetivos/{id}`                 | Obtener un objetivo específico por ID.                  |
| PUT         | `/objetivos/{id}`                 | Actualizar un objetivo específico por ID.               |
| DELETE      | `/objetivos/{id}`                 | Eliminar un objetivo específico por ID.                 |
| POST        | `/etiquetas`                      | Crear una nueva etiqueta.                               |
| GET         | `/etiquetas`                      | Obtener todas las etiquetas.                            |
| GET         | `/etiquetas/{id}`                 | Obtener una etiqueta específica por ID.                 |
| PUT         | `/etiquetas/{id}`                 | Actualizar una etiqueta específica por ID.              |
| DELETE      | `/etiquetas/{id}`                 | Eliminar una etiqueta específica por ID.                |
| POST        | `/categorias`                     | Crear una nueva categoría.                              |
| GET         | `/categorias`                     | Obtener todas las categorías.                           |
| GET         | `/categorias/{id}`                | Obtener una categoría específica por ID.                |
| PUT         | `/categorias/{id}`                | Actualizar una categoría específica por ID.             |
| DELETE      | `/categorias/{id}`                | Eliminar una categoría específica por ID.               |
| POST        | `/actividades/{id}/etiquetas`     | Asignar etiquetas a una actividad específica.           |
| GET         | `/actividades/{id}/etiquetas`     | Obtener etiquetas asignadas a una actividad específica. |
| POST        | `/actividades/{id}/colaboradores` | Asignar colaboradores a una actividad específica.       |
| GET         | `/actividades/{id}/colaboradores` | Obtener colaboradores de una actividad específica.      |
| POST        | `/hitos`             | Crear un nuevo hito para un objetivo.                        |
| GET         | `/hitos`             | Obtener todos los hitos.                                     |
| GET         | `/hitos/{id}`        | Obtener un hito específico por ID.                           |
| PUT         | `/hitos/{id}`        | Actualizar un hito específico por ID.                        |
| DELETE      | `/hitos/{id}`        | Eliminar un hito específico por ID.                          |
| POST        | `/estadisticas`      | Registrar estadísticas de un usuario (actividades y objetivos completados). |
| GET         | `/estadisticas`      | Obtener todas las estadísticas de todos los usuarios.        |
| GET         | `/estadisticas/{id}` | Obtener las estadísticas específicas de un usuario por ID.   |
| POST        | `/reportes`          | Crear un nuevo reporte de rendimiento.                       |
| GET         | `/reportes`          | Obtener todos los reportes de rendimiento.                   |
| GET         | `/reportes/{id}`     | Obtener un reporte específico por ID.                        |
| PUT         | `/reportes/{id}`     | Actualizar un reporte específico por ID.                     |
| DELETE      | `/reportes/{id}`     | Eliminar un reporte específico por ID.                       |




## Formato de Respuesta

Todas las respuestas seguirán un formato estándar:

```json
{
    "status": "status code", // https://http.cat/
    "message": "Mensaje opcional",
    "data": { /* Datos solicitados */ } // Si se obtienen más de un dato, la representación será de la forma [{...}], mientras que si es solo uno, será de la forma {}.
    
}
```

En caso de error:

```json
{
    "status":"status code", // https://http.cat/
    "message": "Descripción del error"
}
```



## Formato de documentación

**Nota:** El repositorio debe contener un archivo **README.md** que incluya la documentación detallada de cada API, junto con las instrucciones para instalar las dependencias del proyecto. Además, es necesario especificar la versión de **NodeJS** utilizada. Si el proyecto está desarrollado con **Spring Boot** en Java, se debe indicar que requiere al menos **JDK 17**, así como listar las dependencias utilizadas con sus versiones.



### Ejemplo de la documentación de las API.

## Guardar usuario

**Method** : `GET, POST, PUT, DELETE`

**URL** : `http://localhost:300/usuarios`

**Auth required** : `True`

**header**: 

```json
{
    "Content-Type": "application/json",
    "Authorization": "Bearer ...."
}
```
**params** : `/Miguel/Castro/15` 

**URL query** : `?nombre="Miguel"&apellido="Castro"&edad=15 `

**body** : 

```json
{
    "nombre": "Miguel",
    "apellido": "Castro",
    "edad": 15
}
```

**Success Responses**

**Code** : `200 OK, 201 Created ...  `

```json
{
    "status": "status code", // https://http.cat/
    "message": "Mensaje opcional",
    "data": { /* Datos solicitados */ } // Si se obtienen más de un dato, la representación será de la forma [{...}], mientras que si es solo uno, será de la forma {}.
    
}
```

------

**Error** : ` 404 Not Found, 500 Internal Server Error ....  `

```json
{
    "status":"status code", // https://http.cat/
    "message": "Descripción del error"
}
```

------



# Rúbrica Evaluativa para Registro de Actividades Diarias (100%)



### 1. Funcionalidad de la API (20%)

- **0 puntos**: La API no es funcional o no implementa correctamente las rutas y endpoints principales.
- **25 puntos**: La API tiene algunas rutas funcionales, pero faltan características clave o no funcionan de manera consistente.
- **50 puntos**: La API implementa la mayoría de las funcionalidades requeridas, pero tiene errores en algunas rutas o endpoints.
- **75 puntos**: La API funciona en gran parte sin problemas, aunque puede haber pequeños errores en funcionalidades o validaciones.
- **100 puntos**: La API implementa correctamente todas las rutas y funcionalidades, incluyendo la creación, actualización, eliminación y consulta de usuarios y actividades.

------

### 2. Manejo de Autenticación y Sesiones (20%)

- **0 puntos**: No se implementa autenticación o manejo de sesiones.
- **25 puntos**: Implementación básica de autenticación, pero no sigue buenas prácticas o no utiliza JWT de manera adecuada.
- **50 puntos**: La autenticación JWT está implementada, pero presenta fallas de seguridad o gestión de sesiones (p. ej. tokens no expiran).
- **75 puntos**: Autenticación JWT funcional y la mayoría de los problemas de seguridad están cubiertos, aunque pueden faltar validaciones más robustas.
- **100 puntos**: Autenticación con JWT bien implementada, con gestión segura de sesiones y protección adecuada contra abusos (incluyendo límites de tasa de solicitudes).

------

### 3. Organización y Estructura del Código (20%)

- **0 puntos**: El código es desorganizado, difícil de seguir, y no se divide en módulos o funciones claras.
- **25 puntos**: El código tiene cierta estructura, pero no sigue principios de modularización o es difícil de entender.
- **50 puntos**: El código está organizado en módulos, pero podría mejorar en cuanto a separación de responsabilidades o buenas prácticas.
- **75 puntos**: Buena organización del código, con modularización clara, aunque podría optimizarse para mejorar la legibilidad o mantenibilidad.
- **100 puntos**: El código está bien organizado, es modular, sigue buenas prácticas de programación, y facilita el mantenimiento a largo plazo.

------

### 4. Base de Datos y Almacenamiento (20%)

- **0 puntos**: No se implementa conexión con la base de datos o esta no funciona adecuadamente.
- **25 puntos**: Se utiliza una base de datos, pero la conexión es inestable o faltan operaciones básicas de CRUD.
- **50 puntos**: La base de datos está conectada y permite algunas operaciones CRUD, pero presenta problemas de consistencia o rendimiento.
- **75 puntos**: Implementación sólida de la base de datos, permitiendo todas las operaciones CRUD requeridas, aunque con oportunidades de optimización.
- **100 puntos**: La base de datos está bien configurada, soporta todas las operaciones de manera eficiente y segura, con buen manejo de relaciones o estructuras no relacionales según el tipo de base.

------

### 5. Documentación y Testing (10%)

- **0 puntos**: No hay documentación ni pruebas.
- **25 puntos**: Documentación básica y confusa; pruebas ausentes o incompletas.
- **50 puntos**: Documentación adecuada pero incompleta; las pruebas cubren solo algunas partes del código.
- **75 puntos**: Documentación clara y pruebas que cubren la mayoría de las funcionalidades, aunque podría mejorarse en detalle.
- **100 puntos**: Documentación completa, clara y fácil de seguir. Las pruebas son exhaustivas, cubren todos los casos importantes y se integran bien en el flujo de desarrollo.

### 6. GitHub y Entrega de Proyecto (10%)

- **0 puntos:** 🚨No se entregó ningún repositorio, su visualización está oculta (o no compartida con el instructor) o hubo adulteración después de la fecha y hora establecida para su entrega. Evidencia de clonación o distribución del trabajo por cualquier medio de comunicación (verbal, digital, entre otros), se asumirá como cancelación del proyecto de manera definitiva. 🚨
- **25 puntos:** Se creó el repositorio, pero en su rama principal no se encuentra el proyecto general ni ningún archivo relacionado.
  - **100 puntos:** Se creó exitosamente el repositorio, donde en su rama principal se encuentra el proyecto general y sus archivos, con evidencia de la participación del equipo completo de manera periódica.
