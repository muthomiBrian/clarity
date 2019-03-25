function sanitize (str) {
  if (typeof str === 'undefined') {
    return;
  }

  if (str.includes('<')) {
    const newStr = str.replace('<', '&lt;');
    return sanitize(newStr);
  }

  if(str.includes('>')) {
    const newStr = str.replace('>', '&gt;');
    return sanitize(newStr);
  }

  if (str.includes('"')) {
    const newStr = str.replace('"', '&quot;');
    return sanitize(newStr);
  }

  if (str.includes('\'')) {
    const newStr = str.replace('\'','&apos;');
    return sanitize(newStr);
  }

  return str;
}