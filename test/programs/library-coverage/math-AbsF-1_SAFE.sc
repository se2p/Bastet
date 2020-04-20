program Mini1Program

actor MiniActor is RuntimeEntity begin

      script on startup do begin
            declare u as float
            define u as 0.0-35.0

            if mathAbsF(u) = 35.0 then begin
            end else begin
                _RUNTIME_signalFailure()
            end
      end

end
