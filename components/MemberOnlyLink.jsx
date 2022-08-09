import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const getServerSideProps = withPageAuthRequired();
console.log(getServerSideProps);
