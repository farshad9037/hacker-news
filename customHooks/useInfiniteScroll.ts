import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (scrollRef, callback) => {
  const scrollObserver = useCallback(
    node => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.intersectionRatio > 0) {
            callback();
          }
        });
      }).observe(node);
    },
    [callback]
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollObserver(scrollRef.current);
    }
  }, [scrollObserver, scrollRef]);
}