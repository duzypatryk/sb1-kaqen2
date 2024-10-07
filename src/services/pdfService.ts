import { jsPDF } from 'jspdf';

export const generatePDF = (content: string): Blob => {
  const doc = new jsPDF();
  
  doc.setFontSize(12);
  doc.text(content, 10, 10);

  return doc.output('blob');
};