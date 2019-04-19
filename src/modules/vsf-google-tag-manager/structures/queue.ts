export class Queue<T> {
    private data: T[]

    constructor(data: T[] = []) {
        this.data = data
    }

    push(value: T): void {
        this.data.push(value)
    }

    get(): T {
        return this.data[0]
    }

    consume(): T {
        return this.data.shift()
    }
}