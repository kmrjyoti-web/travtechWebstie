export class CurrencyHelper {
    static getSymbol(currencyCode: string): string {
        try {
            const parts = new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'narrowSymbol',
            }).formatToParts(0);
            const symbol = parts.find((part) => part.type === 'currency')?.value;
            return symbol || currencyCode;
        } catch (e) {
            console.warn(`Could not determine symbol for currency code: ${currencyCode}`, e);
            return currencyCode;
        }
    }
}
