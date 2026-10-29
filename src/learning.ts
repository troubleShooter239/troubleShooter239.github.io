// Add only owner-confirmed entries. Empty categories are not shown publicly.
export interface LearningEntry {
  title: string;
  titleRu?: string;
  detailEn: string;
  detailRu: string;
  url?: string;
}
export const collegeSubjects = [
  {
    en: 'Arithmetic and logical foundations of computer engineering',
    ru: 'Арифметико-логические основы вычислительной техники',
  },
  { en: 'System software', ru: 'Системное программное обеспечение' },
  {
    en: 'Databases and database management systems',
    ru: 'Базы данных и системы управления базами данных',
  },
  { en: 'Object-oriented programming', ru: 'Объектно-ориентированное программирование' },
  { en: 'Computer information security', ru: 'Защита компьютерной информации' },
  { en: 'Big data and machine learning', ru: 'Большие данные и машинное обучение' },
];
export const collegeTechnologies = [
  'Assembly',
  'C/C++',
  'C#',
  'Python',
  'HTML/CSS',
  'JavaScript/TypeScript',
  'NumPy',
  'pandas',
  'TensorFlow',
  'scikit-learn',
  'WinUI',
  'Linux',
  'TCP/IP',
  'Bash',
];
export const hackathons: LearningEntry[] = [
  {
    title: 'EdTech Hackathon · Road To Knowledge · 2024',
    detailEn:
      'Backend & Mobile Developer. A learning app for students, educational institutions and teachers, designed to simplify and organize the educational process.',
    detailRu:
      'Backend- и мобильный разработчик. Road To Knowledge — приложение для студентов, учебных заведений и преподавателей для упрощения и систематизации учебного процесса.',
  },
  {
    title: 'Space Hackathon · MTS',
    detailEn: 'Analyst. A certificate system for users of a mobile application.',
    detailRu: 'Аналитик. Система сертификатов для пользователей мобильного приложения.',
  },
  {
    title: 'Hackathon-accelerator · TerraMater',
    detailEn:
      'Team Lead, Backend Developer & Architect. A marketplace platform connecting farmers with consumers of farm products.',
    detailRu:
      'Руководитель команды, backend-разработчик и архитектор. TerraMater — платформа-маркетплейс для фермеров и потребителей фермерских продуктов.',
  },
  {
    title: 'Space Hackathon · MTBank',
    detailEn:
      'Team Lead & Analyst. Product improvement proposals with quantified estimates of the economic value of the changes.',
    detailRu:
      'Руководитель команды и аналитик. Предложения по улучшению продукта с количественной оценкой экономической ценности изменений.',
  },
];
export const reading: LearningEntry[] = [
  { title: 'AI Engineering', detailEn: 'Chip Huyen', detailRu: 'Чип Хюен' },
  { title: 'The Manager’s Path', detailEn: 'Camille Fournier', detailRu: 'Камилла Фурнье' },
  {
    title: 'Clean Architecture',
    titleRu: 'Чистая архитектура',
    detailEn: 'Robert C. Martin',
    detailRu: 'Роберт Мартин',
  },
  {
    title: 'Blood, Sweat, and Pixels',
    titleRu: 'Кровь, пот и пиксели',
    detailEn: 'Jason Schreier',
    detailRu: 'Джейсон Шрайер',
  },
  {
    title: 'Programming in C++: Examples and Exercises',
    titleRu: 'Программирование на C++ в примерах и задачах',
    detailEn: 'Alexey Vasiliev',
    detailRu: 'Алексей Васильев',
  },
  {
    title: 'Python Crash Course',
    titleRu: 'Изучаем Python: программирование игр, визуализация данных, веб-приложения',
    detailEn: 'Eric Matthes',
    detailRu: 'Эрик Мэтиз',
  },
  {
    title: 'Masters of Doom',
    titleRu:
      'Повелители DOOM. Как два парня создали культовый шутер и раскачали индустрию видеоигр',
    detailEn: 'David Kushner',
    detailRu: 'Дэвид Кушнер',
  },
];
export const practice: LearningEntry[] = [
  {
    title: 'LeetCode · troubleShooter239',
    detailEn: 'My LeetCode profile: coding problems and algorithm practice.',
    detailRu: 'Мой профиль LeetCode: задачи по программированию и практика алгоритмов.',
    url: 'https://leetcode.com/u/troubleShooter239/',
  },
];
