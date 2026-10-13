import { Fragment, useRef, type ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { gsap, useGSAP, MOTION, revealUp } from '../lib/motion';
import { postBySlug, posts, readingTime, type Block, type Post } from '../blog';
import { profile, serviceBySlug } from '../data';
import { getSeo } from '../seo';
import { SceneLabel } from '../components/Chrome';
import { CtaBand, PageHero } from '../components/Blocks';
import { ArrowUpRight } from '../components/Icons';
import NotFound from './NotFound';

const fmtDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Renders **bold**, `code` and [text](/path) inside a line of post text. */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={m.index}>{m[1]}</strong>);
    else if (m[2]) out.push(<code key={m.index}>{m[2]}</code>);
    else out.push(<Link key={m.index} to={m[4]}>{m[3]}</Link>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function renderBlock(b: Block, i: number) {
  if ('h2' in b) return <h2 key={i}>{b.h2}</h2>;
  if ('h3' in b) return <h3 key={i}>{b.h3}</h3>;
  if ('p' in b) return <p key={i}>{inline(b.p)}</p>;
  if ('ul' in b) return <ul key={i}>{b.ul.map((li, j) => <li key={j}>{inline(li)}</li>)}</ul>;
  if ('ol' in b) return <ol key={i}>{b.ol.map((li, j) => <li key={j}>{inline(li)}</li>)}</ol>;
  if ('tip' in b) return <aside key={i} className="post-tip glass"><span className="mono">Tip</span><p>{inline(b.tip)}</p></aside>;
  return (
    <pre key={i} className="post-code glass" data-lang={b.lang}>
      <code>{b.code}</code>
    </pre>
  );
}

export function PostCard({ post, as = 'h3' }: { post: Post; as?: 'h2' | 'h3' }) {
  const Heading = as;
  return (
    <Link to={`/blog/${post.slug}`} className="post-card glass">
      <div className="post-card-meta mono">
        <span>{post.category}</span>
        <span>{readingTime(post)} min read</span>
      </div>
      <Heading>{post.title}</Heading>
      <p className="muted">{post.excerpt}</p>
      <span className="card-link">
        Read article <ArrowUpRight width={16} height={16} />
      </span>
    </Link>
  );
}

export function PostGrid({ items, as }: { items: Post[]; as?: 'h2' | 'h3' }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.from('.post-card', {
          y: 80,
          autoAlpha: 0,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 92%', end: 'top 55%', scrub: 1 },
        });
      });
    },
    { scope: root },
  );
  return (
    <div className="post-grid" ref={root}>
      {items.map((p) => (
        <PostCard key={p.slug} post={p} as={as} />
      ))}
    </div>
  );
}

export function BlogIndexPage() {
  return (
    <>
      <PageHero
        label="Blog"
        crumbs={getSeo('/blog')!.crumbs}
        title={
          <>
            Insights on building <span className="gradient-text">better software.</span>
          </>
        }
        lead="Practical guides on web app costs, architecture, AI automation, CRMs, Web3 and DevOps — written from real project experience."
      />
      <section className="section blog-list" data-scene="Articles">
        <div className="container">
          <PostGrid items={posts} as="h2" />
        </div>
      </section>
      <CtaBand n="03" />
    </>
  );
}

export function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = postBySlug(slug);
  const root = useRef<HTMLElement>(null);
  useGSAP(() => gsap.matchMedia().add(MOTION, () => revealUp(root.current)), { scope: root });

  if (!post) return <NotFound />;
  const service = serviceBySlug(post.service);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero small label={post.category} crumbs={getSeo(`/blog/${post.slug}`)!.crumbs} title={<>{post.title}</>} lead={post.description}>
        <div className="post-byline">
          <picture>
            <source srcSet={profile.photoWebp} type="image/webp" />
            <img src={profile.photo} alt="" width={44} height={44} />
          </picture>
          <span>
            <strong>{profile.name}</strong>
            <span className="muted">
              {' '}· <time dateTime={post.date}>{fmtDate(post.date)}</time> · {readingTime(post)} min read
            </span>
          </span>
        </div>
      </PageHero>

      <section className="section post-section" ref={root} data-scene="Article">
        <div className="container post-layout">
          <article className="post-body">
            {post.body.map((b, i) => (
              <Fragment key={i}>{renderBlock(b, i)}</Fragment>
            ))}
          </article>
          {service && (
            <aside className="post-aside">
              <div className="glass post-service reveal-up">
                <span className="mono fact-k">Related service</span>
                <h2>{service.title}</h2>
                <p className="muted">{service.short}</p>
                <Link to={`/services/${service.slug}`} className="card-link">
                  Explore service <ArrowUpRight width={16} height={16} />
                </Link>
              </div>
            </aside>
          )}
        </div>
      </section>

      <section className="section more-posts" data-scene="More articles">
        <div className="container">
          <div className="section-head">
            <SceneLabel n="03">Keep reading</SceneLabel>
            <h2 className="section-title">More articles</h2>
          </div>
          <PostGrid items={more} />
        </div>
      </section>
      <CtaBand n="04" />
    </>
  );
}
