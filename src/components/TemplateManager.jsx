'use client';

import { forwardRef } from 'react';
import UniversalTemplate from './UniversalTemplate';

const TemplateManager = forwardRef(({ templateType, data, isForPDF = false }, ref) => {
  return (
    <div ref={ref}>
      <UniversalTemplate 
        data={data} 
        templateType={templateType} 
        isForPDF={isForPDF}
      />
    </div>
  );
});

TemplateManager.displayName = 'TemplateManager';

export default TemplateManager; 