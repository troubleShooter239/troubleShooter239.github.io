"""Build matching EN/RU PDFs from the same website content and shared layout.

Run `pnpm resume:data` first, then `python scripts/build-resumes.py`.
Requires ReportLab and Arial (Windows) or DejaVu Sans (Linux).
"""

import json
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
)

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "work/resume-data.json").read_text(encoding="utf-8"))
PROFILE = DATA["profile"]
OUTPUT = ROOT / "public/cv"
OUTPUT.mkdir(parents=True, exist_ok=True)

FONTS = [
    (Path("C:/Windows/Fonts/arial.ttf"), Path("C:/Windows/Fonts/arialbd.ttf")),
    (
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    ),
]
regular, bold = next((a, b) for a, b in FONTS if a.exists() and b.exists())
pdfmetrics.registerFont(TTFont("Resume", str(regular)))
pdfmetrics.registerFont(TTFont("ResumeBold", str(bold)))
pdfmetrics.registerFontFamily("Resume", normal="Resume", bold="ResumeBold")

INK = colors.HexColor("#18292d")
ACCENT = colors.HexColor("#315963")
MUTED = colors.HexColor("#536269")
STYLES = {
    "body": ParagraphStyle(
        "body",
        fontName="Resume",
        fontSize=9.3,
        leading=12.6,
        textColor=INK,
        spaceAfter=5,
        alignment=TA_LEFT,
    ),
    "small": ParagraphStyle(
        "small",
        fontName="Resume",
        fontSize=8.5,
        leading=11.6,
        textColor=MUTED,
        spaceAfter=5,
    ),
    "title": ParagraphStyle(
        "title",
        fontName="ResumeBold",
        fontSize=25,
        leading=29,
        textColor=INK,
        spaceAfter=6,
    ),
    "role": ParagraphStyle(
        "role",
        fontName="Resume",
        fontSize=10.5,
        leading=14,
        textColor=ACCENT,
        spaceAfter=8,
    ),
    "section": ParagraphStyle(
        "section",
        fontName="ResumeBold",
        fontSize=11,
        leading=15,
        textColor=ACCENT,
        spaceBefore=12,
        spaceAfter=7,
        keepWithNext=True,
    ),
    "job": ParagraphStyle(
        "job",
        fontName="ResumeBold",
        fontSize=10.5,
        leading=14,
        textColor=INK,
        spaceBefore=7,
        spaceAfter=3,
        keepWithNext=True,
    ),
    "bullet": ParagraphStyle(
        "bullet",
        fontName="Resume",
        fontSize=9.3,
        leading=12.6,
        textColor=INK,
        leftIndent=10,
        firstLineIndent=-8,
        spaceAfter=5,
    ),
}


def clean(text):
    return re.sub(r"[\u2010-\u2015\u2212]", "-", text).replace("\u00a0", " ")


def text(value):
    return escape(clean(value))


def paragraph(value, kind="body"):
    return Paragraph(text(value), STYLES[kind])


def section(en, ru, lang):
    return paragraph(en if lang == "en" else ru, "section")


def labeled(label, value):
    return Paragraph(f"<b>{text(label)}:</b> {text(value)}", STYLES["body"])


def link(url, label):
    return f'<link href="{escape(url)}" color="#315963">{text(label)}</link>'


# These details are retained from the original CVs and use the same translation
# and section position in both documents.
EXTRA_SKILLS = {
    "en": [
        (
            "Additional backend and data",
            "REST, SQL, MySQL, MongoDB, Docker Compose, S3-compatible storage",
        ),
        (
            "Architecture and collaboration",
            "Microservices, Clean Architecture, DDD, KISS, DRY, API and data modeling, SQL optimization, code reviews, Scrum, Kanban, Flutter/Dart",
        ),
        ("Additional integrations", "ByteDance, Slack, unittest"),
        ("Other technologies", "Django, Linux, Nginx, Apache Kafka, RabbitMQ, ClickHouse, PyTorch"),
    ],
    "ru": [
        (
            "Backend и данные дополнительно",
            "REST, SQL, MySQL, MongoDB, Docker Compose, S3-совместимые хранилища",
        ),
        (
            "Архитектура и взаимодействие",
            "Микросервисы, Clean Architecture, DDD, KISS, DRY, моделирование API и данных, оптимизация SQL, code review, Scrum, Kanban, Flutter/Dart",
        ),
        ("Дополнительные интеграции", "ByteDance, Slack, unittest"),
        ("Другие технологии", "Django, Linux, Nginx, Apache Kafka, RabbitMQ, ClickHouse, PyTorch"),
    ],
}
EXTRA_EXPERIENCE = {
    "Prequel Inc.": {
        "en": [
            "Integrated custom ComfyUI workflows and optimized video rendering with FFmpeg. Supported Kubernetes infrastructure and CI/CD improvements while collaborating with R&D engineers and art teams."
        ],
        "ru": [
            "Интегрировал собственные ComfyUI-пайплайны и оптимизировал рендеринг видео с FFmpeg. Участвовал в улучшении Kubernetes-инфраструктуры и CI/CD совместно с R&D-инженерами и командами художников."
        ],
    },
    "Nashy": {
        "en": [
            "Optimized SQL using execution plans, indexes and materialized views; configured GitLab CI and containerized services with Docker and Docker Compose. Contributed mentoring and code reviews in a cross-functional Scrum team."
        ],
        "ru": [
            "Оптимизировал SQL с помощью планов выполнения, индексов и материализованных представлений; настраивал GitLab CI и контейнеризацию с Docker и Docker Compose. Участвовал в менторстве и code review в межфункциональной Scrum-команде."
        ],
    },
    "Forte Group": {
        "en": [
            "Worked with PostgreSQL, MySQL, MongoDB and Redis; implemented Celery background processing and maintained Docker deployments with GitLab CI and Jenkins. Refactored legacy code in Scrum and Kanban teams."
        ],
        "ru": [
            "Работал с PostgreSQL, MySQL, MongoDB и Redis; реализовывал фоновую обработку Celery и поддерживал Docker-развёртывания с GitLab CI и Jenkins. Рефакторил существующий код в командах Scrum и Kanban."
        ],
    },
    "Tapston": {
        "en": [
            "Delivered and integrated features without production downtime; analyzed defects and refactored code under mentor supervision."
        ],
        "ru": [
            "Разрабатывал и интегрировал функциональность без простоев production; анализировал дефекты и рефакторил код под руководством ментора."
        ],
    },
}


