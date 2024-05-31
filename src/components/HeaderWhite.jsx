'use client';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import Logo from '../../public/images/logo.webp';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';
import LocaleSwitcher from './LocaleSwitcher';
import Link from 'next/link';

export default function Example({ messages }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`z-40 sticky top-0 h-20 transition-colors ease-in-out duration-300 bg-[#f7f7f7] shadow-md`}
    >
      <nav
        className='flex items-center justify-between h-full px-4 mx-auto max-w-7xl'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <Image className='w-auto h-8' src={Logo} alt='' />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='w-6 h-6' aria-hidden='true' />
          </button>
        </div>
        <Popover.Group className='hidden border-0 outline-none lg:flex lg:gap-x-12 focus:outline-none'>
          <Link
            href='/'
            className={`text-sm font-semibold leading-6 text-gray-900`}
          >
            {messages.Home}
          </Link>
          <Link
            href='/about'
            className={`text-sm font-semibold leading-6 text-gray-900`}
          >
            {messages.About}
          </Link>
        </Popover.Group>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <LocaleSwitcher />
        </div>
      </nav>
      <Dialog
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>IBPG</span>
              <Image className='w-auto h-8' src={Logo} alt='' />
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='w-6 h-6' aria-hidden='true' />
            </button>
          </div>
          <div className='flow-root mt-6'>
            <div className='divide-y divide-gray-500/10'>
              <div className='py-6 space-y-2'>
                <Link
                  href='/'
                  className='block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50'
                >
                  {messages.Home}
                </Link>
                <Link
                  href='/about'
                  className='block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50'
                >
                  {messages.About}
                </Link>
              </div>
              <div className='py-6'>
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
