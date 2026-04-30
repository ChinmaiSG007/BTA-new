import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Beyond Tarmac Adventures - Explore with Us!', 
  description = 'Explore with us! Navigating the contours of the unknown and fostering a deeper understanding of ourselves and the world through the art of motorcycling. Beyond Tarmac Adventures curates unforgettable guided motorcycle tours.', 
  image = 'https://beyondtarmacadv.com/images/16.svg', 
  url = 'https://beyondtarmacadv.com/', 
  type = 'website' 
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default SEO;
