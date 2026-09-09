module MinimalMotionLibrary

role RuntimeEntity begin
    extern _RUNTIME_signalFailure ()
end

role Observer is RuntimeEntity begin
end

role ScratchSprite is RuntimeEntity begin
    declare x as integer
    declare y as integer
    declare direction as integer

    define atomic pointTowards (target: actor) begin
        define direction as 180
    end
end
