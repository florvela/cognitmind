# NeuralData — Estrategia de consultora y comunidad

> Plan para lanzar **NeuralData**: una consultora de IA + datos para clientes internacionales (USD), con una comunidad de divulgación (YouTube + Paper Explainer) que primero genera autoridad y leads, y después se convierte en línea de ingreso propia.

Decisiones de base (definidas con Flor):
- **Mercado:** clientes internacionales, facturación en USD.
- **Especialidad:** consultora de IA + datos amplia, que se especializa según el cliente que llega.
- **Comunidad:** por fases — arranca como marketing/autoridad, evoluciona a ingreso (membresías, cursos, sponsors).

---

## 1. Posicionamiento y marca

**Una línea (elevator pitch):**
> NeuralData ayuda a empresas a llevar la IA del experimento a producción — modelos que funcionan, seguros y mantenibles — sin humo.

**Tagline corto:** *"AI, explained and engineered."* (une las dos patas: divulgación + ingeniería.)

**Por qué "sin humo" es tu posicionamiento, no tu debilidad:**
El mercado de IA está saturado de gente que vende promesas. Tu valor real es que *entendés la intuición profunda de los problemas y la podés explicar simple* — eso es exactamente lo que demuestra el proyecto Paper Explainer y lo que harán los videos. La marca entera se construye sobre "claridad y rigor", que es tu fortaleza genuina. Esto también resuelve el síndrome del impostor: no estás fingiendo saber todo, estás vendiendo tu capacidad de entender y explicar bien.

**Prueba de credibilidad (lo que ya tenés y va en la home):**
UBA 9.2/10 + honores en Ingeniería · experiencia en Deloitte, ExxonMobil, MercadoLibre (vía Mantika), admisión a Facebook · roles de CTO y Head of AI · instructora en Ekoparty/Hackademy · resultados medibles (inferencia 200→50 ms, sistemas críticos sin downtime).

**Nicho diferenciador de reserva:** *IA aplicada a ciberseguridad / SOC.* Aunque la oferta sea amplia, este es tu "as bajo la manga": casi nadie combina IA + seguridad a tu nivel. Úsalo cuando aparezca un cliente del rubro — ahí cobrás premium.

---

## 2. Oferta de servicios (productizada)

Productizar = vender paquetes con alcance y precio fijos, no "horas sueltas". Esto es **clave para el síndrome del impostor**: cada paquete arranca con una fase de estudio, que es justo como trabajás mejor (estudiás el problema y lo dominás antes de comprometerte a fondo).

### Escalera de servicios

**1. AI Discovery Sprint** *(puerta de entrada, bajo riesgo)*
1–2 semanas. Diagnóstico: dónde la IA aporta valor real al cliente, qué datos tiene, qué es factible, roadmap priorizado y estimación. Entregable: documento + presentación.
→ Sirve para *calificar* al cliente y para *prepararte* (estudiás su problema con tiempo). Casi nunca dirás algo en frío.

**2. Proof of Concept / MVP**
3–8 semanas. Construir un prototipo funcional de la solución priorizada en el Discovery (modelo predictivo, visión, NLP/LLM, pipeline de datos). Entregable: demo + código + informe de resultados.

**3. Build & Deploy (proyecto completo)**
2–4+ meses. Solución a producción: MLOps, despliegue, monitoreo, documentación, traspaso.

**4. Fractional Head of AI / AI Advisor (retainer mensual)**
Acompañamiento continuo: liderazgo técnico part-time, revisión de arquitectura, mentoría al equipo del cliente. Ingreso recurrente y predecible — el más valioso para la estabilidad del negocio.

**5. Workshops & Training corporativo**
Capacitaciones a equipos (IA aplicada, seguridad, LLMs/MCP, fundamentos de ML). Alto margen, refuerza autoridad y suele abrir la puerta a proyectos. Ya tenés el material de Ekoparty.

### Áreas técnicas que cubren todos los paquetes
ML de extremo a extremo (predictivos, fraude, demanda) · Computer Vision (detección, seguimiento, optimización de inferencia) · NLP y LLMs (RAG, agentes, MCP) · Ingeniería de datos y backend (APIs, ETLs, dashboards) · MLOps y despliegue cloud (AWS/GCP) · IA en ciberseguridad / SOC *(nicho premium)*.

---

## 3. Pricing (mercado internacional, USD)

Rangos de mercado 2026 para consultores de IA independientes con perfil senior: **USD 93–160/h** de promedio, llegando a **150–200+/h** en trabajo especializado/LLM. Fractional Head of AI / CTO: **USD 5k–15k/mes**. (Fuentes al pie.)

Tu perfil = **senior + premium de especialización (LLM/seguridad)**. Recomendación de arranque, con margen para subir a medida que cierres casos:

