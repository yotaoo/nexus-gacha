/** Clean game description tags: <color=#hex>, <unbreak>, <u>, #N[f1]%, {NON_BREAK_SPACE} */
export function cleanHsrDescription(text: string): string {
  if (!text) return ''
  return text
    .replace(/<color=#[a-fA-F0-9]+>/g, '')
    .replace(/<\/color>/g, '')
    .replace(/<unbreak>/g, '')
    .replace(/<\/unbreak>/g, '')
    .replace(/<u>/g, '')
    .replace(/<\/u>/g, '')
    .replace(/<\/?[a-z][^>]*>/gi, '')
    .replace(/#(\d+)\[[^\]]*\]%?/g, '$1%')
    .replace(/\{NON_BREAK_SPACE\}/g, ' ')
    .replace(/\\n/g, '\n')
    .replace(/^#/, '')
    .trim()
}

/** Clean HSR relic names with gender placeholders: {F#feminine}{M#masculine} -> masculine */
export function cleanRelicName(name: string): string {
  if (!name) return ''
  return name
    .replace(/\{F#[^}]*\}/g, '')
    .replace(/\{M#([^}]*)\}/g, '$1')
    .trim()
}
