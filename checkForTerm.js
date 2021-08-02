const { JSDOM } = require('jsdom')

const parseHTMLPage = (pageData, url) => {
	const { document } = new JSDOM(pageData, {
		url,
		contentType: 'text/html',
	}).window
	return document
}

const checkForTerm = (document, term) => {
	let results = []
	let texts = ['mock', 'data', 'apple', 'reimagined']
	// Traversal - we're only choosing to parse what is in the <body> tag to speed up the process
	const body = document.body

	const recursionResult = recurse(body, results)
	console.log(recursionResult)

	// TODO: UGH - too much time using a bad URL to test my JSDOM parsing resulted in me not finishing the traversal part
	// for (const child of body.children) {
	// 	if (child.children.length)
	// }
	// for (let i = 0; i < body.childNodes.length; i++) {
	// 	const node = body.childNodes[i]
	// 	console.log(node)
	// 	if (node.children.length === 0) {
	// 		console.log(node.textContent)
	// 	} else {
	// 		for (const child of node.childNodes) {
	// 			console.log(child)
	// 		}
	// 	}
	// }

	return texts
}

// TODO: use recursion to traverse and compile all the HTML inner texts into an array
// TODO: loop over array of text contents and count number of times 'TERM' is substring
// TODO: return number of instances found on a page along with the substring of preceding and following words around the term - "word TERM word"
const recurse = (domSlice, results) => {
	if (domSlice.children.length === 0) {
		return domSlice.textContent
	} else {
		for (const child of domSlice.children) {
			return results.push(recurse(child))
		}
	}
}

module.exports = {
	parseHTMLPage,
	checkForTerm,
}
