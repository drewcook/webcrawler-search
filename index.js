const http = require('http')
const https = require('https')
const { parseHTMLPage, checkForTerm } = require('./utils.js')

const URL = process.argv[2]
const TERM = process.argv[3]
const protocol = URL.split('://')[0]
const fetcher = protocol === 'https' ? https : http

fetcher
	.get(URL, res => {
		let error
		const { statusCode, headers } = res
		const contentType = headers['content-type']

		// Guard against failed requests
		if (statusCode !== 200) {
			error = new Error(`Request failed.\nStatus Code: ${statusCode}`)
		}
		// Guard against fetching any URLs that don't return HTML
		else if (!/^text\/html/.test(contentType)) {
			error = new Error(`Invalid content type.\nExpected HTML but received ${contentType}.`)
		}
		// Return error if our custom guards fail
		if (error) {
			console.error(error.message)
			return
		}

		// Subscribe to when we have data, concat the Buffer chunks into one
		let rawData = ''
		res.on('data', chunk => {
			rawData += chunk.toString().trim()
		})

		// Subscribe to the automatically invoked res.end() from the http.get() method.
		res.on('end', () => {
			try {
				const document = parseHTMLPage(rawData, URL)

				// TODO: this should happen for each route from the given URL, then compiled, and logged out to the user aggregated data.
				/*
					foreach (page in url) {
						checkForTerm(page, TERM)
					}
				*/
				checkForTerm(document, TERM)
			} catch (e) {
				console.error(`Parsing error: ${e.message}`)
			}
		})
	})
	.on('error', e => console.error(`Network error occurred during GET request.\n${e.message}`))
