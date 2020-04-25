program Mini1Program

actor MiniActor is RuntimeEntity begin

    script on startup do begin
        declare x as int
        declare y as int
        define x as 7
        define y as 0
        repeat x times begin
            define y as y + 1
        end
        if not (y = 7) then begin
            _RUNTIME_signalFailure()
        end
    end

end

