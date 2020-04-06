program Mini1Program

actor MiniActor begin

    extern _RUNTIME_signalFailure ()

    define atomic inc (arg: int) begin
        define result as arg + 1
    end returns result: int

    script on startup do begin
        declare x as int
        define x as 41

        declare y as int
        define y as inc(x)

        if not (y = 42) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end


end

