import { Form as VeeForm, Field as VeeField, ErrorMessage } from 'vee-validate';

import { defineRule, configure } from 'vee-validate';
import { required } from '@vee-validate/rules';

defineRule('required', required);

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `The field ${ctx.field} is required.`,
    };

    const message = messages[ctx.rule.name]
      ? messages[ctx.rule.name]
      : `The field ${ctx.field} is invalid.`;

    return message;
  },
});

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);
  },
};
