program Task6Program

actor ScratchStage begin

end

actor Stage is ScratchStage begin

end

actor ScratchSprite begin

    // x-coordinate in [-240,+240]
    // See https://en.scratch-wiki.info/wiki/Coordinate_System
    declare x as number

    // y-coordinate in [-180,+180]
    // See https://en.scratch-wiki.info/wiki/Coordinate_System
    declare y as number

    // Percent of the original size in [3,54000]
    // See https://en.scratch-wiki.info/wiki/Size_(value)
    declare size as number

    // The current layer of a sprite
    // See https://en.scratch-wiki.info/wiki/Layer_(value)
    declare layer as number

    // The rotation of the sprite in [-360,+360]
    // See https://en.scratch-wiki.info/wiki/Direction_(value)
    declare direction as number

    // Whether or not the sprite is visible (difference to ghost mode!)
    // See https://en.scratch-wiki.info/wiki/Hide_(block)
    declare visible as boolean

    // Initialize the variables with their default values
    store 0 to x
    store 0 to y
    store 100 to size
    store 0 to layer
    store 90 to direction
    store true to visible

    define mathSin(n: number) begin
        // TODO
    end returns result: number

    define mathCos(n: number) begin
        // TODO
    end returns result: number

    define mathAtan2(n1: number, n2: number) begin
        // TODO
    end returns result: number

    define degToRad(n: number) begin
        // TODO
    end returns result: number

    define radToDeg(n: number) begin
        // TODO
    end returns result: number

    define pointTowards (s: string) begin
        declare targetX as number
        declare targetY as number

        store (attribute "x" of s) to targetX
        store (attribute "y" of s) to targetY

        declare dx as number
        declare dy as number
        store targetX - util.target.x to dx
        store targetY - util.target.y to dy

        store 90 - radToDeg(mathAtan2(dy, dx)) to direction
    end

    define moveSteps (n: number) begin
        declare dx as number
        declare dy as number
        declare radians as number

        store degToRad(90 - direction) to radians
        store n * mathCos(radians) to dx
        store n * mathSin(radians) to dy

        store (x + dx) to x
        store (y + dy) to y
    end

end

actor Monkey is ScratchSprite begin

end

actor CircusDirector is ScratchSprite begin

    script on green flag do begin
        repeat forever begin
            pointTowards("Monkey")
            moveSteps(1)
        end
    end

end

