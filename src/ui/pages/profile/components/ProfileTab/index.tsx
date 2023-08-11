import React from 'react';

interface ProfileTabItem {
  label: string;
  onClick: (item: ProfileTabItem) => void;
}

interface ProfileTabProps {
  items: ProfileTabItem[];
  containerClassName?: string;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  items,
  containerClassName,
}) => {
  return (
    <div className={`module_box ${containerClassName}`}>
      <ul className="list_link">
        {items.map((item) => {
          return (
            <li key={item.label} onClick={() => item.onClick(item)}>
              {item.label}
              <div className="icon sz-14">
                {' '}
                <i className="icon_right_blue" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
