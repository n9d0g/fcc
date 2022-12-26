import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import AboutData from '../../data/AboutData'
import MinistriesData from '../../data/MinistriesData'
import SmallGroupsData from '../../data/SmallGroupsData'
import MenuItem from './header/MenuItem'
import MobileMenuItem from './header/MobileMenuItem'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <header>
      <Popover className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <span className="sr-only">Freedom in Christ Church</span>
                <img
                  className="h-8 w-auto sm:h-20"
                  src="/fcc-logo.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <MenuItem href="/" title="Home" />
              <MenuItem dropdown title="About" dropdownData={AboutData} />
              <MenuItem href="/sermons" title="Sermons" />
              <MenuItem
                dropdown
                title="Ministries"
                dropdownData={MinistriesData}
              />
              <MenuItem
                dropdown
                title="Small Groups"
                dropdownData={SmallGroupsData}
              />
              <MenuItem href="/give" title="Give" />
            </Popover.Group>
          </div>
        </div>

        {/* mobile nav */}
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="/fcc-logo.svg"
                      alt="Freedom in Christ Church Logo"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <MobileMenuItem href="/" title="Home" />
                    <MobileMenuItem href="/about" title="About" />
                    <MobileMenuItem href="/sermons" title="Sermons" />
                    <MobileMenuItem href="/ministries" title="Ministries" />
                    <MobileMenuItem href="/small-groups" title="Small Groups" />
                    <MobileMenuItem href="/give" title="Give" />
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  )
}
