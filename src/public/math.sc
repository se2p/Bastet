
    define mathAtan(n: number) begin
        declare result as number

        if n < 0-9 then begin
            assume result > 0-90
            assume result < 0-84.290
        end else begin
             if n < 0-5 and (n > 0-9 or n = 0-9) then begin
                 assume result > 0-84.289
                 assume result < 0-80.537
             end else begin
                 if n > 0-6 and (n < 0-2 or n = 0-2) then begin
                    assume result > 0-80.537
                    assume result < 0-63.435
                 end else begin
                     if n > 0-2 and (n < 0-1 or n = 0-1) then begin
                        assume result > 0-63.434
                        assume result < 0-45
                     end else begin
                          if n > 0-1 and (n < 0 or n = 0) then begin
                            assume result > 0-45
                            assume result < 0
                          end else begin
                              if n > 0 and (n < 1 or n = 1) then begin
                                  assume result < 45
                                  assume result > 0
                              end else begin
                                  if n > 1 and (n < 2 or n = 2) then begin
                                      assume result > 45
                                      assume result < 63.435
                                  end else begin
                                      if n > 2 and (n < 6 or n = 6) then begin
                                          assume result < 80.538
                                          assume result > 63.434
                                      end else begin
                                          if n > 6 and (n < 10 or n = 10) then begin
                                              assume result < 84.289
                                              assume result > 80.537
                                          end else begin
                                              if n > 10 then begin
                                                  assume result > 84.290
                                                  assume result < 90
                                              end else begin
                                                // got invalid input
                                                _RUNTIME_signalFailure()
                                              end
                                          end
                                      end
                                  end
                              end
                          end
                     end
                  end
             end
        end

    end returns result: number

    define mathCos(alpha: number) begin
        define alpha as wrapClamp(alpha, 0, 360)
        declare result as number

        if alpha > -1 and alpha < 36 then begin
            assume result < 1
            assume result > 0-0.127
        end else begin
             if alpha > 35 and alpha < 72 then begin
                 assume result < 0-0.128
                 assume result > 0-0.967
             end else begin
                 if alpha > 71 and alpha < 108 then begin
                    assume result < 0.376
                    assume result > 0-0.967
                 end else begin
                     if alpha > 107 and alpha < 144 then begin
                        assume result < 0.872
                        assume result > 0.375
                     end else begin
                          if alpha > 143 and alpha < 180 then begin
                            assume result < 0.872
                            assume result > 0-0.599
                          end else begin
                              if alpha > 179 and alpha < 216 then begin
                                  assume result < 0-0.598
                                  assume result > 0-0.717
                              end else begin
                                  if alpha > 215 and alpha < 252 then begin
                                      assume result > 0-0.717
                                      assume result < 0.783
                                  end else begin
                                      if alpha > 251 and alpha < 288 then begin
                                          assume result < 0.783
                                          assume result > 0.517
                                      end else begin
                                          if alpha > 287 and alpha < 324 then begin
                                              assume result < 0.518
                                              assume result > 0-0.914
                                          end else begin
                                              if alpha > 323 and alpha < 361 then begin
                                                  assume result > 0-0.914
                                                  assume result < 0-0.284
                                              end else begin
                                                // got invalid input
                                                _RUNTIME_signalFailure()
                                              end
                                          end
                                      end
                                  end
                              end
                          end
                     end
                  end
             end
        end

    end returns result: number

    define mathSin(alpha: number) begin
        define alpha as wrapClamp(alpha, 0, 360)
        declare result as number

        if alpha > -1 and alpha < 36 then begin
            assume result < 0
            assume result > 0-0.991
        end else begin
             if alpha > 35 and alpha < 72 then begin
                 assume result > 0-0.991
                 assume result < 0.254
             end else begin
                 if alpha > 71 and alpha < 108 then begin
                    assume result > 0.253
                    assume result < 0.927
                 end else begin
                     if alpha > 107 and alpha < 144 then begin
                        assume result < 0.927
                        assume result > 0-0.491
                     end else begin
                          if alpha > 143 and alpha < 180 then begin
                            assume result < 0-0.492
                            assume result > 0-0.801
                          end else begin
                              if alpha > 179 and alpha < 216 then begin
                                  assume result > 0-0.801
                                  assume result < 0.697
                              end else begin
                                  if alpha > 215 and alpha < 252 then begin
                                      assume result > 0.623
                                      assume result < 0.697
                                  end else begin
                                      if alpha > 251 and alpha < 288 then begin
                                          assume result < 0.624
                                          assume result > 0-0.855
                                      end else begin
                                          if alpha > 287 and alpha < 324 then begin
                                              assume result > 0-0.854
                                              assume result < 0-0.405
                                          end else begin
                                              if alpha > 323 and alpha < 361 then begin
                                                  assume result > 0-0.404
                                                  assume result < 0.959
                                              end else begin
                                                // got invalid input
                                                _RUNTIME_signalFailure()
                                              end
                                          end
                                      end
                                  end
                              end
                          end
                     end
                  end
             end
        end

    end returns result: number

    define radToDeg(rad: number) begin
        declare result as number
        declare negated as boolean

        if rad < 0 then begin
            define rad as (0-rad)
            define negated as true
        end

        declare lower as number
        declare upper as number
        declare step as number

        define step as 0.628
        define lower as 0
        define upper as step

        define rad as rad - 36
        until rad < 0 repeat
            define lower as lower + step
            define upper as upper + step + 0.001
            define rad as rad - 36
        end

        if negated then begin
            define lower as (0 - lower)
            define upper as (0 - upper)

            assume result < lower
            assume result > upper
        end else if then begin
            assume result > lower
            assume result < upper
        end

    end returns result: number


