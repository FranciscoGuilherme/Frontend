FROM node:13-alpine as build

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
# -----------[Execução da aplicação]------------
# ----------------------------------------------

CMD ["npm", "start"]

# ----------------------------------------------
# -------------[Ambiente produtivo]-------------
# ----------------------------------------------

FROM nginx:1.16.0-alpine

# ----------------------------------------------
# -------[Configurando o app no servidor]-------
# ----------------------------------------------

COPY --from=build /app/build  /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

# ----------------------------------------------
# ------[Exposição das portas do container]-----
# ----------------------------------------------

EXPOSE 80