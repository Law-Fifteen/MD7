export type KnowledgeType =
  | "Chapter"
  | "Framework"
  | "Conversation"
  | "Question"
  | "Exercise"
  | "Objection"
  | "CustomerProfile"
  | "Glossary";

export type ChapterSection = {
  title: string;
  items: string[];
};

export type Chapter = {
  id: string;
  number: number;
  title: string;
  sourceTitle: string;
  quote: string;
  sections: ChapterSection[];
  objectives: string[];
  summary: string[];
  greatAeSignals: string[];
  commonMistakes: string[];
  coachingQuestions: string[];
};

export type KnowledgeObject = {
  id: string;
  type: KnowledgeType | string;
  title: string;
  summary: string;
  tags: string[];
  chapterId: string;
};

export type AcademyContent = {
  chapters: Chapter[];
  knowledgeObjects: KnowledgeObject[];
  stats: {
    chapterCount: number;
    knowledgeObjectCount: number;
    source: string;
  };
};
