'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

const initialState = {
	name: '',
	phone: '',
	attendance: 'yes',
	alcoholPreferences: [] as string[],
	dietaryRestrictions: '',
	message: '',
}

export function RSVPForm() {
	const [formData, setFormData] = useState(initialState)
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleRadioChange = (name: string, value: string) => {
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleCheckboxChange = (value: string, checked: boolean) => {
		setFormData(prev => {
			if (checked) {
				return {
					...prev,
					alcoholPreferences: [...prev.alcoholPreferences, value],
				}
			} else {
				return {
					...prev,
					alcoholPreferences: prev.alcoholPreferences.filter(
						item => item !== value
					),
				}
			}
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			setIsLoading(true)
			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbzm0E3ahJJjqHxzGHCmsdfgVM1t6qjTYIuWeCW_vz69_F1FAU40rTegvFbg5RkYNp2TsQ/exec',
				{
					method: 'POST',
					body: JSON.stringify(formData),
				}
			)

			if (response.ok) {
				alert('Спасибо! Ваш ответ получен.')

				console.log('Form submitted:', formData)
			} else {
				alert('Произошла ошибка при отправке формы.')
			}
		} catch (error) {
			console.error('Ошибка отправки:', error)
			alert('Ошибка при подключении к серверу.')
		} finally {
			setIsLoading(false)
			setFormData(initialState)
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-md mx-auto text-left space-y-6'
		>
			<div className='space-y-2'>
				<Label htmlFor='name' className='text-lg'>
					Имя Фамилия
				</Label>
				<Input
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
					required
					className='text-lg'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='phone' className='text-lg'>
					Номер телефона
				</Label>
				<Input
					id='phone'
					name='phone'
					type='tel'
					value={formData.phone}
					onChange={handleChange}
					required
					className='text-lg'
				/>
			</div>

			<div className='space-y-2'>
				<Label className='text-lg'>
					Вы сможете присутствовать на мероприятии?
				</Label>
				<RadioGroup
					value={formData.attendance}
					onValueChange={value => handleRadioChange('attendance', value)}
					className='flex gap-4'
				>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='yes' id='attendance-yes' />
						<Label htmlFor='attendance-yes' className='text-lg'>
							Да
						</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='no' id='attendance-no' />
						<Label htmlFor='attendance-no' className='text-lg'>
							Нет
						</Label>
					</div>
				</RadioGroup>
			</div>

			{formData.attendance === 'yes' && (
				<>
					<div className='space-y-4'>
						<Label className='text-lg'>Предпочтения по алкоголю</Label>
						<div className='grid grid-cols-2 gap-2'>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='champagne'
									checked={formData.alcoholPreferences.includes('Шампанское')}
									onCheckedChange={checked =>
										handleCheckboxChange('Шампанское', checked === true)
									}
								/>
								<Label htmlFor='champagne' className='text-lg'>
									Шампанское
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='white-wine'
									checked={formData.alcoholPreferences.includes('Вино белое')}
									onCheckedChange={checked =>
										handleCheckboxChange('Вино белое', checked === true)
									}
								/>
								<Label htmlFor='white-wine' className='text-lg'>
									Вино белое
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='red-wine'
									checked={formData.alcoholPreferences.includes('Вино красное')}
									onCheckedChange={checked =>
										handleCheckboxChange('Вино красное', checked === true)
									}
								/>
								<Label htmlFor='red-wine' className='text-lg'>
									Вино красное
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='vodka'
									checked={formData.alcoholPreferences.includes('Водка')}
									onCheckedChange={checked =>
										handleCheckboxChange('Водка', checked === true)
									}
								/>
								<Label htmlFor='vodka' className='text-lg'>
									Водка
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='cognac'
									checked={formData.alcoholPreferences.includes('Коньяк')}
									onCheckedChange={checked =>
										handleCheckboxChange('Коньяк', checked === true)
									}
								/>
								<Label htmlFor='cognac' className='text-lg'>
									Коньяк
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='whiskey'
									checked={formData.alcoholPreferences.includes('Виски')}
									onCheckedChange={checked =>
										handleCheckboxChange('Виски', checked === true)
									}
								/>
								<Label htmlFor='whiskey' className='text-lg'>
									Виски
								</Label>
							</div>
							<div className='flex items-center space-x-2'>
								<Checkbox
									id='no-alcohol'
									checked={formData.alcoholPreferences.includes(
										'Безалкогольные'
									)}
									onCheckedChange={checked =>
										handleCheckboxChange('Безалкогольные', checked === true)
									}
								/>
								<Label htmlFor='no-alcohol' className='text-lg'>
									Безалкогольные
								</Label>
							</div>
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='dietaryRestrictions' className='text-lg'>
							Есть ли у вас пищевые ограничения?
						</Label>
						<Textarea
							id='dietaryRestrictions'
							name='dietaryRestrictions'
							value={formData.dietaryRestrictions}
							onChange={handleChange}
							placeholder='Например: вегетарианство, аллергия на орехи и т.д.'
							className='text-lg'
						/>
					</div>
				</>
			)}

			<Button
				type='submit'
				disabled={isLoading}
				className='w-full bg-neutral-900 hover:bg-neutral-800 text-lg'
			>
				Отправить
			</Button>
		</form>
	)
}
