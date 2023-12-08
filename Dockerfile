FROM node:18-alpine
WORKDIR /core
# 1.  here core used for folder where project will build
COPY . .
# 2. here double dots used for coppied all folders for  building 
RUN yarn install
RUN  yarn build
# 3.  here run used for install and building the project
EXPOSE 3002
# 4. port for running the project

