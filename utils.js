const { JSDOM } = require('jsdom')

const parseHTMLPage = (pageData, url) => {
	const { document } = new JSDOM(pageData, {
		url,
		contentType: 'text/html',
	}).window
	return document
}

// Use recursion to traverse and compile all the HTML inner texts into an array
const compilePageText = pageDom => {
	let text = pageDom.textContent?.replace(/[\n\r\t]/g, '').trim() || ''
	if (!pageDom.children) return text
	text = text.concat(compilePageText(pageDom.children))
	return text.split(' ').filter(word => word !== '')
}

const checkForTerm = (document, term) => {
	// Traversal - we're only choosing to parse what is in the <body> tag to speed up the process
	const pageText = compilePageText(document.body)

	// Compile output for user on all occurrances found for 'term'
	let occurrances = 0
	let results = []
	for (let i = 0; i < pageText.length; i++) {
		const word = pageText[i]
		if (word.toLowerCase() === term.toLowerCase()) {
			occurrances++
			results.push(`${pageText[i - 1]} ${word} ${pageText[i + 1]}`)
		}
	}

	// Output to user
	console.log(`Found the term "${term}" a total of ${occurrances} times.`)
	for (const result of results) {
		console.log(`Occurrance found: ${result}`)
	}
}

module.exports = {
	parseHTMLPage,
	checkForTerm,
}
