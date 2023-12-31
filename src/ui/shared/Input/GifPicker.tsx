import React, { FC, useRef, useState } from 'react';

import ClickAwayListener from '../ClickAwayListener';
import { useQuery } from '@tanstack/react-query';
import { GIPHY_API_KEY } from '~/configs/app';
import { Icon, Spinner } from 'zmp-ui';

interface GifPickerProps {
  setIsOpened: (value: boolean) => void;
  onSelect: (gif: any) => void;
}

const GifPicker: FC<GifPickerProps> = ({ setIsOpened, onSelect }) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const timeOutRef = useRef<any>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['giphy', searchInputValue],
    queryFn: () =>
      fetch(
        searchInputValue.trim()
          ? `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
              searchInputValue.trim()
            )}`
          : `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}`
      ).then((res) => res.json()),
  });

  // TODO: check click away
  const handleOnClickAway = () => {
    setIsOpened(false);
  };

  return (
    <ClickAwayListener>
      {(ref) => (
        <div
          ref={ref}
          className="absolute -left-8 bottom-full flex h-80 w-80 bg-white flex-col items-stretch rounded-lg border-2 p-4 shadow-2xl"
        >
          <div className="relative">
            <input
              onChange={(e) => {
                if (timeOutRef.current) clearTimeout(timeOutRef.current);
                timeOutRef.current = setTimeout(() => {
                  setSearchInputValue(e.target.value);
                }, 500);
              }}
              type="text"
              className="bg-dark-lighten w-full rounded-full py-2 pl-10 pr-4 outline-none"
              placeholder="Search..."
            />
            <Icon
              icon="zi-search"
              className="absolute top-1/2 left-3 -translate-y-1/2 text-xl"
            />
          </div>

          {isLoading ? (
            <div className="flex flex-grow items-center justify-center">
              <Spinner />
            </div>
          ) : error ? (
            <div className="flex flex-grow flex-col items-center justify-center">
              <p className="text-center">
                Sorry... Giphy has limited the request
              </p>
            </div>
          ) : (
            <div className="mt-3 flex flex-grow flex-wrap gap-2 overflow-y-auto">
              {(data as any).data.map((item: any) => (
                <img
                  key={item.id}
                  onClick={() => {
                    onSelect(item?.images?.original?.url);
                    setIsOpened(false);
                  }}
                  className="h-[100px] flex-1 cursor-pointer object-cover"
                  src={item?.images?.original?.url}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      )}
    </ClickAwayListener>
  );
};

export default GifPicker;
