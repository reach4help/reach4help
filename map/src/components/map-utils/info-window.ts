import { MarkerInfo, ContactDetails } from 'src/data/markers';

function contactInfo(label: string, info?: ContactDetails): string {
  if (!info) {
    return '';
  }
  const items: Array<{ href: string; label: string }> = [];
  if (info.phone) {
    items.push(
      ...info.phone.map(number => ({
        href: `tel:${number.replace(/\s/g, '')}`,
        label: number,
      })),
    );
  }
  if (info.email) {
    items.push(
      ...info.email.map(email => ({
        href: `mailto:${email}`,
        label: email,
      })),
    );
  }
  if (info.facebookGroup) {
    items.push({
      href: info.facebookGroup,
      label: 'Facebook',
    });
  }
  if (info.web) {
    items.push(
      ...Object.entries(info.web).map(entry => ({
        href: entry[1],
        label: entry[0],
      })),
    );
  }
  if (items.length === 0) {
    return '';
  }
  return `
    <div>
      <span>${label}:</span>
      ${items.map(
        item => `<a href="${item.href}" target="_blank">${item.label}</a> `,
      )}
    </div>
    `;
}

export default (info: MarkerInfo) =>
  `<div id="content">
    <div id="siteNotice">
    </div>
    <h1 id="firstHeading" class="firstHeading">${info.contentTitle}</h1>
    ${info.contentBody ? `<div id="bodyContent">${info.contentBody}</div>` : ''}
    <div>
      <hr>
      ${contactInfo('General Inquiries', info.contact.general)}
      ${contactInfo('Volunteer', info.contact.volunteers)}
      ${contactInfo('Request Help', info.contact.getHelp)}
    <div>
  </div>`;
