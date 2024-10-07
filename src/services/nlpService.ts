import natural from 'natural';

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

export const summarizeNewsletter = (text: string): string => {
  const tfidf = new TfIdf();

  // Split the text into sentences
  const sentences = text.split(/[.!?]+/);

  // Calculate TF-IDF for each sentence
  sentences.forEach((sentence, index) => {
    tfidf.addDocument(tokenizer.tokenize(sentence.toLowerCase()));
  });

  // Score sentences based on TF-IDF
  const sentenceScores = sentences.map((sentence, index) => {
    const tokens = tokenizer.tokenize(sentence.toLowerCase());
    let score = 0;
    tokens.forEach((token) => {
      score += tfidf.tfidf(token, index);
    });
    return { sentence, score: score / tokens.length };
  });

  // Sort sentences by score and select top 3
  const topSentences = sentenceScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.sentence);

  // Join the top sentences to create a summary
  return topSentences.join(' ');
};