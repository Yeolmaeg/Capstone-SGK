CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- 테스트 할 때 사용자 아이디 UUID 형태로 해야 된대요~!

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL,
  school VARCHAR,
  school_id INTEGER,
  name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_address (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR,
  address VARCHAR,
  location VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  category VARCHAR,
  start_time JSONB,
  end_time JSONB,
  walk_duration INTEGER,
  transit_duration INTEGER,
  drive_duration INTEGER,
  source VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id) ON DELETE SET NULL,
  discription TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  satisfied BOOLEAN
);
