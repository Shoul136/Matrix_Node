export const fromUnix = (unixTimestamp: number) : string => {
    return new Date(unixTimestamp * 1000).toLocaleString('es-MX', {
        timeZone: 'America/Tijuana', 
        dateStyle: 'short',
        timeStyle: 'medium'
    })
}