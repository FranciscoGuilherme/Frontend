FROM node:13-alpine as build

# ----------------------------------------------
# ---------[Adição de variáveis no ENV]---------
# ----------------------------------------------

ARG APP_ENV
ARG SIGOMS_USERS_LOGIN

ENV APP_ENV ${APP_ENV}
ENV SIGOMS_USERS_LOGIN ${SIGOMS_USERS_LOGIN}

# ----------------------------------------------
# -----------[Diretório de trabalho]------------
# ----------------------------------------------

WORKDIR /app

# ----------------------------------------------
# --------[Instalação das dependências]---------
# ----------------------------------------------

COPY . /app

RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent
RUN npm run build

# ----------------------------------------------
# -------------[Ambiente produtivo]-------------
# ----------------------------------------------

FROM nginx:stable-alpine

# ----------------------------------------------
# -------[Configurando o app no servidor]-------
# ----------------------------------------------

COPY --from=build /app/build  /usr/share/nginx/html/

VOLUME /var/log/nginx/log

# ----------------------------------------------
# ------[Exposição das portas do container]-----
# ----------------------------------------------

EXPOSE 80

# ----------------------------------------------
# -----------[Execução da aplicação]------------
# ----------------------------------------------

CMD ["nginx", "-g", "daemon off;"]