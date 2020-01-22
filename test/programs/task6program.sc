program Task6Program

actor BaseActor begin

    extern mathSin(n: number) returns number

    extern mathCos(n: number) returns number

    extern mathAtan2(n1: number, n2: number) returns number

    extern degToRad(n: number) returns number

    extern radToDeg(n: number) returns number

end

actor ScratchStage is BaseActor begin

end

actor Stage is ScratchStage begin

end

actor ScratchSprite is BaseActor begin

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
    define x as 0
    define y as 0
    define size as 100
    define layer as 0
    define direction as 90
    define visible as true

    define atomic pointTowards (s: string) begin
        declare targetX as number
        declare targetY as number

        define targetX as (attribute "x" of s)
        define targetY as (attribute "y" of s)

        declare dx as number
        declare dy as number
        define dx as targetX - x
        define dy as targetY - y

        define direction as (90 - radToDeg(mathAtan2(dy, dx)))
    end

    define atomic moveSteps (n: number) begin
        declare dx as number
        declare dy as number
        declare radians as number

        define radians as degToRad(90 - direction)
        define dx as n * mathCos(radians)
        define dy as n * mathSin(radians)

        define x as (x + dx)
        define y as (y + dy)
    end

end

actor Monkey is ScratchSprite begin

end

actor CircusDirector is ScratchSprite begin

    script on startup do begin
        repeat forever begin
            pointTowards("Monkey")
            moveSteps(1)
        end
    end

end

