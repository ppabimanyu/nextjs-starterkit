export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  console.log(
    "Sending email to",
    to,
    "with subject",
    subject,
    "and text",
    text
  );
}
