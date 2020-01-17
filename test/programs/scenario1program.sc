program Scenario1Program

actor ScratchStage begin

end

actor Stage is ScratchStage begin

end

actor ScratchSprite begin

    // x-coordinate in [-240,+240]
    // See https://en.scratch-wiki.info/wiki/Coordinate_System
    declare attribute "x" as number

    // y-coordinate in [-180,+180]
    // See https://en.scratch-wiki.info/wiki/Coordinate_System
    declare attribute "y" as number

    // Percent of the original size in [3,54000]
    // See https://en.scratch-wiki.info/wiki/Size_(value)
    declare attribute "size" as number

    // The current layer of a sprite
    // See https://en.scratch-wiki.info/wiki/Layer_(value)
    declare attribute "layer" as number

    // The rotation of the sprite in [-360,+360]
    // See https://en.scratch-wiki.info/wiki/Direction_(value)
    declare attribute "direction" as number

    // Whether or not the sprite is visible (difference to ghost mode!)
    // See https://en.scratch-wiki.info/wiki/Hide_(block)
    declare attribute "visible" as boolean

    // Initialize the variables with their default values
    set attribute "x" to 0
    set attribute "y" to 0
    set attribute "size" to 100
    set attribute "layer" to 0
    set attribute "direction" to 90
    set attribute "visible" to true

end

actor Monkey is ScratchSprite begin

end

actor CircusDirector is ScratchSprite begin

    script on green flag do begin
        repeat forever begin
            point towards pivot_of "Monkey"
            move 1 steps
        end
    end

end

