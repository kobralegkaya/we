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

const title = 'Свадьба Ильи и Ксении | 30.08.2025'
const description =
	'Приглашение на свадьбу Ильи и Ксении, которая состоится 30 августа 2025 года'
const imageUrl = 'https://we-q1nj.vercel.app/images/hero.jpeg'
const siteUrl = 'https://we-q1nj.vercel.app/'

export const metadata: Metadata = {
	title,
	description,

	// Open Graph (Facebook, WhatsApp, Discord)
	openGraph: {
		title,
		description,
		type: 'website',
		url: siteUrl,
		siteName: 'Свадьба Ильи и Ксении',
		images: [
			{
				url: imageUrl,
				width: 1200,
				height: 630,
				alt: 'Свадьба Ильи и Ксении',
			},
		],
	},

	// Twitter Card
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		images: [imageUrl],
	},

	// Дополнительные метатеги для Telegram
	other: {
		// Telegram-специфичные метатеги
		'telegram:card': 'summary_large_image',
		'telegram:title': title,
		'telegram:description': description,
		'telegram:image': imageUrl,

		// Дополнительные метатеги для лучшей совместимости
		image: imageUrl,
		url: siteUrl,

		// Принудительное обновление кэша
		'cache-control': 'no-cache, no-store, must-revalidate',
		pragma: 'no-cache',
		expires: '0',
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
