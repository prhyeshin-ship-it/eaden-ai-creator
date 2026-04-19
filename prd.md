import json

# Define the contents based on the final consensus
prd_md = """# PRD: Eaden Ai Creator (Official Website)

## 1. 프로젝트 비전 및 정체성
- **이름:** Eaden Ai Creator
- **부제:** 감각을 설계하는 AI 미디어, 몰입에서 이완으로
- **한 줄 설명:** 오감이 반응하는 환경을 설계하는 AI 미디어 쇼케이스 및 하이엔드 아트 갤러리
- **유형:** 비결제형 포트폴리오 및 서비스 소개 사이트 (제작 문의 유도형)
- **난이도:** 중간 (Medium) - 비주얼 인터랙션 및 비디오 제어 중심

## 2. 사용자 시나리오
- **진입:** 메인 화면의 무음 자동 재생 영상으로 브랜드의 시각적 무드에 즉시 몰입.
- **탐색:** About에서 철학을 이해하고, Services에서 Ai Media와 Ai Image 포트폴리오를 감상.
- **몰입:** 개별 작품 클릭 시 외부 방해 요소가 차단된 풀스크린 환경(Immersive Viewer)에서 감상.
- **전환:** Contact 메뉴의 드롭다운을 통해 목적에 맞는 제작 문의 및 상담 신청.

## 3. 화면 구성 (Information Architecture)
- **GNB (상단 고정):** About | Services (Ai Media / Ai Image) | Contact
- **Home:** Hero Video Loop (Muted) + Mute/Unmute Toggle Button
- **About:** "이완의 순간까지 디자인하는 프리미엄 미디어 아트" 소개 및 브랜드 스토리
- **Services (Ai Media):** 브랜드 필름, 사진 복원, 숏츠, 광고 (치유적 경험 중심)
- **Services (Ai Image):** 하이엔드 AI 아트 프린트 갤러리 (공간의 품격 강조)
- **Contact:** 문의 유형 선택 드롭다운, 이름, 연락처, 메시지 입력 폼

## 4. 상세 서비스 명세
### [Ai Media]
- AI 툴을 활용한 합리적 비용과 빠른 속도, 하이엔드 결과물 도출.
- 낡은 사진 속 인물과 배경에 숨을 불어넣는 정교한 복원 서비스.
- '공격적 정보'가 아닌 '치유적 경험'으로의 광고 전환 기술 적용.
- 플랫폼(유튜브, 인스타그램, 틱톡) 최적화 및 공간 맞춤형 큐레이션 제공.

### [Ai Image]
- 수천만 원대 하이엔드 아트의 감각을 일상으로 제안.
- 디지털 알고리즘과 아날로그적 물성이 빚어내는 독보적인 질감.
- 설명이 필요 없는 안도감과 공간의 품격을 높이는 브랜딩 솔루션.
"""

design_system_md = """# Eaden Design System (V3)

## 1. Color Palette (가독성 및 하이엔드 감성)
- **Primary Background:** `#213448` (Deep Navy) - 깊은 몰입감 제공
- **Contrast Text:** `#E7DEC8` (Cream Beige) - 가독성을 위한 메인 텍스트색
- **Accent:** `#CBAF87` (Muted Gold) - 버튼 및 포인트 컬러
- **Muted Elements:** `#7E8A97` (Steel Grey) - 보조 설명 및 라인

## 2. Typography
- **Korean Font:** "NanumSquare" 또는 "NanumGothic" (가독성 중심의 깔끔한 고딕체)
- **English Font:** "Grifit" (우아하고 프리미엄한 세리프 체)
- **Font Rule:** 영문 헤드라인은 Grifit를 적용하여 세련미 강조, 국문 본문은 나눔스퀘어로 가독성 확보

## 3. Animation & Interaction (Framer Motion)
- **Healing Transition:** `2.5s cubic-bezier(0.4, 0, 0.2, 1)` - 모든 주요 페이드인 및 전환에 적용
- **Standard Smooth:** `0.8s ease-in-out` - 버튼 호버 및 일반 메뉴 이동
- **Interaction:** 마우스 휠 스크롤에 따라 섹션이 부드럽게 페이드아웃 되며 다음 섹션 등장

## 4. Layout Breakpoints
- **Mobile:** < 768px (Single column, Sidebar menu)
- **Desktop:** > 1280px (3-4 columns Grid, Fixed GNB)
"""

content_json = {
  "site_info": {
    "brand_name": "Eaden Ai Creator",
    "main_tagline": "감각을 설계하는 AI 미디어, 몰입에서 이완으로",
    "hero_video_url": "/assets/eaden_main_hero.mp4"
  },
  "about": {
    "introduction": "이완의 순간까지 디자인하는 프리미엄 미디어 아트. Eaden은 단순한 '보는 영상'을 넘어 오감이 반응하는 정교한 미디어 환경을 설계하며..."
  },
  "services": {
    "ai_media": [
      {
        "id": "media-01",
        "title": "Healing Brand Film",
        "category": "Brand Film",
        "video_url": "/assets/video_01.mp4",
        "description": "공격적 정보가 아닌 치유적 경험으로서의 브랜드 메시지"
      }
    ],
    "ai_image": [
      {
        "id": "image-01",
        "title": "Texture of Stillness",
        "category": "High-End Art",
        "image_url": "/assets/art_01.jpg",
        "price": 3500000,
        "description": "설명이 필요 없는 안도감을 선사하는 하이엔드 AI 아트"
      }
    ]
  },
  "contact": {
    "inquiry_types": ["영상 제작 문의", "아트 프린트 구매", "사진 복원 의뢰", "기타 파트너십"]
  }
}

# Write files and zip
with open("prd.md", "w", encoding="utf-8") as f: f.write(prd_md)
with open("design_system.md", "w", encoding="utf-8") as f: f.write(design_system_md)
with open("eaden_content.json", "w", encoding="utf-8") as f: json.dump(content_json, f, ensure_ascii=False, indent=2)

import zipfile
with zipfile.ZipFile("eaden_final_specs_v3.zip", "w") as zipf:
    zipf.write("prd.md")
    zipf.write("design_system.md")
    zipf.write("eaden_content.json")