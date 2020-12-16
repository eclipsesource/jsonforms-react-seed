import * as React from 'react';
import { useState } from 'react';

interface RatingProps {
  id?: string;
  value: number;
  updateValue: (newValue: number) => void;
}

export const Rating: React.FC<RatingProps> = ({ id, value, updateValue }) => {
  const [hoverAt, setHoverAt] = useState<number | null>(null);

  return (
    <div id='#/properties/rating' className='rating'>
      <p>Rating:</p>
      {[0, 1, 2, 3, 4].map((i) => {
        const fullStars = hoverAt ?? value;

        return (
          <span
            onMouseOver={() => setHoverAt(i + 1)}
            onMouseOut={() => setHoverAt(null)}
            onClick={() => updateValue(i + 1)}
            key={`${id}_${i}`}
            style={{ cursor: 'pointer' }}
          >
            {i < fullStars ? '\u2605' : '\u2606'}
          </span>
        );
      })}
    </div>
  );
};
