export const API_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:8000";

export const IMG_URL = process.env.NODE_ENV === "production" ? "/uploads/" : "http://localhost:8000/uploads/";