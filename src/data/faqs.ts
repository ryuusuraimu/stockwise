export type FAQ = {
  id: number;
  term: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  sourceUrls: string[];
  sourceNote: string;
  updatedAt: string;
};

export const faqs: FAQ[] = [];
