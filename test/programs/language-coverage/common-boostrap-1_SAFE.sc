program TestProgram

role BaseActor begin
    declare KEY as int
    define KEY as 23

    extern _RUNTIME_signalFailure ()
end

actor TestActor is BaseActor begin

    script on startup do begin
        if KEY = 42 then begin
            _RUNTIME_signalFailure()
        end
    end

end