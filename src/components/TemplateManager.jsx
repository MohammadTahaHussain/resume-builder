import { forwardRef } from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import TechTemplate from './templates/TechTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import StartupTemplate from './templates/StartupTemplate';
import FederalTemplate from './templates/FederalTemplate';

const TemplateManager = forwardRef(({ templateType, data, isForPDF = false }, ref) => {
  const renderTemplate = () => {
    const templateProps = { 
      data, 
      isForPDF,
      ref: isForPDF ? ref : undefined 
    };

    switch (templateType) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      case 'tech':
        return <TechTemplate {...templateProps} />;
      case 'academic':
        return <AcademicTemplate {...templateProps} />;
      case 'startup':
        return <StartupTemplate {...templateProps} />;
      case 'federal':
        return <FederalTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  return (
    <div className={`template-container ${isForPDF ? 'pdf-template' : ''}`}>
      {renderTemplate()}
    </div>
  );
});

TemplateManager.displayName = 'TemplateManager';

export default TemplateManager; 