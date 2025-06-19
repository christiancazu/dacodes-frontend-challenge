# Dacodes - Frontend Challenge

Este proyecto es un monorepo que contiene:

- Microfrontends construidos con Module Federation Vite y React.
- Api Rest y Websockets con Nestjs

## Estructura del proyecto

```
apps/
  root/           # Microfrontend principal (host/container)
  auth/           # Microfrontend de autenticación
  directory/      # Microfrontend de listado de usuarios
  game/           # Microfrontend de juego de memoria, leaderboard
  profile/        # Microfrontend para ver información de un usuario
packages/
  lib/            # Librería compartidas de constantes y tipado
apis/
  leaderboard/    # Api Rest y Websockets para persistencia de puntajes en tiempo real
```

## Dependencias principales

- pnpm
- node v22 >
- docker & docker-compose

Ejecuta estos comandos desde la raíz del monorepo:

**Instalar pnpm(si no está instalado previamente):**

```sh
npm i -g pnpm
```

**Asegurarse tener instalado `node v22` o mayor**

**Asegurarse de tener instalado `docker` y `docker-compose`**

**Copiar el archivo `.env.local` a `.env` (necesario para que el proyecto `leaderboard` lea variables de entorno, para los microfrontends leera por defecto desde .`env.local`) importante mantener ambos archivos**

```sh
  cp .env.local .env
```

**Levantar un servidor de redis en el puerto de la variable de entorno: `REDIS_PORT` (ejem: 6379) o hacerlo usando el docker-compose.yml**

```sh
  docker-compose up --build -d
```

**Instalar dependencias:**

```sh
pnpm install
```

**Correr todas las apps en local**

```sh
pnpm build
```

```sh
pnpm start
```

## Descripción de los proyectos

### Microfrontend - root

- Consume los remotos y orquesta la aplicación.
- Además expone la instancia de Tanstack para centralizar el manejo de estado de las demás apps.
- También expone utilidades que los demás MFE consumen.
- La configuración de rutas está establecida en este MFE y es la que resuelve si el usuario está logueado y puede acceder a las demás rutas.

### Microfrontend - auth

- Muestra la vista de login, que mediante la instancia de Tanstack establecida y compartida desde `root` persiste la información de usuario en localstorage.
- los usuarios y contraseñas son los proveidos de la [API de dummyjson](https://dummyjson.com/users).

### Microfrontend - directory

- Muestra la vista de usuarios de la [API de dummyjson](https://dummyjson.com/users) que pueden ser filtrados por nombre, apellido y usuario, además permite hacer paginación en modo `infinity scroll` y hace persistencia de esos usuarios en localstorage hasta salir de la aplicación.

### Microfrontend - profile

- Muestra la vista de información de un usuario

### Microfrontend - game

- Muestra la vista del juego.
- Primeramente debe elegir la modalidad de juego 3x3, 4x4, 5x5, luego de elegir empezará el juego hasta descubrir todos los pares, cuando concluya mostrará un aviso de que el juego ha terminado y revelará el tiempo transcurrido que será enviado a la API de `leaderboard` con el token del usuario, este token será desencriptado para extraer la metadata del usuario que envía su tiempo de puntuación y será guardado en base de datos en memoria(Redis).
- También muestra el tablero de puntuaciones con el top 10 de mejores tiempos de cada usuario que ha participado que cada vez que un usuario completa un juego y establece una nueva puntuación el tablero es actualizado en tiempo real mediante el servidor de Websockets de `leaderboard`.
- Si un usuario ya ha participado y establece un tiempo mayor al anterior, este no será guardado porque el tablero muestra los mejores tiempos de cada usuario.

### Api Rest - leaderboard

- Servidor que expone endpoints para guardar y mostrar el top 10 de mejores tiempos de los usuarios.
- Permite una conexión por Websockets para actualizar en tiempo real el tablero.
- Las rutas están protegias por validación de JWT.

### Librería compartida - lib

- Es una librería NPM que permite compartir tipados y constantes a todas las aplicaciones del monorepositorio.
