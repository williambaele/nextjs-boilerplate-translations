'use client';
import { Link } from 'navigation';
import { useEffect } from 'react';

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='bg-[#f7f7f7]'>
      <div className='max-w-7xl px-4 flex items-center justify-center'>
        <h1 className='text-3xl font-bold'>Content not found</h1>
        <p>
          Please double-check the browser address bar or use the navigation to
          go to a known page.
        </p>
        <Link
          href='/'
          rel='noopener noreferrer'
          className='px-8 py-3 font-semibold rounded bg-[#eb6753] text-white'
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
