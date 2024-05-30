import { useTranslations } from 'next-intl';
import Link from 'next/link';


export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className='bg-[#f7f7f7] h-screen'>
      <div className='max-w-7xl px-4 flex items-center justify-center h-full mx-auto'>
        <div className='space-y-4 flex flex-col text-center '>
          <h1 className='text-3xl font-bold'>Content not found</h1>
          <p>
            Please double-check the browser address bar or use the navigation to
            go to a known page.
          </p>
          <Link
            href='/'
            rel='noopener noreferrer'
            className='px-8 py-3 w-1/2 mx-auto font-semibold rounded bg-[#eb6753] text-white'
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
