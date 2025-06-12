// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Uuid,
        username -> Varchar,
        email -> Varchar,
        password_hash -> Varchar,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    models_3d (id) {
        id -> Uuid,
        name -> Varchar,
        file_path -> Varchar,
        owner_id -> Uuid,
        description -> Nullable<Text>,
        tags -> Nullable<Array<Text>>,
        is_public -> Bool,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    model_views (id) {
        id -> Uuid,
        model_id -> Uuid,
        viewer_id -> Nullable<Uuid>,
        view_count -> Int4,
        last_viewed_at -> Timestamp,
    }
}

diesel::table! {
    user_favorites (id) {
        id -> Uuid,
        user_id -> Uuid,
        model_id -> Uuid,
        created_at -> Timestamp,
    }
}

diesel::joinable!(models_3d -> users (owner_id));
diesel::joinable!(model_views -> models_3d (model_id));
diesel::joinable!(model_views -> users (viewer_id));
diesel::joinable!(user_favorites -> users (user_id));
diesel::joinable!(user_favorites -> models_3d (model_id));

diesel::allow_tables_to_appear_in_same_query!(
    users,
    models_3d,
    model_views,
    user_favorites,
);