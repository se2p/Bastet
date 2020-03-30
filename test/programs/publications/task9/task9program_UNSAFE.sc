program Task9Program

actor Stage is ScratchStage begin
      image  Buhnenbild1 "2.png"
      image  HintergrundManegeklein "3.svg"

      declare volume as number
      declare layerOrder as number
      declare tempo as number
      declare videoTransparency as number
      declare videoState as string

      define volume as 100.0
      define layerOrder as 0.0
      define tempo as 60.0
      define videoTransparency as 50.0
      define videoState as "off"
  end

actor Pferd is ScratchSprite begin
      image  Pferd "1.svg"

      declare volume as number
      declare layerOrder as number
      declare visible as boolean
      declare x as number
      declare y as number
      declare size as number
      declare direction as number
      declare draggable as boolean
      declare rotationStyle as string

      define volume as 100.0
      define layerOrder as 1.0
      define visible as true
      define x as (0-23.0)
      define y as (0-30.0)
      define size as 50.0
      define direction as 90.0
      define draggable as false
      define rotationStyle as "all around"

      script on startup do begin
          repeat forever begin
              if touchingMousePointer () then begin
                // doesn't turn -> unsafe
              end else begin
                  define color_effect_value as (62.0 + color_effect_value)
              end
              wait 1 seconds
          end
      end
  end
