import type { Core } from '@strapi/strapi';

type Address = string | string[];

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isAddress = (value: unknown): value is Address => {
  if (isNonEmptyString(value)) return true;
  if (Array.isArray(value) && value.every(isNonEmptyString)) return true;
  return false;
};

const getPayload = (ctx: any) => {
  const body = (ctx.request as any)?.body;
  if (body && typeof body === 'object' && 'data' in body) return (body as any).data;
  return body;
};

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async send(ctx: any) {
    const payload = getPayload(ctx) ?? {};

    const to = (payload as any).to;
    const subject = (payload as any).subject;
    const text = (payload as any).text;
    const html = (payload as any).html;

    if (!isAddress(to)) ctx.throw(400, '"to" 必须为邮箱字符串或字符串数组');
    if (!isNonEmptyString(subject)) ctx.throw(400, '"subject" 不能为空');
    if (!isNonEmptyString(text) && !isNonEmptyString(html))
      ctx.throw(400, '"text" 与 "html" 至少提供一个');

    const result = await strapi.service('api::email.email').sendMail({
      to,
      subject: subject.trim(),
      text: isNonEmptyString(text) ? text : undefined,
      html: isNonEmptyString(html) ? html : undefined,
      from: isNonEmptyString((payload as any).from) ? (payload as any).from : undefined,
      replyTo: isNonEmptyString((payload as any).replyTo) ? (payload as any).replyTo : undefined,
      cc: isAddress((payload as any).cc) ? (payload as any).cc : undefined,
      bcc: isAddress((payload as any).bcc) ? (payload as any).bcc : undefined,
      attachments: (payload as any).attachments,
    });

    ctx.body = { data: result };
  },

  async test(ctx: any) {
    const payload = getPayload(ctx) ?? {};
    const to = isNonEmptyString((payload as any).to) ? ((payload as any).to as string) : undefined;

    try {
      const result = await strapi.service('api::email.email').sendTestMail(to);
      ctx.body = { data: result };
    } catch (err) {
      const message = err instanceof Error ? err.message : '发送测试邮件失败';
      ctx.throw(400, message);
    }
  },
});
