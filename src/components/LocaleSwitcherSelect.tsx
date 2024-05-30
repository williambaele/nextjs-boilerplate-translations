'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { ChangeEvent, ReactNode, useTransition } from 'react';
import { useRouter, usePathname } from '../navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <label
      className={clsx(
        'cursor-pointer font-semibold overflow-hidden relative z-0 lg:border lg:border-gray-900 rounded-lg group py-1',
        isPending && 'transition-opacity [&:disabled]:opacity-30',
      )}
    >
      <p className='sr-only'>{label}</p>
      <select
        className='relative z-10 text-gray-900 ease-in-out  lg:group-hover:text-white text-sm duration-500 bg-transparent lg:group-hover:bg-gray-900 lg:hover:bg-gray-900 group-hover:bg-transparent w-full cursor-pointer focus:outline-none focus:ring-0 focus:border-transparent outline-none lg:px-4'
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className='hidden lg:block absolute w-full h-full bg-gray-900 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500'></span>
      <span className='hidden lg:block absolute w-full h-full bg-gray-900 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500'></span>
    </label>
  );
}
