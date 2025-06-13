use diesel::prelude::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use chrono::NaiveDateTime;
use crate::schema::{models_3d, model_views, user_favorites};

#[derive(Debug, Clone, Queryable, Selectable, Serialize, Deserialize)]
#[diesel(table_name = models_3d)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Model3D {
    pub id: Uuid,
    pub name: String,
    pub file_path: String,
    pub owner_id: Uuid,
    pub description: Option<String>,
    pub tags: Option<Vec<String>>,
    pub is_public: bool,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = models_3d)]
pub struct NewModel3D {
    pub name: String,
    pub file_path: String,
    pub owner_id: Uuid,
    pub description: Option<String>,
    pub tags: Option<Vec<String>>,
    pub is_public: bool,
}

#[derive(Debug, AsChangeset, Deserialize)]
#[diesel(table_name = models_3d)]
pub struct UpdateModel3D {
    pub name: Option<String>,
    pub description: Option<String>,
    pub tags: Option<Vec<String>>,
    pub is_public: Option<bool>,
}

#[derive(Debug, Clone, Queryable, Selectable, Serialize, Deserialize)]
#[diesel(table_name = model_views)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ModelView {
    pub id: Uuid,
    pub model_id: Uuid,
    pub viewer_id: Option<Uuid>,
    pub view_count: i32,
    pub last_viewed_at: NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = model_views)]
pub struct NewModelView {
    pub model_id: Uuid,
    pub viewer_id: Option<Uuid>,
    pub view_count: i32,
}

#[derive(Debug, Clone, Queryable, Selectable, Serialize, Deserialize)]
#[diesel(table_name = user_favorites)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct UserFavorite {
    pub id: Uuid,
    pub user_id: Uuid,
    pub model_id: Uuid,
    pub created_at: NaiveDateTime,
}

#[derive(Debug, Insertable, Deserialize)]
#[diesel(table_name = user_favorites)]
pub struct NewUserFavorite {
    pub user_id: Uuid,
    pub model_id: Uuid,
}

#[derive(Serialize)]
pub struct Model3DResponse {
    pub id: Uuid,
    pub name: String,
    pub file_path: String,
    pub owner_id: Uuid,
    pub description: Option<String>,
    pub tags: Option<Vec<String>>,
    pub is_public: bool,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub view_count: Option<i32>,
    pub is_favorited: Option<bool>,
}

#[derive(Serialize)]
pub struct ModelWithOwner {
    pub id: Uuid,
    pub name: String,
    pub file_path: String,
    pub description: Option<String>,
    pub tags: Option<Vec<String>>,
    pub is_public: bool,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
    pub owner_username: String,
    pub view_count: Option<i32>,
}

impl From<Model3D> for Model3DResponse {
    fn from(model: Model3D) -> Self {
        Model3DResponse {
            id: model.id,
            name: model.name,
            file_path: model.file_path,
            owner_id: model.owner_id,
            description: model.description,
            tags: model.tags,
            is_public: model.is_public,
            created_at: model.created_at,
            updated_at: model.updated_at,
            view_count: None,
            is_favorited: None,
        }
    }
}