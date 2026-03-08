export const bengaliMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

export const englishToBengaliNumber = (numStr: string | number) => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return numStr.toString().replace(/\d/g, (d) => bengaliDigits[parseInt(d)]);
};

export const formatBengaliDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = englishToBengaliNumber(date.getDate());
  const month = bengaliMonths[date.getMonth()];
  const year = englishToBengaliNumber(date.getFullYear());
  return `${day} ${month} ${year}`;
};
