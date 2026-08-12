#!/usr/bin/env bash

# ==============================================================================
# 하루(Haroo) 서비스 - 스마트 자동 원격/로컬 테스트 배포 스크립트
# 대상 도메인: test-web.haroo.site (Port: 3010)
# ==============================================================================

set -e

# 스크립트 실행 위치가 어디든 프로젝트 루트로 이동
cd "$(dirname "$0")/.."

INTERNAL_IP="192.168.0.6"
INTERNAL_PORT="22"
EXTERNAL_IP="125.190.25.48"
EXTERNAL_PORT="8193"
SERVER_USER="ksh"
REMOTE_PROJECT_PATH="~/haroo"
GIT_REPO_URL="https://github.com/Moorisong/haroo.git"

# 현재 환경이 홈서버 내부인지 로컬 맥북인지 판별
IS_HOME_SERVER=false
if [ "$(hostname)" = "ubuntu-home-ksh" ] || [ -f "/etc/nginx/sites-available/web" ]; then
    IS_HOME_SERVER=true
fi

if [ "$IS_HOME_SERVER" = true ]; then
    # --------------------------------------------------------------------------
    # A. 홈서버 내부에서 실행 중일 때의 배포 로직
    # --------------------------------------------------------------------------
    echo "🚀 [Test] 홈서버 내부에서 테스트 환경(test-web.haroo.site) 배포를 진행합니다..."

    # NVM 로드 및 Node 22+ 환경 설정 (Next.js 16 요구사항)
    export NVM_DIR="$HOME/.nvm"
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        \. "$NVM_DIR/nvm.sh"
        nvm use 22 || nvm install 22
    fi

    if command -v pnpm &> /dev/null; then
        echo "📦 pnpm으로 의존성을 설치합니다..."
        pnpm install --ignore-scripts || pnpm install
    else
        echo "📦 npm으로 의존성을 설치합니다..."
        npm install
    fi

    echo "🏗️  Next.js 애플리케이션을 빌드합니다..."
    if [ -f ".env.test" ]; then
        export $(cat .env.test | xargs)
    fi
    export NODE_ENV=production
    export PORT=3010

    if command -v pnpm &> /dev/null; then
        pnpm build
    else
        npm run build
    fi

    echo "🔄 PM2 서버 프로세스를 재시작합니다 (App Name: haroo-test, Port: 3010)..."
    if command -v pm2 &> /dev/null; then
        pm2 startOrReload ecosystem.config.js --only haroo-test --env test || pm2 start "npm -- start -- -p 3010" --name "haroo-test"
        pm2 save
        echo "✅ [Test] 홈서버 배포 성공! (https://test-web.haroo.site)"
    else
        echo "⚠️ PM2를 찾을 수 없습니다."
    fi

else
    # --------------------------------------------------------------------------
    # B. 맥북(로컬)에서 실행 시: 네트워크(내부/외부) 자동 감지하여 홈서버 원격 배포
    # --------------------------------------------------------------------------
    echo "🔍 맥북에서 실행되었습니다. 홈서버 네트워크 연결 상태를 자동 확인합니다..."

    if nc -z -w 2 $INTERNAL_IP $INTERNAL_PORT 2>/dev/null; then
        echo "🏠 [내부망 연결] 집 안 네트워크($INTERNAL_IP)로 홈서버에 접속합니다."
        TARGET_HOST=$INTERNAL_IP
        TARGET_PORT=$INTERNAL_PORT
    else
        echo "🌐 [외부망 연결] 외부 포트리다이렉션($EXTERNAL_IP:$EXTERNAL_PORT)으로 홈서버에 접속합니다."
        TARGET_HOST=$EXTERNAL_IP
        TARGET_PORT=$EXTERNAL_PORT
    fi

    echo "🚀 홈서버($SERVER_USER@$TARGET_HOST:$TARGET_PORT) 원격 배포를 시작합니다..."

    # 홈서버에 기본 폴더 준비
    ssh -o StrictHostKeyChecking=no -p $TARGET_PORT $SERVER_USER@$TARGET_HOST "mkdir -p $REMOTE_PROJECT_PATH"

    echo "📤 맥북의 최신 소스코드(수정사항 포함)를 홈서버로 동기화 전송합니다..."
    rsync -avz -e "ssh -o StrictHostKeyChecking=no -p $TARGET_PORT" \
        --exclude 'node_modules' \
        --exclude '.next' \
        --exclude '.git' \
        --exclude 'sample' \
        ./ $SERVER_USER@$TARGET_HOST:$REMOTE_PROJECT_PATH/

    ssh -o StrictHostKeyChecking=no -p $TARGET_PORT $SERVER_USER@$TARGET_HOST << EOF
        set -e
        cd $REMOTE_PROJECT_PATH
        echo "⚙️  홈서버에서 테스트 빌드 및 PM2 재배포 실행..."
        chmod +x scripts/*.sh
        bash scripts/deploy-test.sh
EOF

    echo "🎉 [Test] 맥북 원스톱 테스트 배포가 완수되었습니다! (https://test-web.haroo.site)"
fi
