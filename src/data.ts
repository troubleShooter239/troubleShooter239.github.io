export const skills = [
  {
    en: 'AI & orchestration',
    ru: 'AI и оркестрация',
    items: [
      'LangGraph',
      'LLM agents',
      'RAG',
      'MCP',
      'Ray',
      'ComfyUI',
      'OpenAI',
      'Gemini',
      'Fal.ai',
      'llama.cpp',
      'Local model deployment',
    ],
  },
  {
    en: 'Backend & data',
    ru: 'Backend и данные',
    items: [
      'Python',
      'Asynchronous programming',
      'FastAPI',
      'Flask',
      'SQLAlchemy',
      'PostgreSQL / PostGIS',
      'Redis',
      'Celery',
      'GraphQL',
      'gRPC',
      'WebSocket',
    ],
  },
  {
    en: 'Infrastructure & delivery',
    ru: 'Инфраструктура и поставка',
    items: [
      'AWS EC2 / ECS / EKS',
      'AWS S3 / ElastiCache',
      'Kubernetes',
      'Docker',
      'GitLab CI',
      'Jenkins',
      'pytest',
      'Prometheus',
      'VictoriaLogs',
      'FFmpeg',
    ],
  },
  {
    en: 'Development tools',
    ru: 'Инструменты разработки',
    items: ['Claude for coding', 'Codex for daily engineering tasks'],
  },
];
export const experience = [
  {
    company: 'Prequel Inc.',
    role: 'Python Developer',
    date: '10.2025 — 04.2026',
    en: [
      'Built backend services for AI photo and video generation with FastAPI, PostgreSQL, Redis and Kubernetes.',
      'Orchestrated LangGraph agents and distributed Ray inference pipelines, reducing AI inference latency by 30%. This work supported parallel image and video generation and processing.',
      'Unified multiple AI providers with failover; built an agent for log and alert analysis using VictoriaLogs and Prometheus.',
    ],
    ru: [
      'Разрабатывал backend для AI-генерации фото и видео на FastAPI, PostgreSQL, Redis и Kubernetes.',
      'Создавал LangGraph-агентов и распределённые пайплайны Ray: задержка AI-инференса снижена на 30%. Работа охватывала параллельную генерацию и обработку изображений и видео.',
      'Объединил AI-провайдеров с переключением при сбоях; создал агента анализа логов и алертов на VictoriaLogs и Prometheus.',
    ],
  },
  {
    company: 'Nashy',
    role: 'Full Stack Engineer',
    date: '04.2025 — 07.2025',
    en: [
      'Designed application architecture, FastAPI APIs, data models and caching strategies.',
      'Implemented PostGIS search, Celery tasks and S3-compatible media storage. Query caching doubled average venue listing loading speed. Compared venue listing load times with cold and warm caches.',
      'Reduced response time by 40% through media and background-processing optimization. Compared the same API requests before and after optimization under equivalent load, tracking median and p95 latency separately.',
      'Reduced server load through media and background-processing optimization. Compared CPU usage, memory consumption and background task duration for the same number of media files; also contributed Flutter/Dart features.',
    ],
    ru: [
      'Проектировал архитектуру приложения, FastAPI API, модели данных и стратегии кэширования.',
      'Реализовал геопоиск PostGIS, задачи Celery и хранение медиа в S3. Кэширование ускорило загрузку списков заведений в среднем вдвое. Сравнивал время загрузки списков с холодным и прогретым кэшем.',
      'Сократил время отклика на 40% за счёт оптимизации обработки медиа и фоновых задач. Сравнивал одинаковые API-запросы до и после оптимизации при одинаковой нагрузке, отдельно отслеживая медиану и p95 задержки.',
      'Снизил нагрузку на сервер за счёт оптимизации обработки медиа и фоновых задач. Сравнивал использование CPU, потребление памяти и длительность фоновых задач при одинаковом количестве медиафайлов; также участвовал в разработке на Flutter/Dart.',
    ],
  },
  {
    company: 'Forte Group',
    role: 'Python Developer',
    date: '11.2022 — 01.2025',
    en: [
      'Developed FastAPI and Flask applications, REST and GraphQL APIs, and gRPC / WebSocket integrations.',
      'Reduced key endpoint response times from about 400 ms to 220–300 ms through caching and SQL optimization. The work focused on database access in existing backend endpoints.',
      'Increased automated test coverage from 40% to 85%; maintained microservices with Clean Architecture and DDD.',
    ],
    ru: [
      'Разрабатывал приложения FastAPI и Flask, REST и GraphQL API, интеграции gRPC / WebSocket.',
      'Сократил время отклика ключевых эндпоинтов с ~400 до 220–300 мс за счёт кэширования и оптимизации SQL. Работа была сосредоточена на доступе к данным в существующих backend-эндпоинтах.',
      'Увеличил покрытие автоматическими тестами с 40% до 85%; развивал микросервисы с Clean Architecture и DDD.',
    ],
  },
  {
    company: 'Tapston',
    role: 'Python Developer',
    date: '09.2021 — 03.2022',
    en: [
      'Developed Python modules under mentor supervision and worked with PostgreSQL and MySQL.',
      'Wrote unit and integration tests with pytest and unittest; reduced release defects by 30% through testing and code reviews. This combined unit and integration tests with defect fixes and code review.',
    ],
    ru: [
      'Разрабатывал Python-модули под руководством ментора, работал с PostgreSQL и MySQL.',
      'Писал модульные и интеграционные тесты на pytest и unittest; тестирование и code review помогли снизить число дефектов в релизах на 30%. Работа включала модульные и интеграционные тесты, исправление дефектов и проверку кода.',
    ],
  },
];
