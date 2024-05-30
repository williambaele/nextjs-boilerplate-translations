import HeaderWhite from '../../../components/HeaderWhite';
import { useTranslations } from 'next-intl';

export default function Example() {
  const h = useTranslations('Navigation');
  const t = useTranslations('About');

  const headerMessages = {
    Home: h('Home'),

    About: h('About'),
  };

  return (
    <>
      <HeaderWhite messages={headerMessages} />
      <div className='bg-white py-16 max-w-7xl px-4 mx-auto'>{t('Title')}</div>
    </>
  );
}
