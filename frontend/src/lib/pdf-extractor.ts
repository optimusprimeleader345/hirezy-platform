/**
 * PDF Text Extractor
 * Uses PDF.js to extract text from a PDF file client-side.
 */

export async function extractTextFromPDF(file: File): Promise<string> {
  // Dynamically import pdfjs-dist to avoid SSR issues
  const pdfjsLib = await import('pdfjs-dist')

  // Set the worker source — use jsdelivr mirroring npm package exactly with .mjs extension
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

  const arrayBuffer = await file.arrayBuffer()
  const typedArray = new Uint8Array(arrayBuffer)

  const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise
  const numPages = pdf.numPages

  const textParts: string[] = []

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const textContent = await page.getTextContent()

    const pageText = textContent.items
      .map((item: any) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s{2,}/g, ' ')
      .trim()

    if (pageText) {
      textParts.push(pageText)
    }
  }

  return textParts.join('\n\n')
}
