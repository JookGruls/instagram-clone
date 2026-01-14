# Stage 1: Build the React application
FROM node:20-alpine as build

WORKDIR /app

# --- ส่วนที่เพิ่ม/แก้ไข ---
# รับค่าจาก .env หรือ build-arg
ARG REACT_APP_API_END_POINT
ARG REACT_APP_KEY

# เปลี่ยนให้เป็น ENV ภายในเครื่องเพื่อให้ npm run build ดึงไปใช้ได้
ENV REACT_APP_API_END_POINT=$REACT_APP_API_END_POINT
ENV REACT_APP_KEY=$REACT_APP_KEY
# -----------------------

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]