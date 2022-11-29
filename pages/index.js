import Home from '../components/Home/Home';
import Head from 'next/head';
import logger from '../logger/logger';

export default function LandingPage() {
  logger.info('Client side logging');
  return (
    <>
      <Head>
        {/* next/head works like page meta when included in different page routes */}
        <title>Create Next App</title>
      </Head>
      <Home />
    </>
  );
}

// for static generation
// works if included only in pages folder
export async function getStaticProps() {
  console.log('get static props');
  return {
    props: {}
  };
}
