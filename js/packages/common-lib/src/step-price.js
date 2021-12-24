export const stepPrice = (() => {
	const ds = {}
	const createStepD = step =>
		(ds[step] = Array.from(new Array(step), (_, i) => i).reduce(
			p => p + '\\d',
			'',
		))
	return (price, step = 3) => {
		let _price = price

		if (typeof price === 'number') _price = String(price)

		if (typeof _price === 'string') {
			const stepD = ds[step] || createStepD(step)
			_price = _price.replace(
				new RegExp(`(\\d)(?=(${stepD})+(?!\\d))`, 'g'),
				'$1,',
			)
		}
		return _price
	}
})()
