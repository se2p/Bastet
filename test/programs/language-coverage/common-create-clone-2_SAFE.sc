program Mini1Program

actor Stage is RuntimeEntity begin

    declare x as int

end

actor MiniActor2 is RuntimeEntity begin

    script on startup do begin
        set attribute "x" of Stage to 0
        create clone of "MiniActor2"
        if attribute "x" of "Stage" = 2 then begin
            _RUNTIME_signalFailure()
        end
    end

    script on started as clone do begin
        set attribute "x" of Stage to 2
    end

end

