import type { Metadata } from 'next'
import { Cormorant } from 'next/font/google'
import type React from 'react'
import './globals.css'

const cormorant = Cormorant({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-cormorant',
})

const title = 'Свадьба Ильи и Ксении | 30.08.2025'
const description =
	'Приглашение на свадьбу Ильи и Ксении, которая состоится 30 августа 2025 года'

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		type: 'website',
		url: 'https://we-q1nj.vercel.app/',
		images: [
			{
				url: 'https://we-q1nj.vercel.app/images/hero.jpeg',
				width: 1200,
				height: 630,
				alt: 'Свадьба Ильи и Ксении',
			},
		],
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru' className={cormorant.className}>
			<body className='bg-paper bg-repeat'>{children}</body>
		</html>
	)
}
