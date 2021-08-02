# Web Crawler Search Tool

This project contains code for a CLI-based web crawler. You can search any valid URL that returns HTML from a server and search for a keyword throughout that site. The response from the tool should return the following:

- Number of pages crawled
- Number of instances keyword was found
- Results containing the keywords found within the content

## Usage

Since this is a CLI tool, you must use a terminal to run the program.

```bash
node index.js [url] [keyword]


# Example - search Apple website for keyword 'reimagined'
node index.js https://www.apple.com reimagined
```

_NOTE: This project is incomplete_
