program ExampleProgram

actor Foo is ScratchStage begin
    set attribute "x" to 10

    script on startup do begin
        if true then begin
            say "AAA"
        end else begin
            say "BBB"
            if false then begin
                say "CCC"
            end
        end
    end
end
