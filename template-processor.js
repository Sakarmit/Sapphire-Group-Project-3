'use strict';

// TemplateProcessor USED IN OTHER FILES; exported KEYWORD DIDN'T WORK
/* eslint-disable no-unused-vars */
class TemplateProcessor {
    /* eslint-enable no-unused-vars */
    constructor(template) {
        this.template = template;
    }

    fillIn(dict) {
        let placeholder;
        let placeholderName;
        let filledTemplate = this.template;
        while (/\{{2}\S*}{2}/.test(filledTemplate)) {
            placeholder = /\{{2}\S*}{2}/.exec(filledTemplate)[0];
            placeholderName = placeholder.slice(2, placeholder.length - 2);
            if (placeholderName in dict) {
                filledTemplate = filledTemplate.replace(placeholder, dict[placeholderName]);
            } else {
                filledTemplate = filledTemplate.replace(placeholder, "");
            }
        }
        return filledTemplate;
    }
}