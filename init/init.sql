CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL,
  school VARCHAR,
  school_id INTEGER,
  start_term VARCHAR,
  end_term VARCHAR,
  name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_address (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR,
  address VARCHAR,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  category VARCHAR,
  hours TEXT,    
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id), --널값 허용(추천받는 장소만 place_id 부여)
  title VARCHAR,
  address VARCHAR,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  move_type VARCHAR,
  move_duration INTEGER,
  walk_duration INTEGER,
  transit_duration INTEGER,
  drive_duration INTEGER,
  source VARCHAR(20) DEFAULT 'manual',-- manual은 사용자가 직접 생성했다는 뜻. 추천 받는 경우에는 recommendation, 장소명 입력 시에는 search 등으로 구분.
  is_recurring BOOLEAN DEFAULT false,
  color VARCHAR DEFAULT '#87CEFA',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  satisfied BOOLEAN,
  CONSTRAINT unique_user_place UNIQUE (user_id, place_id)
);
