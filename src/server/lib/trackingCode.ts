import { trackingHTMLEmail } from './EmailTemplate/tracking'
import { transport } from './nodemailer'
import { z } from 'zod'

const ContactData = z.object({
  name: z.string(),
  email: z.string().email(),
  code: z.string().min(10),
})

export interface ContactDataInt extends z.infer<typeof ContactData> {}

export function validateData(data: any) {
  ContactData.parse(data)
}

export function buildEmailConfig(data: ContactDataInt) {
  return {
    from: process.env.NEXT_SMTP_USER,
    to: data.email,
    subject: `${data.name} Seu pedido já tem código de rastreio.`,
    html: trackingHTMLEmail({ name: data.name, code: data.code }),
  }
}

export async function sendEmail(config: any) {
  try {
    const resp = await transport.sendMail(config)
    return resp
  } catch (error: any) {
    throw new Error(error.message || error.toString())
  } finally {
    transport.close()
  }
}
