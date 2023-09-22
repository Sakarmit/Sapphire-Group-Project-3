'use strict';

class TemplateProcessor {
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