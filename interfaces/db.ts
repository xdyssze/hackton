

export default interface db {
    saveTiff(): Promise<void>,
    getTiff(): Promise<void>
}