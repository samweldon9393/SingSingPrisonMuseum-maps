// src/components/Map1903.tsx

import React, { useEffect, useRef } from 'react';
import { ReactComponent as Svg1903 } from '../images/1903.svg';

type Props = {
  onRegionClick?: (regionId: string) => void;
};

const Map1903: React.FC<Props> = ({ onRegionClick }) => {
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

  return <Svg1903 ref={svgRef} />;
};

export default Map1903;

