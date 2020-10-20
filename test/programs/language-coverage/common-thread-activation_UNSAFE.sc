program Mini1Program

actor Looper is RuntimeEntity begin

    script on startup do begin
        repeat forever begin
            declare mouseClicked as boolean
            if mouseClicked then begin
                broadcast "FOO" () to "SYSTEM"
            end
        end
    end

end

actor ActorA is RuntimeEntity begin

    define atomic fn () begin
        epsilon
        epsilon
        epsilon
        epsilon
        epsilon
        epsilon
        epsilon
        epsilon
        epsilon
    end returns result : boolean

    script on message "FOO" () in "SYSTEM" do begin
        if fn() then begin
            _RUNTIME_signalFailure()
        end
    end

end


