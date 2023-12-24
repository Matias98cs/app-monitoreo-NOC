# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura limpia con TypesScript

# dev

1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Ejcutar el comando `npm install`
4. Levantar las bases de datos con el comando
   ```
   docker compose up -d
   ```
5. Ejcutar `npm run dev`

```
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
```
