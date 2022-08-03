import * as fp from "fountain-pen-api"

export function createFile(
    indentation: string,
    newline: string,
    write: (str: string,) => void,
): fp.IBlock {
    let isFirstLine = true
    function createBlock(
        indentation: string,
        currentIndentation: string,
        flush: () => void,
    ): fp.IBlock {
        return {
            line: (callback) => {
                flush()
                if (!isFirstLine) {
                    write(newline)
                }
                isFirstLine = false
                let currentLine: string | null = currentIndentation
                function createLine(
                    indentation: string,
                    currentIndentation: string,
                ): fp.ILine {
                    return {
                        indent: (callback) => {
                            callback(createBlock(
                                indentation,
                                currentIndentation + indentation,
                                () => {
                                    if (currentLine !== null) {
                                        write(currentLine.trimRight())
                                        currentLine = null
                                    }
                                },
                            ))
                        },
                        snippet: (str) => {
                            if (currentLine === null) {
                                write(`\r\n`)
                                currentLine = currentIndentation
                            }
                            currentLine += `${str}`
                        },
                    }
                }
                callback(createLine(
                    indentation,
                    currentIndentation
                ))
                if (currentLine !== null) {
                    write(currentLine.trimRight())
                }
            },
        }
    }
    return createBlock(
        indentation,
        "",
        () => {
            //
        },
    )
}
