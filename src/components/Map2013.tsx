// src/components/Map2013.tsx

import React, { useEffect, useRef } from 'react';
import { ReactComponent as Svg2013 } from '../images/2013.svg';

type Props = {
  onRegionClick?: (regionId: string) => void;
};

const Map2013: React.FC<Props> = ({ onRegionClick }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleClick = (e: Event) => {
      const target = e.target as SVGElement;
      const regionId = target.id;
      if (regionId && onRegionClick) {
        onRegionClick(regionId);
      }
    };

    svg.addEventListener('click', handleClick);
    return () => {
      svg.removeEventListener('click', handleClick);
    };
  }, [onRegionClick]);

  return <Svg2013 ref={svgRef} />;
};

export default Map2013;

