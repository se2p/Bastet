program Mini1Program

actor MiniActor begin

    extern _RUNTIME_signalFailure ()

    define atomic inc (n: int) begin
        define result as n + 1
    end returns result: int

    script on startup do begin
        declare y as int
        define y as 0

        define y as inc(y)
        define y as inc(y)
        define y as inc(y)
        define y as inc(y)

        define y as inc(y)
        define y as inc(y)
        define y as inc(y)
        define y as inc(y)

        if not (y = 8) then begin
            _RUNTIME_signalFailure("This must not happen!")
        end
    end


end

