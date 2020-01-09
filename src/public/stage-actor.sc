module StageModule

import Entity from "entity-actor.sc"

actor Stage is Entity begin

    define switchBackdropTo (id: string) begin
        changeActiveImageTo(id)
    end

    define switchBackdropToAndWait (id: string) begin

    end

    define nextBackdrop () begin

    end

end

