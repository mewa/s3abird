const simpleParser = require('mailparser').simpleParser;
const createDOMPurify = require('dompurify');

const DOMPurify = createDOMPurify(window);

module.exports = function (email) {
    return simpleParser(email)
        .then(parsed => {
            parsed.text = DOMPurify.sanitize(parsed.text);
            parsed.html = DOMPurify.sanitize(parsed.html);
            parsed.htmlAsText = DOMPurify.sanitize(parsed.htmlAsText);

            return parsed;
        });
};
