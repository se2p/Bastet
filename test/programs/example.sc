program ExampleProgram

stage Stage begin
    image backdrop1 "file://back1.png"
    image backdrop2 "file://back2.png"
    sound sound1 "file://sound1.wav"

    declare variable1 as number
    declare variable2 as string
    declare variable3 as list string

    set attribute "x" to 10
    set attribute "y" to 5

    set variable3 to [ "foo", "bar", "wauz" ]

    script on green flag do begin
        set variable1 to 1
    end
end

sprite Test begin
    image backdrop1 "file://back1.png"
    image backdrop2 "file://back2.png"
    sound sound1 "file://sound1.wav"

    declare variable1 as number
    declare variable2 as string
    declare variable3 as list string

    set attribute "x" to 10
    set attribute "y" to 5

    set variable3 to [ "foo", "bar", "wauz" ]

    script on green flag do begin
        set variable1 to 1
    end
end

sprite Sprite1 begin
    script on green flag do begin
        say "Hello World"
    end
end

sprite Sprite2 begin
    procedure foo (n: number, m: number) begin
        say as string (n + m)
    end

    script on green flag do begin
        say "Hello again!"
        foo(1, 41)
    end
end
