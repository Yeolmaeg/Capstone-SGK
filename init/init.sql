CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  move_type VARCHAR,
  move_duration INTEGER,
  walk_duration INTEGER,
  transit_duration INTEGER,
  drive_duration INTEGER,
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

ALTER TABLE recommendations
ADD CONSTRAINT unique_user_place UNIQUE (user_id, place_id);
