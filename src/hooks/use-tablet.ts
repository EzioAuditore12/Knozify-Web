import * as React from "react"

const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isTablet, setTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setTablet(window.innerWidth < TABLET_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setTablet(window.innerWidth < TABLET_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isTablet
}
