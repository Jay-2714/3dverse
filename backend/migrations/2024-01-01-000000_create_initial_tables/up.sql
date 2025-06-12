-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create models_3d table
CREATE TABLE models_3d (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    file_path VARCHAR NOT NULL,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    description TEXT,
    tags TEXT[],
    is_public BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create model_views table
CREATE TABLE model_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_id UUID NOT NULL REFERENCES models_3d(id) ON DELETE CASCADE,
    viewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    view_count INTEGER NOT NULL DEFAULT 1,
    last_viewed_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create user_favorites table
CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    model_id UUID NOT NULL REFERENCES models_3d(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, model_id)
);

-- Add indexes for better performance
CREATE INDEX idx_models_3d_owner_id ON models_3d(owner_id);
CREATE INDEX idx_models_3d_is_public ON models_3d(is_public);
CREATE INDEX idx_models_3d_created_at ON models_3d(created_at);
CREATE INDEX idx_model_views_model_id ON model_views(model_id);
CREATE INDEX idx_model_views_viewer_id ON model_views(viewer_id);
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX idx_user_favorites_model_id ON user_favorites(model_id);

-- Set up automatic updated_at triggers
SELECT diesel_manage_updated_at('users');
SELECT diesel_manage_updated_at('models_3d');