import React from 'react';
import { DraggableDividerProps } from '@/types';

const DraggableDivider: React.FC<DraggableDividerProps> = ({
  onMouseDown,
  orientation,
  className = '',
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={`${
        isHorizontal
          ? 'w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize'
          : 'h-1 bg-gray-300 hover:bg-blue-500 cursor-row-resize'
      } flex items-center justify-center group ${className}`}
      onMouseDown={onMouseDown}
    >
      <div
        className={`${
          isHorizontal
            ? 'w-0.5 h-8 bg-gray-400 group-hover:bg-blue-400'
            : 'h-0.5 w-8 bg-gray-400 group-hover:bg-blue-400'
        } rounded-full`}
      />
    </div>
  );
};

export default DraggableDivider;
