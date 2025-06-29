"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}
type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  collections?: HttpTypes.StoreCollection[] | null
  categories?: HttpTypes.StoreProductCategory[] | null
}
const SideMenu = ({ regions, collections, categories }: SideMenuProps) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  Menu
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="flex flex-col absolute w-full pr-4 sm:pr-0 sm:w-1/3 2xl:w-1/4 sm:min-w-min h-[calc(100vh-1rem)] z-30 inset-x-0 text-sm text-ui-fg-on-color m-2 backdrop-blur-2xl">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full bg-[rgba(3,7,18,0.5)] rounded-rounded justify-between p-6"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button data-testid="close-menu-button" onClick={close}>
                        <XMark />
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <LocalizedClientLink
                              href={href}
                              className="text-3xl leading-10 hover:text-ui-fg-disabled"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </LocalizedClientLink>
                          </li>
                        )
                      })}
                      {collections && collections.length > 0 && (
                        <li>
                          <h5 className="text-3xl leading-10">Collections</h5>
                          <ul className="flex flex-col gap-2 mt-4 pl-4">
                            {collections?.map((collection) => (
                              <li key={collection.id}>
                                <LocalizedClientLink
                                  href={`/collections/${collection.handle}`}
                                  className="text-2xl leading-8 hover:text-ui-fg-disabled"
                                  onClick={close}
                                  data-testid={`collection-${collection.handle}-link`}
                                >
                                  {collection.title}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                      {categories && categories.length > 0 && (
                        <li>
                          <h5 className="text-3xl leading-10">Category</h5>
                          <ul className="flex flex-col gap-2 mt-4 pl-4">
                            {categories?.map((category) => (
                              <li key={category.id}>
                                <LocalizedClientLink
                                  href={`/categories/${category.handle}`}
                                  className="text-2xl leading-8 hover:text-ui-fg-disabled"
                                  onClick={close}
                                  data-testid={`collection-${category.handle}-link`}
                                >
                                  {category.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )}
                    </ul>
                    <div className="flex flex-col gap-y-6">
                      <div
                        className="flex justify-between"
                        onMouseEnter={toggleState.open}
                        onMouseLeave={toggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={toggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            toggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} Jaden Nguyen. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
