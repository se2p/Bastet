program Mini1Program

actor MiniActor is RuntimeEntity begin

      script on startup do begin
            declare u as int
            define u as 0-35

            if mathAbs(u) = 35 then begin
            end else begin
                _RUNTIME_signalFailure()
            end
      end

end
