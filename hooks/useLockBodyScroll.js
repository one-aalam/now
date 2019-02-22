import { useEffect } from 'react'

function useLockBodyScroll(toggle) {
  useEffect(
    () => {
      document.body.style.overflow = toggle ? 'hidden' : 'visible'
      return () => (document.body.style.overflow = 'visible')
    },
    [toggle]
  );
}

export default useLockBodyScroll