import { GetServerSideProps } from 'next';

export default function SiteMap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/api/sitemap',
      permanent: false,
    },
  };
};
