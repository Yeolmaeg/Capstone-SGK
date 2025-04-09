DROP TABLE IF EXISTS lecture_schedules;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE lecture_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  place_id UUID REFERENCES places(id),
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
  source VARCHAR(20) DEFAULT 'uniclass',
  is_recurring BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
