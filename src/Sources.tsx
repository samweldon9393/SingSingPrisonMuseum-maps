import React from 'react';
import './Sources.css'
import sourcesData from './sources.json';
import { FiHome } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

interface Source {
  id: number;
  type?: string;
  title?: string;
  authors: string[];
  year?: number;
  publication?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  publisher?: string;
  isbn?: string;
  accessDate?: string;
}

const Sources: React.FC = () => {
  const sources: Source[] = sourcesData;
  const navigate = useNavigate();

  const getSourceIcon = (type: Source['type']): string => {
    switch (type) {
      case 'journal':
        return '📄';
      case 'book':
        return '📚';
      case 'website':
        return '🌐';
      default:
        return '📄';
    }
  };

  const formatAuthors = (authors: string[]): string => {
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
    return `${authors.slice(0, -1).join(', ')}, & ${authors[authors.length - 1]}`;
  };

  const formatCitation = (source: Source): React.ReactElement => {
    const authorsText = formatAuthors(source.authors);
    
    switch (source.type) {
      case 'journal':
        return (
          <div className="citation">
            <p className="authors">{authorsText}</p>
            <p className="title">{source.title}.</p>
            <p className="publication">{source.publication}, {source.volume}({source.issue}), {source.pages}.</p>
            {source.doi && (
              <p className="doi">DOI: {source.doi}</p>
            )}
          </div>
        );
      
      case 'book':
        return (
          <div className="citation">
            <p className="authors">{authorsText}</p>
            <p className="title">{source.title}</p>
            <p className="publication">(pp. {source.pages}). {source.publisher}.</p>
            {source.isbn && (
              <p className="isbn">ISBN: {source.isbn}</p>
            )}
          </div>
        );
      
      case 'website':
        return (
          <div className="citation">
            <p className="authors">{authorsText}</p>
            <p className="title">{source.title}.</p>
            <p className="publication">Retrieved {source.accessDate}</p>
          </div>
        );
      
      default:
        return <div></div>;
    }
  };

  return (
    <>
    <div className="sources-background"></div>
    <div className="container">
      <div className="content">
        {/* Header */}
        <div className="header">
          <h1>Research Sources</h1>
          <p>
            A comprehensive bibliography of sources used in this project. 
          </p>
        </div>
        <div className="home-button">
          <button onClick={() => {
              navigate('/'); 
          }} className="icon-button">
              <FiHome size={28} />
          </button>
        </div>

        {/* Sources List */}
        <div className="sources-list">
          {sources.map((source, index) => (
            <div key={source.id} className="source-card">
              <div className="source-header">
                {/* Source Icon */}
                <div className="source-icon">
                  {getSourceIcon(source.type)}
                </div>
                
                {/* Source Content */}
                <div className="source-content">
                  <div className="source-meta">
                    <span className="source-type">{source.type}</span>
                    <span className="source-year">{source.year}</span>
                  </div>
                  
                  {formatCitation(source)}
                  
                  {/* URL Link */}
                  {source.url && (
                    <div className="source-link">
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        View Source
                      </a>
                    </div>
                  )}
                </div>
                
                {/* Source Number */}
                <div className="source-number">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-content">
            <span>{sources.length} sources cited</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Sources;
