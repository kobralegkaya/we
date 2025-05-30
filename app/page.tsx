'use client'

import { RSVPForm } from '@/components/rsvp-form'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	})

	const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
	const [animatingSections, setAnimatingSections] = useState<Set<string>>(
		new Set()
	)
	const lastScrollY = useRef<number>(0)
	const scrollingDown = useRef<boolean>(true)

	// Расчет времени до свадьбы
	useEffect(() => {
		const targetDate = new Date('2025-08-30T15:00:00').getTime()

		const interval = setInterval(() => {
			const now = new Date().getTime()
			const difference = targetDate - now

			if (difference <= 0) {
				clearInterval(interval)
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
				return
			}

			const days = Math.floor(difference / (1000 * 60 * 60 * 24))
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			)
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor((difference % (1000 * 60)) / 1000)

			setTimeLeft({ days, hours, minutes, seconds })
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	// Отслеживание направления прокрутки
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY
			scrollingDown.current = currentScrollY > lastScrollY.current
			lastScrollY.current = currentScrollY
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Настройка Intersection Observer для анимаций при скролле
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					const id = entry.target.id
					if (id) {
						if (entry.isIntersecting) {
							// Добавляем ID в Set видимых секций
							setVisibleSections(prev => new Set(prev).add(id))

							// Запускаем анимацию только если скроллим вниз
							if (scrollingDown.current) {
								setAnimatingSections(prev => new Set(prev).add(id))
							}
						} else {
							// Удаляем ID из Set видимых секций
							setVisibleSections(prev => {
								const newSet = new Set(prev)
								newSet.delete(id)
								return newSet
							})

							// Если скроллим вверх, сбрасываем анимацию
							if (!scrollingDown.current) {
								setAnimatingSections(prev => {
									const newSet = new Set(prev)
									newSet.delete(id)
									return newSet
								})
							}
						}
					}
				})
			},
			{ threshold: 0.2 }
		)

		// Наблюдаем за всеми секциями с id
		document.querySelectorAll('section[id]').forEach(section => {
			observer.observe(section)
		})

		return () => {
			document.querySelectorAll('section[id]').forEach(section => {
				observer.unobserve(section)
			})
		}
	}, [])

	// Функция для проверки видимости и анимации секции
	const isAnimating = (id: string) => animatingSections.has(id)

	// Функция для форматирования чисел с ведущим нулем
	const formatNumber = (num: number) => {
		return num < 10 ? `0${num}` : num.toString()
	}

	// Данные для блока тайминга
	const timelineEvents = [
		{
			time: '15:00',
			title: 'Сбор гостей',
			description: 'Фуршет',
		},
		{
			time: '16:00',
			title: 'Свадебная церемония',
			description: 'Самое главное событие нашего дня',
		},
		{
			time: '17:00',
			title: 'Банкет',
			description: 'Время вкусной еды, танцев и веселья!',
		},
		{
			time: '23:00',
			title: 'Окончание мероприятия',
			description: 'Завершение нашего особенного дня',
		},
	]

	// Данные для блока дресс-кода
	const dressCodeColors = [
		{ name: 'Чёрный', image: '/images/fabric-black.png' },
		{ name: 'Коричневый', image: '/images/fabric-brown.png' },
		{ name: 'Оливковый', image: '/images/fabric-olive.png' },
		{ name: 'Пудровый', image: '/images/fabric-pink.png' },
		{ name: 'Кремовый', image: '/images/fabric-cream.png' },
	]

	return (
		<main className='flex min-h-screen flex-col items-center'>
			<section className='relative w-full h-screen flex flex-col items-center justify-between text-white'>
				<div className='absolute inset-0 z-0'>
					<Image
						src='/images/hero.jpeg'
						alt='Фото пары'
						fill
						className='object-cover brightness-75 grayscale'
						priority
					/>
				</div>

				{/* TODO: wide screen adaptive */}
				<div className='z-10  flex flex-1 flex-col justify-between h-full py-10 w-full'>
					<div className='text-center pb-4'>
						<p className='text-xl tracking-wide animate-fade-in'>Wedding day</p>
					</div>

					<div className='flex flex-col items-center  justify-between space-y-8 h-full'>
						<h1 className='text-6xl tracking-wide animate-fade-in-delay-1'>
							ИЛЬЯ
						</h1>
						<span className='text-6xl animate-fade-in-delay-1'>&</span>
						<h1 className='text-6xl tracking-wide animate-fade-in-delay-1'>
							КСЕНИЯ
						</h1>
					</div>

					<div className='text-center'>
						<p className='text-xl tracking-wide animate-fade-in-delay-2'>
							30 августа 2025
						</p>
					</div>
				</div>
			</section>

			<section id='invitation' className='w-full py-16 px-6 pb-36 bg-paper'>
				<div className='max-w-md mx-auto text-center space-y-8'>
					<h2
						className={`text-4xl font-normal transition-all duration-1000 transform uppercase ${
							isAnimating('invitation')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						ДОРОГИЕ ДРУЗЬЯ
						<br />И РОДНЫЕ!
					</h2>

					<p
						className={`text-xl  transition-all duration-1000 delay-300 transform ${
							isAnimating('invitation')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						Скоро наступит важный день
						<br />в нашей жизни — мы станем семьей!
					</p>

					<div
						className={`transition-all duration-1000 delay-500 transform ${
							isAnimating('invitation')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<h3 className='save-the-date'>Save the date</h3>
						<p className='date-format mt-2'>30/08/2025</p>
					</div>

					<p
						className={`text-xl  mt-8 transition-all duration-1000 delay-700 transform ${
							isAnimating('invitation')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						Мы приглашаем Вас разделить с нами этот особенный день, в который мы
						скажем друг другу "Да", соединив наши сердца и судьбы в окружении
						самых близких!
					</p>

					<div
						className={`relative transition-all duration-1000 delay-900 transform z-10 ${
							isAnimating('invitation')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<Image
							src='/images/bow.png'
							alt='Декоративный бант'
							width={150}
							height={50}
							className='mx-auto absolute'
							style={{
								left: '50%',
								transform: 'translateX(-50%)',
							}}
						/>
					</div>
				</div>
			</section>

			{/* Location Section */}
			<section id='location' className='w-full py-16 px-6 pt-28 bg-paper'>
				<div className='max-w-md mx-auto text-center'>
					<h2
						className={`text-4xl font-normal text-center mb-8 transition-all duration-1000 transform uppercase ${
							isAnimating('location')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						ЛОКАЦИЯ
					</h2>

					<div
						className={`flex flex-col items-center   transition-all duration-1000 delay-300 transform ${
							isAnimating('location')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<p className='text-xl font-normal '>Мы будем ждать Вас по адресу</p>
						<h3 className='text-2xl font-normal text-center'>
							Банкетный зал «Wedplace»
						</h3>

						<div className=' text-center leading-relaxed '>
							<p>Берёзовая ул., 10А, д. Капитаново,</p>
							<p>Витебский р-н</p>
						</div>
					</div>

					<div
						className={`mt-8 transition-all duration-1000 delay-500 transform ${
							isAnimating('location')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<button
							className='text-lg rounded-md px-6 py-2 text-neutral-100 font-bold bg-neutral-900 hover:bg-neutral-800'
							onClick={() =>
								window.open(
									'https://maps.google.com/?q=Берёзовая+ул.,+10А,+д.+Капитаново,+Витебский+р-н',
									'_blank'
								)
							}
						>
							Посмотреть на карте
						</button>
					</div>
				</div>
			</section>

			{/* Timeline Section */}
			<section id='timeline' className='w-full py-16 px-6 relative text-white'>
				<div className='absolute inset-0 z-0'>
					<Image
						src='/images/couple.JPG'
						alt='Предложение'
						fill
						className='object-cover'
					/>
				</div>
				<div className='max-w-md mx-auto text-center relative z-10'>
					<h2
						className={`text-4xl  uppercase tracking-widest mb-12 transition-all duration-1000 transform text-shadow ${
							isAnimating('timeline')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						ТАЙМИНГ
					</h2>

					<div className='flex flex-col items-center'>
						{timelineEvents.map((event, index) => (
							<div key={index}>
								{/* Блок события */}
								<div className='flex flex-col items-center'>
									<div className='text-4xl  mb-2 text-shadow'>{event.time}</div>
									<div className='text-xl mb-1 text-shadow'>{event.title}</div>
									<div className='text-base text-white/80 max-w-xs text-center mb-6 text-shadow'>
										{event.description}
									</div>
								</div>

								{index < timelineEvents.length - 1 && (
									<div className='w-px h-16 bg-white/50 mx-auto mb-6'></div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Details Section */}
			<section id='details' className='w-full py-16 px-6 bg-paper'>
				<div className='max-w-md mx-auto text-center space-y-8'>
					<h2
						className={`text-4xl font-normal transition-all duration-1000 transform uppercase ${
							isAnimating('details')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						ДЕТАЛИ
					</h2>

					<p
						className={`text-xl  transition-all duration-1000 delay-300 transform ${
							isAnimating('details')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						Пожалуйста, обратите внимание на следующие детали, которые помогут
						сделать наше торжество незабываемым для всех.
					</p>

					<div
						className={`text-left space-y-6 transition-all duration-1000 delay-500 transform ${
							isAnimating('details')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<div className=''>
							<p className='text-lg leading-relaxed'>
								• Ваши улыбки подарят нам счастье в этот день, а пожелания в
								конвертах помогут осуществить мечты!
							</p>
						</div>

						<div className=''>
							<p className='text-lg leading-relaxed'>
								• Пожалуйста, не обременяйте себя покупкой красивого букета. Мы
								не успеем насладиться их красотой, а вот бутылочка вашего
								любимого алкоголя или сертификат будут всегда кстати!
							</p>
						</div>

						<div className=''>
							<p className='text-lg leading-relaxed'>
								• Для всех гостей будет организован трансфер, который отправится
								30.08.2025 от Ледового дворца г. Орша ориентировочно в
								13:15–13:30 и доставит вас до локации нашего торжества (точное
								время мы сообщим в телеграм-беседе — ссылка на неё будет чуть
								ниже). Нам очень важно, чтобы каждый чувствовал себя комфортно,
								поэтому в конце торжества вас также будет ожидать трансфер
								обратно.
							</p>
						</div>

						<div className=''>
							<p className='text-lg leading-relaxed'>
								• Место проведения нашего торжества — чудесная локация, но, увы,
								без возможности ночлега. Дорогие гости из других городов,
								пожалуйста, заранее подумайте о проживании и дороге до Орши.
								Если возникнут сложности — не волнуйтесь: мы с радостью
								подскажем комфортные варианты размещения и поможем с
								организацией. Если потребуется — мы готовы помочь с расселением.
								Все решаемо!
							</p>
						</div>

						<div className=''>
							<p className='text-lg leading-relaxed'>
								• В воскресенье, 31.08.2025, в г. Орша будет организован
								неофициальный и расслабленный «второй день» нашей свадьбы в
								стиле 90-х (более подробная информация будет указана в
								телеграм-беседе заблаговременно). Если кто-то не имеет
								возможности задержаться в городе или не сможет присутствовать по
								личным причинам — сообщите нам, пожалуйста.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id='dress-code' className='w-full py-16 px-6 bg-paper'>
				<div className='max-w-md mx-auto text-center space-y-8'>
					<h2
						className={`text-4xl font-normal transition-all duration-1000 transform uppercase ${
							isAnimating('dress-code')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						ДРЕСС-КОД
					</h2>

					<p
						className={`text-xl  max-w-md mx-auto transition-all duration-1000 delay-300 transform ${
							isAnimating('dress-code')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						Нам будет приятно, если своими нарядами вы поддержите атмосферу
						нашей свадьбы!
					</p>

					<div className='flex flex-wrap justify-center gap-8 mt-8'>
						{dressCodeColors.map((color, index) => (
							<div
								key={index}
								className={`flex flex-col items-center transition-all duration-500 transform ${
									isAnimating('dress-code')
										? 'opacity-100 scale-100'
										: 'opacity-0 scale-0'
								} hover:scale-110`}
								style={{ transitionDelay: `${500 + index * 200}ms` }}
							>
								<div className='w-24 h-24 rounded-full overflow-hidden border border-neutral-200 shadow-md'>
									<Image
										src={color.image || '/placeholder.svg'}
										alt={color.name}
										width={96}
										height={96}
										className='w-full h-full object-cover'
									/>
								</div>
								<span className='text-base mt-3'>{color.name}</span>
							</div>
						))}
					</div>

					<p
						className={`text-xl  max-w-md mx-auto mt-8 transition-all duration-1000 delay-700 transform ${
							isAnimating('dress-code')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						Для мужчин предпочтительны классические брюки и рубашка.
					</p>
				</div>
			</section>

			{/* Hands Photo with Countdown Section */}
			<section
				id='countdown-photo'
				className='w-full min-h-screen relative flex items-center justify-center text-white'
			>
				<div className='absolute inset-0 z-0'>
					<Image
						src='/images/timer.JPG'
						alt='Фото рук'
						fill
						className='object-cover brightness-75'
						priority
					/>
				</div>
				<div className='z-20 text-center px-4'>
					<h3 className='text-2xl md:text-3xl  uppercase tracking-widest mb-6 text-shadow'>
						ДО СВАДЬБЫ ОСТАЛОСЬ
					</h3>
					<div className='flex justify-center gap-4'>
						<div className='flex flex-col items-center'>
							<div className='text-4xl  w-16 h-16 flex items-center justify-center text-shadow'>
								<span className='tabular-nums'>{timeLeft.days}</span>
							</div>
							<span className='text-sm mt-2 text-shadow'>дней</span>
						</div>
						<div className='flex flex-col items-center'>
							<div className='text-4xl  w-16 h-16 flex items-center justify-center text-shadow'>
								<span className='tabular-nums'>
									{formatNumber(timeLeft.hours)}
								</span>
							</div>
							<span className='text-sm mt-2 text-shadow'>часов</span>
						</div>
						<div className='flex flex-col items-center'>
							<div className='text-4xl  w-16 h-16 flex items-center justify-center text-shadow'>
								<span className='tabular-nums'>
									{formatNumber(timeLeft.minutes)}
								</span>
							</div>
							<span className='text-sm mt-2 text-shadow'>минут</span>
						</div>
						<div className='flex flex-col items-center'>
							<div className='text-4xl  w-16 h-16 flex items-center justify-center text-shadow'>
								<span className='tabular-nums'>
									{formatNumber(timeLeft.seconds)}
								</span>
							</div>
							<span className='text-sm mt-2 text-shadow'>секунд</span>
						</div>
					</div>
				</div>
			</section>

			{/* RSVP Section */}
			<section id='rsvp' className='w-full py-16 px-6 bg-paper'>
				<div className='max-w-md mx-auto text-center space-y-8 pb-8'>
					<h2
						className={`text-4xl font-normal transition-all duration-1000 transform uppercase ${
							isAnimating('rsvp')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						АНКЕТА ГОСТЯ
					</h2>

					<p
						className={`text-xl  transition-all duration-1000 delay-300 transform ${
							isAnimating('rsvp')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						Мы будем очень рады видеть Вас на нашем торжестве. Пожалуйста,
						подтвердите свое присутствие до 01.06.2025, заполнив форму ниже.
					</p>

					<div
						className={`transition-all duration-1000 delay-500 transform ${
							isAnimating('rsvp')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<RSVPForm />
					</div>

					<p
						className={`text-xl  mt-8 transition-all duration-1000 delay-700 transform ${
							isAnimating('rsvp')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						Если Вы планируете творческий подарок для нас или у Вас есть
						вопросы, то просим держать связь с нашим организатором:
					</p>

					<p
						className={`text-xl font-medium mb-8 transition-all duration-1000 delay-900 transform ${
							isAnimating('rsvp')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						Валерия <span className='font-semibold'>+375(29)899-38-25</span>
					</p>
				</div>
			</section>

			{/* Telegram Chat Section */}
			<section
				id='telegram'
				className='w-full py-16 px-6 pb-28 bg-paper border-neutral-200'
			>
				<div className='max-w-md mx-auto text-center space-y-6'>
					<h2
						className={`text-4xl font-normal transition-all duration-1000 transform uppercase ${
							isAnimating('telegram')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						ТЕЛЕГРАМ-БЕСЕДА
					</h2>

					<p
						className={`text-xl  transition-all duration-1000 delay-300 transform ${
							isAnimating('telegram')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						Мы понимаем, что у вас могли остаться вопросы, поэтому вступайте в
						нашу телеграм-беседу, где будет вся актуальная информация, в том
						числе точное время отправления трансфера. В этой беседе все гости
						могут задавать вопросы, делиться своими эмоциями, фотографиями и
						видео.
					</p>

					<div
						className={`transition-all duration-1000 delay-500 transform ${
							isAnimating('telegram')
								? 'opacity-100 translate-y-0'
								: 'opacity-0 translate-y-10'
						}`}
					>
						<button
							className='text-lg rounded-md px-6 py-2 text-neutral-100 font-bold bg-neutral-900 hover:bg-neutral-800'
							onClick={() =>
								window.open(
									'#', // Здесь разместить ссылку на беседу
									'_blank'
								)
							}
						>
							Присоединиться к беседе
						</button>
					</div>
				</div>
			</section>

			<div className='relative w-full'>
				<div className='absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-10'>
					<div className='w-36 h-36 rounded-full overflow-hidden border-4 border-white'>
						<Image
							src='/images/circle.jpg'
							alt='Фото пары'
							width={144}
							height={144}
							className='object-cover w-full h-full'
						/>
					</div>
				</div>
			</div>

			<section id='final' className='w-full py-16 px-6 bg-paper'>
				<div className='max-w-md mx-auto text-center pt-8'>
					<div className=''>
						<p className='text-2xl  tracking-wide'>Мы ждем Вас!</p>
						<p className='text-2xl  tracking-wide mt-2'>Ваши Илья и Ксения</p>
					</div>
				</div>
			</section>
		</main>
	)
}
