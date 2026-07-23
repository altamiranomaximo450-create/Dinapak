# Dinapak — instrucciones para el cliente

## 1. Ver la web en tu compu
Hacé doble clic en `index.html`. Se abre en el navegador y funciona igual que online (menos el chat con IA, que necesita estar publicada — ver punto 4).

## 2. Subir la web a Hostinger
1. Entrá al **Administrador de archivos** de Hostinger.
2. Andá a la carpeta `public_html`.
3. Arrastrá y soltá **todo el contenido** de esta carpeta (`index.html`, `styles.css`, `main.js`, `ai-chat.js`, `lib/`, `assets/`, `.htaccess`) — no la carpeta en sí, sino lo que está adentro.
4. Listo, ya está online en tu dominio.

**Ojo:** la carpeta `dinapak-ai-proxy/` que está al lado de esta (`dinapak/`) **no se sube a Hostinger**. Es otra pieza, explicada en el punto 4.

## 3. Editar textos, teléfono, servicios y clientes
Abrí `lib/manifest.js` con el Bloc de notas. Ahí están, en español simple:
- **brand**: nombre, teléfono, WhatsApp, email, dirección, horario.
- **services**: los 10 servicios (nombre, subtítulo, descripción).
- **clients**: los 4 bloques de clientes/licitaciones.

Cambiás el texto entre comillas `"..."` y guardás. Si cambiás el **WhatsApp**, actualizalo en DOS lugares:
1. `lib/manifest.js` → `whatsapp: "5491146877629"`
2. `index.html` → buscá `wa.me/5491146877629` (aparece 2 veces) y reemplazá el número.

## 4. Activar el chat de soporte con IA
El chat usa Google Gemini (gratis) pero por seguridad la clave **no** puede vivir en el sitio (cualquiera podría robarla mirando el código fuente). Por eso hay una pieza intermedia (un "Worker" de Cloudflare, gratis) que guarda la clave y listo.

Esto lo tenés que hacer una sola vez, vos (o pedime que te acompañe paso a paso por acá):

1. Creá una cuenta gratis en [cloudflare.com](https://cloudflare.com) si no tenés.
2. En una terminal, dentro de la carpeta `dinapak-ai-proxy/`, ejecutá:
   ```bash
   npx wrangler login
   ```
   Esto abre el navegador para que autorices tu cuenta de Cloudflare.
3. Guardá tu clave de Gemini como secreto (nunca queda en el código):
   ```bash
   npx wrangler secret put GEMINI_API_KEY
   ```
   Te va a pedir que la pegues — pegá tu clave de [aistudio.google.com](https://aistudio.google.com/apikey) y Enter.
4. Publicá el Worker:
   ```bash
   npx wrangler deploy
   ```
   Al terminar te va a mostrar una URL parecida a `https://dinapak-ai-proxy.tu-usuario.workers.dev`.
5. Abrí `lib/manifest.js` con el Bloc de notas y reemplazá:
   ```js
   aiChatEndpoint: "https://dinapak-ai-proxy.TU-SUBDOMINIO.workers.dev",
   ```
   por la URL real que te dio Cloudflare.
6. Volvé a subir `lib/manifest.js` a Hostinger (solo ese archivo alcanza).

**Importante:** la clave que me pasaste en el chat quedó registrada en esa conversación. Te recomiendo entrar a [aistudio.google.com/apikey](https://aistudio.google.com/apikey) y generar una clave nueva antes de usarla en el Worker — es gratis y toma 10 segundos.

El plan gratuito de Gemini (`gemini-2.0-flash`) alcanza sin problema para un chat de soporte de una pyme.

## 5. Reemplazar las fotos
La web ya viene con fotos de construcción reales (con licencia libre, optimizadas para carga rápida). Son de muestra: cuando tengas fotos de **tus propias obras**, reemplazalas y queda perfecto.

Cómo reemplazar una foto sin tocar el código:
1. Preparás tu foto y le ponés **exactamente el mismo nombre** que la que querés reemplazar, dentro de `assets/img/`. Por ejemplo, para cambiar la foto grande del inicio, tu archivo tiene que llamarse `hero.jpg`.
2. Los nombres son: `hero.jpg` (portada), `obra-1/2/3.jpg` (collage de "La empresa"), `proyecto.jpg` (sección Proyectos), y las `g-*.jpg` (galería: `g-obra-curso`, `g-materiales`, `g-fachada`, `g-herramientas`, `g-cielorraso`, `g-electrica`, `g-durlock`, `g-estructura`, `g-cuadrilla`, `g-terminacion`, `g-edificio`, `g-ventanas`, `g-mamposteria`, `g-exterior`, `g-plano`).
3. Subís el archivo nuevo a `assets/img/` en Hostinger (reemplazando el viejo) y listo.

Si preferís, pasame tus fotos (arrastrándolas a `assets/photos/source/` o dándome la ruta) y yo las recorto, optimizo y ubico donde quedan mejor — dejándolas súper profesionales.

**Créditos:** las fotos de muestra tienen licencia Creative Commons; sus autores están listados en `assets/credits.json`. Cuando las reemplaces por las tuyas, podés vaciar ese archivo.

## 6. Si algo no se actualiza
Los navegadores a veces guardan una copia vieja de la web. Si hacés un cambio y no se ve:
1. Apretá `Ctrl + F5` (recarga forzada).
2. Si sigue igual, abrí `index.html` y `styles.css` con el Bloc de notas, buscá el texto `?v=20260723` (aparece varias veces) y cambialo por la fecha de hoy en formato `AAAAMMDD`, por ejemplo `?v=20260724`. Guardá y volvé a subir esos archivos a Hostinger.

## Carpetas que podés ignorar
- `tools/` — vacía, quedó reservada para uso técnico, se puede borrar.
- `assets/photos/source/` — ahí van tus fotos originales antes de optimizarlas; no se sube a Hostinger, solo se usa para trabajar.
