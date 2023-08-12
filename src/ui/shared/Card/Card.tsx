import React from 'react';

import { MAX_DIGITS_DESC_CARD } from '~/constants';

export interface CardButtonProps {
  text: string;
  className?: string;
  onClick?: (data) => void;
}

export interface CardProps {
  data: any;
  buttons: CardButtonProps[];
  onContainerClick?: (data) => void;
}

export default function Card({ data, buttons, onContainerClick }: CardProps) {
  const {
    id,
    imageUrl,
    name,
    cardPreferenceDescription,
    promotion = [],
  } = data;

  return (
    <div
      className="item hover_box-shadow"
      onClick={() => onContainerClick?.(data)}
    >
      <div className="card">
        <img className="imgAuto" src={imageUrl} />
      </div>
      <div className="ttl mt-16 fnt_bold">{name}</div>
      <div className="desc mt-16 trim trim_3">
        {cardPreferenceDescription?.slice(0, MAX_DIGITS_DESC_CARD)}
        {cardPreferenceDescription?.length > MAX_DIGITS_DESC_CARD ? '...' : ''}
      </div>
      <div className="tags flexBox mt-16 center">
        {promotion
          ?.filter((item) => item)
          .map((item) => (
            <span key={item}>{item}</span>
          ))}
      </div>
      <div className="button_list mt-24 flexBox fnt_medium center">
        {buttons.map((btn) => {
          const { text, className, onClick } = btn;
          return (
            <div
              key={text}
              className={className}
              onClick={() => onClick?.(data)}
            >
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
