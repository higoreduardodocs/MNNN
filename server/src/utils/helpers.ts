export const getToday = () => Intl.DateTimeFormat('pt-br').format(new Date())

export const encryptMatch = (id: number): string =>
  `${process.env.DEFAULT_TOKEN}${id}${process.env.DEFAULT_TOKEN}`

export const decryptMatch = (match: string): number => {
  let idString = match
    .replace(process.env.DEFAULT_TOKEN as string, '')
    .replace(process.env.DEFAULT_TOKEN as string, '')

  return parseInt(idString)
}