def job_elements(job, lang):
    role = (
        job["role"]
        if lang == "en"
        else {
            "Python Developer": "Python-разработчик",
            "Full Stack Engineer": "Fullstack-разработчик",
        }[job["role"]]
    )
    elements = [paragraph(f"{job['company']} | {role}", "job")]
    elements.append(paragraph(job["date"], "small"))
    for item in job[lang] + EXTRA_EXPERIENCE[job["company"]][lang]:
        elements.append(paragraph("- " + item, "bullet"))
    return elements


def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Resume", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(43, 27, PROFILE["name"][doc.resume_lang])
    canvas.drawRightString(A4[0] - 43, 27, f"{doc.page} / 3")
    canvas.restoreState()


def build(lang):
    filename = "Nikita_Morgun_CV.pdf" if lang == "en" else "Nikita_Morgun_RU.pdf"
    doc = SimpleDocTemplate(
        str(OUTPUT / filename),
        pagesize=A4,
        leftMargin=43,
        rightMargin=43,
        topMargin=36,
        bottomMargin=43,
        title=f"{PROFILE['name'][lang]} - CV",
        author="Nikita Morgun",
        subject=PROFILE["role"][lang],
    )
    doc.resume_lang = lang
    story = [paragraph(PROFILE["name"][lang], "title"), paragraph(PROFILE["role"][lang], "role")]
    story.append(
        paragraph(f"{PROFILE['location'][lang]} | {PROFILE['email']} | +995 591 004669", "small")
    )
    story.append(
        Paragraph(
            " | ".join(
                [
                    link(PROFILE["github"], "GitHub / troubleShooter239"),
                    link(PROFILE["linkedin"], "LinkedIn / nikitamn"),
                    link(PROFILE["telegram"], "Telegram / maybe_nikita123"),
                ]
            ),
            STYLES["small"],
        )
    )
    story.append(section("Professional profile", "Профессиональный профиль", lang))
    for item in PROFILE["about"][lang]:
        story.append(paragraph(item))
    story.append(section("Technical skills", "Технические навыки", lang))
    for skill in DATA["skills"]:
        translations = {
            "Asynchronous programming": "Асинхронное программирование",
            "Local model deployment": "Локальное развёртывание моделей",
            "Claude for coding": "Claude для написания кода",
            "Codex for daily engineering tasks": "Codex для повседневных инженерных задач",
        }
        items = [translations.get(item, item) if lang == "ru" else item for item in skill["items"]]
        story.append(labeled(skill[lang], ", ".join(items)))
    for label, value in EXTRA_SKILLS[lang]:
        story.append(labeled(label, value))
    story.append(section("Professional experience", "Опыт работы", lang))
    story.extend(job_elements(DATA["experience"][0], lang))

    story.append(PageBreak())
    story.append(section("Professional experience", "Опыт работы", lang))
    for job in DATA["experience"][1:]:
        story.extend(job_elements(job, lang))
    story.append(section("Products", "Продукты", lang))
    story.append(
        paragraph("Prequel, GIO, Esti, Hula (Prequel Inc.); Nashy; Silver Screen; Burger King.")
    )

    story.append(PageBreak())
    story.append(section("Education", "Образование", lang))
    edu = PROFILE["education"]
    story.append(paragraph(edu["name"][lang], "job"))
    story.append(paragraph(f"{edu['program'][lang]} | {edu['dates']}"))
    story.append(
        labeled(
            "Subjects" if lang == "en" else "Дисциплины",
            "; ".join(s[lang] for s in DATA["collegeSubjects"]),
        )
    )
    story.append(
        labeled(
            "Technologies studied" if lang == "en" else "Изученные технологии",
            ", ".join(DATA["collegeTechnologies"]),
        )
    )
    story.append(section("Languages", "Языки", lang))
    story.append(
        paragraph(
            " | ".join(f"{item[lang]} - {item['level'][lang]}" for item in PROFILE["languages"])
        )
    )
    story.append(section("Hackathons and challenges", "Хакатоны и соревнования", lang))
    for entry in DATA["hackathons"]:
        story.append(
            KeepTogether(
                [
                    paragraph(entry["title"], "job"),
                    paragraph(entry["detailEn" if lang == "en" else "detailRu"]),
                ]
            )
        )
    doc.build(story, onFirstPage=page_footer, onLaterPages=page_footer)
    print(OUTPUT / filename)


if __name__ == "__main__":
    for language in ("en", "ru"):
        build(language)
