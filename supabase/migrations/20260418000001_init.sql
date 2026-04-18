-- Contact 문의 테이블
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  inquiry_type text not null check (inquiry_type in ('영상 제작 문의','아트 프린트 구매','사진 복원 의뢰','기타 파트너십')),
  name        text not null,
  contact     text not null,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- 포트폴리오 — AI Media
create table if not exists public.portfolio_media (
  id            text primary key,
  title         text not null,
  category      text not null,
  video_url     text,
  thumbnail_url text,
  description   text,
  platforms     text[],
  sort_order    int default 0,
  created_at    timestamptz not null default now()
);

-- 포트폴리오 — AI Image
create table if not exists public.portfolio_images (
  id          text primary key,
  title       text not null,
  category    text not null,
  image_url   text,
  price       int,
  description text,
  dimensions  text,
  medium      text,
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

-- RLS 활성화
alter table public.contacts enable row level security;
alter table public.portfolio_media enable row level security;
alter table public.portfolio_images enable row level security;

-- contacts: 누구나 insert 가능, select는 서비스 키만
create policy "Anyone can submit contact" on public.contacts
  for insert with check (true);

-- portfolio: 누구나 read
create policy "Public read media" on public.portfolio_media
  for select using (true);

create policy "Public read images" on public.portfolio_images
  for select using (true);

-- 초기 포트폴리오 데이터 삽입
insert into public.portfolio_media (id, title, category, video_url, thumbnail_url, description, platforms, sort_order) values
  ('media-01', 'Healing Brand Film', 'Brand Film', '/assets/video/video_01.mp4', '/assets/image/media_brand_film.png', '공격적 정보가 아닌 치유적 경험으로서의 브랜드 메시지', array['YouTube','Instagram'], 1),
  ('media-02', 'Memory Restoration', 'Photo Restoration', '/assets/video/video_02.mp4', '/assets/image/media_photo_restore.png', '낡은 사진 속 인물과 배경에 숨을 불어넣는 정교한 복원 서비스', array['Print','Digital'], 2),
  ('media-03', 'Healing Shorts', 'Short-form', '/assets/video/video_03.mp4', '/assets/image/media_shorts.png', '플랫폼 최적화 숏츠 – 치유적 경험의 밀도 압축', array['Instagram','TikTok','YouTube Shorts'], 3)
on conflict (id) do nothing;

insert into public.portfolio_images (id, title, category, image_url, price, description, dimensions, medium, sort_order) values
  ('image-01', 'Texture of Stillness', 'High-End Art', '/assets/image/art_stillness.png', 3500000, '설명이 필요 없는 안도감을 선사하는 하이엔드 AI 아트', '100 x 100 cm', 'Archival Pigment Print', 1),
  ('image-02', 'Analog Echo', 'High-End Art', '/assets/image/art_essence.png', 4200000, '디지털 알고리즘과 아날로그적 물성이 빚어내는 독보적인 질감', '120 x 80 cm', 'Archival Pigment Print', 2),
  ('image-03', 'Nocturne Space', 'Space Branding', '/assets/image/art_horizon.png', 5800000, '공간의 품격을 높이는 공간 맞춤형 브랜딩 솔루션', '150 x 100 cm', 'Archival Pigment Print', 3)
on conflict (id) do nothing;
