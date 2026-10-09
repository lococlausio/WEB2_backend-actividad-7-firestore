# Actividad 7 – Backend con Firebase Firestore (NoSQL)

API REST modular construida con **Node.js** y **Express**, integrada a **Google Cloud Firestore** mediante **Firebase Admin SDK** para el mantenimiento de un catálogo de atractivos turísticos.

---

## 1. Requisitos del Entorno
* **Node.js**: v18 o superior
* **npm**: v8 o superior
* **Google Firebase**: Proyecto configurado con Firestore Database activa en la nube
* **Credenciales**: Archivo de clave privada `serviceAccountKey.json` descargado desde Firebase Console

---

## 2. Variables de Entorno y Seguridad
La gestión de configuración sensible se maneja a través de la librería `dotenv`. Las credenciales y claves privadas se encuentran excluidas del control de versiones mediante `.gitignore`.

Configurar el archivo `.env` tomando como base `.env.example`:

