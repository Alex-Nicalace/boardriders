import DualBanners from '../components/DualBaners';
import Header from '../components/Header';
import LinksBrands from '../components/LinksBrands';
import MainSlider from '../components/MainSlider';
import Promotion from '../components/Promotion';
import NewProducts from '../components/NewProducts';
import PopularCollection from '../components/PopularCollection';
import BlogCard from '../components/ui/BlogCard';

// interface IMainPageProps {}
function MainPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page">
        <MainSlider />
        <LinksBrands />
        <DualBanners />
        <NewProducts />
        <Promotion
          to="#"
          sources={[
            {
              media: '(min-width: 768px)',
              srcSet: '/src/assets/img/promotion/01.jpg',
            },
            {
              media: '(max-width: 767px)',
              srcSet: '/src/assets/img/promotion/01-small.jpg',
            },
          ]}
          img={{
            alt: 'promotion',
            src: '/src/assets/img/promotion/01-small.jpg',
          }}
        />
        <PopularCollection />
        <BlogCard
          title="Очень преочень длинное название блога"
          contentElement={
            <>
              <p>
                Меня не спрашивали, а надо было спросить, что означает имя
                Заратустры именно в моих устах — в устах первого имморалиста:
                ведь то, в чём состоит неслыханная уникальность этого перса в
                истории, являет собою противоположность как раз этому.
              </p>
              <p>
                Меня не спрашивали, а надо было спросить, что означает имя
                Заратустры именно в моих устах — в устах первого имморалиста:
                ведь то, в чём состоит неслыханная уникальность этого перса в
                истории, являет собою противоположность как раз этому...
              </p>
            </>
          }
          image={{
            sources: [
              {
                media: '(min-width: 768px)',
                srcSet: '/src/assets/img/blogs-slider/01.jpg',
              },
              {
                media: '(max-width: 767px)',
                srcSet: '/src/assets/img/blogs-slider/01.jpg',
              },
            ],
            img: {
              alt: 'image of blog',
              src: '/src/assets/img/blogs-slider/01.jpg',
              className: 'blog-card__img',
            },
          }}
          readMorePath="#"
          allBlogsPath="#"
        />
      </main>
    </>
  );
}

export default MainPage;
