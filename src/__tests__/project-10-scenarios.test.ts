import test from 'node:test'
import assert from 'node:assert'
import { BlockInputConfigSchema } from '../types'
import { v4 as uuidv4 } from 'uuid'
import type { CanvasBlock } from '../types'

test('145가지 유즈케이스 및 신규 타겟 그룹 특화 블록 조합 건축 테스트', async (t) => {
  await t.test('1. [포토그래퍼] 스냅 포트폴리오 & 예약 웹앱 조합 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_hero_01', name: '히어로 배너', tier: 'STARTER', inputConfig: { title: '감성 스냅 작가 포트폴리오' } },
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '갤러리 앨범', tier: 'STARTER', inputConfig: { title: '스냅 갤러리' } },
      { instanceId: uuidv4(), blockId: 'blk_calendar_01', name: '캘린더', tier: 'STANDARD', inputConfig: { title: '촬영 일정' } },
      { instanceId: uuidv4(), blockId: 'blk_consulting_slot_01', name: '타임 슬롯', tier: 'STANDARD', inputConfig: { title: '촬영 시간 선택' } },
      { instanceId: uuidv4(), blockId: 'blk_pay_01', name: '결제 모듈', tier: 'PROFESSIONAL', inputConfig: { title: '예약금 결제' } },
      { instanceId: uuidv4(), blockId: 'blk_map_01', name: '오시는 길', tier: 'STARTER', inputConfig: { title: '스튜디오 위치' } },
      { instanceId: uuidv4(), blockId: 'blk_faq_01', name: '자주 묻는 질문', tier: 'STARTER', inputConfig: { title: 'FAQ' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 7)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('2. [오디오북/팟캐스트] 음원 판매 웹앱 조합 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_hero_01', name: '히어로', tier: 'STARTER', inputConfig: { title: '팟캐스트 & 오디오북' } },
      { instanceId: uuidv4(), blockId: 'blk_video_01', name: '미디어 플레이어', tier: 'STARTER', inputConfig: { title: '미리듣기' } },
      { instanceId: uuidv4(), blockId: 'blk_curriculum_01', name: '에피소드 목차', tier: 'STANDARD', inputConfig: { title: '회차 안내' } },
      { instanceId: uuidv4(), blockId: 'blk_pay_01', name: '디지털 결제', tier: 'PROFESSIONAL', inputConfig: { title: '유료 회차 구매' } },
      { instanceId: uuidv4(), blockId: 'blk_file_download_01', name: '음원 다운로드', tier: 'STANDARD', inputConfig: { title: 'MP3 다운로드' } },
      { instanceId: uuidv4(), blockId: 'blk_feed_01', name: '방명록', tier: 'STARTER', inputConfig: { title: '청취자 응원 피드' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 6)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('126. [아티스트] 인디 뮤지션 신곡 발매 쇼케이스 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '음원 자켓 갤러리', tier: 'STARTER', inputConfig: { title: '신곡 앨범 커버' } },
      { instanceId: uuidv4(), blockId: 'blk_share_01', name: '스트리밍 플랫폼 공유', tier: 'STARTER', inputConfig: { title: '멜론/스포티파이 스트리밍' } },
      { instanceId: uuidv4(), blockId: 'blk_feed_01', name: '팬 응원 방명록 월', tier: 'STARTER', inputConfig: { title: '팬 메시지 월' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('127. [아티스트] 독립 출판 작가 매거진 판매/신청 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '표지 뷰어', tier: 'STARTER', inputConfig: { title: '독립 매거진 표지' } },
      { instanceId: uuidv4(), blockId: 'blk_form_01', name: '입금 및 배송지 폼', tier: 'STANDARD', inputConfig: { title: '책 구매 배송지 접수' } },
      { instanceId: uuidv4(), blockId: 'blk_review_01', name: '독자 한줄평 아카이브', tier: 'STANDARD', inputConfig: { title: '독자 감상평 리뷰' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('128. [아티스트] 일러스트레이터 포트폴리오 & 굿즈 통판 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '그림 작품 갤러리', tier: 'STARTER', inputConfig: { title: '고해상도 일러스트 아카이브' } },
      { instanceId: uuidv4(), blockId: 'blk_form_01', name: '굿즈 구매 폼', tier: 'STANDARD', inputConfig: { title: '스티커/포토카드 통판 신청' } },
      { instanceId: uuidv4(), blockId: 'blk_dday_01', name: '서디페 디데이 타이머', tier: 'STARTER', inputConfig: { title: '행가 참여 마감 카운트다운' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('129. [아티스트] 연극/공연 팀 예매 & 안내 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_txt_01', name: '공연 시놉시스 소개', tier: 'STARTER', inputConfig: { title: '연극 시놉시스 및 출연진' } },
      { instanceId: uuidv4(), blockId: 'blk_calendar_01', name: '관람 날짜 회차 캘린더', tier: 'STANDARD', inputConfig: { title: '공연 예매 일시 선택' } },
      { instanceId: uuidv4(), blockId: 'blk_map_01', name: '소극장 오시는 길 지도', tier: 'STARTER', inputConfig: { title: '극장 위치 및 약도' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('130. [로컬 상인] 동네 플리마켓 셀러 모집 & 지도 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_dday_01', name: '마켓 개최 디데이', tier: 'STARTER', inputConfig: { title: '플리마켓 개막 카운트다운' } },
      { instanceId: uuidv4(), blockId: 'blk_content_card_grid_01', name: '셀러 물품 그리드', tier: 'STARTER', inputConfig: { title: '참여 셀러 및 물품 라인업' } },
      { instanceId: uuidv4(), blockId: 'blk_map_01', name: '마켓 장소 핀 지도', tier: 'STARTER', inputConfig: { title: '플리마켓 장소 오시는 길' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('131. [로컬 상인] 골목상권 축제 & 스탬프 투어 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_map_01', name: '참여 상점 리스트 맵', tier: 'STARTER', inputConfig: { title: '골목상권 상점 핀 지도' } },
      { instanceId: uuidv4(), blockId: 'blk_faq_01', name: '할인 혜택 아코디언 FAQ', tier: 'STARTER', inputConfig: { title: '상점별 혜택 및 수칙' } },
      { instanceId: uuidv4(), blockId: 'blk_feed_01', name: '축제 후기 방명록', tier: 'STARTER', inputConfig: { title: '주민 방문 인증 피드' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('132. [주민 자치] 아파트/동네 주민 총회 & 건의사항 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_poll_01', name: '주민 안건 투표 폼', tier: 'STANDARD', inputConfig: { title: '총회 주민 의결 투표' } },
      { instanceId: uuidv4(), blockId: 'blk_talk_01', name: '공지사항 전광판 Ticker', tier: 'STANDARD', inputConfig: { title: '아파트 공지 롤링 Ticker' } },
      { instanceId: uuidv4(), blockId: 'blk_txt_01', name: '총회 장소 및 시간 안내', tier: 'STARTER', inputConfig: { title: '주민 총회 일시' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('133. [봉사단] 연탄 배달 & 급식 봉사 모집 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_dday_01', name: '봉사 일시 디데이', tier: 'STARTER', inputConfig: { title: '봉사활동 마감 카운트다운' } },
      { instanceId: uuidv4(), blockId: 'blk_form_01', name: '봉사자 신청 폼', tier: 'STANDARD', inputConfig: { title: '봉사자 성함 및 연락처 접수' } },
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '현장 활동 사진 갤러리', tier: 'STARTER', inputConfig: { title: '봉사활동 현장 인증' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('134. [강사] 1인 요가/필라테스 스튜디오 시간표 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_stamp_card_01', name: '잔여 횟수 스탬프 카드', tier: 'STANDARD', inputConfig: { title: '회원권 잔여 횟수 도장' } },
      { instanceId: uuidv4(), blockId: 'blk_consulting_slot_01', name: '1:1 타임슬롯 캘린더', tier: 'STANDARD', inputConfig: { title: '수업 세션 시간 선택' } },
      { instanceId: uuidv4(), blockId: 'blk_map_01', name: '스튜디오 오시는 길 지도', tier: 'STARTER', inputConfig: { title: '스튜디오 위치' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('135. [PT 트레이너] 2주 눈바디 & 식단 챌린지 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '눈바디 비포애프터 갤러리', tier: 'STARTER', inputConfig: { title: '체형 변화 비교 앨범' } },
      { instanceId: uuidv4(), blockId: 'blk_form_01', name: '식단 인증 수집 폼', tier: 'STANDARD', inputConfig: { title: '오늘의 식단 사진 접수' } },
      { instanceId: uuidv4(), blockId: 'blk_dday_01', name: '챌린지 마감 디데이', tier: 'STARTER', inputConfig: { title: '챌린지 종료까지 남은 시간' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('136. [메이크업] 웨딩/면접 메이크업 포트폴리오 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '시술 사진 갤러리', tier: 'STARTER', inputConfig: { title: '스타일링 포트폴리오' } },
      { instanceId: uuidv4(), blockId: 'blk_form_01', name: '예약 희망 스타일 폼', tier: 'STANDARD', inputConfig: { title: '예약 날짜 및 헤메 스타일 접수' } },
      { instanceId: uuidv4(), blockId: 'blk_table_01', name: '이용 요금표 데이터표', tier: 'PROFESSIONAL', inputConfig: { title: '시술 항목별 요금표' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('137. [타로] 비대면 타로 카드 상담 예약 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_txt_01', name: '마스터 소개 텍스트', tier: 'STARTER', inputConfig: { title: '타로 마스터 소개' } },
      { instanceId: uuidv4(), blockId: 'blk_consulting_slot_01', name: '30분 단위 상담 폼', tier: 'STANDARD', inputConfig: { title: '상담 타임 슬롯 선택' } },
      { instanceId: uuidv4(), blockId: 'blk_review_01', name: '만족도 후기 리스트', tier: 'STANDARD', inputConfig: { title: '상담 후기 평점' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('138. [레저] 오토캠핑장 사이트 안내 및 수칙 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '캠핑장 전경 갤러리', tier: 'STARTER', inputConfig: { title: '캠핑장 전경 포토' } },
      { instanceId: uuidv4(), blockId: 'blk_map_01', name: '사이트 배치도 지도', tier: 'STARTER', inputConfig: { title: '캠핑 사이트 핀 맵' } },
      { instanceId: uuidv4(), blockId: 'blk_faq_01', name: '환불 및 수칙 FAQ', tier: 'STARTER', inputConfig: { title: '이용 주의사항 FAQ' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('139. [여행 플래너] 맞춤 패키지 일정 및 준비물 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '랜드마크 갤러리', tier: 'STARTER', inputConfig: { title: '여행지 랜드마크 컷' } },
      { instanceId: uuidv4(), blockId: 'blk_stats_01', name: '날씨/환율 정보 지표', tier: 'PROFESSIONAL', inputConfig: { title: '현지 날씨 및 환율' } },
      { instanceId: uuidv4(), blockId: 'blk_action_list_01', name: '준비물 체크리스트', tier: 'STANDARD', inputConfig: { title: '여행 준비물 체크' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('140. [파티룸] 무인 파티룸 시간제 대여 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '인테리어 컷 갤러리', tier: 'STARTER', inputConfig: { title: '파티룸 인테리어 사진' } },
      { instanceId: uuidv4(), blockId: 'blk_calendar_01', name: '실시간 예약 캘린더', tier: 'STANDARD', inputConfig: { title: '대여 시간 선택 캘린더' } },
      { instanceId: uuidv4(), blockId: 'blk_txt_01', name: '편의시설 안내 텍스트', tier: 'STARTER', inputConfig: { title: '구비 장비 및 이용 수칙' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('141. [렌탈 스튜디오] 셀프 사진관 예약 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_content_card_grid_01', name: '컨셉룸별 그리드', tier: 'STARTER', inputConfig: { title: '스튜디오 컨셉룸 안내' } },
      { instanceId: uuidv4(), blockId: 'blk_consulting_slot_01', name: '타임테이블 선택 폼', tier: 'STANDARD', inputConfig: { title: '촬영 타임 슬롯 선택' } },
      { instanceId: uuidv4(), blockId: 'blk_map_01', name: '오시는 길 지도', tier: 'STARTER', inputConfig: { title: '스튜디오 위치 및 주차' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('142. [펫 케어] 유기동물 임보 & 입양 홍보 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '구조견/묘 프로필 갤러리', tier: 'STARTER', inputConfig: { title: '입양 대기 아이들 프로필' } },
      { instanceId: uuidv4(), blockId: 'blk_form_01', name: '입양 신청서 수집 폼', tier: 'STANDARD', inputConfig: { title: '입양 신청서 작성' } },
      { instanceId: uuidv4(), blockId: 'blk_txt_01', name: '후원 계좌 안내 텍스트', tier: 'STARTER', inputConfig: { title: '보호소 후원 계좌' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('143. [펫시터] 반려동물 방문 돌봄 신청 & 후기 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_table_01', name: '지역 및 가격표 데이터표', tier: 'PROFESSIONAL', inputConfig: { title: '돌봄 서비스 가능 지역 및 요금' } },
      { instanceId: uuidv4(), blockId: 'blk_form_01', name: '돌봄 예약 접수 폼', tier: 'STANDARD', inputConfig: { title: '방문 돌봄 신청서' } },
      { instanceId: uuidv4(), blockId: 'blk_review_01', name: '이용 생생 후기 리스트', tier: 'STANDARD', inputConfig: { title: '고객 만족 후기' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('144. [펫푸드 공방] 수제 간식 주문 제작 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_form_01', name: '알레르기 성분 선택 폼', tier: 'STANDARD', inputConfig: { title: '맞춤 펫푸드 옵션 선택' } },
      { instanceId: uuidv4(), blockId: 'blk_album_01', name: '수제 간식 스마트 갤러리', tier: 'STARTER', inputConfig: { title: '홀케이크 및 수제 간식 비주얼' } },
      { instanceId: uuidv4(), blockId: 'blk_dday_01', name: '픽업 일정 디데이', tier: 'STARTER', inputConfig: { title: '픽업 일시 카운트다운' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })

  await t.test('145. [심리상담] 비대면 전문 심리상담 센터 검증', () => {
    const blocks: CanvasBlock[] = [
      { instanceId: uuidv4(), blockId: 'blk_profile_grid_01', name: '상담사 프로필 카드', tier: 'STARTER', inputConfig: { title: '전문 상담사 소개' } },
      { instanceId: uuidv4(), blockId: 'blk_calendar_01', name: '상담 세션 캘린더', tier: 'STANDARD', inputConfig: { title: '상담 일시 선택' } },
      { instanceId: uuidv4(), blockId: 'blk_map_01', name: '센터 오시는 길 지도', tier: 'STARTER', inputConfig: { title: '센터 위치 약도' } },
    ]
    assert.strictEqual(new Set(blocks.map(b => b.instanceId)).size, 3)
    blocks.forEach(b => assert.ok(BlockInputConfigSchema.safeParse(b.inputConfig).success))
  })
})
