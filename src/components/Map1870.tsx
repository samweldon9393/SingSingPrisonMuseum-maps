// src/components/Map1870.tsx

import React, { useEffect, useRef } from 'react';
import { ReactComponent as Svg1870 } from '../images/1870.svg';

type Props = {
  onRegionClick?: (regionId: string) => void;
};

const Map1870: React.FC<Props> = ({ onRegionClick }) => {
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

  return <Svg1870 ref={svgRef} />;
};

export default Map1870;

