FROM node:13-alpine as build

# ----------------------------------------------
# ---------[Adição de variáveis no ENV]---------
# ----------------------------------------------

ARG APP_ENV
ARG ROOT_APP_PATH=/app
ARG SIGOMS_USERS_LOGIN

ENV APP_ENV ${APP_ENV}
ENV ROOT_APP_PATH ${ROOT_APP_PATH}
ENV SIGOMS_USERS_LOGIN ${SIGOMS_USERS_LOGIN}

# ----------------------------------------------
# -----------[Diretório de trabalho]------------
# ----------------------------------------------

WORKDIR ${ROOT_APP_PATH}

# ----------------------------------------------
# ------[Criação de variáveis de ambiente]------
# ----------------------------------------------

COPY . ${ROOT_APP_PATH}

RUN apk add --no-cache --upgrade bash
RUN chmod +x ${ROOT_APP_PATH}/docker/environment.sh
RUN /bin/bash ${ROOT_APP_PATH}/docker/environment.sh \
    ${APP_ENV} \
    ${ROOT_APP_PATH} \
    ${SIGOMS_USERS_LOGIN}

# ----------------------------------------------
# --------[Instalação das dependências]---------
# ----------------------------------------------

RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent
RUN npm run build

# ----------------------------------------------
# -----------[Execução da aplicação]------------
# ----------------------------------------------

CMD ["npm", "start"]

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