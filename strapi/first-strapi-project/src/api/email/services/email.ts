type Address = string | string[];

export type SendMailInput = {
  to: Address;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  cc?: Address;
  bcc?: Address;
  attachments?: unknown;
};

type MailSendResult = {
  messageId?: string;
  accepted?: unknown;
  rejected?: unknown;
  response?: string;
};

const pickMailResult = (result: unknown): MailSendResult => {
  if (!result || typeof result !== 'object') return {};

  const obj = result as Record<string, unknown>;
  return {
    messageId: typeof obj.messageId === 'string' ? obj.messageId : undefined,
    accepted: obj.accepted,
    rejected: obj.rejected,
    response: typeof obj.response === 'string' ? obj.response : undefined,
  };
};

export default {
  async sendMail(input: SendMailInput) {
    const message: Record<string, unknown> = {
      to: input.to,
      subject: input.subject,
    };

    if (typeof input.text !== 'undefined') message.text = input.text;
    if (typeof input.html !== 'undefined') message.html = input.html;
    if (typeof input.from !== 'undefined') message.from = input.from;
    if (typeof input.replyTo !== 'undefined') message.replyTo = input.replyTo;
    if (typeof input.cc !== 'undefined') message.cc = input.cc;
    if (typeof input.bcc !== 'undefined') message.bcc = input.bcc;
    if (typeof input.attachments !== 'undefined') message.attachments = input.attachments;

    const result = await strapi.plugin('email').service('email').send(message as any);

    return pickMailResult(result);
  },

  async sendTestMail(to?: string) {
    const resolvedTo = to || process.env.EMAIL_TEST_TO;
    if (!resolvedTo) {
      throw new Error('Missing test recipient: provide "to" or set EMAIL_TEST_TO');
    }

    const result = await strapi.plugin('email').service('email').send({
      to: resolvedTo,
      subject: 'Strapi 测试邮件',
      text: '这是一封由 Strapi Email Plugin 发送的测试邮件。',
      html: '<p>这是一封由 <b>Strapi Email Plugin</b> 发送的测试邮件。</p>',
    });

    return pickMailResult(result);
  },
};
