export const trimString = function(string: string, length: number) {
  const content = string.replace(/(<([^>]+)>)/gi, '');
  return content.length > length
    ? content.substring(0, length) + '...'
    : content;
};