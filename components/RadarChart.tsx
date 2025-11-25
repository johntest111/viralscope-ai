
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ScoringDimension } from '../types';

interface Props {
  data: ScoringDimension[];
}

const RadarChartComponent: React.FC<Props> = ({ data }) => {
  // Data dimensions come from the API which is already localized based on the language param
  
  return (
    <div className="w-full h-64 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: '#94a3b8', fontSize: 11 }} 
          />
          <Radar
            name="Viral Potential"
            dataKey="score"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="#8b5cf6"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
