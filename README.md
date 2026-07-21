# 💰 Finanzas

App de gestión financiera personal y de negocio, en un solo `index.html`, con:

- Dashboard con dona Ingresos vs Egresos y panel Negocio/Personal
- Movimientos (ingresos/egresos) con filtros, grupos y subgrupos
- Comparación mensual y anual con gráficos nativos (sin librerías)
- Exportación a **Excel (.xlsx)** eligiendo el período
- **Sincronización en la nube** entre dispositivos (gist privado de GitHub)
- **Instalable como app** (PWA): funciona offline y se agrega a la pantalla de inicio

> 🔒 Privacidad: los archivos de la app **no contienen datos**. Tus movimientos se
> guardan en el navegador y se sincronizan en un **gist privado** protegido por tu
> token personal. Aunque el repositorio sea público, nadie ve tus números.

---

## 🚀 Publicar con GitHub Pages

1. Subí estos archivos al repositorio (rama por defecto, ej. `main`):
   `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`.
2. El repositorio debe estar **público** (GitHub Pages gratis lo requiere).
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   elegí la rama (`main`) y carpeta `/ (root)`. Guardá.
4. Esperá ~1 minuto. Tu app queda en:
   `https://<tu-usuario>.github.io/<nombre-del-repo>/`

---

## 📱 Instalar en el celular

Abrí la URL de Pages en el celu y:

- **Android / Chrome:** menú **⋮ → “Instalar app” / “Agregar a pantalla principal”**.
- **iPhone / Safari:** botón **compartir → “Agregar a inicio”**.

Queda como app nativa, en pantalla completa y funciona sin conexión.

---

## ☁️ Activar la sincronización entre dispositivos

1. En GitHub: **Settings → Developer settings → Personal access tokens →
   Tokens (classic) → Generate new token (classic)**.
2. Tildá **solo el permiso `gist`**. Generá y copiá el token (`ghp_...`).
3. En la app: **Datos → Sincronización en la nube** → pegá el token, dejá el
   **Gist ID vacío** → **Conectar**. Se crea un gist privado automáticamente.
4. Guardá el **Gist ID** que aparece.
5. En el **otro dispositivo**: misma app, pegá el **mismo token** y el **mismo Gist ID**.

A partir de ahí se sincroniza solo: al abrir baja lo último y cada cambio se sube
automáticamente (gana el más reciente). También podés forzar con **“Sincronizar ahora”**.

---

## 💾 Backup

Además de la nube, en **Datos** podés:

- Exportar a **Excel** o **CSV** (por mes, rango o todo el historial).
- Descargar un **backup JSON** completo y restaurarlo cuando quieras.
