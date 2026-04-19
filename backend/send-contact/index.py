import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с контактной формы на почту владельца"""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    message = body.get('message', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Укажите имя и контакт'})
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    from_email = 'kirpishnikov@yandex.ru'
    to_email = 'kirpishnikov@yandex.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта MAISON NOIR — {name}'
    msg['From'] = from_email
    msg['To'] = to_email

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #f5f5f0; padding: 40px;">
      <h2 style="color: #c9a96e; font-weight: 300; letter-spacing: 0.2em; text-transform: uppercase; border-bottom: 1px solid #2a2a2a; padding-bottom: 16px;">
        Новая заявка с сайта
      </h2>
      <table style="width: 100%; margin-top: 24px;">
        <tr>
          <td style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 8px 0; width: 140px;">Имя</td>
          <td style="color: #f5f5f0; font-size: 14px; padding: 8px 0;">{name}</td>
        </tr>
        <tr>
          <td style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 8px 0;">Телефон / Email</td>
          <td style="color: #f5f5f0; font-size: 14px; padding: 8px 0;">{contact}</td>
        </tr>
        {"" if not message else f'''
        <tr>
          <td style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; padding: 8px 0; vertical-align: top;">Сообщение</td>
          <td style="color: #f5f5f0; font-size: 14px; padding: 8px 0;">{message}</td>
        </tr>'''}
      </table>
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #2a2a2a; color: #555; font-size: 11px;">
        MAISON NOIR · Автоматическое уведомление
      </div>
    </div>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'ok': True})
    }
