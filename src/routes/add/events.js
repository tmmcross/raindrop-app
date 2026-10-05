import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { makeDraftStatus } from '~data/selectors/bookmarks'

export default function AddRouteEvents({ item }) {
    const getDraftStatus = useMemo(()=>makeDraftStatus(), [])
    const status = useSelector(state=>getDraftStatus(state, item.link))
    const prevStatus = useRef(status)

    //close window after successful save
    useEffect(()=>{
        if (prevStatus.current == 'saving' && status == 'loaded')
            window.close()

        prevStatus.current = status
    }, [status])

    //close window on Esc press (when possible)
    useMemo(()=>{
        function onWindowKeyDown({ key }) {
            switch(key) {
                case 'Escape':
                    if (window.dispatchEvent(new Event('beforeunload', { cancelable: true })))
                        window.close()
                break
            }
        }

        window.addEventListener('keydown', onWindowKeyDown)
        return ()=>window.removeEventListener('keydown', onWindowKeyDown)
    }, [])

    return null
}
