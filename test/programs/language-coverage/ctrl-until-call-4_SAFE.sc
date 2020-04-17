program Mini1Program

// This is an IMPORTANT test program
actor MiniActor is RuntimeEntity begin

    script on startup do begin
        repeat forever begin
            declare i as int
            define i as 0
            until i = 2 repeat begin
                define i as i + 1
                if i = 11 then begin
                    _RUNTIME_signalFailure()
                end
            end
        end
    end

end

