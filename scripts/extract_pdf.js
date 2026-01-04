const fs = require('fs');
let pdf = require('pdf-parse');

// Fix for potential import issue
if (typeof pdf !== 'function' && pdf.default) {
    pdf = pdf.default;
}

const files = [
    'c:\\Users\\Omkar\\Desktop\\Project\\Portfolio\\omkar.pdf',
    'c:\\Users\\Omkar\\Desktop\\Project\\Portfolio\\omkar_sonawane_sde_resume_v8.pdf'
];

async function readPdf(filePath) {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        // Check if pdf is a function now
        if (typeof pdf !== 'function') {
             return `Error: pdf-parse is not a function. Keys: ${Object.keys(pdf)}\n`;
        }
        const data = await pdf(dataBuffer);
        return `\n\n--- START OF ${filePath} ---\n${data.text}\n--- END OF ${filePath} ---\n\n`;
    } catch (error) {
        return `Error reading ${filePath}: ${error.message}\n`;
    }
}

async function main() {
    let output = '';
    for (const file of files) {
        output += await readPdf(file);
    }
    fs.writeFileSync('c:\\Users\\Omkar\\Desktop\\Project\\Portfolio\\extracted_text_direct.txt', output);
}

main();
