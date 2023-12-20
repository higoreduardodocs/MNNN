export const escapeCpf = (cpf: string) => cpf.replaceAll('/.|-/gm', '')
