import { Link } from 'react-router';
import { PageHero } from '../components/Blocks';

export default function NotFound() {
  return (
    <PageHero
      label="404"
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Not found', path: '/404' },
      ]}
      title={
        <>
          This scene <span className="gradient-text">didn't make the cut.</span>
        </>
      }
      lead="The page you're looking for doesn't exist or has moved."
    >
      <div className="hero-ctas">
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link to="/services" className="btn btn-ghost glass">
          Explore services
        </Link>
      </div>
    </PageHero>
  );
}
