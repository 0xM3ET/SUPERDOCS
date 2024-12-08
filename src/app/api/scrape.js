const axios = require('axios');
const cheerio = require('cheerio');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');

class WebScraper {
    constructor(baseUrl, outputFile = 'knowledge_base.json') {
        this.baseUrl = baseUrl;
        this.domain = new URL(baseUrl).hostname;
        this.visitedUrls = new Set();
        this.outputFile = outputFile;
        this.queue = [];
        this.knowledgeBase = []; // Array to store the scraped data
    }

    async initialize() {
        // Initialize the output file
        try {
            // If the file already exists, we can read its contents and append to it
            try {
                const data = await fs.readFile(this.outputFile, 'utf8');
                this.knowledgeBase = JSON.parse(data); // Load previous data
            } catch (err) {
                // If the file doesn't exist, we'll create a new one
                console.log('No previous knowledge base found. Creating a new one.');
            }
        } catch (error) {
            console.error('Error initializing the output file:', error);
            throw error;
        }
    }

    isValidUrl(pageUrl) {
        try {
            const parsedUrl = new URL(pageUrl);
            return parsedUrl.hostname === this.domain;
        } catch (error) {
            return false;
        }
    }

    normalizeUrl(pageUrl) {
        return pageUrl.split('#')[0].replace(/\/$/, '');
    }

    cleanContent($) {
        // Remove unwanted elements
        $('script').remove();
        $('style').remove();
        $('iframe').remove();
        $('nav').remove();
        $('header').remove();
        $('footer').remove();
        $('.advertisement').remove();
        $('#sidebar').remove();
        $('[class*="menu"]').remove();
        $('[class*="nav"]').remove();
        $('[class*="banner"]').remove();
        $('[class*="cookie"]').remove();
        $('[class*="popup"]').remove();

        // Extract main content areas
        const mainContent = $('main, article, .content, #content, .main-content, #main-content');

        if (mainContent.length > 0) {
            return mainContent.text().trim();
        }

        // Fallback to body content if no main content areas found
        return $('body').text().trim();
    }

    async saveToKnowledgeBase(pageUrl, title, content) {
        // Save the scraped data in a structured format
        const pageData = {
            url: pageUrl,
            title: title || 'No Title',
            content: content
        };

        this.knowledgeBase.push(pageData);
        console.log(`Added to knowledge base: ${pageUrl}`);
    }

    async saveKnowledgeBase() {
        try {
            // Write the knowledge base to a JSON file
            await fs.writeFile(this.outputFile, JSON.stringify(this.knowledgeBase, null, 2));
            console.log(`Knowledge base saved to: ${this.outputFile}`);
        } catch (error) {
            console.error('Error saving knowledge base:', error);
        }
    }

    async scrapePage(pageUrl) {
        if (this.visitedUrls.has(pageUrl)) {
            return;
        }

        try {
            console.log(`Scraping: ${pageUrl}`);
            const response = await axios.get(pageUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            this.visitedUrls.add(pageUrl);
            const $ = cheerio.load(response.data);

            // Clean the content and get the title
            const cleanedContent = this.cleanContent($);
            const title = $('title').text();

            // Add the page data to the knowledge base
            await this.saveToKnowledgeBase(pageUrl, title, cleanedContent);

            // Extract and process links
            const links = $('a')
                .map((_, element) => $(element).attr('href'))
                .get()
                .filter(href => href)
                .map(href => {
                    try {
                        return url.resolve(pageUrl, href);
                    } catch {
                        return null;
                    }
                })
                .filter(href => href && this.isValidUrl(href))
                .map(href => this.normalizeUrl(href));

            // Add new links to the queue
            for (const link of links) {
                if (!this.visitedUrls.has(link)) {
                    this.queue.push(link);
                }
            }

        } catch (error) {
            console.error(`Error scraping ${pageUrl}:`, error.message);
        }
    }

    async start() {
        await this.initialize();
        this.queue.push(this.baseUrl);

        while (this.queue.length > 0) {
            const nextUrl = this.queue.shift();
            await this.scrapePage(nextUrl);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log('Scraping completed!');
        console.log('Total pages scraped:', this.visitedUrls.size);

        // Save the accumulated knowledge base
        await this.saveKnowledgeBase();
    }
}

async function main() {
    if (process.argv.length < 3) {
        console.error('Please provide a URL to scrape');
        console.error('Usage: node scraper.js <url> [output_file]');
        process.exit(1);
    }

    const targetUrl = process.argv[2];
    const outputFile = process.argv[3] || 'knowledge_base.json';

    try {
        const scraper = new WebScraper(targetUrl, outputFile);
        await scraper.start();
    } catch (error) {
        console.error('Scraping failed:', error);
        process.exit(1);
    }
}

main();
