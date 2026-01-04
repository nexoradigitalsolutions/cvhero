import { CVData } from '@/types/cv';

export const exportCVAsJSON = (cvData: CVData, fileName: string = 'cv-export.json') => {
  const dataStr = JSON.stringify(cvData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importCVFromJSON = (file: File): Promise<CVData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const cvData = JSON.parse(content) as CVData;
        
        // Validate that it's a valid CV data structure
        if (!cvData.personalInfo || !Array.isArray(cvData.experiences)) {
          throw new Error('Invalid CV data format');
        }
        
        resolve(cvData);
      } catch (error) {
        reject(new Error('Failed to parse CV file: ' + (error instanceof Error ? error.message : 'Unknown error')));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};
