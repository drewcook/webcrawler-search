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
	let mocks = ['mock', 'data', 'apple', 'reimagined']
	// Traversal - we're only choosing to parse what is in the <body> tag to speed up the process
	const results = compilePageText(document.body)
	console.log(results)

	// return results
	return mocks
}

// Use recursion to traverse and compile all the HTML inner texts into an array
const compilePageText = pageDom => {
	let results = []

	const nodes = body.getElementsByTagName('*')

	for (var i = 0; i < domNodes.length; i++) {
		console.log(nodes[i].textContent)
	}
	function helper(input) {
		if (input.length === 0) {
			return input.textContent
		}
		return input.textContent + helper(input.children)
	}

	helper(domNodes)

	return results
}

module.exports = {
	parseHTMLPage,
	checkForTerm,
}
