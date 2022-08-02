interface Array<T> {
    length: number
    join(separator: string): string
    // sort(): T[]
    // indexOf(v: string): number
    push(v: T): void
    [n: number]: T
    concat(x: T[]): T[]
}

interface String {
    replace(val: RegExp, val2: string): string
    trimRight(): string
}


interface ErrorConstructor {
    new(message?: string): Error
}

declare let Error: ErrorConstructor;

declare function isNaN(v: any): boolean

interface Object {
    keys(obj: any): string[]
}

declare let Object: Object