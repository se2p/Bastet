import math

# Input in radians

case = """        end else if input >= {infrom} and input < {into} then begin
            assume result > {outfrom}
            assume result <= {outto}"""

step = 0.1571
infrom = 0
into = step

while infrom < 6.28:
    into = round(into + step, 4)
    outfrom = round(math.sin(infrom), 4)
    outto = round(math.sin(into), 4)

    if outfrom > outto:
        smaller = outto
        larger = outfrom
    else:
        smaller = outfrom
        larger = outto

    if smaller < 0:
        smaller = "0.0 - {}".format(abs(smaller))
    if larger < 0:
        larger = "0.0 - {}".format(abs(larger))

    print(case.format(infrom=infrom, into=into, outfrom=smaller, outto=larger))
    infrom = into
