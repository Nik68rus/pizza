import ContentLoader from 'react-content-loader';

const CategorySkeleton = () => (
  <ContentLoader
    speed={2}
    width={120}
    height={44}
    viewBox="0 0 120 44"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="20" ry="20" width="120" height="44" />
  </ContentLoader>
);

export default CategorySkeleton;
