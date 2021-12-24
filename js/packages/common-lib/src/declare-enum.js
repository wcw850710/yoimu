/*
  使用範例
  申明：
  值 or [值(key), 翻譯(t), 描述(d)]
  declareEnum({ START: [0], END: [1] })
  declareEnum({ START: [0, '開始'], END: [1, '結束'] })
  declareEnum({ START: [0, '開始', 'START'], END: [1, '結束', 'END'] })
 */
export const declareEnum = (obj, typeBindValue) => {
	const v = {}
	const t = {}
	const d = {}
	const keys = []
	let length = 0
	const map = callback => {
		if (!callback) return []

		const result = []
		for (let i = 0; i < keys.length; i++) {
			const k = keys[i]
			result.push(callback(v[k], k, i))
		}
		return result
	}

	if (typeof obj === 'object') {
		for (const k in obj) {
			const e = obj[k]

			if (Array.isArray(e)) {
				const first = e[0]
				v[k] = first
				for (let i = 1; i < e.length; i++) {
					const f = e[i]
					switch (i) {
						case 1:
							t[first] = f
							break
						case 2:
							d[first] = f
							break
					}
				}
			} else {
				v[k] = e
			}

			keys.push(k)
			length += 1
		}
	}

	return { ...v, t, d, keys, length, map }
}
