import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import TechTemplate from './templates/TechTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import StartupTemplate from './templates/StartupTemplate';
import FederalTemplate from './templates/FederalTemplate';

const TemplateManager = ({ templateType, data }) => {
  const renderTemplate = () => {
    switch (templateType) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'tech':
        return <TechTemplate data={data} />;
      case 'academic':
        return <AcademicTemplate data={data} />;
      case 'startup':
        return <StartupTemplate data={data} />;
      case 'federal':
        return <FederalTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="template-container">
      {renderTemplate()}
    </div>
  );
};

export default TemplateManager; 