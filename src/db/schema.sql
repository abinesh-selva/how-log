-- HowLongToGo Database Schema
-- Run this against your Neon PostgreSQL instance

-- Users table (must come before countdowns due to FK)
CREATE TABLE IF NOT EXISTS users (
  id             BIGSERIAL PRIMARY KEY,
  email          VARCHAR(255) NOT NULL UNIQUE,
  name           VARCHAR(100),
  image          TEXT,
  email_verified TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- NextAuth.js v5 required tables
CREATE TABLE IF NOT EXISTS accounts (
  id                  BIGSERIAL PRIMARY KEY,
  user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type                VARCHAR(50)  NOT NULL,
  provider            VARCHAR(50)  NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token       TEXT,
  access_token        TEXT,
  expires_at          BIGINT,
  token_type          VARCHAR(50),
  scope               TEXT,
  id_token            TEXT,
  session_state       TEXT,
  UNIQUE (provider, provider_account_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id            BIGSERIAL PRIMARY KEY,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  user_id       BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires       TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token      VARCHAR(255) NOT NULL UNIQUE,
  expires    TIMESTAMPTZ  NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- Countdowns
CREATE TABLE IF NOT EXISTS countdowns (
  id           BIGSERIAL PRIMARY KEY,
  title        VARCHAR(100) NOT NULL,
  target_date  DATE         NOT NULL,
  timezone     VARCHAR(64)  NOT NULL DEFAULT 'UTC',
  theme        VARCHAR(20)  NOT NULL DEFAULT 'default',
  share_token  CHAR(16)     NOT NULL UNIQUE,
  user_id      BIGINT       REFERENCES users(id) ON DELETE SET NULL,
  is_recurring BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_countdowns_share_token ON countdowns (share_token);
CREATE INDEX IF NOT EXISTS idx_countdowns_user_id     ON countdowns (user_id);
CREATE INDEX IF NOT EXISTS idx_countdowns_target_date ON countdowns (target_date);

-- Email reminders
CREATE TABLE IF NOT EXISTS reminders (
  id           BIGSERIAL PRIMARY KEY,
  countdown_id BIGINT NOT NULL REFERENCES countdowns(id) ON DELETE CASCADE,
  user_id      BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email        VARCHAR(255) NOT NULL,
  days_before  INT  NOT NULL,
  sent_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reminders_due ON reminders (sent_at) WHERE sent_at IS NULL;
