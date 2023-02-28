import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import DropdownItem from './DropdownItem'

type MenuItemProps = {
  href?: string
  title: string
  dropdown?: boolean
  dropdownData?: any
  smallGroups?: boolean
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const MenuItem = (props: MenuItemProps) => {
  return (
    <>
      {props.dropdown ? (
        // if dropdown menu
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open ? 'text-gray-900' : 'text-gray-500',
                  'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}>
                <span>{props.title}</span>
                <ChevronDownIcon
                  className={classNames(
                    open ? 'text-gray-600' : 'text-gray-400',
                    'ml-2 h-5 w-5 group-hover:text-gray-500'
                  )}
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1">
                <Popover.Panel
                  className={`absolute left-1/2 z-10 mt-3 w-screen max-w-md ${
                    props.smallGroups
                      ? '-translate-x-[85%]'
                      : '-translate-x-1/2'
                  } transform px-2 sm:px-0`}>
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {props.dropdownData.map(
                        (item: {
                          name: string
                          href: string
                          description: string
                          icon: any
                        }) => (
                          <DropdownItem
                            key={item.name}
                            name={item.name}
                            href={item.href}
                            description={item.description}
                            icon={item.icon}
                          />
                        )
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      ) : (
        // if regular menu item
        <a
          href={props.href}
          className="text-base font-medium text-gray-500 hover:text-gray-900">
          {props.title}
        </a>
      )}
    </>
  )
}

export default MenuItem
