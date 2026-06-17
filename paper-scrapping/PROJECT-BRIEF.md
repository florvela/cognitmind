# Paper Explainer — Brief para diseño

## Qué es
Una web (en inglés) para explorar papers científicos de arXiv donde cada paper viene con una **explicación en lenguaje simple generada por IA** — no un resumen académico, sino una explicación del tema pensada para alguien curioso pero no experto (contexto → problema → qué hicieron → por qué importa).

## Cómo funciona
- El listado y la búsqueda consultan la API pública de arXiv en vivo (sin base de datos propia).
- Al abrir un paper por primera vez, un LLM local (Ollama) lee el texto completo y genera la explicación **en streaming** (el texto aparece mientras se escribe, ~10–20 s).
- El resultado se guarda en caché: las siguientes visitas a ese paper son instantáneas.

## Pantallas actuales (2)
1. **Home**: buscador + listado de papers recientes (AI/ML/NLP por defecto). Cards con título, autores, fecha, categorías y abstract truncado.
2. **Detalle de paper**: barra de navegación (Back, Home, arXiv, PDF) → tags de categoría → título → autores/fecha → **sección "Plain-English explanation"** (markdown renderizado, con botones Copy .md / Download .md / Regenerate, badge "cached" cuando viene de caché, cursor parpadeante mientras genera) → abstract original.

## Estados a diseñar
- Generando (mensaje de espera + streaming del texto)
- Explicación cacheada (instantánea, badge)
- Error (Ollama apagado / paper sin texto completo)
- Búsqueda sin resultados

## Stack / restricciones
- Next.js (App Router), CSS plano en `globals.css`, tema oscuro actual tipo GitHub (#0d1117, acento azul #58a6ff).
- Tipografía system font. Sin librería de componentes — libertad total para proponer.
- La explicación es contenido markdown (headings, listas, negritas): el diseño debe contemplar tipografía de artículo larga y legible.

## Tono
Divulgación científica accesible: confiable pero amigable, más "Quanta Magazine" que "paper académico".
