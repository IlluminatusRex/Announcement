import AdContainer from '../../features/AdContainer/AdContainer';

const Ads = ({ ads }) => (
  <section className="d-flex">
    {ads.map((ad) => (
      <AdContainer key={ad._id} {...ad} />
    ))}
  </section>
);

export default Ads;
