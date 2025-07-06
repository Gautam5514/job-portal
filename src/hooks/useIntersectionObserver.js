// File: hooks/useIntersectionObserver.js

'use client'; // This is a client-side hook, so this directive is essential.

import { useEffect, useState, useRef } from 'react';

/**
 * Configuration options for the Intersection Observer.
 * @typedef {object} UseIntersectionObserverOptions
 * @property {number} [threshold=0.1] - How much of the element should be visible (0.0 to 1.0).
 * @property {string} [rootMargin='0px'] - Margin around the viewport.
 * @property {boolean} [triggerOnce=true] - If true, it will stop observing after the element is visible once.
 */

/**
 * A custom React hook that tells you when an element is visible in the viewport.
 * @param {UseIntersectionObserverOptions} [options={}] - Configuration options.
 * @returns {[import('react').RefObject<HTMLDivElement>, boolean]} A tuple containing [the ref to attach to your element, a boolean indicating if it's visible].
 */
export function useIntersectionObserver(options = {}) {
  // Set default options
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  
  // A ref to hold the element we want to observe
  const targetRef = useRef(null);

  // State to store whether the element is intersecting (visible)
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = targetRef.current; // The actual DOM element
    if (!node) return; // If the element doesn't exist, do nothing.

    // Create the observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // This callback function runs when the element's visibility changes.
        if (entry.isIntersecting) {
          setIsIntersecting(true); // The element is now visible

          // If we only want to trigger it once, we unobserve the element.
          if (triggerOnce) {
            observer.unobserve(node);
          }
        }
      },
      { threshold, rootMargin } // Pass the options to the observer
    );

    // Start observing the element
    observer.observe(node);

    // Cleanup function: stop observing when the component unmounts.
    return () => {
      observer.disconnect();
    };
  }, [targetRef, threshold, rootMargin, triggerOnce]); // Dependencies for the effect

  return [targetRef, isIntersecting];
}