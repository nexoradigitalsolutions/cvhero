import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CVData } from '@/types/cv';

export const exportCVToPDF = async (cvData: CVData, fileName: string = 'CV.pdf') => {
  const element = document.getElementById('cv-preview');
  if (!element) {
    console.error('CV preview element not found');
    throw new Error('CV preview element not found');
  }

  try {
    console.log('Starting PDF export...');
    
    // Wait for content to render
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Convert HTML to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    } as any);

    console.log('Canvas created:', {
      width: canvas.width,
      height: canvas.height,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();  // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const margin = 10;
    const contentWidth = pageWidth - (2 * margin);
    
    // Calculate the height of the content in mm
    const contentHeight = (canvas.height * contentWidth) / canvas.width;
    
    console.log('PDF Setup:', { pageWidth, pageHeight, contentWidth, contentHeight });

    // Calculate how many pages we need
    const usableHeight = pageHeight - (2 * margin);
    const totalPages = Math.ceil(contentHeight / usableHeight);

    console.log(`Creating ${totalPages} page(s)`);

    // For each page, crop the canvas and add as a separate image
    let canvasYOffset = 0;

    for (let pageNum = 0; pageNum < totalPages; pageNum++) {
      if (pageNum > 0) {
        pdf.addPage();
      }

      // Calculate how much of the canvas height to crop for this page
      const heightOnThisPage = Math.min(usableHeight, contentHeight - (pageNum * usableHeight));
      const canvasHeightToCrop = Math.round(canvas.height * (heightOnThisPage / contentHeight));

      // Create a temporary canvas for this page's content
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = canvasHeightToCrop;

      const ctx = pageCanvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          canvas,
          0,
          canvasYOffset, // source Y
          canvas.width,
          canvasHeightToCrop, // source height
          0,
          0, // destination (0,0)
          pageCanvas.width,
          pageCanvas.height
        );
      }

      // Convert cropped canvas to image and add to PDF
      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(pageImgData, 'JPEG', margin, margin, contentWidth, heightOnThisPage);

      // Move offset for next page
      canvasYOffset += canvasHeightToCrop;
    }

    console.log('Saving PDF...');
    pdf.save(fileName);
    
    console.log('✅ PDF exported successfully');
    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};
