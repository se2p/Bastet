program Task9Program

actor Stage is ScratchStage begin
      sound  Plopp 83a9787d4cb6f3b7632b4ddfebf74367.wav
      image  Bühnenbild1 78d212878a6f0a2b3067aa2c8bca28e1.png
      image  Hintergrund-Manege-klein d6aca145c741a1b12309267dcecdbd49.svg

      declare attribute “volume” as number
      declare attribute “layerOrder” as number
      declare attribute “tempo” as number
      declare attribute “videoTransparency” as number
      declare attribute “videoState” as string
      define attribute “volume” as 100.0
      define attribute “layerOrder” as 0.0
      define attribute “tempo” as 60.0
      define attribute “videoTransparency” as 50.0
      define attribute “videoState” as “off”
  end

actor Pferd is ScratchSprite begin
      sound  Plopp 83a9787d4cb6f3b7632b4ddfebf74367.wav
      image  Pferd 8b75453ccca4324df1d5aebb3b2191ee.svg
      declare attribute “volume” as number
      declare attribute “layerOrder” as number
      declare attribute “visible” as boolean
      declare attribute “x” as number
      declare attribute “y” as number
      declare attribute “size” as number
      declare attribute “direction” as number
      declare attribute “draggable” as boolean
      declare attribute “rotationStyle” as string

      define attribute “volume” as 100.0
      define attribute “layerOrder” as 1.0
      define attribute “visible” as true
      define attribute “x” as -23.0
      define attribute “y” as -30.0
      define attribute “size” as 50.0
      define attribute “direction” as 90.0
      define attribute “draggable” as false
      define attribute “rotationStyle” as “all around”

      script on green flag do begin
          repeat forever begin
              if touchingMousePointer() then begin
                      repeat 10 times begin
                          turnRight(36.0)
                      end
                  end
              else begin
                      define color as (62.0 + color)
                  end
              wait 1 seconds
          end
      end
  end
