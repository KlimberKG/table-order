import { useContext, useReducer, useEffect } from 'react'
import { appContext } from '../contexts'

export function useAppContextValue(tokenState: [string | null, React.Dispatch<React.SetStateAction<string | null>>]) {
    const isMenuCollapsedState = useReducer((state: boolean, newState: boolean) => {
        if (newState) {
            localStorage.setItem('isMenuCollapsed', 'true')
        } else {
            localStorage.removeItem('isMenuCollapsed')
        }

        return newState
    }, !!localStorage.getItem('isMenuCollapsed'))

    const titleState = useReducer((state: string | null, newTitle: string | null) => {
        document.title = newTitle || 'Table order'
        return newTitle
    }, 'Table order')

    return {
        tokenState,
        isMenuCollapsedState,
        titleState
    }
}

export function useToken() {
    const [token] = useContext(appContext).tokenState

    return token
}

export function useTitle(title: string) {
    const [_, setTitle] = useContext(appContext).titleState

    useEffect(() => {
        setTitle(title)
    }, [])
}
