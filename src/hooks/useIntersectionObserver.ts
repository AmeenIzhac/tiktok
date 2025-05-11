import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverProps {
  target: RefObject<Element>;
  rootMargin?: string;
  threshold?: number;
}

export const useIntersectionObserver = ({
  target,
  rootMargin = '0px',
  threshold = 0.5,
}: UseIntersectionObserverProps): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold,
      }
    );

    const currentTarget = target.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [target, rootMargin, threshold]);

  return isIntersecting;
};