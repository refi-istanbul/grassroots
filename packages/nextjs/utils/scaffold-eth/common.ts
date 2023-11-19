// To be used in JSON.stringify when a field might be bigint
// https://wagmi.sh/react/faq#bigint-serialization
export const replacer = (_key: string, value: unknown) => (typeof value === "bigint" ? value.toString() : value);


export function uniq(array: any[], field: string) {
    return array.reduce((accumulator, current) => {
            if(!accumulator.includes(current[field])) {
                accumulator.push(current[field])
            }
            return accumulator;
        }, []
    )
}