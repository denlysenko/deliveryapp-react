import React, { useCallback, useEffect, useRef } from 'react';

import { isNil } from 'lodash-es';

interface InfiniteScrollProps {
  onLoadMore: () => void;
}
// based on https://medium.com/@swatisucharita94/react-infinite-scroll-with-intersection-observer-api-db3998e52d63
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onLoadMore
}) => {
  const anchor = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    ([entry]) => {
      console.log(entry.isIntersecting);
      if (entry.isIntersecting) {
        onLoadMore();
      }
    },
    [onLoadMore]
  );

  useEffect(() => {
    if (isNil(anchor.current)) {
      return;
    }

    const options = {
      root: null
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(anchor.current);

    return () => observer.disconnect();
  }, [callback]);

  return (
    <>
      {children}
      <div ref={anchor}></div>
    </>
  );
};
