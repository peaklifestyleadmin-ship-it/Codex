export function emailSequence(leadEmail: string) {
  return [
    { day: 1, subject: "Welcome", body: `Welcome ${leadEmail}, here is your lead magnet.` },
    { day: 2, subject: "Value", body: "Here are actionable buyer guides and comparisons." },
    { day: 3, subject: "Offer", body: "Our top picks this week with affiliate offers." }
  ];
}
