/** @jsx jsx */
import { jsx } from "theme-ui"
import { Menu, MenuButton, MenuPopover, MenuLink } from "@reach/menu-button"
import { MdTranslate } from "react-icons/md"
import { Link } from "gatsby"
import "@reach/menu-button/styles.css"
import { mediaQueries } from "gatsby-design-tokens/dist/theme-gatsbyjs-org"
import { useLocale } from "./I18nContext"

import { langs, getLocaleAndBasePath, localizedPath } from "../utils/i18n"

const navItemTopOffset = `0.4rem`
const navItemStyles = {
  borderBottom: `2px solid transparent`,
  color: `navigation.linkDefault`,
  display: `block`,
  fontSize: 3,
  lineHeight: t => t.sizes.headerHeight,
  [mediaQueries.md]: {
    lineHeight: t => `calc(${t.sizes.headerHeight} - ${navItemTopOffset})`,
  },
  position: `relative`,
  textDecoration: `none`,
  zIndex: 1,
  "&:hover, &:focus": { color: `navigation.linkHover` },
}

const allLangs = [
  { code: "en", name: "English", localName: "English" },
  ...langs,
]

function LangLink({ code, name, localName, current, pathname }) {
  const { basePath } = getLocaleAndBasePath(pathname)
  return (
    <MenuLink
      as={Link}
      to={localizedPath(code, basePath)}
      sx={{
        px: 6,
        py: 3,
        "&[data-selected]": {
          bg: `sidebar.itemHoverBackground`,
          color: `navigation.linkHover`,
        },
      }}
    >
      <span
        sx={{
          fontWeight: current && `semiBold`,
          color: current && `navigation.linkHover`,
        }}
      >
        {name}
      </span>
      <span sx={{ ml: 2, color: `textMuted`, fontSize: 1 }}>{localName}</span>
    </MenuLink>
  )
}

// We want the menu to go on the bottom right.
// This is taken from the Reach source code here:
// https://github.com/reach/reach-ui/blob/master/packages/popover/src/index.tsx#L101
const menuPosition = (targetRect, popoverRect) => {
  return {
    left: `${targetRect.right - popoverRect.width + window.pageXOffset}px`,
    top: `${targetRect.top + targetRect.height + window.pageYOffset}px`,
  }
}

export default function LanguageDropdown({ pathname }) {
  const locale = useLocale()
  return (
    <Menu>
      <MenuButton
        sx={{
          border: 0,
          background: `none`,
          cursor: `pointer`,
          outline: `none`, // FIXME enable when tabbing
          ...navItemStyles,
        }}
      >
        <MdTranslate /> Languages
      </MenuButton>
      <MenuPopover
        position={menuPosition}
        sx={{
          width: `16rem`,
          bg: `background`,
          borderWidth: `1px`,
          borderColor: `ui.border`,
          boxShadow: `dialog`,
        }}
      >
        {allLangs.map(lang => (
          <LangLink
            {...lang}
            current={locale === lang.code}
            pathname={pathname}
          />
        ))}
      </MenuPopover>
    </Menu>
  )
}
