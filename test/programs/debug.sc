program ExampleProgram

actor Foo is ScratchStage begin

    script on startup do begin
        sayText "BBB"
        if true then begin
            sayText "AAA"
        end else begin
            sayText "CCC"
        end
    end

end
