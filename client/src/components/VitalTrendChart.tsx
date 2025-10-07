import { motion } from "framer-motion";

interface VitalTrendChartProps {
  data: number[];
  color: string;
  delay?: number;
  showGradient?: boolean;
}

export default function VitalTrendChart({ 
  data, 
  color, 
  delay = 0, 
  showGradient = false 
}: VitalTrendChartProps) {
  // Convert data points to SVG path
  const createPath = (points: number[]) => {
    const width = 300;
    const height = 120;
    const maxValue = Math.max(...points);
    const minValue = Math.min(...points);
    const range = maxValue - minValue || 1;
    
    const pathData = points
      .map((value, index) => {
        const x = (index / (points.length - 1)) * width;
        const y = height - ((value - minValue) / range) * height;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
    
    return pathData;
  };

  const createGradientPath = (points: number[]) => {
    const width = 300;
    const height = 120;
    const maxValue = Math.max(...points);
    const minValue = Math.min(...points);
    const range = maxValue - minValue || 1;
    
    const pathPoints = points.map((value, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    });
    
    return `M 0,${height} L ${pathPoints.join(' L ')} L ${width},${height} Z`;
  };

  const path = createPath(data);
  const gradientPath = showGradient ? createGradientPath(data) : null;
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
      {showGradient && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
      )}
      
      {showGradient && gradientPath && (
        <motion.path
          d={gradientPath}
          fill={`url(#${gradientId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
        />
      )}
      
      <motion.path
        className="sparkline-path"
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay,
          duration: 1.5,
          ease: "easeOut",
        }}
      />
    </svg>
  );
}
