import { useState, useEffect, useRef } from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton = () => {
  const [sizes, setSizes] = useState({ width: 300, height: 460 });
  const [width, setWidth] = useState(window.innerWidth);
  const pizzaRef = useRef<HTMLDivElement | null>(null);

  const changeWindowWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (pizzaRef.current) {
      setSizes({
        width: pizzaRef.current.clientWidth,
        height: pizzaRef.current.clientWidth * 1.53,
      });
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener('resize', changeWindowWidth);

    return () => {
      window.removeEventListener('resize', changeWindowWidth);
    };
  }, []);

  return (
    <div className="pizza-block" ref={pizzaRef}>
      <ContentLoader
        speed={2}
        width={sizes.width}
        height={sizes.height}
        viewBox={`0 0 300 460`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="26" y="278" rx="10" ry="10" width="255" height="32" />
        <rect x="26" y="322" rx="10" ry="10" width="255" height="80" />
        <rect x="26" y="421" rx="10" ry="10" width="88" height="31" />
        <rect x="146" y="414" rx="20" ry="20" width="137" height="42" />
        <circle cx="150" cy="132" r="120" />
      </ContentLoader>
    </div>
  );
};

export default PizzaSkeleton;