| Servicio | Precio sugerido (arranque) | Modelo |
|---|---|---|
| Hora de consultoría suelta | USD 100–150/h | Por hora (evitar; preferir paquetes) |
| **AI Discovery Sprint** | **USD 2.500–5.000** | Precio fijo |
| Proof of Concept / MVP | USD 10.000–30.000 | Precio fijo por proyecto |
| Build & Deploy completo | USD 30.000–80.000+ | Precio fijo o por fases |
| **Fractional Head of AI / Advisor** | **USD 5.000–12.000/mes** | Retainer mensual |
| Workshop / training (por jornada) | USD 1.500–4.000 | Por sesión |

**Reglas de pricing:**
- **Cobrá por valor y por proyecto, no por hora.** Si cobrás por hora, te castigás por ser rápida (tu caso). El precio fijo te premia.
- **Anclá alto y ofrecé el Discovery primero.** El Sprint barato baja la barrera; el proyecto grande va después con confianza mutua.
- **50% por adelantado** en todo proyecto. No negociable.
- **Subí precios cada 2–3 clientes cerrados.** El primer cliente puede ir en el piso del rango a cambio de un testimonio y un caso de estudio.
- Para clientes USD, tu costo de vida en Argentina te da un margen enorme; no compitas por precio, competí por claridad y resultados.

---

## 4. Unificar consultora + comunidad (el flywheel)

La idea de unificar todo es correcta y poderosa. Funciona como un **volante de inercia**: el contenido alimenta la autoridad, la autoridad trae clientes, los proyectos generan ideas para más contenido.

```
   Videos YouTube  ─►  Audiencia / autoridad  ─►  Leads de consultoría
        ▲                                                │
        │                                                ▼
   Paper Explainer  ◄──  Casos y aprendizajes  ◄──  Proyectos pagos
```

### Arquitectura del sitio neuraldata (una sola web, dos puertas)

```
neuraldata.[com]
├── Home              → pitch + prueba de credibilidad + dos CTAs:
│                       "Trabajá con nosotros" / "Aprendé IA"
├── Servicios         → la escalera de servicios (sección 2) + casos
├── Sobre mí / Equipo → tu historia + el PM como partner
├── Learn (comunidad) → el corazón de la divulgación:
│     ├── Paper Explainer   (la app actual, integrada)
│     ├── Videos / YouTube  (embebidos por tema)
│     └── Blog / newsletter
└── Contacto          → formulario de Discovery + agenda de llamada
```

El **Paper Explainer** ya tiene el tono exacto de la marca ("más Quanta Magazine que paper académico"). Pasa de ser un proyecto suelto a ser **la sección "Learn" de NeuralData**: la prueba viva de que explicás IA mejor que nadie. Tareas para integrarlo: rebrandear con la identidad de NeuralData (hoy usa tema oscuro tipo GitHub), cambiar el backend de explicaciones de Ollama local a una API (Claude/OpenAI) para que funcione en producción sin tu máquina prendida, y enlazarlo desde la home.

### Estrategia de contenido / YouTube

Tu instinto es correcto: **explicación simple + intuición del problema**, en el cruce entre "2 Minute Papers" (novedad técnica accesible) y "te lo explico así nomás" (claridad total). Formato sugerido:
- **Serie principal "NeuralData explica":** 5–10 min, un paper o concepto de IA por video, estructura del Paper Explainer (contexto → problema → qué hicieron → por qué importa). Reutilizás directamente las explicaciones que ya genera tu app como guion base.
- **Bilingüe o en español primero:** hay mucha menos divulgación de IA *con rigor* en español → nicho menos competido y tu idioma nativo. Subtítulos en inglés para alcance global.
- **Cadencia realista:** 1 video cada 2 semanas al inicio. Consistencia > volumen.
- Cada video termina con un CTA suave: "¿Tu empresa quiere aplicar esto? NeuralData."

### Fases de la comunidad
- **Fase 1 (meses 1–6) — Autoridad/leads:** contenido gratis, crecer audiencia y portfolio. Monetización = clientes de consultoría.
- **Fase 2 (meses 6–18) — Ingreso propio:** cuando haya audiencia, sumar membresía/Patreon, curso pago (reciclás Ekoparty), sponsors de YouTube, newsletter premium.

---

## 5. Playbook anti-impostor ("que nunca te agarren en frío")

Tu desfasaje es de *recuperación en frío*, no de conocimiento. La estrategia es diseñar el negocio para que **siempre llegues preparada**. Esto no es vender humo: es operar como cualquier consultora profesional seria.

