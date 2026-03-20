# Plataforma de Subastas

Aplicación web para la gestión y participación en subastas de arte, desarrollada como prueba técnica junior. El sistema permite a usuarios autenticados y verificados realizar ofertas en subastas, y a administradores gestionar obras, subastas y usuarios.

# Ejecutar el código

Copiamos el repositorio:
```sh
git clone https://github.com/MaxiGomez5431/auction-app.git
cd .\auction-app\
```

Ejecutamos docker-compose:
```sh
docker-compose up -d --build
```

El proyecto quedará levantado en:

- Frontend - http://localhost:3000/
- Backend - http://localhost:3001/

# Contraseñas de usuarios

| Email | Contraseña | Rol |
| ----- | ---------- | --- |
| admin@gmail.com | 123456 | Administrador
| ana@gmail.com | 123456 | Usuario Verificado
| pendiente@gmail.com | 123456 | Usuario sin verificar

- El administrador tiene capacidad de crear obras, subastas y verificar usuarios
- El usuario verificado puede pujar por las subastas
- El usuario sin verificar no puede pujar

# Tecnologías Utilizadas

### Backend

- NestJS - Framework de Node.js para aplicaciones escalables
- Prisma - ORM para la gestión de la base de datos
- SQLite - Base de datos simple y embebida
- JWT - Autenticación basada en tokens
- Bcrypt - Encriptación de contraseñas

### Frontend

- Next.js 14+ - Framework de React con App Router
- TypeScript - Tipado estático
- Tailwind CSS - Estilizado rápido y responsive
- React Hook Form + Zod - Manejo de formularios y validaciones
- Axios - Cliente HTTP con interceptores
- Lucide React - Iconos modernos y personalizables

### DevOps

- Docker - Contenerización de la aplicación

# Decisiones técnicas

Se diseñó el sistema utilizando una arquitectura cliente-servidor con una API REST que separa el frontend del backend, permitiendo escalabilidad y mantenimiento independiente de cada capa. Para el frontend se utilizó Next.js junto con Tailwind CSS por su enfoque basado en componentes y facilidad para construir interfaces reutilizables. En el backend se eligió Nest.js por su estructura modular y soporte para buenas prácticas como la inyección de dependencias, facilitando la organización del código y su crecimiento.

En cuanto a la implementación, se aplicaron mecanismos de seguridad basados en JWT para proteger las rutas privadas, utilizando guards para controlar el acceso. La estructura del backend se organizó en módulos, separando responsabilidades en controllers, services y DTOs, lo que mejora la mantenibilidad.

A continuación, el modelo de datos creado para el problema:

<img width="662" height="449" alt="Diagrama sin título drawio" src="https://github.com/user-attachments/assets/d71bc510-bf76-4765-92bc-e9520a736535" />

Se mantuvieron la menor cantidad de datos posibles en cada entidad en pos de la simplicidad del ejercicio. 

# Supuestos y simplificaciones

A manera de simplificar el desarrollo y centrarse en las caracteristicas más importantes del proyecto, se simplificó lo siguiente:

- Las entidades solo se pueden crear y eliminar, no se pueden editar.
- El listado de obras disponible se unió con el de subastas disponibles, dada la poca cantidad de datos que se tiene de las obras, no tenía sentido un apartado solo para ver las obras del sistema.
- Las imagenes reciben de las obras se suben por medio de una URL.
- No se puede aplicar el rol de admin a otro usuario, hay un único admin en el sistema.

