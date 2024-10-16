import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

interface Props {
    children: ReactNode
}

export default function RootLayout(props : Props) {
    return (
        <html>
        <body>{props.children}</body>
        </html>
    )
}
