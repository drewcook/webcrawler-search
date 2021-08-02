const { JSDOM } = require('jsdom')

// TODO: loop over array of text contents and count number of times 'TERM' is substring
// TODO: return number of instances found on a page along with the substring of preceding and following words around the term - "word TERM word"

const parseHTMLPage = (pageData, url) => {
	const { document } = new JSDOM(pageData, {
		url,
		contentType: 'text/html',
	}).window
	return document
}

const checkForTerm = (document, term) => {
	// Traversal - we're only choosing to parse what is in the <body> tag to speed up the process
	const texts = compilePageText(document.body)
	console.log(texts)

	// Compile output for user on all occurrances found for 'term'
	let occurrances = 0
	let results = []

	for (let i = 0; i < texts.length; i++) {
		const substr = results[i]
		if (substr.includes(term)) {
			count++
			results.push(substr)
		}
	}

	// Output to user
	console.log(`Found the term ${term} a total of ${occurrances} times.`)
	for (const result of results) {
		console.log(`Occurrance found: ${result}`)
	}
}

module.exports = {
	parseHTMLPage,
	checkForTerm,
}
