'use client';
import { useLocale } from 'next-intl';
import { locales } from '../config';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const localeLabels = {
    en: 'English',
    gr: 'Greek',
    fr: 'Français',
  };

  return (
    <LocaleSwitcherSelect defaultValue={locale} label='Select Language'>
      {locales.map((cur) => (
        <option key={cur} value={cur} className='lg:bg-gray-900 w-full lg:px-4'>
          {localeLabels[cur]}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
