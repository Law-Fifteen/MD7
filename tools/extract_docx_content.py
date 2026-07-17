from __future__ import annotations

import json
import re
from pathlib import Path

from docx import Document


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DOCX = Path(r"W:\MD7 Framework\Training Website\Resources\MD7 Sales Framework.docx")
OUT_FILE = ROOT / "src" / "content" / "generatedContent.ts"


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def chapter_number(title: str) -> int:
    match = re.search(r"Chapter\s+(\d+)", title, flags=re.IGNORECASE)
    return int(match.group(1)) if match else 0


def section_title(title: str) -> str:
    return re.sub(r"^Chapter\s+\d+\s+[—-]\s*", "", title).strip()


def main() -> None:
    doc = Document(str(SOURCE_DOCX))
    chapters: list[dict] = []
    current: dict | None = None
    current_section: dict | None = None

    for para in doc.paragraphs:
        text = clean(para.text)
        if not text:
            continue

        style = para.style.name if para.style else ""
        is_chapter = style.startswith("Heading") and re.match(
            r"Chapter\s+\d+\s+[—-]", text, flags=re.IGNORECASE
        )

        if is_chapter:
            current = {
                "id": slugify(text),
                "number": chapter_number(text),
                "title": section_title(text),
                "sourceTitle": text,
                "quote": "",
                "sections": [],
                "objectives": [],
                "summary": [],
                "greatAeSignals": [],
                "commonMistakes": [],
                "coachingQuestions": [],
            }
            chapters.append(current)
            current_section = None
            continue

        if current is None:
            continue

        if style in {"Quote", "Intense Quote"} and not current["quote"]:
            current["quote"] = text
            continue

        if style.startswith("Heading 1") or style.startswith("Heading 2"):
            current_section = {"title": text, "items": []}
            current["sections"].append(current_section)
            continue

        if style.startswith("Heading 3"):
            current_section = {"title": text, "items": []}
            current["sections"].append(current_section)
            continue

        if current_section is None:
            current_section = {"title": "Overview", "items": []}
            current["sections"].append(current_section)

        current_section["items"].append(text)

        section_name = current_section["title"].lower()
        if "objective" in section_name:
            current["objectives"].append(text)
        elif "summary" in section_name:
            current["summary"].append(text)
        elif "great aes notice" in section_name or "great managers notice" in section_name:
            current["greatAeSignals"].append(text)
        elif "common mistakes" in section_name:
            current["commonMistakes"].append(text)
        elif "coaching questions" in section_name or "leadership questions" in section_name:
            current["coachingQuestions"].append(text)

    objects = []
    for chapter in chapters:
        tags = [
            word
            for word in re.findall(r"[A-Za-z]{5,}", chapter["title"])
            if word.lower() not in {"chapter", "understanding"}
        ][:5]
        objects.append(
            {
                "id": chapter["id"],
                "type": "Chapter",
                "title": chapter["title"],
                "summary": chapter["summary"][0] if chapter["summary"] else chapter["quote"],
                "tags": tags,
                "chapterId": chapter["id"],
            }
        )
        for section in chapter["sections"]:
            objects.append(
                {
                    "id": f"{chapter['id']}-{slugify(section['title'])}",
                    "type": "Framework",
                    "title": section["title"],
                    "summary": " ".join(section["items"][:2])[:280],
                    "tags": tags,
                    "chapterId": chapter["id"],
                }
            )

    OUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "chapters": chapters,
        "knowledgeObjects": objects,
        "stats": {
            "chapterCount": len(chapters),
            "knowledgeObjectCount": len(objects),
            "source": str(SOURCE_DOCX),
        },
    }
    OUT_FILE.write_text(
        "import type { AcademyContent } from '../types';\n\n"
        f"export const academyContent: AcademyContent = {json.dumps(payload, indent=2, ensure_ascii=False)};\n",
        encoding="utf-8",
    )
    print(f"Wrote {OUT_FILE}")
    print(json.dumps(payload["stats"], indent=2))


if __name__ == "__main__":
    main()
