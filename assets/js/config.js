// ================================================================
// RESTHUB CONFIG — ajusta solo este archivo por deployment
// ================================================================
const RESTHUB_CONFIG = {
  // URL base del panel RestHub (sin barra final)
  // Cambia a la URL de producción cuando hagas deploy
  apiBase: 'http://localhost:3000',

  // ID del restaurante activo (null = primero disponible)
  // Si tienes multi-tenant, pon aquí el ID del restaurante
  restaurantId: null,
};