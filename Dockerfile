# Node.js 베이스 이미지
FROM node:18

# 앱 디렉토리 생성
WORKDIR /app

# 종속성 복사 및 설치
COPY package*.json ./
RUN npm install

# 앱 코드 복사
COPY . .

# 환경변수 및 포트 설정
ENV PORT=8080
EXPOSE 8080

# 앱 실행 명령
CMD ["node", "server/server.js"]
