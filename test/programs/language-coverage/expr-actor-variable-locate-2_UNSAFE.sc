program Mini1Program

actor Other begin

    declare x as int
    define x as 11

end

actor MiniActor is RuntimeEntity begin

    define atomic queryNumber (a: actor, s: string) begin
        define result as cast attribute "x" of a to int
    end returns result: int

    script on startup do begin
        declare y as int
        define y as queryNumber(locate actor "Other", "x")

        if (y = 11) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end


end

