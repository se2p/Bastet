program Mini1Program

actor Other begin

    declare x as number
    define x as 11

end

actor MiniActor is RuntimeEntity begin

    define atomic queryNumber (a: actor, s: string) begin
        define result as cast attribute "x" of a to number
    end returns result: number

    script on startup do begin
        declare o as actor
        define o as locate actor "Other"

        declare y as number
        define y as queryNumber(o, "x")

        if not (y = 11) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end


end