**Reglas del proceso comercial:**
1. **Nunca compromiso técnico en la primera llamada.** La primera reunión es de *descubrimiento*: escuchás, tomás notas, hacés preguntas. Frase guion: *"Para darte una respuesta seria y no improvisada, dejame estudiar tu caso puntual y volvemos con un plan concreto."* — Esto te posiciona como rigurosa, no como insegura. Los clientes serios lo valoran.
2. **Agenda enviada siempre por adelantado.** Pedí el tema y los puntos antes de cada reunión. Te da la ventana de preparación donde rendís al máximo.
3. **El AI Discovery Sprint es tu escudo.** Vendés primero el estudio del problema. Te pagan por preparar lo que de todos modos necesitás para responder bien.
4. **Banco de respuestas reutilizables.** A medida que estudiás temas (LLMs en SOC, RAG, visión, etc.), guardá explicaciones cortas en un doc/Notion. Con el tiempo, cada vez te agarran menos "en frío" porque ya lo preparaste para un video o un cliente. *El Paper Explainer y el canal son, literalmente, tu sistema de estudio que además te paga.*
5. **Demos y casos en vez de memoria.** Mostrá trabajo hecho (la app, videos, casos). Hablar de lo que construiste no requiere recall en frío.

**Rol del amigo PM:**
- No es para "dar más veracidad" ni "vender humo" — es un **socio funcional real**: lleva la relación con el cliente, la gestión del proyecto, los tiempos y la parte comercial, mientras vos aportás la profundidad técnica preparada.
- En reuniones: el PM abre, contextualiza y maneja el ida y vuelta; vos entrás en los momentos técnicos que preparaste. Si surge algo no previsto, el PM lo toma: *"buen punto, lo analizamos y te lo respondemos con detalle"* → te da la ventana de preparación.
- Definí desde el día uno: ¿es empleado, socio (equity), o colaborador por proyecto? Afecta cómo repartís ingresos y responsabilidad. (Tema a cerrar antes de lanzar.)

---

## 6. Go-to-market: primeros clientes

Tenés activos para arrancar sin empezar de cero:
1. **Tu red existente** — los emprendedores de Bolivia y excolegas (Mantika, KIU, Stenox). Avisales que abriste NeuralData y qué ofrecés. El primer cliente suele salir de la red.
2. **LinkedIn** — actualizá el perfil a "Founder @ NeuralData | AI Consultant", y publicá los videos/explicaciones ahí. Es tu canal directo a clientes USD.
3. **Contenido como imán** — cada video/explicación es un anzuelo pasivo. El que busca "alguien que entienda esto" te encuentra ya con prueba de que sabés explicarlo.
4. **Ekoparty / comunidad de seguridad** — para el nicho premium de IA+SOC.
5. **Caso de estudio del primer cliente** — pedí testimonio + permiso para publicar resultados. Es la prueba social que destraba los siguientes.

---

## 7. Roadmap 90 días

**Mes 1 — Fundaciones**
- Definir acuerdo con el PM (rol, reparto).
- Cerrar marca: logo simple, identidad visual de NeuralData.
- Comprar dominio, armar landing con la estructura de la sección 4 (Home + Servicios + Sobre mí + Contacto).
- Escribir la oferta de servicios y el pricing finales (base: sección 2 y 3).
- Actualizar LinkedIn.

**Mes 2 — Contenido y producto**
- Integrar y rebrandear el Paper Explainer como sección "Learn"; mover backend a API en la nube.
- Grabar y publicar los primeros 2 videos.
- Activar la red: mensaje a 15–20 contactos anunciando NeuralData.
- Crear el "banco de respuestas" (Notion) y la plantilla de Discovery Sprint.

**Mes 3 — Primeras ventas**
- Cerrar 1–2 Discovery Sprints (aunque sea a precio piso, por el caso de estudio).
- Publicar 2 videos más.
- Documentar el primer caso → testimonio.
- Revisar pricing y subir si la demanda lo permite.

---

## 8. Próximos entregables que puedo armarte
- Copy completo y wireframe de la landing de NeuralData.
- Rebranding e integración del Paper Explainer (cambio de tema + backend a API).
- Plantilla del AI Discovery Sprint (documento que entregás al cliente).
- Guion del primer video de YouTube a partir de una explicación del Paper Explainer.
- Documento de acuerdo de socios (vos + el PM).
- Perfil de LinkedIn reescrito.

---

### Fuentes (datos de pricing 2026)
- [AI Consultant Hourly Rate Guide 2026 — goLance](https://golance.com/hiring/best-freelance-ai-consultants-hourly-rate)
- [AI Consulting Rates 2026: What Firms Actually Charge — Groovy Web](https://www.groovyweb.co/blog/ai-consulting-rates-2026)
- [Fractional CTO Pricing in 2026 — Kompella Technologies](https://kompella.io/thinking/fractional-cto-pricing-2026)
- [Fractional Head of AI Services 2026 — KORE1](https://www.kore1.com/fractional-head-of-ai-2026/)
- [Fractional CTO Rates: A Complete Pricing Guide for 2026 — Emizentech](https://emizentech.com/blog/fractional-cto-rates.html)
